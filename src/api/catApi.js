import axiosInstance from './customAxios';

const catApi = {
	/** 한번 쓰이고 말 요청이면 이렇게까지 모듈화할 필요 없는듯?
	 * 그냥 각 페이지에서 axiosInstance.post(~~) 이렇게 호출해서 쓰는게 더 직관적일 것 같다.
	 * 만약 여러 페이지에 걸쳐서 여러번 써야될 요청이 있다면 여기에다가 정의해놓고 가져다쓰면 될듯
	 * 참고 - CatRegisterPage.js */
	catRegister: async (formData) => {
		await axiosInstance.post('/test', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	},
};

export default catApi;
