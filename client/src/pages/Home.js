import React, { useEffect, useRef, useState } from 'react';
import '../styles/style-home.css';
import { capsule, cap_shadow, ic_list, ic_addpost } from '../assets/index.js';
import { BasicButton } from '../components/index.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { count_unchecked, post_user } from '../redux/modules/user.js';

const Home = () => {
  const navigate = useNavigate();

  const countRef = useRef();

  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(count_unchecked());
    if (countRef.current && userInfo.uncheckedCount === 1) {
      countRef.current.style.paddingRight = '1rem';
    } else {
      countRef.current.style.paddingRight = '0rem';
    }
  }, [userInfo.uncheckedCount]);

  // Check if userInfo is available before rendering
  if (userInfo) {
    return (
      <div className="home-container">
        <div className="greeting">
          <h2>안녕하세요,</h2>
          <h2>
            {/* <span>{userInfo.name}</span>&nbsp;님 */}
            <span>이선아</span>&nbsp;님
          </h2>
        </div>
        <div className="cap-div">
          <div className="cap-txt-area">
            <p>도착한 캡슐</p>
            <p ref={countRef}>{userInfo.uncheckedCount}</p>
          </div>
          <img src={capsule} />
          <img src={cap_shadow} id="shadow" />
        </div>
        <div className="btn-row-div">
          <BasicButton onClick={() => navigate('/capsulelist')}>
            <img src={ic_list} className="ic"></img>
            <p>전체보기</p>
          </BasicButton>
          <BasicButton onClick={() => navigate('/create')}>
            <img src={ic_addpost} className="ic"></img>
            <p>새로운 캡슐 전송</p>
          </BasicButton>
        </div>
      </div>
    );
  } else {
    return <div>로딩중...</div>;
  }
};

export default Home;
