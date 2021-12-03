// 액션
export const increase = (username) => ({
  type: 'INCREMENT',
  body: username, //key-value쌍으로 오브젝트 여러개 넘길 수 있음
});

// 상태
const initState = {
  number: 0,
  username: 'ssar',
  accessToken: '',
  refreshToken: '',
  users: {},
};

// 액션의 결과(state)를 걸러내는 역할
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { number: state.number + 1, username: action.body };
    //const { number, username } = useSelector((store) => store);
    default:
      return state;
  }
};

export default reducer;
