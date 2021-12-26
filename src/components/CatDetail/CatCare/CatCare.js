import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'components/Common/Modal';
import './CatCare.scss';
import CareCalendar from '../CareCalendar/CareCalendar';
import axiosInstance from 'api/customAxios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const CatCare = (props) => {
	const { catId, careHistory, setCareHistory } = props;
	const user = useSelector((state) => state.auth.user);
	const [newCare, setNewCare] = useState({
		type: '',
		message: '',
	});
	const [showCareInput, setShowCareInput] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const today = moment();
	const careIcon = {
		0: 'cat-food1.png',
		1: 'cat-food2.png',
		2: 'pill.png',
		3: 'first-aid-kit.png',
		4: 'water-dispenser.png',
	};

	const timeDiff = (date) => {
		const dayDiff = Math.floor(
			moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asDays()
		);
		const hourDiff = Math.floor(
			moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
		);
		const minuteDiff = Math.floor(
			moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asMinutes()
		);
		if (dayDiff === 0) {
			if (hourDiff === 0) {
				return minuteDiff + '분 전';
			} else {
				return hourDiff + '시간 전';
			}
		} else {
			return dayDiff + '일 전';
		}
	};

	const handleValueChange = (e) => {
		setNewCare({ ...newCare, [e.target.name]: e.target.value });
	};

	// 돌봄기록 추가 입력창 열기
	const openCareInput = () => {
		setShowCareInput(true);
	};

	// 돌봄기록 등록
	const handleCareSubmit = () => {
		axiosInstance
			.post(`user/${user.id}/cat/${catId}/catcare`, newCare, {
				'Content-Type': 'application/json',
			})
			.then((res) => {
				setShowCareInput(false);
				axiosInstance
					.get(`/user/${user.id}/cat/${catId}/48hours-catcares`)
					.then((res) => {
						setCareHistory(res.data);
					});
			});
	};

	// 돌봄기록 삭제
	const deleteCare = (e) => {
		console.log(e.target.id);
		axiosInstance
			.delete(`user/${user.id}/cat/${catId}/catcare/${e.target.id}`)
			.then((res) => {
				axiosInstance
					.get(`/user/${user.id}/cat/${catId}/48hours-catcares`)
					.then((res) => {
						console.log(res.data);
						setCareHistory(res.data);
					});
			});
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
				className='calendar-button'
				onClick={() => {
					setShowModal(true);
				}}></button>
			<div className='new-care'>
				<button className='open-calendar-button' onClick={openModal}>
					{/* <FontAwesomeIcon icon={faCalendarAlt} size='2x' />
								모든 내역 보기 */}
					all
				</button>
				{!showCareInput && (
					<button className='care-add-button' onClick={openCareInput}>
						+
					</button>
				)}
				{showCareInput && (
					<div className='care-input'>
						<select
							name='type'
							className='care-input-select'
							onBlur={handleValueChange}>
							<option selected disabled>
								돌봄 타입 선택
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
							placeholder='고양이를 같이 돌보는 이웃들에게 남길 메세지를 적어주세요'
							className='care-input-text'
							onBlur={handleValueChange}></input>
						<button className='care-input-button' onClick={handleCareSubmit}>
							등록
						</button>
					</div>
				)}
				<div>
					{careHistory.length === 0 ? (
						<div>최근 48시간 내의 돌봄 내역이 없습니다.</div>
					) : (
						<div>
							{careHistory.map((v) => (
								<div className='care'>
									<span className='care-left'>
										<img
											src={require(`images/${careIcon[v.type]}`).default}
											className='care-type-img'
											alt='care'></img>
										<div className='care-type'>
											{v.type === 0
												? '밥 주기'
												: v.type === 1
												? '간식 주기'
												: v.type === 2
												? '약 먹이기'
												: v.type === 3
												? '병원 치료'
												: '기타'}
										</div>
									</span>
									<span className='care-right'>
										<div className='carer-info-time'>
											<span>
												<img
													src={v.carer.userImage}
													className='carer-img'
													alt='profile'></img>
											</span>
											<span className='carer-name'>{v.carer.userName}</span>
											<span className='care-time'>{timeDiff(v.createdAt)}</span>
											{v.carer.id === user.id && (
												<button
													id={v.id}
													className='care-delete-button'
													onClick={deleteCare}>
													X
												</button>
											)}
										</div>
										<div>"{v.message}"</div>
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{showModal && (
				<Modal showModal={showModal} maskClosable={true} onClose={closeModal}>
					<CareCalendar catId={catId} />
				</Modal>
			)}
		</div>
	);
};

export default CatCare;
