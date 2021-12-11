import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// import 'swiper/swiper.scss';
// import 'swiper/components/Navigation/navigation.scss';
// import 'swiper/components/Pagination/pagination.scss';
import Modal from 'components/Common/Modal';
import CatDetailModal from '../CatDetailModal/CatDetailModal';
import './Recomendation.scss';

const Recomendation = (props) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const { recCats } = props;
  const [detailCat, setDetailCat] = useState();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Swiper
        className='swiper-slide'
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
      >
        {recCats &&
          recCats.map((recCat) => (
            <SwiperSlide>
              <img
                class='mat-img'
                src={recCat.catimgs[0].img.default}
                alt='cat'
              />
              <h1>{recCat.catname}</h1>
              <button
                class='detail-btn'
                onClick={() => {
                  setDetailCat(recCat);
                  setShowModal(true);
                }}
              >
                {/* 자세히보기> */}
              </button>
              <p class='catChar'>{recCat.catchar}</p>
            </SwiperSlide>
          ))}
        {showModal && (
          <Modal showModal={showModal} maskClosable={true} onClose={closeModal}>
            <CatDetailModal detailCat={detailCat} />
          </Modal>
        )}
      </Swiper>
    </div>
  );
};

export default Recomendation;
