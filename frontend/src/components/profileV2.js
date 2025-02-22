import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getData from "./database.js";
import { ReactComponent as F13cars } from "../static/3 f1 cars.svg";
import Card from "./cards";

export function ProfileV2() {
  const [teamData, setTeamData] = useState([]);
  const [memberID, setMemberID] = useState(); //Member ID is just the index in recieved array of objects
  const svgRef = useRef(null);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const database = getData();
  let currTeam = location.pathname.split("/");
  currTeam = currTeam[currTeam.length - 1];

  function getTeamMembers() {
    let members = database.filter((candidate) => {
      return candidate.teamName === currTeam;
    });

    if (members.length === 0) {
      alert("Team not found...");
      navigate("/");
      return;
    }
    setTeamData(members);
    console.log(members);
  }

  useEffect(() => {
    getTeamMembers(); // eslint-disable-next-line
  }, []);

  function handleMouseEnter(id) {
    setMemberID(id);
  }

  function handleMouseLeave() {
    setMemberID(null);
  }

  function handleMouseMove(e) {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      // Get all ares of cars i.e rects/polygons/circles
      const cars = svgElement.querySelectorAll("rect, polygon, circle");

      cars.forEach((car) => {
        // Add event listeners for cars
        car.addEventListener("mouseenter", () => handleMouseEnter(car.id));
        car.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    return () => {
      if (svgElement) {
        const cars = svgElement.querySelectorAll("rect, polygon, circle");
        cars.forEach((car) => {
          car.removeEventListener("mouseenter", () => handleMouseEnter(car.id));
          car.removeEventListener("mouseleave", handleMouseLeave);
        });
      }
    };
  }, []);

  //   useEffect(() => {
  //     if (!memberID || !teamData) {
  //       console.log();
  //     } else {
  //       console.log(teamData[memberID].candidateName);
  //     }
  //   }, [memberID]);

  return (
    <div style={{ margin: "auto" }}>
      <F13cars
        width="630px"
        height="630px"
        ref={svgRef}
        style={{ cursor: "pointer" }}
        onMouseMove={(e) => {
          handleMouseMove(e);
        }}
      />
      {memberID ? (
        <div
          style={{
            position: "absolute",
            top: mousePosition.y + 20,
            left: mousePosition.x + 20,
            fontSize: "1.3rem",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 16px 16px rgba(0, 0, 0, 0.2)",
            // pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <Card {...teamData[memberID]} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
