import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./cards";
import getData from "./database.js";

export default function Profile() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
    setData(members);
  }

  useEffect(() => {
    getTeamMembers(); // eslint-disable-next-line
  }, []);

  if (data.length === 0) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "40px" }}>
      {data.map((candidate) => {
        return <Card {...candidate} />;
      })}
    </div>
  );
}
