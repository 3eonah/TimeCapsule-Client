import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { school, europe, cat1, slidingbutton, musicon, musicoff } from '../assets/index.js';
import '../styles/style-capsuledetail.css';

const CapsuleDetail = () => {
  const commonData = {
    from: '투게더',
    date: '2024.01.01',
    songTitle: 'Charlie Puth - Left And Right (feat. 정국 of BTS)',
    videoId: "NcTcNuoVYso", 
  };

  const dataFromBackend = [
    {
      imageUrl: school,
      content: "역대급 힘들었던 시험기간..💀 그나마 너랑 같이 밤샘하고 야식먹으면서 버텼다~",
    },
    {
      imageUrl: europe,
      content: "너랑 유럽으로 여행가서 스테이크 먹고 쇼핑했던 기억난다~~ 다음에 또가자 ~~ 나 요즘 여행갔던 추억으로 살아간다!!",
    },
   
  ];

  const sliderRef = useRef(null);
  const [currentVideoId, setCurrentVideoId] = useState(commonData.videoId);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
    const currentSlide = sliderRef.current.innerSlider.state.currentSlide;
    setCurrentVideoId(commonData.videoId); // 공통 videoId 사용
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 0, // 컨트롤러를 숨기도록 설정
    },
  };

  const videoStyle = {
    display: 'none', // 영상을 숨김
  };

  return (
    <div className="App">
      <Slider ref={sliderRef} {...settings}>
        {dataFromBackend.map((data, index) => (
          <div key={index} className="slide-container">
            <img
              src={data.imageUrl}
              alt={`이미지 ${index + 1}`}
              className="slide-image"
            />
            <div className="slide-text">
              <div className="info-container">
                <p className="from">{commonData.from}</p>
                <p className="date">{commonData.date}</p>
              </div>
              <p className="song-title">{commonData.songTitle}</p>
              <p className="content">{data.content}</p>
            </div>
          </div>
        ))}
      </Slider>
      <img
        src={slidingbutton}
        alt="슬라이딩 버튼"
        className="sliding-button"
        onClick={goToNextSlide}
      />
      <div style={videoStyle}>
        <YouTube videoId={currentVideoId} opts={opts} />
      </div>
    </div>
  );
};

export default CapsuleDetail;