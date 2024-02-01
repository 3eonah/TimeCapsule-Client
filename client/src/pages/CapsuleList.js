import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton ,Capsules} from '../components/index.js';
import {
  cp_retro,
  cp_main,
  cp_newyear,
  cp_retro_open,
  cp_main_open,
  cp_newyear_open,
} from '../assets/index.js';
import '../styles/style-capsule.css';
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';
import { put_check, update_check } from '../redux/modules/user.js';



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
  const { capsules, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const CapsuleButton = ({ theme, isChecked, writer, onClick }) => {
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

    return (
      <div>
        <Capsules
          buttonWidth="168px"
          verticalPadding="13px"
          onClick={onClick}
        >
          <img
            src={isChecked ? getImage(theme, true) : getImage(theme, false)}
            alt="Capsule Image"
          />
        </Capsules>
        <p
          style={{
            textAlign: 'center',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >
          {writer}
        </p>
      </div>
    );
  };

  

  // 초기 화면은 확인하지 않은 캡슐들이 보이게 설정
  const currentDate = new Date();
  const [visibleData, setVisibleData] = useState(
    capsules
      ? capsules.filter(
          // 현재 날짜보다 arrivaldate가 이전 날짜이고 isChecked가 false인 경우
          (data) => !data.isChecked && new Date(data.arrivaldate) < currentDate
        )
      : []
  );
  //2열로 정렬
  const calculateDataIndex = (rowIndex, colIndex) => {
    return rowIndex * 2 + colIndex;
    
  };



  //확인하지 않은 캡슐을 누르면 확인한 캡슐로 변경됨 ( ischecked false가 true로 변경 )
  const handleButtonClick = (rowIndex, colIndex, capsuleId) => {
    const dataIndex = calculateDataIndex(rowIndex, colIndex);
    // const updatedCommonData = [...commonData];

    // false 일 때만 true로 변경
    // if (!updatedCommonData[dataIndex].ischecked) {
    //   updatedCommonData[dataIndex].ischecked = true;
    // }

    // 토글 상태 확인
    //console.log(`토글 상태(${dataIndex}): ${updatedCommonData[dataIndex].ischecked}`);

    // setCommonData(updatedCommonData);

    dispatch(put_check(token, capsuleId)); // put request to server
    // 페이지 이동
    navigate('/capsuledetail', { state: { capsuleId: capsuleId } });
  };

  // 확인핸캡슐 버튼을 누르면 확인한 캡슐만 보이게, 확인하지 않은 캡슐 버튼을 누르면  확인하지 않은 캡슐만 보이게
  const handleCapsuleClick = (isChecked = false) => {
    const updatedVisibleData = capsules.filter((data) =>
      isChecked ? data.isChecked : !data.isChecked
    );
    setVisibleData(updatedVisibleData);

    console.log(`${isChecked ? '확인한' : '확인하지 않은'} 캡슐 보기`);
    console.log(updatedVisibleData);

    return updatedVisibleData;
  };

  useEffect(() => {
    handleCapsuleClick(false); // 초기에 확인하지 않은 캡슐을 누른 것으로 설정
  }, [capsules]);
  

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
            <CapsuleButton
              key={colIndex}
              theme={data.theme}
              isChecked={data.isChecked}
              writer={data.writer}
              onClick={() => handleButtonClick(rowIndex, colIndex, data.id)}
            />

          ))}
        </div>
      ))}
    </div>
  );
};

export default CapsuleList;