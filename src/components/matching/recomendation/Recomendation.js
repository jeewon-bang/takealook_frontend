import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

const Recomendation = (props) => {
  const { myCats, setMyCats, match, setMatch } = props;
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
        {match &&
          match.matchcatIds.map((id) => (
            <SwiperSlide>
              <p>{id.matchcatIds}</p>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recomendation;
