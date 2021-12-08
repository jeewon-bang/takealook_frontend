import React, { useState } from 'react';
import axios from 'axios';
import Login from '../../components/Login/Login';
import Kakao from 'components/Login/Kakao';

const LoginPage = () => {
	const [user, setUser] = useState(null);

	return (
		<div>
			<Login />

			<Kakao />
		</div>
	);
};

export default LoginPage;
