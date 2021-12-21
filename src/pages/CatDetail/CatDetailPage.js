/* global kakao */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CatCare from 'components/CatDetail/CatCare/CatCare';
import CatInfo from 'components/CatDetail/CatInfo/CatInfo';
import './CatDetailPage.scss';
import { Link } from 'react-router-dom';
import axiosInstance from 'api/customAxios';
import axios from 'axios';
import CatMarkerMap from 'components/Common/CatMarkerMap';
import { useNavigate } from 'react-router';
import Modal from 'components/Common/Modal';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import CatMatch from 'components/CatRegister/CatMatch/CatMatch';
import CatMoreInfoForm from 'components/CatRegister/CatMoreInfoForm/CatMoreInfoForm';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import { useSelector } from 'react-redux';

let matchedCatData = [
  {
    id: 100,
    name: '보리',
    gender: 0,
    neutered: 1,
    pattern: 1,
    locations: [
      {
        latitude: 37.54511236317026,
        longitude: 126.86184575808647,
      },
    ],
  },
  {
    id: 101,
    name: '부비',
    gender: 0,
    neutered: 1,
    pattern: 1,
    locations: [
      {
        latitude: 37.54732777835966,
        longitude: 126.8609590137254,
      },
    ],
  },
];

const CatDetailPage = () => {
  const { catId } = useParams();
  const [catInfo, setCatInfo] = useState(''); // 상세조회할 고양이 정보
  const [catLoc, setCatLoc] = useState([]); // 상세조회할 고양이 최근위치
  const [catImg, setCatImg] = useState([]); // 상세조회할 고양이 이미지들
  const [careHistory, setCareHistory] = useState([]); // 상세조회할 고양이 돌봄이력들
  const [loaded, setLoaded] = useState(false); // 상세조회할 고양이 정보들이 다 받아졌는지 여부

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // 다른고양이로 등록하려고 할때 보여줄 화면
  const [showAnotherCatPage, setShowAnotherCatPage] = useState(false);
  // 동일고양이 추천 모달을 보여줄지 여부
  const [showModal, setShowModal] = useState(false);
  // 추천된 동일고양이 리스트
  const [matchedCatList, setMatchedCatList] = useState(matchedCatData);
  // 추천 중 일치하는 고양이가 없을때 추가정보 입력창을 보여줄지 여부
  const [moreInfo, setMoreInfo] = useState(false);
  // 새로운 고양이로 재등록할때 - 등록할 새로운 고양이 정보
  const [newCatInfo, setNewCatInfo] = useState({
    name: '',
    gender: '',
    neutered: '',
    status: '',
    pattern: '',
  });
  const [newCatImg, setNewCatImg] = useState([]);

  // 내 도감에서 삭제
  const deleteMyCat = () => {
    alert('삭제한 고양이는 복구할 수 없습니다. 정말 삭제하시겠습니까?');

    axiosInstance
      .patch(`user/${user.id}/cat/${catId}/selection/soft-delete`)
      .then((res) => {
        navigate('/mycat');
      });
  };

  // 다른고양이로 등록 - 고양이 정보 다시받기
  const handleChange = (e) => {
    setNewCatInfo({ ...newCatInfo, [e.target.name]: e.target.value });
  };

  // 다른고양이로 등록 - 사진입력후 동일고양이 재추천하는 모달 열기
  const openMatchedCatModal = () => {
    // if (!newCatInfo.neutered || !newCatInfo.gender || !newCatInfo.pattern) {
    // 	document.getElementById('message').innerText =
    // 		'모든 항목을 입력해주세요!';
    // } else {
    // 	if (catLoc.length === 0) {
    // 		document.getElementById('message').innerText =
    // 			'1곳 이상의 위치를 선택해주세요!';
    // 	} else {
    // 		document.getElementById('message').innerText = '';
    // 		// 동일 추정 고양이 모달 팝업
    // 		setShowMatchedCatModal(true);
    // 	}
    // }

    console.log(newCatInfo);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  // 다른고양이로 등록 - 추천중에 동일고양이 없어서 새로운 고양이로 등록
  const handleSubmitNewCat = () => {
    if (!newCatInfo.name || !newCatInfo.status) {
      document.getElementById('warning').innerText =
        '모든 항목을 입력해주세요!';
    } else {
      document.getElementById('warning').innerText = '';

      console.log(newCatInfo);
      console.log(newCatImg);

      const formData = new FormData();
      // 새로받은 이미지들은 저장 안하나...?
      // for (let i = 0; i < newCatImg.length; i++) {
      // 	formData.append('catImg', newCatImg[i]);
      // }
      // formData.append(
      // 	'catInfo',
      // 	new Blob([JSON.stringify(newCatInfo)], { type: 'application/json' })
      // );

      // 콘솔에 찍어보기
      // for (let pair of formData.entries()) {
      // 	console.log(pair[0] + ', ' + pair[1]);
      // }

      axiosInstance
        .patch(`/user/${user.id}/cat/${catId}/selection/new`, newCatInfo, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => {
          console.log(res);
          navigate('/mycat');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log('CatDetailPage');
    axios
      .all([
        axiosInstance.get(`/user/${user.id}/cat/${catId}`),
        axiosInstance.get(`/user/${user.id}/cat/${catId}/images`),
        axiosInstance.get(`/user/${user.id}/cat/${catId}/locations`),
        axiosInstance.get(`/user/${user.id}/cat/${catId}/48hours-catcares`),
      ])
      .then(
        axios.spread((catInfoRes, catImgRes, catLocRes, careHistoryRes) => {
          setCatInfo(catInfoRes.data);
          setCatImg(catImgRes.data);
          setCatLoc(catLocRes.data);
          setCareHistory(careHistoryRes.data);
          setLoaded(true);
        })
      );
  }, []);

  return loaded ? (
    /** 기본적으로 처음에 보여지는 고양이 상세페이지 화면 */
    !showAnotherCatPage ? (
      <div className='content-container'>
        <CatInfo
          catId={catId}
          catInfo={catInfo}
          setCatInfo={setCatInfo}
          catImg={catImg}
          setCatImg={setCatImg}
        />

        <div className='title'>최근 발견된 위치</div>
        <CatMarkerMap
          mapId={'cat-detail-map'}
          catLoc={catLoc}
          width={'100%'}
          height={'500px'}
        />

        <div>
          <Link to={`/mycat/${catId}/update`}>
            <button className='cat-info-update-button'>정보 수정하기</button>
          </Link>
        </div>

        <div className='title'>최근 48시간의 돌봄 기록</div>
        <CatCare
          catId={catId}
          careHistory={careHistory}
          setCareHistory={setCareHistory}
        />

        <div className='button-box'>
          <button className='cat-delete-button' onClick={deleteMyCat}>
            내 도감에서 삭제
          </button>
          <button
            className='cat-other-button'
            onClick={() => {
              setShowAnotherCatPage(true);
            }}
          >
            다른 고양이로 등록
          </button>
        </div>
      </div>
    ) : /** 다른 고양이 버튼 누르면 바뀔 화면 */
    !moreInfo ? (
      <div className='content-container'>
        {/* 고양이 성별, 패턴, 중성화여부 수정받기 */}
        <div className='cat-info-form-inner'>
          <div>
            돌보던 고양이가 [{catInfo.name}] 가 아닌 것 같다면 새로운 고양이로
            등록해주세요!{' '}
          </div>
          <CatImageUpload image={newCatImg} setImage={setNewCatImg} />

          {/* 이 아래에서부터 컴포넌트 분리해야겠다 수정폼 만든이후에 갖다써야지 */}
          <div className='input-label'>성별</div>
          <label className='input-radio'>
            <input
              type='radio'
              name='gender'
              value='0'
              onChange={handleChange}
              required
            />
            <span className='gender'>수컷</span>
          </label>
          <label className='input-radio'>
            <input
              type='radio'
              name='gender'
              value='1'
              onChange={handleChange}
            />
            <span className='gender'>암컷</span>
          </label>
          <label className='input-radio'>
            <input
              type='radio'
              name='gender'
              value='2'
              onChange={handleChange}
            />
            <span className='gender'>모름</span>
          </label>

          <div className='input-label'>생김새</div>
          <select
            className='input-select'
            name='pattern'
            onChange={handleChange}
          >
            <option selected disabled>
              선택
            </option>
            <option value='0'>고등어태비</option>
            <option value='1'>치즈</option>
            <option value='2'>삼색이</option>
            <option value='3'>카오스</option>
            <option value='4'>턱시도</option>
            <option value='5'>젖소</option>
            <option value='6'>블랙</option>
            <option value='7'>화이트</option>
            <option value='8'>실버</option>
            <option value='9'>기타</option>
          </select>

          <div className='input-label'>중성화</div>
          <label className='input-radio'>
            <input
              type='radio'
              name='neutered'
              value='1'
              onChange={handleChange}
              required
            />
            <span className='neutered'>완료</span>
          </label>
          <label className='input-radio'>
            <input
              type='radio'
              name='neutered'
              value='0'
              onChange={handleChange}
            />
            <span className='neutered'>미완료</span>
          </label>
          <label className='input-radio'>
            <input
              type='radio'
              name='neutered'
              value='2'
              onChange={handleChange}
            />
            <span className='neutered'>모름</span>
          </label>
          <div>
            여기서 위치도 새로 받아야할까..? 안받으면 추천은 어떻게해주지...?
          </div>
          <button className='submit-button' onClick={openMatchedCatModal}>
            등록하기
          </button>

          {/* 등록하기 버튼 누르면 동일고양이 추천 모달 팝업 */}
          {showModal && (
            <Modal
              showModal={showModal}
              onClose={closeModal}
              maskClosable={true}
            >
              <div style={{ width: '800px' }}>
                <Swiper
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {matchedCatList.map((matchedCat) => (
                    <SwiperSlide>
                      <CatMatch
                        catId={catId}
                        moreInfo={moreInfo}
                        setMoreInfo={setMoreInfo}
                        matchedCat={matchedCat}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Modal>
          )}
        </div>
      </div>
    ) : (
      <div>
        <div>새로운 고양이로 재등록하는 화면입니다</div>
        {/* 추천에 동일고양이 없을때 고양이 이름, 상태 새로 받기 */}
        <CatMoreInfoForm
          catInfo={newCatInfo}
          setCatInfo={setNewCatInfo}
          catImg={catImg}
          catLoc={catLoc}
        />
        <div id='warning'></div>
        <button className='submit-button' onClick={handleSubmitNewCat}>
          새로운 고양이로 등록
        </button>
      </div>
    )
  ) : (
    <div>로딩중</div>
  );
};

export default CatDetailPage;
