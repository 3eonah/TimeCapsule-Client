import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import '../styles/style-insertmusic.css';
import { useSelector } from 'react-redux';
import capsule from '../redux/modules/capsule';

const ControlIframe = ({ handleMusicUrl }) => {
  const existingState = useSelector((state) => state.capsule.capsule.music);
  const [link, setLink] = useState('');
  const [vidId, setVidId] = useState(existingState);
  const [isPlayerReady, setPlayerReady] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const videoIdMatch = link.match(
        /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([^"&?\/\s]{11})/
      );
      if (videoIdMatch) {
        setVidId(videoIdMatch[1]);
        handleMusicUrl(videoIdMatch[1]);
      }
    }
  };

  const onPlayerReady = () => {
    // 플레이어가 준비되면 isPlayerReady를 true로 설정
    setPlayerReady(true);
  };

  useEffect(() => {
    if (existingState) {
      // existingState가 존재하면 link 설정
      setLink(`https://www.youtube.com/watch?v=${existingState}`);
    } else {
      setLink('');
    }
  }, [existingState]);

  return (
    <div className="vid-div">
      <div className="link-div">
        <p>링크를 입력한 후 엔터를 눌러주세요</p>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        ></input>
      </div>
      <YouTube
        videoId={vidId}
        opts={{ width: '311px', height: '219px' }}
        onReady={onPlayerReady}
      />
    </div>
  );
};

export default ControlIframe;
