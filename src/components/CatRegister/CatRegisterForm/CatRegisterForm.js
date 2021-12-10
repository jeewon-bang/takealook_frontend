import React, { useState } from 'react';
import './CatRegisterForm.scss';

const CatRegisterForm = (props) => {
	const { catInfo, setCatInfo } = props;

	const handleChange = (e) => {
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};

	return (
		<div className='cat-info-form-inner'>
			{/* <div className='input-label'>이름</div>
			<input
				className='input-text'
				type='text'
				name='name'
				onBlur={handleInfoChange}
			/>
			<br /> */}

			<div className='input-label'>성별</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='gender'
					value='0'
					onChange={handleChange}
					required
				/>
				<span className='gender'>수컷</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='gender' value='1' onChange={handleChange} />
				<span className='gender'>암컷</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='gender' value='2' onChange={handleChange} />
				<span className='gender'>모름</span>
			</label>

			<div className='input-label'>생김새</div>
			<select className='input-select' name='pattern' onChange={handleChange}>
				<option selected disabled>
					선택
				</option>
				<option value='0'>고등어태비</option>
				<option value='1'>치즈태비</option>
				<option value='2'>실버태비</option>
				<option value='3'>삼색이</option>
				<option value='4'>카오스</option>
				<option value='5'>턱시도</option>
				<option value='6'>젖소</option>
				<option value='7'>블랙</option>
				<option value='8'>화이트</option>
				<option value='9'>기타</option>
			</select>

			{/* <div className='input-label'>상태</div>
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
			</label> */}

			<div className='input-label'>중성화</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='neutered'
					value='1'
					onChange={handleChange}
					required
				/>
				<span className='neutered'>완료</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='neutered' value='0' onChange={handleChange} />
				<span className='neutered'>미완료</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='neutered' value='2' onChange={handleChange} />
				<span className='neutered'>모름</span>
			</label>
		</div>
	);
};

export default CatRegisterForm;
