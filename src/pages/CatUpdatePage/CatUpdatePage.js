import React, { useState, useEffect } from 'react';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm/CatRegisterForm';
import CatLocationMap from 'components/CatRegister/CatLocationMap/CatLocationMap';
import axios from 'axios';
import axiosInstance from 'api/customAxios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import CatImgUpdate from 'components/CatRegister/CatImgUpdate/CatImgUpdate';

const CatUpdatePage = () => {
  const { catId } = useParams();

  const [deleteImgURl, setDeleteImgUrl] = useState([]);

  const [mainImg, setMainImg] = useState(''); // 메인 이미지
  const [catImg, setCatImg] = useState([]); // 기존 이미지
  const [addImg, setAddImg] = useState([]); // 추가된 이미지
  const [catInfo, setCatInfo] = useState([]);
  const [catLoc, setCatLoc] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    // 메인이미지
    // formData.append('catMainImg', mainImg);

    //삭제된 이미지 더하기
    for (let i = 0; i < deleteImgURl.length; i++) {
      formData.append(
        'deletedImgUrl',
        new Blob([JSON.stringify(deleteImgURl)], { type: 'application/json' })
      );
    }

    //추가된 이미지 더하기
    for (let i = 0; i < addImg.length; i++) {
      formData.append('catImg', addImg[i]);
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

    // 고양이 위치
    formData.append(
      'catLoc',
      new Blob([JSON.stringify(catLoc)], { type: 'application/json' }) // 객체 추가하고 싶을때 blob 안에 JSON.stringfy 해서 넣어야 되는듯
    );

    // 콘솔에 찍어보기
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    axiosInstance
      .post(`/user/1/cat/${catId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        navigate(`/mycat/${catId}`);
      });
  };

  useEffect(() => {
    axios.all([axiosInstance.get(`/user/1/cat/${catId}/past-info`)]).then(
      axios.spread((pastInfoRes) => {
        setCatInfo(pastInfoRes.data);
        setMainImg(pastInfoRes.data.mainImage);
        setCatImg(pastInfoRes.data.userUploadImages);
        setCatLoc(pastInfoRes.data.userUploadLocations);
        setLoaded(true);
      })
    );
  }, []);

  return loaded ? (
    <div className='content-container'>
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
        <CatLocationMap catLoc={catLoc} setCatLoc={setCatLoc} />
      </span>
      <div id='message' className='warning-message'></div>
      <div className='button-box'>
        <button className='cancel-button' onClick={() => navigate(-1)}>
          취소하기
        </button>
        <button className='submit-button' onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default CatUpdatePage;
