import React from 'react';

const useScreenSize = () => {
  const setScreenSize = () => {
    // window.innerHeight는 실제 보이는 영역의 높이값, innerHeight를 100으로 나누면 1vh
    let vh = window.innerHeight * 0.01;
    // 속성을 --vh로 정의
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  return { setScreenSize };
};

export default useScreenSize;
