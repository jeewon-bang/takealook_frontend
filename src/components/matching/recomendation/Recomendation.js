import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const Recomendation = (props) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const { recCats } = props;

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
              <p class='catChar'>{recCat.catchar}</p>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recomendation;
