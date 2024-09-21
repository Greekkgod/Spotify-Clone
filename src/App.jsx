import React, { useContext } from 'react';
import Slidebar from './components/Slidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './components/Context/PlayerContext'; // Ensure correct import

const App = () => {
  // Access the audioRef from PlayerContext
  const { audioRef,track } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Slidebar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  );
};

export default App;  