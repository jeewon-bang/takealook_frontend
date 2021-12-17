import React from 'react';

const OauthRedirectHandler = () => {
	const accesstoken = window.location.href;

	return <div>{accesstoken}</div>;
};

export default OauthRedirectHandler;
