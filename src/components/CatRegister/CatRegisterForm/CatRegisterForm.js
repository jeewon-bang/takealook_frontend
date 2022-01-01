import React from 'react';
import './CatRegisterForm.scss';

const CatRegisterForm = (props) => {
	const { catInfo, setCatInfo } = props;

	const handleChange = (e) => {
		console.log(catInfo);
		console.log(typeof catInfo.pattern);
		setCatInfo({ ...catInfo, [e.target.name]: e.target.value });
	};

	return (
		<div className='cat-info-form-inner'>
			<div className='input-label'>성별</div>
			<label className='input-radio'>
				<input
					type='radio'
					name='gender'
					value='0'
					onChange={handleChange}
					required
				/>
				<span className='gender' id='gender_Male'>
					수컷
				</span>
			</label>
			<label className='input-radio'>
				<input
					type='radio'
					name='gender'
					id='gender_Female'
					value='1'
					onChange={handleChange}
				/>
				<span className='gender'>암컷</span>
			</label>
			<label className='input-radio'>
				<input type='radio' name='gender' value='2' onChange={handleChange} />
				<span className='gender'>모름</span>
			</label>

			<div className='input-label'>생김새</div>
			<select className='input-select' name='pattern' onChange={handleChange}>
				<option selected disabled>
					{(() => {
						switch (catInfo.pattern) {
							case 0:
								return '고등어태비';
							case 1:
								return '치즈 / 치즈태비';
							case 2:
								return '실버 / 실버태비';
							case 3:
								return '삼색이';
							case 4:
								return '카오스';
							case 5:
								return '턱시도';
							case 6:
								return '젖소';
							case 7:
								return '블랙';
							case 8:
								return '화이트';
							case 9:
								return '기타';
							default:
								return '패턴이 없습니다.';
						}
					})()}
				</option>
				<option value='0'>고등어태비</option>
				<option value='1'>치즈 / 치즈태비</option>
				<option value='2'>실버 / 실버태비</option>
				<option value='3'>삼색이</option>
				<option value='4'>카오스</option>
				<option value='5'>턱시도</option>
				<option value='6'>젖소</option>
				<option value='7'>블랙</option>
				<option value='8'>화이트</option>
				<option value='9'>기타</option>
			</select>

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
