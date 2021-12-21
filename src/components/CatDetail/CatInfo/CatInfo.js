import axiosInstance from 'api/customAxios';
import React, { useState, useEffect } from 'react';
import ToolTip from 'react-power-tooltip';
import './CatInfo.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { useSelector } from 'react-redux';
import Modal from 'components/Common/Modal';
import { Navigate, useNavigate } from 'react-router-dom';

const CatInfo = (props) => {
  const { catId, catInfo, setCatInfo, catImg, setCatImg } = props;
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [adoptionMsg, setAdoptionMsg] = useState('');
  const [deathnMsg, setDeathMsg] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [showDeathModal, setShowDeathModal] = useState(false);

  const closeAdoptionModal = () => {
    setShowAdoptionModal(false);
  };
  const closeDeathModal = () => {
    setShowDeathModal(false);
  };

  // 고양이 상태만 바로 바꾸는 함수
  const changeCatStatus = (e) => {
    let newStatus;
    switch (e.target.innerText) {
      case '건강함':
        newStatus = '0';
        break;
      default:
        newStatus = '1';
    }
    axiosInstance
      .patch(`/user/${user.id}/cat/${catId}?status=${newStatus}`)
      .then((res) => {
        axiosInstance.get(`user/${user.id}/cat/${catId}`).then((res) => {
          setCatInfo(res.data);
        });
      });
  };

  const handleChangeAdoptionMsg = (e) => {
    setAdoptionMsg(e.target.value);
  };

  const handleChangeDeathMsg = (e) => {
    setDeathMsg(e.target.value);
  };

  const changeCatStatusAdopted = () => {
    axiosInstance
      .patch(`/user/${user.id}/cat/${catId}/adoptation?status=2`, adoptionMsg, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        navigate('/mycat');
      });
  };

  const changeCatStatusDead = () => {
    axiosInstance
      .patch(`/user/${user.id}/cat/${catId}/cat-star?status=3`, deathnMsg, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        navigate('/mycat');
      });
  };

  return (
    <div className='info-container'>
      <div className='info-content'>
        <span className='cat-img-box'>
          <Swiper slidesPerView={1} navigation pagination={{ clickable: true }}>
            <SwiperSlide>
              <img src={catInfo.mainImage} alt='img' className='cat-img' />
            </SwiperSlide>
            {catImg.map((img) => (
              <SwiperSlide>
                <img src={img.path} alt='img' className='cat-img' />
              </SwiperSlide>
            ))}
          </Swiper>
        </span>

        <span className='cat-info-box'>
          <div className='cat-info-head'>
            <span className='cat-name'>{catInfo.name}</span>
            <button
              className='cat-status'
              onMouseOver={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {catInfo.status === 0 ? '건강함' : '치료 필요'}
              {(catInfo.status === 0) | (catInfo.status === 1) && (
                <ToolTip
                  className='cat-status-tooltip'
                  show={showTooltip}
                  fontSize='16px'
                >
                  <span onClick={changeCatStatus}>건강함</span>
                  <span onClick={changeCatStatus}>치료 필요</span>
                </ToolTip>
              )}
            </button>
          </div>

          <div className='cat-info-body'>
            <button
              onClick={() => {
                setShowAdoptionModal(true);
              }}
            >
              입양하기😻
            </button>
            <button
              onClick={() => {
                setShowDeathModal(true);
              }}
            >
              고양이별🌟😿
            </button>
            <div className='cat-info-body-text'>
              {catInfo.gender === 0
                ? '♂'
                : catInfo.gender === 1
                ? '♀'
                : '성별 모름'}
            </div>
            <div className='cat-info-body-text'>
              {catInfo.pattern === 0
                ? '고등어태비'
                : catInfo.pattern === 1
                ? '치즈 / 치즈태비'
                : catInfo.pattern === 2
                ? '실버 / 실버태비'
                : catInfo.pattern === 3
                ? '삼색이'
                : catInfo.pattern === 4
                ? '카오스'
                : catInfo.pattern === 5
                ? '턱시도'
                : catInfo.pattern === 6
                ? '젖소'
                : catInfo.pattern === 7
                ? '블랙'
                : catInfo.pattern === 8
                ? '화이트'
                : '생김새 기타'}
            </div>
            <div className='cat-info-body-text'>
              중성화{' '}
              {catInfo.neutered === 0
                ? '미완료'
                : catInfo.neutered === 1
                ? '완료'
                : '모름'}
            </div>
          </div>

          <div className='carer-box'>
            <div className='cat-info-title-text'>돌보는 사람들</div>
            <div className='carer-wrapper'>
              {catInfo.carers.map((v) => (
                <span className='carer'>
                  <img src={v.userImage} className='carer-img' alt='user' />
                  <div className='carer-name'>{v.userName}</div>
                </span>
              ))}
            </div>
          </div>
        </span>
      </div>
      {/* 고양이 입양 모달 */}
      {showAdoptionModal && (
        <Modal
          showModal={showAdoptionModal}
          onClose={closeAdoptionModal}
          maskClosable={true}
        >
          <div className='cat-status-modal'>
            <div>
              신중하게 입양을 결정하셨나요?
              <br />
              더이상 [{catInfo.name}]을(를) 보지 못할 이웃들에게 마지막 메세지를
              남겨주세요.
            </div>
            <input type='text' onBlur={handleChangeAdoptionMsg}></input>
            <button onClick={changeCatStatusAdopted}>보내기</button>
          </div>
        </Modal>
      )}

      {/* 고양이 사망 모달 */}
      {showDeathModal && (
        <Modal
          showModal={showDeathModal}
          onClose={closeDeathModal}
          maskClosable={true}
        >
          <div className='cat-status-modal'>
            <div>
              더이상 [{catInfo.name}]을(를) 보지 못할 이웃들에게 마지막 메세지를
              남겨주세요.
            </div>
            <input type='text' onBlur={handleChangeDeathMsg}></input>
            <button onClick={changeCatStatusDead}>보내기</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CatInfo;
