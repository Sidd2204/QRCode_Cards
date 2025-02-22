import React from "react";
import "../static/card.css";

export default function Card({
  candidateName = "John Doe",
  collegeName = "APSIT",
  teamName = "XYZ Team",
}) {
  return (
    <div className="flip-card">
      <div className="driver-card">
        <div className="overlay">
          <div className="candidate-name">{candidateName}</div>
          <div className="team-name">Team: {teamName}</div>
          <div className="college-name">{collegeName}</div>
        </div>
      </div>
    </div>
  );
}
