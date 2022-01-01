import axiosInstance from 'api/customAxios';
import axios from 'axios';
import MyCat from 'components/MyCat/MyCat/MyCat';
import MyLeftCat from 'components/MyCat/MyLeftCat/MyLeftCat';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyCatPage.scss';

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
		console.log(e.target.value);
		const value = e.target.value;
		switch (value) {
			case 'mycat':
				moveToMycat();
				break;
			case 'adopted':
				moveToAdopted();
				break;
			case 'cat-star':
				moveToCatstar();
				break;
			default:
				break;
		}
	};

	const moveToMycat = () => {
		setSelectType('mycat');
	};

	const moveToAdopted = () => {
		setSelectType('adopted');
	};

	const moveToCatstar = () => {
		setSelectType('cat-star');
	};

	useEffect(() => {
		console.log('myCatPage 요청');
		axios
			.all([
				axiosInstance.get(`/user/${user.id}/cats`),
				axiosInstance.get(`/user/${user.id}/adopted`),
				axiosInstance.get(`/user/${user.id}/cat-stars`),
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
		<div className='content-container'>
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
						return (
							<div className='catCard-container'>
								{myCats.length === 0 ? (
									<div>내 도감에 등록된 고양이가 없습니다.</div>
								) : (
									<MyCat cats={myCats} />
								)}
							</div>
						);
					case 'adopted':
						return (
							<div className='catCard-container'>
								{adoptedCats.length === 0 ? (
									<div>입양된 고양이가 없습니다.</div>
								) : (
									adoptedCats.map((cat) => (
										<MyLeftCat
											catId={cat.id}
											catName={cat.name}
											catImg={cat.mainImage}
											message={cat.amsg}
										/>
									))
								)}
							</div>
						);
					case 'cat-star':
						return (
							<div className='catCard-container'>
								{deadCats.length === 0 ? (
									<div>고양이별로 떠난 고양이가 없습니다.</div>
								) : (
									deadCats.map((cat) => (
										<MyLeftCat
											catId={cat.id}
											catName={cat.name}
											catImg={cat.mainImage}
											message={cat.dmsg}
										/>
									))
								)}
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
