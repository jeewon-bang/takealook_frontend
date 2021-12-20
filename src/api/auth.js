import axiosInstance from 'api/customAxios';

export const googleLogin = (data) =>
	axiosInstance.post(
		'/login',
		JSON.stringify({ object: data, provider: 'google' }),
		{
			headers: { 'Content-Type': 'application/json' },
		}
	);

export const kakaoLogin = (data) =>
	axiosInstance.post(
		'/login',
		JSON.stringify({ object: data, provider: 'kakao' }),
		{ headers: { 'Content-Type': 'application/json' } }
	);

export const loadUser = () => axiosInstance.get('/loadUser');

// export const logout = () => axiosInstance.get('/logout');
