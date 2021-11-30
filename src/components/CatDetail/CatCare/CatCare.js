import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './CatCare.scss';

const CatCare = (props) => {
	const { catId, showModal, setShowModal, care, setCare } = props;
	const today = moment();
	const timeDiff = (date) => {
		return Math.floor(
			moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
		);
	};

	return (
		<div className='care-box'>
			<div className='care-header'>
				최근 48시간의 돌봄 기록
				<span onClick={() => setShowModal(true)}> [캘린더보기]</span>
			</div>
			{care.map((v) => (
				<div className='care'>
					<div className='user-img'></div>
					<span>{v.user} / </span>
					<span>{timeDiff(v.time)}시간 전/</span>
					<span>{v.type} / </span>
					<span>{v.message}</span>
				</div>
			))}
		</div>
	);
};

export default CatCare;
