import axios from 'axios';
import React, { useState } from 'react';
import Location from '../../components/Join/Location';

const JoinPage = () => {
	// 여기서 로컬스토리지에 담아놓은 jwt 토큰을 통해 인증 요청
	// 최초 회원가입이면 (추가정보 없는상태) JoinPage 보여주고
	// 재 로그인이면 바로 홈화면으로 보내기

	const [values, setValues] = useState({
		nickname: '',
		phone: '',
		location: [],
	});

	const [showSecond, setShowSecond] = useState(false);
	const [showThird, setShowThird] = useState(false);

	// form 내의 값들이 변경되었을때 실행
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		e.preventDefault(); // 기존 form action 무시
		console.log('요청전송! ' + JSON.stringify(values));
		// axios({
		//   method: 'post',
		//   url: 'localhost/??',
		//   headers: {
		//     "Content-Type": "application/json;charset=utf-8"
		//   },
		//   body: JSON.stringify(values)
		// });
	};

	return (
		<div>
			<form onSubmit={submit}>
				<label>아이디</label>
				<input type='text' name='loginId' onBlur={handleChange} />
				<br />

				<label>닉네임</label>
				<input type='text' name='nickname' onBlur={handleChange} />
				<button>중복확인</button>
				<br />

				<label>휴대폰 번호</label>
				<input type='text' name='phone' onBlur={handleChange} />
				<br />

				<label>활동 지역</label>
				<Location values={values} setValues={setValues} />
				<button onClick={() => setShowSecond(true)}>추가</button>

				{showSecond && <Location values={values} setValues={setValues} />}
				{showSecond && <button onClick={() => setShowThird(true)}>추가</button>}

				{showThird && <Location values={values} setValues={setValues} />}

				<br />
				<button onClick={submit}>회원가입</button>
			</form>
		</div>
	);
};

export default JoinPage;
