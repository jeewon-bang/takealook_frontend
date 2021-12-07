import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const MyCatCard = (props) => {
  const { match, setMatch } = props;
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
        <h1>{match.mycatname}</h1>
        {match &&
          match.mycatimgs.map((img) => (
            <SwiperSlide>
              <img class='mat-img' src={img.img.default} alt='cat' />
            </SwiperSlide>
          ))}

        <p class='catChar'>{match.mycatchar}</p>
      </Swiper>
    </div>
  );
};

export default MyCatCard;
