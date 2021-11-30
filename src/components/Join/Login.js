import React from "react";
import { useLocation, useMatch, useNavigate, useParams } from "react-router";
import styled from "styled-components";

const Login = () => {
	const path = useLocation();
	const id = useParams();
	const navigate = useNavigate();

	console.log(path);
	console.log(id);

	return (
		<div>
			<button onClick={() => navigate(-1)}>뒤로가기</button>
		</div>
	);
};

export default Login;
