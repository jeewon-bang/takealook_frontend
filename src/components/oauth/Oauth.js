const CLIENT_ID = '8d902bf9d1083de833034f3bf5eb2991';
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
