import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../components/index.js';
import {
  cp_retro,
  cp_main,
  cp_newyear,
  cp_retro_open,
  cp_main_open,
  cp_newyear_open,
} from '../assets/index.js';
import '../styles/style-capsule.css';
import { useSelector } from 'react-redux';

const CapsuleList = () => {
  const navigate = useNavigate();
  // const [commonData, setCommonData] = useState([
  //   {
  //     name: 'YS',
  //     theme: 'newyear',
  //     ischecked: false,
  //   },
  //   {
  //     name: 'SY',
  //     theme: 'retro',
  //     ischecked: false,
  //   },
  //   {
  //     name: '솔룩스',
  //     theme: 'main',
  //     ischecked: false,
  //   },
  //   {
  //     name: '투게더',
  //     theme: 'main',
  //     ischecked: true,
  //   },
  //   {
  //     name: '영서',
  //     theme: 'retro',
  //     ischecked: true,
  //   },
  //   {
  //     name: '선아',
  //     theme: 'newyear',
  //     ischecked: true,
  //   },
  //   {
  //     name: '소연',
  //     theme: 'retro',
  //     ischecked: true,
  //   },
  //   {
  //     name: '승연',
  //     theme: 'main',
  //     ischecked: true,
  //   },
  //   {
  //     name: '민진',
  //     theme: 'newyear',
  //     ischecked: true,
  //   },
  //   {
  //     name: '채민',
  //     theme: 'main',
  //     ischecked: true,
  //   },
  // ]);

  // redux에서 capsules 데이터 가져옴
  const { capsules } = useSelector((state) => state.user);

  const getImage = (theme, ischecked) => {
    if (theme === 'retro' && ischecked) {
      return cp_retro_open;
    } else if (theme === 'retro') {
      return cp_retro;
    } else if (theme === 'default' && ischecked) {
      return cp_main_open;
    } else if (theme === 'default') {
      return cp_main;
    } else if (theme === 'newyear' && ischecked) {
      return cp_newyear_open;
    } else if (theme === 'newyear') {
      return cp_newyear;
    }
    return cp_retro;
  };

  // 초기 화면은 확인하지 않은 캡슐들이 보이게 설정
  const [visibleData, setVisibleData] = useState(
    capsules ? capsules.filter((data) => !data.isChecked) : []
  );
  //2열로 정렬
  const calculateDataIndex = (rowIndex, colIndex) => {
    return rowIndex * 2 + colIndex;
  };

  //확인하지 않은 캡슐을 누르면 확인한 캡슐로 변경됨 ( ischecked false가 true로 변경 )
  const handleButtonClick = (rowIndex, colIndex) => {
    const dataIndex = calculateDataIndex(rowIndex, colIndex);
    // const updatedCommonData = [...commonData];

    // false 일 때만 true로 변경
    // if (!updatedCommonData[dataIndex].ischecked) {
    //   updatedCommonData[dataIndex].ischecked = true;
    // }

    // 토글 상태 확인
    //console.log(`토글 상태(${dataIndex}): ${updatedCommonData[dataIndex].ischecked}`);

    // setCommonData(updatedCommonData);
    // 페이지 이동
    navigate('/capsuledetail');
  };

  // 확인핸캡슐 버튼을 누르면 확인한 캡슐만 보이게, 확인하지 않은 캡슐 버튼을 누르면  확인하지 않은 캡슐만 보이게
  const handleCapsuleClick = (isChecked) => {
    const updatedVisibleData = capsules.filter((data) =>
      isChecked ? data.isChecked : !data.isChecked
    );
    setVisibleData(updatedVisibleData);

    console.log(`${isChecked ? '확인한' : '확인하지 않은'} 캡슐 보기`);
    console.log(updatedVisibleData);

    return updatedVisibleData;
  };

  const splitArrayIntoPairs = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const pairedData = splitArrayIntoPairs(visibleData, 2);

  return (
    <div className="cs-container" style={{ overflowY: 'scroll' }}>
      <div className="cs-all" style={{ marginBottom: '20px' }}>
        <h2>캡슐 전체보기</h2>
      </div>
      <div className="cs-row-div" style={{ marginBottom: '20px' }}>
        <BasicButton
          buttonWidth="250%"
          fontSize="0.9rem"
          onClick={() => handleCapsuleClick(false)}
        >
          <p>확인하지 않은 캡슐</p>
        </BasicButton>
        <div style={{ margin: '0 10px' }}></div>
        <BasicButton
          buttonWidth="250%"
          fontSize="0.9rem"
          onClick={() => handleCapsuleClick(true)}
        >
          <p>확인한 캡슐</p>
        </BasicButton>
      </div>
      {pairedData.map((pair, rowIndex) => (
        <div
          key={rowIndex}
          className="cs-row-div"
          style={{ marginBottom: '10px' }}
        >
          {pair.map((data, colIndex) => (
            <div key={colIndex}>
              <BasicButton
                buttonWidth="168px"
                verticalPadding="13px"
                onClick={() => handleButtonClick(rowIndex, colIndex)}
              >
                <img
                  src={getImage(data.theme, data.isChecked)}
                  alt="Capsule Image"
                />
              </BasicButton>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  marginTop: '10px',
                }}
              >
                {data.writer}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;
