/* global kakao */
import Map from 'components/Common/Map';
import React, { useEffect, useState } from 'react';
import map from 'components/Common/Map';
import './CatMap.scss';
import styled from 'styled-components';

const CatMap = (props) => {
  const { catLoc, width, height } = props;

  useEffect(() => {
    console.log('CatMap');
    console.log(catLoc);
    console.log(map);

    catLoc.length > 0 &&
      catLoc.forEach((v) => {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(v.latitude, v.longitude),
        });
        console.log('중심위치 바꿀거야');
        map.setCenter(
          new kakao.maps.LatLng(catLoc[0].latitude, catLoc[0].longitude)
        );
      });
  }, []);

  return (
    <div style={{ width: width, height: height }}>
      <div className='cat-info-title-text'>최근 발견된 위치</div>
      <Map />
    </div>
  );
};

export default CatMap;
