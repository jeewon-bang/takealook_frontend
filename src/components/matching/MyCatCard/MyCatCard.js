import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const MyCatCard = (props) => {
  const { mycatname, mycatimgs, mycatchar } = props;
  SwiperCore.use([Navigation, Pagination]);
  return (
    <div>
      <Swiper
        className='swiper-slide'
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <h1>{mycatname}</h1>
        {mycatimgs.map((img) => (
          <SwiperSlide>
            <img class='mat-img' src={img.img.default} alt='cat' />
          </SwiperSlide>
        ))}

        <p class='catChar'>{mycatchar}</p>
      </Swiper>
    </div>
  );
};

export default MyCatCard;
