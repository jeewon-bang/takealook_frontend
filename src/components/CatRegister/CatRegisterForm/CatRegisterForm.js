import React, { useState } from 'react';
import './CatRegisterForm.scss';

const CatRegisterForm = (props) => {
	const { catInfo, setCatInfo, catStatus, setCatStatus } = props;

	const handleInfoChange = (e) => {
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};
	const handleStatusChange = (e) => {
		setCatStatus({ ...catStatus, [e.target.name]: e.target.value });
	};

	// 성별 0 수컷 1 암컷 2 모름
	// 0 건강 1 치료필요 2 입양 3 사망

	// 0 거절 1 수락 2 대기중
	return (
		<div className='cat-info-form-inner'>
			<div className='input-label'>이름</div>
			<input
				className='input-text'
				type='text'
				name='name'
				onBlur={handleInfoChange}
			/>
			<br />

			<div className='input-label'>성별</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='gender'
					value='0'
					onChange={handleInfoChange}
					required
				/>
				<span className='gender'>수컷</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='gender'
					value='1'
					onChange={handleInfoChange}
				/>
				<span className='gender'>암컷</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='gender'
					value='2'
					onChange={handleInfoChange}
				/>
				<span className='gender'>모름</span>
			</label>

			<div className='input-label'>상태</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='status'
					value='0'
					onChange={handleStatusChange}
					required
				/>
				<span className='status'>건강함</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='status'
					value='1'
					onChange={handleStatusChange}
				/>
				<span className='status'>치료 필요</span>
			</label>

			<div className='input-label'>중성화</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='1'
					onChange={handleInfoChange}
					required
				/>
				<span className='neutered'>완료</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='0'
					onChange={handleInfoChange}
				/>
				<span className='neutered'>미완료</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='2'
					onChange={handleInfoChange}
				/>
				<span className='neutered'>모름</span>
			</label>
		</div>
	);
};

export default CatRegisterForm;
