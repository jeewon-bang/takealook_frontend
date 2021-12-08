import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'components/common/Modal';
import './CatCare.scss';
import CareCalendar from '../CareCalendar/CareCalendar';

const CatCare = (props) => {
	const { catId, careHistory, setCareHistory } = props;
	const [showModal, setShowModal] = useState(false);
	const today = moment();

	const timeDiff = (date) => {
		return Math.floor(
			moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
		);
	};

	const openModal = () => {
		setShowModal(true);
	};
	const addCareHistory = () => {};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className='care-container'>
			<div className='cat-info-title-text'>
				최근 48시간의 돌봄 기록
				<span onClick={openModal}> [캘린더보기]</span>
				<span onClick={addCareHistory}>[돌봄기록추가]</span>
			</div>
			<div className='care-box'>
				{careHistory.map((v) => (
					<div className='care'>
						<div className='user-img'></div>
						<span>{v.user} / </span>
						<span>{timeDiff(v.datetime)}시간 전/</span>
						<span>{v.type} / </span>
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
