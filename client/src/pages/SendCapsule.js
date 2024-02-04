import React, { useState } from 'react';
import '../styles/style-sendcapsule.css';
import CapsuleTop from '../assets/sendcapsule_top.svg';
import CapsuleBottom from '../assets/sendcapsule_bottom.svg';

const SendCapsule = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationEnd = () => {
    // 애니메이션이 끝나면 상태를 업데이트하여 끝을 표시
    setAnimationComplete(true);
  };

  return (
    <div className={`sendcapsule ${animationComplete ? 'hidden' : ''}`}>
      <div className="capsule-image">
        <img
          src={CapsuleTop}
          alt="캡슐 뚜껑"
          className={`capsule-lid ${animationComplete ? 'go' : ''}`}
        />
        <img src={CapsuleBottom} alt="캡슐 몸통" />
      </div>

      <div className="container">
        <svg onAnimationEnd={handleAnimationEnd}>
          {/* You may include any SVG animations or elements here */}
        </svg>
        {animationComplete && <p>전송을 완료했습니다!</p>}
      </div>
    </div>
  );
};

export default SendCapsule;