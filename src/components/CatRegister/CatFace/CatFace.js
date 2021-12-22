import axiosInstance from 'api/customAxios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './CatFace.scss';
import Background from 'images/yulmu2.jpg';

const CatFace = () => {
  const user = useSelector((state) => state.auth.user);
  //고양이 원본이미지
  const [catImg, setCatImg] = useState([]);
  //고양이 얼굴 좌표값
  const [catFace, setCatFace] = useState({
    leftEyeX: 0,
    leftEyeY: 0,
    leftEarX: 0,
    leftEarY: 0,
    rightEyeX: 0,
    rightEyeY: 0,
    rightEarX: 0,
    rightEarY: 0,
  });
  console.log(catFace);
  const [mouseDownCnt, setMouseDownCnt] = useState(0);

  useEffect(() => {
    console.log('CatFace 모달입니다~~~');
  }, []);

  const getLoc = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    console.log(x, y);

    if (mouseDownCnt === 0) {
      //왼쪽눈
      document.getElementById('marker1').style.left = x + 'px';
      document.getElementById('marker1').style.top = y + 'px';
      document.getElementById('marker1').style.display = 'inline-block';
      setCatFace({ ...catFace, leftEarX: x, leftEarY: y });
      setMouseDownCnt(mouseDownCnt + 1);
      document.getElementById('catface-description').innerText =
        '왼쪽 눈 앞부분을 찍어주세요!';
    } else if (mouseDownCnt === 1) {
      //왼쪽귀
      document.getElementById('marker2').style.left = x + 'px';
      document.getElementById('marker2').style.top = y + 'px';
      document.getElementById('marker2').style.display = 'inline-block';
      setCatFace({ ...catFace, leftEyeX: x, leftEyeY: y });
      setMouseDownCnt(mouseDownCnt + 1);
      document.getElementById('catface-description').innerText =
        '오른쪽 귀 앞부분을 찍어주세요!';
    } else if (mouseDownCnt === 2) {
      //오른쪽눈
      document.getElementById('marker3').style.left = x + 'px';
      document.getElementById('marker3').style.top = y + 'px';
      document.getElementById('marker3').style.display = 'inline-block';
      setCatFace({ ...catFace, rightEarX: x, rightEarY: y });
      setMouseDownCnt(mouseDownCnt + 1);
      document.getElementById('catface-description').innerText =
        '오른쪽 눈 앞부분을 찍어주세요!';
    } else if (mouseDownCnt === 3) {
      //오른쪽귀
      document.getElementById('marker4').style.left = x + 'px';
      document.getElementById('marker4').style.top = y + 'px';
      document.getElementById('marker4').style.display = 'inline-block';
      setCatFace({ ...catFace, rightEyeX: x, rightEyeY: y });
      setMouseDownCnt(mouseDownCnt + 1);
      document.getElementById('catface-description').innerText = '완성!😻';
    }
  };

  const handleSubmit = () => {
    if (!catFace) {
      document.getElementById('warning').innerText =
        '좌표를 4개 모두 찍어주세요!';
    } else {
      const formData = new FormData();

      // 고양이 이미지
      formData.append('catImg', catImg[0]);

      //고양이 얼굴 좌표값
      formData.append(
        'catFace',
        new Blob([JSON.stringify(catFace)], { type: 'application/json' })
      );

      axiosInstance
        .post(`??`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          //   navigate('/mycat');
        });
    }
  };

  return (
    <div className='content-container'>
      <div className='catface-background-sample-container'>
        <img
          id='catface-sample'
          className='catface-background-sample'
          src={require('images/catface_sample.png').default}
          alt='좌표찍을 고양이_sample'
        />
      </div>
      <div id='catface-description'>왼쪽 귀 앞부분을 찍어주세요!</div>
      <div
        className='catface-background'
        onClick={getLoc}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <span id='marker1' className='catface-marker' alt='마커1' />
        <span id='marker2' className='catface-marker' alt='마커2' />
        <span id='marker3' className='catface-marker' alt='마커3' />
        <span id='marker4' className='catface-marker' alt='마커4' />
      </div>
      <div className='catface-marker-btn-container'>
        <button className='catface-marker-btn' onClick={handleSubmit}>
          이 사진을 이용하겠습니다
        </button>
      </div>
    </div>
  );
};

export default CatFace;
