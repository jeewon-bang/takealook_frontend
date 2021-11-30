import React, { useEffect, useState } from 'react';
import Map from '../../components/Home/Map';

const HomePage = () => {
  const isLogin = true;
  return isLogin ? (
    <div>
      <Map />
    </div>
  ) : (
    <div>로그인 하기전에 보여줄 화면</div>
  );
};

export default HomePage;
