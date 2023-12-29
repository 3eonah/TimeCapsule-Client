import React, { useEffect, useState } from 'react';
import { BasicButton, ControlIframe } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { update_music } from '../redux/modules/capsule';
import { useNavigate } from 'react-router-dom';
const InsertMusic = () => {
  const [vidId, setVidId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVidId = (vidId) => {
    setVidId(vidId);
  };

  return (
    <div className="container">
      <h2>새로운 캡슐 보내기</h2>
      <p style={{ fontSize: '1rem', margin: '2rem 0', textAlign: 'center' }}>
        삽입할 음악의 <br /> YouTube 링크를 입력해주세요
      </p>
      <ControlIframe handleMusicUrl={handleVidId} />

      <BasicButton
        buttonWidth="311px"
        verticalPadding="1.25rem"
        fontSize="1.25rem"
        onClick={() => {
          dispatch(update_music(vidId));
          navigate('/create/addedlist');
        }}
      >
        음악 삽입하기
      </BasicButton>
    </div>
  );
};

export default InsertMusic;
