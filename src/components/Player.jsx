import React, { useContext } from 'react';
import { assets, songsData } from '../assets/assets';
import { PlayerContext } from './Context/PlayerContext';

const Player = () => {
    const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } = useContext(PlayerContext);

    const formatTime = (time) => {
        const minutes = String(time.minute).padStart(2, '0');
        const seconds = String(time.second).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className='h-[10%] bg-black fixed bottom-0 w-full flex justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={track.image || assets.default_track_image} alt="Track" />
                <div>
                    <p>{track.name || 'Unknown Track'}</p>
                    <p>{track.desc?.slice(0, 12) || 'No description'}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="Shuffle" />
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="Previous" />
                    {playStatus
                        ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="Pause" />
                        : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="Play" />
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="Next" />
                    <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="Loop" />
                </div>
                <div className='flex items-center gap-5'>
                    <p>{formatTime(time.currentTime)}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-20 bg-green-800 rounded-full' />
                    </div>
                    <p>{formatTime(time.totalTime)}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img className='w-4' src={assets.play_icon} alt="Play" />
                <img className='w-4' src={assets.mic_icon} alt="Mic" />
                <img className='w-4' src={assets.queue_icon} alt="Queue" />
                <img className='w-4' src={assets.speaker_icon} alt="Speaker" />
                <img className='w-4' src={assets.volume_icon} alt="Volume" />
                <div className='w-20 bg-slate-50 h-1 rounded'></div>
                <img className='w-4' src={assets.mini_player_icon} alt="Mini Player" />
                <img className='w-4' src={assets.zoom_icon} alt="Zoom" />
            </div>
        </div>
    );
}

export default Player;
