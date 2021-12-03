import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ToolTip from 'react-power-tooltip';
import './CatInfo.scss';

const CatInfo = (props) => {
  const { catId } = props;

  // catId로 고양이 정보 찾아서 받아오기
  let data = {
    catId: 1,
    name: '보리',
    catImg: [],
    gender: 'F',
    neutered: '2016-05-01',
    status: '건강함',
    carers: [
      { id: 1, userName: '혜민', userImg: '' },
      { id: 2, userName: '지원', userImg: '' },
      { id: 3, userName: '세은', userImg: '' },
    ],
  };

  const [loading, setLoading] = useState(true); // axios로 데이터 받아서 화면그릴때 사용할 변수
  const [catInfo, setCatInfo] = useState(data);
  const [showTooltip, setShowTooltip] = useState(false);

  const changeCatStatus = (e) => {
    // axios로 변경 요청 전송
    console.log(e.target.innerText);
  };

  return loading ? (
    <div>
      <div className='info-container'>
        <img
          src={require('images/bori2.jpg').default}
          alt='img'
          className='cat-img'
        />
        <div className='cat-info'>
          <span className='cat-name'>{catInfo.name}</span>
          <button
            className='cat-status'
            onMouseOver={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {catInfo.status}
            <ToolTip
              className='cat-status-tooltip'
              show={showTooltip}
              fontSize='16px'
            >
              <span onClick={changeCatStatus}>건강함</span>
              <span onClick={changeCatStatus}>치료 필요</span>
              <span onClick={changeCatStatus}>입양됨</span>
              <span onClick={changeCatStatus}>고양이별</span>
            </ToolTip>
          </button>
          <div className='info'>{catInfo.gender === 'M' ? '♂' : '♀'}</div>
          <div className='info'>{catInfo.neutered} 중성화 완료</div>

          <div className='cat-carer'>
            <div className='carer-header'>돌보는 사람들</div>
            <div className='carer-wrapper'>
              {catInfo.carers.map((v) => (
                <span className='carer'>
                  <div className='carer-img'></div>
                  <div className='carer-name'>{v.userName}</div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default CatInfo;
