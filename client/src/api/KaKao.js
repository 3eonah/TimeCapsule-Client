import axios from 'axios';
import React, { useEffect } from 'react';

export const kakao_auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
export const handleKakKaoLogin = () => {
  return (window.location.href = kakao_auth_url);
};

// 인가코드
let access_code = '';

const KaKao = (props) => {
  useEffect(() => {
    access_code = new URL(window.location.href).searchParams.get('code');
  }, []);

  return <div></div>;
};

export default KaKao;
