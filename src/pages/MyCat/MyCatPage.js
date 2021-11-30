import axios from 'axios';
import MyCat from 'components/MyCat/MyCat';
import React, { useState, useEffect } from 'react';

const MyCatPage = () => {
  //id, 고양이사진, 이름

  const [cats, setCats] = useState([
    {
      id: 1,
      image: require('images/bori2.jpg'),
      name: '보리',
      username: '혜민',
      datetime: '2시간전',
      message: '메세지메세지~~ 템테이션 좋아하네요',
      type: 1,
    },
    {
      id: 2,
      image: require('images/ritae1.jpg'),
      name: '리태',
      username: '혜민',
      datetime: '2시간전',
      message: '메세지메세지~~ 템테이션 좋아하네요',
      type: 2,
    },
    {
      id: 3,
      image: require('images/yulmu2.jpg'),
      name: '율무',
      username: '혜민',
      datetime: '2시간전',
      message: '메세지메세지~~ 템테이션 좋아하네요',
      type: 3,
    },
  ]);

  //관리이력3개 - 장혜민 / 2시간 전 / 밥 급여 / 메세지메세지~~ 템테이션 좋아하네요
  // const [catCare, setCatCare] = useState([
  //   {
  //     id: 1,
  //     username: '혜민',
  //     datetime: '2시간전',
  //     message: '메세지메세지~~ 템테이션 좋아하네요',
  //   },
  // ]);

  // useEffect(() => {
  //   // data : {status: true, cats: sadklfjaskldf}
  //   const { data } = axios.post('http://192.168.0.10:5414/list');
  //   if (data.status) {
  //     setCats(data);
  //   } else {
  //     // 에러 처리하는곳
  //   }
  // }, []);

  //const HOST = 'http://localhost:3000';

  return (
    <div>
      <MyCat cats={cats} />
    </div>
  );
};

export default MyCatPage;
