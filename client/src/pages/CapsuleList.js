import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/index.js';
import { cp_retro, cp_main, cp_newyear, cp_retro_open, cp_main_open, cp_newyear_open } from '../assets/index.js';
import '../styles/style-capsule.css';

const CapsuleList = () => {
  const navigate = useNavigate();
  const [commonData, setCommonData] = useState([
    {
      name: 'YS',
      theme: 'newyear',
      ischecked: false,
    },
    {
      name: 'SY',
      theme: 'retro',
      ischecked: false,
    },
    {
      name: '솔룩스',
      theme: 'main',
      ischecked: false,
    },
    {
      name: '타임캡슐',
      theme: 'main',
      ischecked: true,
    }
  ]);

  const getImage = (theme, ischecked) => {
    if (theme === 'retro' && ischecked) {
      return cp_retro_open;
    } else if (theme === 'retro') {
      return cp_retro;
    } else if (theme === 'main' && ischecked) {
      return cp_main_open;
    } else if (theme === 'main') {
      return cp_main;
    } else if (theme === 'newyear' && ischecked) {
      return cp_newyear_open;
    } else if (theme === 'newyear') {
      return cp_newyear;
    }
    return cp_retro;
  };

  // row와 col 인덱스를 활용하여 실제 데이터의 인덱스를 계산
  const calculateDataIndex = (rowIndex, colIndex) => {
    return rowIndex * 2 + colIndex;
  };

  const handleButtonClick = (rowIndex, colIndex) => {
    const dataIndex = calculateDataIndex(rowIndex, colIndex);
    const updatedCommonData = [...commonData];

    // false 일 때만 true로 변경
    if (!updatedCommonData[dataIndex].ischecked) {
      updatedCommonData[dataIndex].ischecked = true;
    }

    // 토글 상태 확인
    console.log(`토글 상태(${dataIndex}): ${updatedCommonData[dataIndex].ischecked}`);

    setCommonData(updatedCommonData);
    // 페이지 이동
    navigate('/capsuledetail');
  };

  const handleCapsuleClick = (isChecked) => {
    // 이 함수에서는 isChecked 값을 받아와서 해당 값에 따라 visibleData를 설정
    const visibleData = commonData.filter((data) => isChecked ? data.ischecked : !data.ischecked);
    
  
    console.log(`${isChecked ? '확인한' : '확인하지 않은'} 캡슐 보기`);
    console.log(visibleData);
  };

  const splitArrayIntoPairs = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // visibleData를 사용하여 데이터를 필터링한 후 사용
  const visibleData = commonData.filter((data) => data.ischecked);
  const pairedData = splitArrayIntoPairs(visibleData, 2);

  return (
    <div className="container" style={{ overflowY: 'scroll' }}>
      <div className="all" style={{ marginBottom: '20px' }}>
        <h2>캡슐 전체보기</h2>
      </div>
      <div className="row-div">
        <BasicButton buttonWidth="150%" fontSize="1rem" onClick={() => handleCapsuleClick(true)}>
          <p>확인한 캡슐</p>
        </BasicButton>
        <div style={{ margin: '0 10px' }}></div>
        <BasicButton buttonWidth="150%" fontSize="1rem" onClick={() => handleCapsuleClick(false)}>
          <p>확인하지 않은 캡슐</p>
        </BasicButton>
      </div>
      {pairedData.map((pair, rowIndex) => (
        <div key={rowIndex} className="row-div">
          {pair.map((data, colIndex) => (
            <div key={colIndex}>
              <BasicButton onClick={() => handleButtonClick(rowIndex, colIndex)}>
                <img src={getImage(data.theme, data.ischecked)} alt="Capsule Image" />
              </BasicButton>
              <p style={{ textAlign: 'center' }}>{data.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;







