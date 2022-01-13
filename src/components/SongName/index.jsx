import React, { useEffect, useRef, useState } from "react";
import "./songName.css";

const SongName = ({ name, customClass = "", isReset }) => {
  const frameNameRef = useRef();
  const nameRef = useRef();
  const [frameNameWidth, setFrameNameWidth] = useState(0);
  const [nameWidth, setNameWidth] = useState(0);

  useEffect(() => {
    if (frameNameRef) {
      setFrameNameWidth(() => frameNameRef?.current?.clientWidth);
    }
  }, [frameNameRef]);

  useEffect(() => {
    if (nameRef) {
      setNameWidth(() => nameRef?.current?.clientWidth);
    }
  }, [nameRef]);

  useEffect(() => {
    setFrameNameWidth(() => frameNameRef?.current?.clientWidth);
    setNameWidth(() => nameRef?.current?.clientWidth);
  }, [name]);

  return (
    <div className={`song-name ${customClass} `} ref={frameNameRef}>
      {name && (
        <div
          className={`name-wrapper ${isReset ? "" : "move-animate"}`}
          style={{
            width: `${nameWidth * 2 + frameNameWidth}px`,
            transform: `translateX(-${nameWidth + frameNameWidth}px)`,
          }}
        >
          <p ref={nameRef}>{name}</p>
          <p
            style={{
              paddingLeft: `${frameNameWidth}px`,
            }}
          >
            {name}
          </p>
        </div>
      )}
    </div>
  );
};

export default SongName;
