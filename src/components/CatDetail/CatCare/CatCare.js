import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'components/Common/Modal';
import './CatCare.scss';
import CareCalendar from '../CareCalendar/CareCalendar';
import axiosInstance from 'api/customAxios';

const CatCare = (props) => {
  const { catId, careHistory, setCareHistory } = props;
  const [newCare, setNewCare] = useState({
    type: '',
    message: '',
  });
  const [showModal, setShowModal] = useState(false);
  const today = moment();

  const timeDiff = (date) => {
    return Math.floor(
      moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
    );
  };

  const handleValueChange = (e) => {
    setNewCare({ ...newCare, [e.target.name]: e.target.value });
  };
  const handleCareSubmit = () => {
    console.log(newCare);
    axiosInstance.post('user/1/cat/1/catcare', newCare, {
      'Content-Type': 'application/json',
    });
  };

  const openModal = () => {
    setShowModal(true);
  };
  const addCare = () => {};

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    console.log('CatCare');
  }, []);

  return (
    <div className='care-container'>
      <div className='title-text'>
        최근 48시간의 돌봄 기록
        <span onClick={openModal}> [캘린더보기]</span>
      </div>
      <div className='care-box'>
        <span onClick={addCare}>[돌봄기록추가]</span>
        <div className='history-add-box'>
          <select name='type' onBlur={handleValueChange}>
            <option>선택</option>
            <option value='0'>밥 주기</option>
            <option value='1'>간식 주기</option>
            <option value='2'>약 먹이기</option>
            <option value='3'>병원 치료</option>
            <option value='4'>기타</option>
          </select>
          <input
            type='text'
            name='message'
            className='history-input-text'
            onBlur={handleValueChange}
          ></input>
          <button onClick={handleCareSubmit}>등록</button>
        </div>
        {careHistory.map((v) => (
          <div className='care'>
            <div className='user-img'></div>
            <span>{v.carer.userName} / </span>
            <span>{v.createdAt} 시간 전/</span>
            <span>
              {v.type === 0
                ? '밥 주기'
                : 1
                ? '간식 주기'
                  ? 2
                  : '약 먹이기'
                : 3
                ? '병원 치료'
                : '기타'}{' '}
              /{' '}
            </span>
            <span>{v.message}</span>
          </div>
        ))}
      </div>
      {/* 모달 사용하기 
				- showModal 변수 정의, openModal, closeModal 함수 정의
				- { showModal && <Modal showModal={showModal} maskClosable={true} onClose={closeModal}>안에넣을내용</Modal> } 
				  형태로 사용하기
			 */}
      {showModal && (
        <Modal showModal={showModal} maskClosable={true} onClose={closeModal}>
          <CareCalendar
            careHistory={careHistory}
            setCareHistory={setCareHistory}
          />
        </Modal>
      )}
    </div>
  );
};

export default CatCare;
