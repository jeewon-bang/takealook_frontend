// 액션
export const increase = (username) => ({
	type: 'INCREMENT',
	body: username, //key-value쌍으로 오브젝트 여러개 넘길 수 있음
});
export const decrease = () => ({ type: 'DECREAMENT' });
export const setCatInfo = (catInfo) => ({ type: 'SETCATINFO ' });

// 상태
const initState = {
	// accessToken: '',
	// refreshToken: '',
	catInfo: {
		id: '',
		name: '',
		gender: '',
		neutered: '',
		status: '',
		pattern: '',
		createdAt: '',
		carers: [
			{
				id: '',
				userName: '',
				userImage: '',
				dflag: false,
			},
			{
				id: '',
				userName: '',
				userImage: '',
				dflag: false,
			},
		],
	},
	catImg: [],
	catLoc: [],
};

// 액션의 결과(state)를 걸러내는 역할
const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			// return 되는 순간 그 값을 호출한 쪽에서 받는게 아니라 ui 변경됨...무슨말이지
			return { number: state.number + 1, username: action.body };
		//const { number, username } = useSelector((store) => store);
		case 'DECREAMENT':
			return { number: state.number - 1 };
		default:
			return state;
	}
};

export default reducer;
