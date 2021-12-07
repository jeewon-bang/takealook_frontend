import React, { useState } from 'react';
import styled from 'styled-components';
import './CareDetail.scss';

const StyledTooltip = styled.span``;

const StyledTooltipBox = styled.div`
	width: 200px;
	height: 200px;
`;

const CareDetail = (props) => {
	const { careType, careList } = props;
	const careIcon = {
		0: 'food.png',
		1: 'food.png',
		2: 'pills.png',
		3: 'hospital.png',
	};

	const [showTooltip, setShowTooltip] = useState(false);
	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);
	const closeTooltip = (e) => {
		if (e.target.className !== 'care-tooltip') {
			setShowTooltip(false);
		}
	};

	return (
		<span className='calendar-care'>
			{careList.length > 0 && (
				<span
					className='care-icon'
					onClick={(e) => {
						setShowTooltip(true);
						setLeft(e.clientX - 450);
						setTop(e.clientY - 150);
					}}>
					<img
						src={require(`images/${careIcon[careType]}`).default}
						alt='care-icon'
						style={{ width: '30px' }}
					/>
				</span>
			)}
			{showTooltip && (
				<div className='care-tooltip-wrapper' onClick={closeTooltip}>
					<span
						style={{ left: `${left}px`, top: `${top}px` }}
						className='care-tooltip'>
						{careList.map((v) => {
							return (
								<div className='care-tooltip-list'>
									<div className='list-top'>
										<span className='list-user-img'>{v.userImg}</span>
										<span className='list-user'>{v.user}</span>
										<span className='list-datetime'>
											{v.datetime.split(' ')[1]}
										</span>
									</div>
									<div className='list-bottom'>
										<span className='list-message'>{v.message}</span>
									</div>
								</div>
							);
						})}
					</span>
				</div>
			)}
		</span>
	);
};

export default CareDetail;
