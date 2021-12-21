import axiosInstance from 'api/customAxios';
import axios from 'axios';
import MyCat from 'components/MyCat/MyCat/MyCat';
import MyLeftCat from 'components/MyCat/MyLeftCat/MyLeftCat';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyCatPage.scss';
import { useSelector } from 'react-redux';
import useUpdateEffect from 'utils/useUpdateEffect';

const MyCatPage = (props) => {
	const { loginDone, user } = useSelector(({ auth }) => ({
		loginDone: auth.loginDone,
		user: auth.user,
	}));
	const [myCats, setMyCats] = useState([]);
	const [adoptedCats, setAdoptedCats] = useState([]);
	const [deadCats, setDeadCats] = useState([]);
	const [selectType, setSelectType] = useState('mycat');

	const sortHandler = (e) => {
		const value = e.target.value;
		switch (value) {
			case 'mycat':
				setSelectType('mycat');
				break;
			case 'adopted':
				setSelectType('adopted');
				break;
			case 'dead':
				setSelectType('dead');
				break;
			default:
				break;
		}
	};

	// const moveToMycat = () => {
	// 	setSelectType('mycat');
	// };

	// const moveToAdopted = () => {
	// 	setSelectType('adopted');
	// };

	// const moveToCatstar = () => {
	// 	setSelectType('cat-star');
	// };

	useEffect(() => {
		console.log('myCatPage 요청');
		axios
			.all([
				axiosInstance.get(`/user/${user.id}/cats`),
				axiosInstance.get(`/user/${user.id}/cat-stars`),
				axiosInstance.get(`/user/${user.id}/adopted`),
			])
			.then(
				axios.spread((myCatsRes, adoptedCatsRes, deadCatsRes) => {
					setMyCats(myCatsRes.data);
					setAdoptedCats(adoptedCatsRes.data);
					setDeadCats(deadCatsRes.data);
				})
			);
	}, []);

	return user ? (
		<div className='mycat-container'>
			<div className='mycat-sorting'>
				<select name='choice' className='sorting' onChange={sortHandler}>
					<option value='mycat' className='option'>
						내 고양이
					</option>
					<option value='adopted' className='option'>
						입양된 고양이
					</option>
					<option value='cat-star' className='option'>
						고양이 별
					</option>
				</select>
			</div>
			<Link to='/mycat/new'>
				<button className='new-cat-button'>새 고양이 등록</button>
			</Link>
			{(() => {
				switch (selectType) {
					case 'mycat':
						return <MyCat cats={myCats} />;
					case 'adopted':
						return (
							<MyLeftCat adoptedCats={adoptedCats} />
							// <div className='catCard-container'>
							// 	{adoptedCats.map((cat) => (
							// 		<MyLeftCat
							// 			catId={cat.id}
							// 			catName={cat.name}
							// 			catImg={cat.image}
							// 		/>
							// 	))}
							// </div>
						);
					case 'dead':
						return (
							<div className='catCard-container'>
								{deadCats.map((cat) => (
									<MyLeftCat
										catId={cat.id}
										catName={cat.name}
										catImg={cat.image}
									/>
								))}
							</div>
						);

					default:
						return '잘못된 접근입니다.';
				}
			})()}
		</div>
	) : (
		<div>로그인해주세요</div>
	);
};

export default MyCatPage;
