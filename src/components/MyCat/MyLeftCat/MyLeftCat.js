import axiosInstance from 'api/customAxios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyLeftCat.scss';

const MyLeftCat = (props) => {
	const { adoptedCats } = props;
	const { user } = useSelector(({ auth }) => ({
		user: auth.user,
	}));

	return (
		// <div>
		//   <Link class='cat-detail' to={`/mycat/${catId}`}>
		//     <div class='catCard'>
		//       <img class='catimg' src={catImg.default} alt='cat' />
		//       <p class='cat-name'>{catName}</p>
		//     </div>
		//   </Link>
		// </div>
		<div className='content-container'>
			<div className='catCard-container'>
				{adoptedCats.map((cat) => (
					<MyLeftCat catId={cat.id} catName={cat.name} catImg={cat.image} />
				))}
			</div>
		</div>
	);
};

export default MyLeftCat;
