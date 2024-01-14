// OnBoarding.js
import React, { useEffect, useState } from 'react';
import '../styles/style-onboarding.css';
import { big_capsule, ic_kakao } from '../assets';
import { BasicButton } from '../components';
import { handleKakKaoLogin } from '../api/KaKao';
import axios from 'axios';

const OnBoarding = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState('');

  const handleChange = (e) => {
    setNewData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000', { message: newData }); // 수정: 서버의 실제 엔드포인트로 변경
      fetchData();
      setNewData('');
      console.log(newData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000'); // 수정: 서버의 실제 엔드포인트로 변경
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  
  return (
    <div className="container">
      <div id="capsule_area">
        <img src={big_capsule} alt="logo" />
      </div>
      <div className="title-area">
        <p>과거에서 온 편지</p>
        <BasicButton onClick={handleKakKaoLogin}>
          <img src={ic_kakao} alt="kakao" />
          <div>카카오톡으로 시작하기</div>
        </BasicButton>
      </div>
      {/* node 연습 */}
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={newData} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default OnBoarding;

