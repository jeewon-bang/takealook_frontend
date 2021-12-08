import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import './CatDetailModal.scss';

const CatDetailModal = (props) => {
  SwiperCore.use([Navigation, Pagination]);
  const { recCat } = props;

  return <div className='rec-modal'></div>;
};

export default CatDetailModal;
