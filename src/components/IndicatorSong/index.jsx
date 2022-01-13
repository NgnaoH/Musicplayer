import React, { useEffect, useRef } from "react";
import "./indicatorSong.css";

const IndicatorSong = ({
  isPlay = false,
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
