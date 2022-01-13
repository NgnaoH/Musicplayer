import React from "react";
import "./song.css";

const Song = ({ name, index }) => {
  return (
    <div className="song">
      {index + 1} - {name}
    </div>
  );
};

export default Song;
