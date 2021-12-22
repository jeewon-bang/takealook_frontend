import axiosInstance from 'api/customAxios';
import axios from 'axios';
import CatImgUpdate from 'components/CatRegister/CatImgUpdate/CatImgUpdate';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import ImgUpload from 'components/Common/ImgUpload';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CatReRegisterPage = () => {
  const { catId } = useParams();

  const [deleteImgURl, setDeleteImgUrl] = useState([]); // 삭제된 기존 이미지 url

  const [mainImg, setMainImg] = useState(''); // 메인 이미지
  const [newMainImg, setNewMainImg] = useState(''); // 새로운 메인 이미지
  const [catImg, setCatImg] = useState([]); // 기존 이미지
  const [addImg, setAddImg] = useState([]); // 추가된 이미지
  const [catInfo, setCatInfo] = useState([]);
  const [catLoc, setCatLoc] = useState([]); // 기존 고양이 위치
  const [newCatLoc, setNewCatLoc] = useState([]); // 추가된 고양이 위치

  const [loaded, setLoaded] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !catInfo.name ||
      !catInfo.gender ||
      !catInfo.pattern ||
      !catInfo.neutered
    ) {
      document.getElementById('message').innerText =
        '모든 항목을 입력해주세요!';
    } else {
      const formData = new FormData();

      //메인이미지
      if (newMainImg[0]) {
        formData.append('catMainImg', addImg[0]);
      }

      for (let i = 0; i < addImg.length; i++) {
        formData.append('catImg', addImg[i]);
      }

      //삭제된 이미지 더하기
      for (let i = 0; i < deleteImgURl.length; i++) {
        formData.append(
          'deletedImgUrl',
          new Blob([JSON.stringify(deleteImgURl)], { type: 'application/json' })
        );
      }

      let newCatInfo = {
        name: catInfo.name,
        gender: catInfo.gender,
        neutered: catInfo.neutered,
        status: catInfo.status,
        pattern: catInfo.pattern,
      };

      // 고양이 정보들
      formData.append(
        'catInfo',
        new Blob([JSON.stringify(newCatInfo)], { type: 'application/json' })
      );

      // 고양이 추가된 위치
      formData.append(
        'catLoc',
        new Blob([JSON.stringify(newCatLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
      );

      // 콘솔에 찍어보기
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axiosInstance
        .post(`/user/${user.id}/cat/${catId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          navigate(`/mycat/${catId}`);
        });
    }
  };

  useEffect(() => {
    axios
      .all([axiosInstance.get(`/user/${user.id}/cat/${catId}/past-info`)])
      .then(
        axios.spread((pastInfoRes) => {
          setCatInfo(pastInfoRes.data);
          setMainImg(pastInfoRes.data.mainImage);
          setCatImg(pastInfoRes.data.userUploadImages);
          setCatLoc(null);
          setLoaded(true);
        })
      );
  }, []);
  console.log(catLoc);
  return loaded ? (
    <div className='content-container'>
      <div>
        돌보던 고양이가 [{catInfo.name}] 가 아닌 것 같다면 새로운 고양이로
        등록해주세요!{' '}
      </div>
      <span className='cat-mainImg-form'>
        <div style={{ fontWeight: '800' }} className='input-label'>
          고양이 사진
        </div>
        <ImgUpload pastImg={mainImg} img={newMainImg} setImg={setNewMainImg} />
      </span>
      <span className='cat-img-form'>
        <CatImgUpdate
          catImg={catImg}
          setCatImg={setCatImg}
          deleteImgURl={deleteImgURl}
          setDeleteImgUrl={setDeleteImgUrl}
          addImg={addImg}
          setAddImg={setAddImg}
        />
      </span>
      <span className='cat-name-form'>
        <div className='cat-info-form-inner'>
          <div className='input-label'>이름</div>
          <input
            className='input-text'
            type='text'
            placeholder={catInfo.name}
            name='name'
            onBlur={handleChange}
          />
        </div>
      </span>
      <span className='cat-info-form'>
        <CatRegisterForm catInfo={catInfo} setCatInfo={setCatInfo} />
      </span>
      <span className='cat-map'>
        <CatLocationMap
          catLoc={catLoc}
          setCatLoc={setCatLoc}
          newCatLoc={newCatLoc}
          setNewCatLoc={setNewCatLoc}
        />
      </span>
      <div id='message' className='warning-message'></div>
      <div className='button-box'>
        <button className='cancel-button' onClick={() => navigate(-1)}>
          취소하기
        </button>
        <button className='submit-button' onClick={handleSubmit}>
          등록하기
        </button>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default CatReRegisterPage;
