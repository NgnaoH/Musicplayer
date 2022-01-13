import React, { useEffect, useRef, useState } from "react";
import ButtonNeumor from "../ButtonNeumor";
import ReactHowler from "react-howler";
import "./player.css";
import {
  FiMusic,
  FiPlay,
  FiPause,
  FiChevronLeft,
  FiChevronRight,
  FiRepeat,
  FiShuffle,
} from "react-icons/fi";
import DiskSong from "../DiskSong";
import IndicatorSong from "../IndicatorSong";
import SongName from "../SongName";
import Song from "../Song";
import useInterval from "../../hooks/useInterval";
import { listSong } from "../../libs/ListSong";
import { shuffle } from "../../helpers/shuffle";
import { generateSrc } from "../../helpers/generateSrc";

const Player = () => {
  const player = useRef();
  const [playlist, setPlaylist] = useState(listSong);
  const [src, setSrc] = useState(generateSrc(listSong));
  const [isPlay, setIsPlay] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [currentIndexSong, setCurrentIndexSong] = useState(0);
  const [currentSong, setCurrentSong] = useState(src[currentIndexSong]);
  const [maxTime, setMaxTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeek, setIsSeek] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);

  const handlePlaySong = () => {
    setIsPlay(() => !isPlay);
  };

  const handlePrevSong = () => {
    player.current.stop();
    let index = currentIndexSong;
    index = Number(index) === 0 ? Number(src.length - 1) : index - 1;
    setCurrentIndexSong(() => index);
    setCurrentSong(() => src[index]);
    setName(() => playlist[index].name);
    setImage(() => playlist[index].image);
    setMaxTime(() => 0)
    player.current.play();
  };

  const handleNextSong = () => {
    player.current.stop();
    let index = currentIndexSong;
    index =
      Number(currentIndexSong) === Number(src.length - 1)
        ? 0
        : currentIndexSong + 1;
    setCurrentIndexSong(() => index);
    setCurrentSong(() => src[index]);
    setName(() => playlist[index].name);
    setImage(() => playlist[index].image);
    setMaxTime(() => 0)
    player.current.play();
  };

  const handleIndicatorMouseUp = (e) => {
    setIsSeek(() => false);
    const time = e.target.value;
    player.current.seek(time);
    setCurrentTime(() => Math.round(time));
  };

  const handleIndicatorMouseDown = (e) => {
    setIsSeek(() => true);
  };

  const handleLoop = () => {
    setIsLoop(() => !isLoop);
  };

  const handleShuffle = () => {
    setIsShuffle(() => !isShuffle);
  };

  useEffect(() => {
    if (isShuffle) {
      const newList = shuffle([...listSong]);
      setPlaylist(() => newList);
      setSrc(() => generateSrc(newList));
      return;
    }
    setPlaylist(() => listSong);
    setSrc(() => generateSrc(listSong));
  }, [isShuffle]);

  const handlePlaylist = () => {
    setIsOpenList(() => !isOpenList);
  };

  const handleSelectSong = (index) => {
    player.current.stop();
    setMaxTime(() => 0)
    setCurrentIndexSong(() => index);
    setCurrentSong(() => src[index]);
    setName(() => playlist[index].name);
    setImage(() => playlist[index].image);
    setCurrentTime(() => 0);
    player.current.play();
    setIsOpenList(() => false);
  };

  const onPlay = () => {
    setMaxTime(() => Math.round(player.current._howler._duration));
    setIsReset(() => false);
  };
  const onPause = () => {};
  const onStop = () => {
    setIsReset(() => true);
  };
  const onSeek = () => {};
  const onEnd = () => {
    if (player.current.props.loop) {
      setCurrentTime(() => 0);
      return;
    }
    handleNextSong();
  };
  const onLoad = () => {
    let index = currentIndexSong;
    setCurrentTime(() => 0);
    setMaxTime(() => Math.round(player.current._howler._duration));
    setName(() => playlist[index].name);
    setImage(() => playlist[index].image);
    setIsReset(() => true);
  };

  useInterval(
    () => {
      setCurrentTime(() => currentTime + 1);
    },
    !isSeek && isPlay ? 1000 : null
  );

  return (
    <div className="player-container">
      <div className="player">
        <header className="player-header">
          {name && <SongName name={name} isReset={isReset} />}
          <ButtonNeumor
            width={48}
            height={48}
            customClass={`song-list ${isOpenList ? "active" : ""} `}
            onClick={handlePlaylist}
          >
            <FiMusic
              fontSize="1.25rem"
              className={`${isReset ? "" : "rotate-animate"} ${
                isPlay ? "running" : "paused"
              }`}
            />
          </ButtonNeumor>
        </header>
        <section className="player-section">
          <DiskSong isPlay={isPlay} thumbnail={image} isReset={isReset} />
        </section>
        <section className="player-section">
          <IndicatorSong
            isPlay={isPlay}
            currentTime={currentTime}
            maxTime={maxTime}
            onMouseUp={handleIndicatorMouseUp}
            onMouseDown={handleIndicatorMouseDown}
          />
        </section>
        <footer className="player-footer">
          <ButtonNeumor
            width={24}
            height={24}
            customClass={`button-options loop ${isLoop ? "active" : ""}`}
            onClick={handleLoop}
          >
            <FiRepeat fontSize="0.5rem" />
          </ButtonNeumor>
          <div className="song-control">
            <ButtonNeumor
              customClass="button-control prev"
              onClick={handlePrevSong}
            >
              <FiChevronLeft fontSize="1.25rem" />
            </ButtonNeumor>
            <ButtonNeumor
              width={60}
              height={60}
              customClass={`button-control play ${isPlay ? "active" : ""}`}
              onClick={handlePlaySong}
            >
              {isPlay ? (
                <FiPause fontSize="1.5rem" />
              ) : (
                <FiPlay fontSize="1.5rem" />
              )}
            </ButtonNeumor>
            <ButtonNeumor
              customClass="button-control next"
              onClick={handleNextSong}
            >
              <FiChevronRight fontSize="1.25rem" />
            </ButtonNeumor>
          </div>
          <ButtonNeumor
            width={24}
            height={24}
            customClass={`button-options shuffle ${isShuffle ? "active" : ""}`}
            onClick={handleShuffle}
          >
            <FiShuffle fontSize="0.5rem" />
          </ButtonNeumor>
        </footer>
        <section className={`playlist ${isOpenList ? "active" : ""}`}>
          <ul className={`list ${isOpenList ? "active" : ""}`}>
            {playlist.map((song, index) => (
              <li
                className="item"
                key={`${song.name}_${index}`}
                onClick={() => handleSelectSong(index)}
              >
                <Song name={song.name} index={index} />
              </li>
            ))}
          </ul>
        </section>
        <ReactHowler
          src={currentSong}
          playing={isPlay}
          html5={false}
          ref={player}
          loop={isLoop}
          onPlay={onPlay}
          onPause={onPause}
          onLoad={onLoad}
          onStop={onStop}
          onSeek={onSeek}
          onEnd={onEnd}
        />
      </div>
    </div>
  );
};

export default Player;
