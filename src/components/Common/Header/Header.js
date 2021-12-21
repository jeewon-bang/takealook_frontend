import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from 'reducer/auth';
import useUpdateEffect from 'utils/useUpdateEffect';

const Header = (props) => {
	const { user, loginDone, logoutDone } = useSelector(({ auth }) => ({
		user: auth.user,
		loginDone: auth.loginDone,
		logoutDone: auth.logoutDone,
	}));
	const dispatch = useDispatch();

	const logout = () => {
		console.log('로그아웃 버튼 누름');
		dispatch(logoutAction());
	};

	useUpdateEffect(() => {
	  dispatch('/');
	}, [logoutDone]);

	return (
		<div className='header-container'>
			<div className='menu-container'>
				<Link to='/'>
					<span className='logo'>
						<img
							class='image'
							src={require('images/logo.png').default}
							alt='logo'
						/>
					</span>
				</Link>
				<span className='menu-left'>
					<span>
						<Link to='/mycat' className='menu'>
							내 고양이
						</Link>
					</span>
					<span>
						<Link to='/community' className='menu'>
							커뮤니티
						</Link>
					</span>
				</span>
				<span className='menu-right'>
					{user && (
						<span className='menu'>
							<img
								src={`${user.image}`}
								style={{ width: '50px', borderRadius: '50%' }}
								alt='profile'
							/>
						</span>
					)}
					{user && (
						<span className='menu'>
							<img
								class='image'
								src={require('images/bell.png').default}
								alt='alarm'
								onClick={openModal}
							/>
						</span>
					)}
					{user && (
						<span>
							<Link to='/mypage' className='menu'>
								마이페이지
							</Link>
						</span>
					)}

					{!user ? (
						<span>
							<Link to='/login' className='menu'>
								로그인
							</Link>
						</span>
					) : (
						<span className='menu' onClick={logout}>
							로그아웃
						</span>
					)}
				</span>
			</div>
		</div>
	);
};

export default Header;
