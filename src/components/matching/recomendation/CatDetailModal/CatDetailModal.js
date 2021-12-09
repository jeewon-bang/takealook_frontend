import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import './CatDetailModal.scss';

const CatDetailModal = (props) => {
  SwiperCore.use([Navigation, Pagination]);
  const { detailCat } = props;

  return (
    <div class='rec-modal'>
      <Swiper
        className='swiper-slide'
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {detailCat &&
          detailCat.catimgs.map((img) => (
            <SwiperSlide>
              <img class='rec-img' src={img.img.default} alt='cat' />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CatDetailModal;
