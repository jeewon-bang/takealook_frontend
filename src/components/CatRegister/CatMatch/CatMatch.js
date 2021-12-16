import CatMarkerMap from 'components/Common/CatMarkerMap';
import React, { useEffect, useState } from 'react';

import './CatMatch.scss';

const CatMatch = (props) => {
  const { moreInfo, setMoreInfo, matchedCat } = props;

  const matchCat = () => {};

  useEffect(() => {
    console.log('CatMatch 모달 렌더링!');
  });

  return (
    <div className='cat-match-modal'>
      <div className='message'>비슷한 고양이가 이미 등록되어 있어요!</div>
      <div>혹시 이 고양이를 발견하셨나요?</div>
      <img
        className='cat-image'
        src={require('images/bori2.jpg').default}
        alt='img'
      />
      <div className='cat-name'>{matchedCat.name}</div>
      <div className='cat-info'>
        {matchedCat.gender === 0 ? '♂' : 1 ? '♀' : '성별 모름'}&nbsp;·&nbsp;
        {matchedCat.pattern === 0
          ? '고등어태비'
          : 1
          ? '치즈태비'
          : 2
          ? '실버태비'
          : 3
          ? '삼색이'
          : 4
          ? '카오스'
          : 5
          ? '턱시도'
          : 6
          ? '젖소'
          : 7
          ? '블랙'
          : 8
          ? '화이트'
          : '기타'}{' '}
        &nbsp;·&nbsp;중성화{' '}
        {matchedCat.neutered === 0 ? '미완료' : 1 ? '완료' : '모름'}
      </div>

      <div className='cat-location-map'>
        <div className='title'>최근 발견 위치</div>
        <CatMarkerMap
          mapId={`${matchedCat.id}-map`}
          catLoc={matchedCat.locations}
          width={'100%'}
          height={'90%'}
        />
      </div>

      <button className='yes-button' onClick={matchCat}>
        이 고양이를 내 도감에 추가
      </button>
      <br />
      <button className='no-button' onClick={() => setMoreInfo(true)}>
        일치하는 고양이 없음
      </button>

      {/* {showInput && (
				<div>
					<div className='input-label'>이름</div>
					<input
						className='input-text'
						type='text'
						name='name'
						onBlur={handleChange}
					/>
					<br />
					<div className='input-label'>상태</div>
					<label className='input-radio'>
						<input
							type='radio'
							name='status'
							value='0'
							onChange={handleChange}
							required
						/>
						<span className='status'>건강함</span>
					</label>
					<label className='input-radio'>
						<input
							type='radio'
							name='status'
							value='1'
							onChange={handleChange}
						/>
						<span className='status'>치료 필요</span>
					</label>
					<button onClick={handleSubmit}>새로운 고양이 등록</button>
				</div>
			)} */}
    </div>
  );
};

export default CatMatch;
