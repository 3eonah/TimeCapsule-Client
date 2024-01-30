import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  school,
  europe,
  slidingbutton,
  musicon,
  musicoff,
} from '../assets/index.js';
import '../styles/style-capsuledetail.css';
import { BasicButton } from '../components/index.js';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CapsuleDetail = () => {
  // const commonData = {
  //   from: '투게더',
  //   date: '2024.01.01',
  //   songTitle: 'Charlie Puth - Left And Right (feat. 정국 of BTS)',
  //   videoId: 'NcTcNuoVYso',
  // };

  // const dataFromBackend = [
  //   {
  //     imageUrl: school,
  //     content:
  //       '역대급 힘들었던 시험기간..💀 그나마 너랑 같이 밤샘하고 야식먹으면서 버텼다~',
  //   },
  //   {
  //     imageUrl: europe,
  //     content:
  //       '너랑 유럽으로 여행가서 스테이크 먹고 쇼핑했던 기억난다~~ 다음에 또가자 ~~ 나 요즘 여행갔던 추억으로 살아간다!!',
  //   },
  // ];

  // redux
  const location = useLocation();
  const capsuleId = location.state.capsuleId;
  const { capsules } = useSelector((state) => state.user);
  const foundCapsule = capsules.find((capsule) => capsule.id === capsuleId);

  const sliderRef = useRef(null);
  const playerRef = useRef(null);
  const [currentVideoId, setCurrentVideoId] = useState(foundCapsule.music);
  const [isMuted, setIsMuted] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
    const currentSlide = sliderRef.current.innerSlider.state.currentSlide;
    setCurrentVideoId(foundCapsule.music); // 공통 videoId 사용
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  const videoStyle = {
    display: 'none', // 영상을 숨김
  };

  const unmuteVideo = () => {
    if (playerRef.current) {
      playerRef.current.unMute();
    }
    setIsMuted(false);
  };

  const muteVideo = () => {
    if (playerRef.current) {
      playerRef.current.mute();
    }
    setCurrentVideoId(foundCapsule.music); // Set to the common video ID
    setIsMuted(true);
  };

  useEffect(() => {
    console.log(foundCapsule);
  }, []);

  return (
    <div className="cd-App">
      <Slider ref={sliderRef} {...settings}>
        {foundCapsule.cards.map((data, index) => (
          <div key={index} className="cd-slide-container">
            <img
              src={data.image}
              alt={`이미지 ${index + 1}`}
              className="cd-slide-image"
            />
            <div className="cd-slide-text">
              <div className="cd-info-container">
                <p className="cd-from">
                  <span>전달한 분 </span> <br /> {foundCapsule.writer}
                </p>
                <p className="cd-date">
                  <span>작성일 </span> <br />
                  {foundCapsule.writtendate}
                </p>
              </div>
              <div className="cd-button-container">
                <BasicButton onClick={unmuteVideo}>
                  <img src={musicon} alt="음소거 해제" />
                </BasicButton>
                <BasicButton onClick={muteVideo}>
                  <img src={musicoff} alt="음소거 하기" />
                </BasicButton>
                {/* TODO: videoId 로 동영상 제목 가져올 수 있나요? */}
                <p className="cd-song-title">{}</p>
              </div>
              <p className="cd-content">{data.text}</p>
            </div>
          </div>
        ))}
      </Slider>
      <img
        src={slidingbutton}
        alt="슬라이딩 버튼"
        className="cd-sliding-button"
        onClick={goToNextSlide}
      />
      <div style={videoStyle}>
        <YouTube
          videoId={currentVideoId}
          opts={opts}
          onReady={(e) => (playerRef.current = e.target)}
        />
      </div>
    </div>
  );
};

export default CapsuleDetail;
