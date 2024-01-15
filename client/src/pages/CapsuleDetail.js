import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { school, europe, cat1,slidingbutton } from '../assets/index.js';
import '../styles/style-capsuledetail.css';


const CapsuleDetail = () => {
  const dataFromBackend = [
    {
      imageUrl: school,
      from: '투게더',
      date: '2024.01.01',
      content: "역대급 힘들었던 시험기간..💀 그나마 너랑 같이 밤샘하고 야식먹으면서 버텼다~",
    },
    {
      imageUrl: europe,
      from: '투게더',
      date: '2024.01.01',
      content: "너랑 유럽으로 여행가서 스테이크 먹고 쇼핑했던 기억난다~~ 다음에 또가자 ~~ 나 요즘 여행갔던 추억으로 살아간다!!",
    },
    {
      imageUrl: cat1,
      from: '투게더',
      date: '2024.01.01',
      content: '너가 좋아했던 우리집 고양이 사진 같이 보낸다~~',
    },
  ];

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
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
              <p>전달한 분: {data.from}</p>
              <p>작성일: {data.date}</p>
              <p>{data.content}</p>
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
    </div>
  );
};

export default CapsuleDetail;







