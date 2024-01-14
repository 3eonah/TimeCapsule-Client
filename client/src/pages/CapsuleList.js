import '../styles/style-capsule.css';
import { BasicButton } from '../components/index.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cp_retro, cp_main, cp_retro_open, cp_main_open } from '../assets/index.js';

const CapsuleList = () => {
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [componentData, setComponentData] = useState([]);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setComponentData([
      { name: '솔룩스', label: 'cp_retro', image: 'cp_retro' },
      { name: 'SY', label: 'cp_main', image: 'cp_main.svg' },
    ]);
  };

  const handleUnconfirm = () => {
    setIsConfirmed(false);
    setComponentData([
      { name: 'YS', label: 'cp_retro', image: 'cp_retro.svg' },
      { name: '타임캡슐', label: 'cp_main', image: 'cp_main.svg' },
      { name: '솔룩스', label: 'cp_retro', image: 'cp_retro' },
    ]);
  };

  const handleCapsuleClick = (index) => {
    navigate('/capsuledetail');
  };

  useEffect(() => {
    handleConfirm();
  }, []);

  const renderComponents = () => {
    const componentsPerRow = 2; 
    const rows = Math.ceil(componentData.length / componentsPerRow);
  
    return (
      <div
        className="components-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '15px', 
        }}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: componentsPerRow }).map((_, colIndex) => {
              const index = rowIndex * componentsPerRow + colIndex;
              if (index < componentData.length) {
                const component = componentData[index];
                return (
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
                    <img src={cp_retro} alt={component.label} />
                    <p
                      style={{
                        position: 'absolute',
                        bottom: '-30px',
                      }}
                    >
                      {component.name}
                    </p>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </React.Fragment>
        ))}
      </div>
    );
  };
  

  return (
    <div className="container">
      <div className="all"style={{ marginBottom: '20px' }}>
        <h2> 캡슐 전체보기 </h2>
      </div>
      <div className="row-div" style={{ justifyContent: 'space-between', marginBottom: '10px', padding: '0 20px' }}>
        <BasicButton onClick={handleConfirm} buttonWidth="45%" fontSize="1rem" >
        <p>확인한 캡슐</p>
        </BasicButton>
        <BasicButton onClick={handleUnconfirm} buttonWidth="45%" fontSize="1rem">
        <p>확인하지 않은 캡슐</p>
        </BasicButton>
      </div>
      <div className="components-container">
        {renderComponents()}
      </div>
    </div>
  );
};


export default CapsuleList;


