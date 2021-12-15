import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alarm from './Alarm/Alarm';
import AlarmModal from './Alarm/AlarmModal';
import './Header.scss';

const Header = (props) => {
	const isLogin = true;

	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

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
					<span className='menu'>
						<img
							class='image'
							src={require('images/bell.png').default}
							alt='alarm'
							onClick={openModal}
						/>
						{/* {showModal && (
              <AlarmModal
                showModal={showModal}
                maskClosable={true}
                onClose={closeModal}
              >
                <Alarm />
              </AlarmModal>
            )} */}
					</span>
					<span>
						<Link to='/login' className='menu'>
							로그인
						</Link>
					</span>
					<span>
						<Link to='/mypage' className='menu'>
							마이페이지
						</Link>
					</span>
				</span>
			</div>
		</div>
	);
};

export default Header;
