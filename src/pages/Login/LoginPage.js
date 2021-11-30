import React, { useState } from 'react';
import axios from 'axios';
import Login from '../../components/Login/Login';

const LoginPage = () => {
	const [user, setUser] = useState(null);

	const getUser = async () => {
		let res = await axios.get('http://localhost:8088/user', {
			headers: { Authorization: 'Bearer' + localStorage.getItem('jwtToken') },
		});
		console.log(res);
		setUser(res.data);
	};

	return (
		<div>
			<Login />
			<h3>user : {user}</h3>
			<button onClick={getUser}>유저 정보 가져오기</button>
		</div>
	);
};

export default LoginPage;
