// 액션
export const increase = () => ({ type: 'INCREMENT' });

// 상태
const initState = {
	number: 0,
};

// 액션의 결과(state)를 걸러내는 역할
const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { number: state.number + 1 };
		default:
			return state;
	}
};

export default reducer;
