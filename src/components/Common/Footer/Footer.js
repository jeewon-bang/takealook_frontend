import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div>
      <div className='footer-container'>
        <br></br>
        <div className='footer-info'>
          <span>
            <font size='5' color='#fd8a69'>
              &nbsp;Take a Look!
            </font>
          </span>
          <br></br>
          <span>&nbsp;&nbsp;회사명: (주)때껄룩 | 대표: 스냥파</span>
          <br></br>
          <span>
            &nbsp;&nbsp;연락처: 02-754-7302 | 주소: 1층, 335 효령로 서초1동
            서초구 서울특별시
          </span>
          <br></br>
          <span>
            &nbsp;&nbsp;
            <font color='#9b9b9b'>
              Copyright 2021. TAKEALOOK. All rights reserved
            </font>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
