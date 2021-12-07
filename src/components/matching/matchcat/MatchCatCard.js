import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import './MatchCatCard.scss';

const MatchCatCard = (props) => {
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
        <h1>{match.matchcatname}</h1>
        {match &&
          match.matchcatimgs.map((img) => (
            <SwiperSlide>
              <img class='mat-img' src={img.img.default} alt='cat' />
            </SwiperSlide>
          ))}

        <p class='catChar'>{match.matchcatchar}</p>
      </Swiper>
    </div>
  );
};

export default MatchCatCard;
