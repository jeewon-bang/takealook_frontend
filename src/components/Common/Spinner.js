import React from 'react';
import './Spinner.scss';

const Spinner = () => {
	return (
		<div style={{ width: '100%', height: '100%', margin: 'auto' }}>
			<img
				className='spinner-img'
				src={require('images/loading.gif').default}
				alt='loading'></img>
		</div>
	);
};

export default Spinner;
