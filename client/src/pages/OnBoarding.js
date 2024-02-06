// OnBoarding.js
import React, { useEffect, useState } from 'react';
import '../styles/style-onboarding.css';
import { big_capsule, ic_kakao } from '../assets';
import { BasicButton } from '../components';
import { handleKakKaoLogin } from '../api/KaKao';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/modules/user';
import { reset_capsule } from '../redux/modules/capsule';

const OnBoarding = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(reset_capsule());
  });
  return (
    <div className="onboarding-container">
      <div id="capsule_area">
        <img src={big_capsule} alt="logo" />
      </div>
      <div className="title-area">
        <div className="contents">
          <p>과거에서 온 편지</p>
          <BasicButton onClick={handleKakKaoLogin}>
            <img src={ic_kakao} alt="kakao" />
            <div>카카오톡으로 시작하기</div>
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
