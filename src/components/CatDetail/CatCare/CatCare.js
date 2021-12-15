import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'components/Common/Modal';
import './CatCare.scss';
import CareCalendar from '../CareCalendar/CareCalendar';
import axiosInstance from 'api/customAxios';
import { useParams } from 'react-router';

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
		axiosInstance
			.post(`user/1/cat/${catId}/catcare`, newCare, {
				'Content-Type': 'application/json',
			})
			.then((res) => {
				console.log(res);

				axiosInstance
					.get(`/user/1/cat/${catId}/48hours-catcares`)
					.then((res) => {
						console.log(res);
						setCareHistory(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
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
			<button
				onClick={() => {
					setShowModal(true);
				}}>
				캘린더 보기
			</button>
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
