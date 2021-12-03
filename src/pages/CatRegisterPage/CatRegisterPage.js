import axios from 'axios';
import CatImage from 'components/CatRegister/CatImage/CatImage';
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
	const [data, setData] = useState(null);

	const [imgs, setImgs] = useState([]);

	const handleSubmit = () => {
		if (!values.name || !values.status || !values.neutered) {
			document.getElementById('message').innerText =
				'모든 항목을 입력해주세요!';
		} else {
			if (values.location.length === 0) {
				document.getElementById('message').innerText =
					'1곳 이상의 위치를 선택해주세요!';
			} else {
				for (let keyvalue of data.entries()) {
					console.log(keyvalue);
				}
				axios({
					url: 'http://localhost:8088/test',
					method: 'post',
					data: data,
				});
			}
		}
	};

	return (
		<div>
			<CatImage
				values={values}
				setValues={setValues}
				data={data}
				setData={setData}
			/>
			<CatRegisterForm values={values} setValues={setValues} />
			<CatLocation values={values} setValues={setValues} />
			<div id='message'></div>
			<button onClick={handleSubmit}>등록하기</button>
		</div>
	);
};

export default CatRegisterPage;
