import React, { useEffect, useState } from 'react';
import Map from 'components/Common/Map';
import './HomePage.scss';
import Modal from 'components/Common/Modal';

const HomePage = () => {
  const isLogin = true;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return isLogin ? (
    <div className='main-container'>
      <button className='home-menu-button' onClick={openModal}>
        Click
      </button>
      {showModal && (
        <Modal showModal={showModal} maskClosable={true} onClose={closeModal}>
          <div style={{ width: '300px', height: '300px' }}>매칭</div>
        </Modal>
      )}
      <Map />
    </div>
  ) : (
    <div>로그인 하기전에 보여줄 화면</div>
  );
};

export default HomePage;
