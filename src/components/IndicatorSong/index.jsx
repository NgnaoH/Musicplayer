import React, { useEffect, useRef } from "react";
import { formatTime } from "../../helpers/formatTime";
import "./indicatorSong.css";

const IndicatorSong = ({
  maxTime,
  currentTime,
  onMouseUp,
  onMouseDown,
}) => {
  const indicator = useRef();

  useEffect(() => {
    indicator.current.value = currentTime;
  }, [currentTime, maxTime]);

  return (
    <div className="indicator-song">
      <div className="timer">
        <div className="start-time">{maxTime ? formatTime(currentTime) : "-:--"}</div>
        <div className="end-time">{maxTime ? formatTime(maxTime) : "-:--" }</div>
      </div>
      <input
        ref={indicator}
        onMouseUp={(e) => onMouseUp(e)}
        onMouseDown={(e) => onMouseDown(e)}
        step={1}
        max={maxTime}
        min={0}
        type="range"
        name="indicator"
        id="indicator"
      />
    </div>
  );
};

export default IndicatorSong;
