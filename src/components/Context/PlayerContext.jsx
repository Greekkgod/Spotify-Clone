import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  // Define refs
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // State variables
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // Function to play audio
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Function to pause audio
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Function to play a song by ID
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  // Function to play the previous track
  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to play the next track
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Function to seek the song position
  const seekSong = async (e) => {
    const newTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  // Effect to update the seek bar and time
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";

        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }
  }, [audioRef]);

  // Create the context value object
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
