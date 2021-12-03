import MycatModal from 'components/Home/MycatModal';
import React, { useEffect, useState } from 'react';
import Map from '../../components/Home/Map';

const HomePage = () => {
  const isLogin = true;
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  return isLogin ? (
    <div>
      <button onClick={modalClose}>Click</button>
      {modalOpen && <MycatModal modalClose={modalClose}></MycatModal>}
      <Map />
    </div>
  ) : (
    <div>로그인 하기전에 보여줄 화면</div>
  );
};

export default HomePage;
