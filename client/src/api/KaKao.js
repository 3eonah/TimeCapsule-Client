import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  update_token,
  post_user,
  count_unchecked,
} from '../redux/modules/user';
import { useNavigate } from 'react-router-dom';
import { instance } from './Axios';
import { jwtDecode } from 'jwt-decode';

const REACT_APP_KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REACT_APP_KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const REACT_APP_KAKAO_CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

export const kakao_auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
export const handleKakKaoLogin = () => {
  return (window.location.href = kakao_auth_url);
};

const KaKao = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);
  useEffect(() => {
    // 카카오 인가코드 발급 받기
    // kakao_auth_code = new URL(window.location.href).searchParams.get('code');
    // TODO: 서버에 카카오 인가코드 넘기고 JWT Token 받아오기
    // 카카오 인가코드
    const kakao_auth_code = new URL(window.location.href).searchParams.get(
      'code'
    );
    const data = {
      grant_type: 'authorization_code',
      code: kakao_auth_code,
      client_id: REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: REACT_APP_KAKAO_REDIRECT_URI,
      client_secret: REACT_APP_KAKAO_CLIENT_SECRET,
    };
    const Login = async () => {
      try {
        const res = await instance.post('/login', data);
        // set redux state
        if (res.status === 200) {
          dispatch(update_token(res.data.userToken));
          // 토큰 유효성 검사
          try {
            const decodedToken = jwtDecode(res.data.userToken);
            if (decodedToken.type === 'JWT') {
              // dispatch(post_user(res.data.userToken));
              navigate('/home');
            }
          } catch (err) {
            console.error('Invalid JWT', err);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    Login();
  }, []);

  return <div></div>;
};

export default KaKao;
