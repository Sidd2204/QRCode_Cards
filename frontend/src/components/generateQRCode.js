import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import getData from "./database";

export default function GenerateQRCode() {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [url, setUrl] = useState("");

  function check() {
    let present = false;
    const database = getData();
    database.forEach((candidate) => {
      if (candidate.teamName === username) present = true;
      return;
    });
    if (present) {
      setIsValid(true);
    } else {
      // setIsValid(false);
      alert("Team not found");
      return;
    }
  }

  return (
    <div>
      <input
        style={{
          fontSize: "1.5rem",
          margin: "8px",
          padding: "8px",
        }}
        value={username}
        placeholder="Team Name"
        onChange={(e) => {
          setUsername(e.target.value);
          setIsValid(false);
        }}
      ></input>
      <br />
      <button
        style={{
          fontSize: "1rem",
          padding: "8px",
        }}
        onClick={check}
      >
        Generate QR Code
      </button>
      <br />
      <QRCodeCanvas
        value={window.location.href + `#/profile/${username}`}
        style={{ margin: "16px", display: isValid ? "inline" : "none" }}
        bgColor="#313030"
        fgColor="#FFFFFF"
      />
    </div>
  );
}
