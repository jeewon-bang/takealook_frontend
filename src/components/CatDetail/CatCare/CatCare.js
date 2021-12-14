import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'components/common/Modal';
import './CatCare.scss';
import CareCalendar from '../CareCalendar/CareCalendar';
import axiosInstance from 'api/customAxios';

const CatCare = (props) => {
	const { catId, careHistory, setCareHistory } = props;
	const [newCare, setNewCare] = useState({
		type: '',
		message: '',
	});
	const [showCareInput, setShowCareInput] = useState(false);
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

	const openCareInput = () => {
		showCareInput ? setShowCareInput(false) : setShowCareInput(true);
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		console.log('CatCare');
	}, []);

	return (
		<div className='care-container'>
			<div className='new-care'>
				<button className='care-add-button' onClick={openCareInput}>
					돌봄기록추가
				</button>
				{showCareInput && (
					<div className='care-input'>
						<select name='type' onBlur={handleValueChange}>
							<option selected disabled>
								선택
							</option>
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
							onBlur={handleValueChange}></input>
						<button onClick={handleCareSubmit}>등록</button>
					</div>
				)}
				<div onClick={openModal}>
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
			</div>

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
