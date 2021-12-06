import React, { useState } from 'react';
import { KAKAO_AUTH_URL } from './Oauth';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';

const KakaoBtn = styled(KakaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Kakao = () => {
  return (
    <div>
      <KakaoBtn href={KAKAO_AUTH_URL} buttonText='카카오계정 로그인'>
        {/* <img src={kakaologo} /> */}
      </KakaoBtn>
    </div>
  );
};

export default Kakao;
