import axiosInstance from 'api/customAxios';

export const socialLogin = (data) =>
	axiosInstance.post('/socialLogin', JSON.stringify(data), {
		'Content-Type': 'application/json',
	});
