import React from "react";
import "./diskSong.css";

const DiskSong = ({ isPlay = false, thumbnail, isReset }) => {
  return (
    <div className="disk-song">
      <div
        style={{ backgroundImage: `url(${thumbnail})` }}
        className={`thumbnail ${isReset ? "" : "rotate-animate"} ${
          isPlay ? "running" : "paused"
        }`}
      />
      <div className="dot-central"></div>
    </div>
  );
};

export default DiskSong;
