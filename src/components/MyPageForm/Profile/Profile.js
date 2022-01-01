import Modal from 'components/Common/Modal';
import React, { useState } from 'react';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import './Profile.scss';

const Profile = (props) => {
	const { user, setUser } = props;
	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<div class='mypage-profile'>
				<p class='hello'>Hello</p>
				<img class='user-profile-img' src={user.image} alt='cat' />
				<p class='nick_name'>{user.nickname}</p>
				<span className='my-profile-update' onClick={openModal}>
					MY 회원정보
				</span>
			</div>
			{showModal && (
				<Modal showModal={showModal} maskClosable={true} onClose={closeModal}>
					<ProfileEdit user={user} setUser={setUser} />
				</Modal>
			)}
		</div>
	);
};

export default Profile;
