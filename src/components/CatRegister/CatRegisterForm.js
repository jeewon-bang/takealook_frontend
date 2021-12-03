import React, { useState } from 'react';
import './CatRegisterForm.scss';

const CatRegisterForm = (props) => {
	const { catInfo, setCatInfo } = props;

	const handleChange = (e) => {
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div id='message'></div>
			<div>이름</div>
			<input
				className='input-text'
				type='text'
				name='name'
				onBlur={handleChange}
			/>
			<br />

			<div>상태</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='status'
					value='건강함'
					onChange={handleChange}
					required
				/>
				<span>건강함</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='status'
					value='치료 필요'
					onChange={handleChange}
				/>
				<span>치료 필요</span>
			</label>

			<div>중성화</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='완료'
					onChange={handleChange}
					required
				/>
				<span>완료</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='미완료'
					onChange={handleChange}
				/>
				<span>미완료</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='모름'
					onChange={handleChange}
				/>
				<span>모름</span>
			</label>
		</div>
	);
};

export default CatRegisterForm;
