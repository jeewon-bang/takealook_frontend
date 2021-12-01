import CatLocation from 'components/CatRegister/CatLocation';
import CatRegisterForm from 'components/CatRegister/CatRegisterForm';
import React, { useEffect, useState } from 'react';

const CatRegisterPage = () => {
	const [values, setValues] = useState({
		name: '',
		status: '',
		neutered: '',
		location: [],
	});

	const handleSubmit = () => {
		// axios
		if (!values.name || !values.status || !values.neutered) {
			document.getElementById('message').innerText =
				'모든 항목을 입력해주세요!';
		} else {
			if (values.location.length === 0) {
				document.getElementById('message').innerText =
					'1곳 이상의 위치를 선택해주세요!';
			} else {
				console.log(values);
			}
		}
	};

	return (
		<div>
			<CatRegisterForm values={values} setValues={setValues} />
			<CatLocation values={values} setValues={setValues} />
			<div id='message'></div>
			<button onClick={handleSubmit}>등록하기</button>
		</div>
	);
};

export default CatRegisterPage;
