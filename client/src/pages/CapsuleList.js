import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/index.js';
import { cp_retro, cp_main ,cp_retro_open, cp_main_open, } from '../assets/index.js';

const CapsuleList = () => {
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [componentData, setComponentData] = useState([]);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setComponentData([
      { name: '솔룩스', label: 'cp_retro_open', image: cp_retro_open },
      { name: 'SY', label: 'cp_main_open', image: cp_main_open },
    ]);
  };

  const handleUnconfirm = () => {
    setIsConfirmed(false);
    setComponentData([
      { name: 'YS', label: 'cp_retro', image: cp_retro },
      { name: '타임캡슐', label: 'cp_main', image: cp_main },
    ]);
  };

  const handleCapsuleClick = (index) => {
    const clickedCapsule = componentData[index];

    // 이미 확인한 캡슐에 추가
    setComponentData((prevData) => [...prevData, clickedCapsule]);

    // 확인하지 않은 캡슐에서 제거
    const updatedData = componentData.filter((item, idx) => idx !== index);
    setComponentData(updatedData);

    // 페이지 이동
    navigate('/capsuledetail');
  };

  useEffect(() => {
    // 초기에 확인한 목록으로 설정
    handleConfirm();
  }, []);

  return (
    <div className="container">
      <div className="all" style={{ marginBottom: '20px' }}>
        <h2> 캡슐 전체보기 </h2>
      </div>
      <div className="row-div" style={{ justifyContent: 'space-between', marginBottom: '10px', padding: '0 20px' }}>
        <BasicButton onClick={handleConfirm} buttonWidth="100%" fontSize="1rem">
          <p>확인한 캡슐</p>
        </BasicButton>
        <BasicButton onClick={handleUnconfirm} buttonWidth="100%" fontSize="1rem">
          <p>확인하지 않은 캡슐</p>
        </BasicButton>
      </div>
      <div className="components-container">
        {componentData.map((component, index) => (
          <div
            key={index}
            className={`${component.name}-box link-style`}
            onClick={() => handleCapsuleClick(index)}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.23)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5.4px)',
              WebkitBackdropFilter: 'blur(5.4px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              width: '160px',
              margin: '25px',
              height: '188px',
              cursor: 'pointer',
            }}
          >
            <img src={component.image} alt={component.label} />
            <p style={{ position: 'absolute', bottom: '-30px' }}>{component.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CapsuleList;




