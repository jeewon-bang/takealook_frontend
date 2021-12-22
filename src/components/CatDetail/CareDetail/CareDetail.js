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
		0: 'cat-food1.png',
		1: 'cat-food2.png',
		2: 'pill.png',
		3: 'first-aid-kit.png',
		4: 'water-dispenser.png',
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
						setLeft(e.clientX - 60);
						setTop(e.clientY - 40);
					}}>
					<img
						src={require(`images/${careIcon[careType]}`).default}
						alt='care-icon'
						style={{ width: '25px' }}
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
										<img
											src={v.carer.userImage}
											className='list-user-img'
											alt='profile'></img>
										<span className='list-user'>{v.carer.userName}</span>
										<span className='list-datetime'>
											{v.createdAt.split('T')[1].split('.')[0]}
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
