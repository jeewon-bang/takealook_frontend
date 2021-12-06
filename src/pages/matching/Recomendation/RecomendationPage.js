import MatchingNav from 'components/matching/subnav/MatchingNav';
import React, { useState } from 'react';

import SwiperCore, { Navigation, Pagination, Swiper } from 'swiper';
import { SwiperSlide } from 'swiper/react';

import Recomendation from 'components/matching/recomendation/Recomendation';
import MyCatCard from 'components/matching/mycat/MyCatCard';

const RecomendationPage = () => {
  SwiperCore.use([Navigation, Pagination]);
  let mycatData = [
    {
      mycatId: 1,
      mycatname: '보리',
      mycatchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
      mycatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
    },
    {
      mycatId: 2,
      mycatname: '리태',
      mycatchar: '기여운리태',
      mycatimgs: [
        { img: require('images/ritae1.jpg') },
        { img: require('images/ritae1.jpg') },
        { img: require('images/ritae1.jpg') },
      ],
    },
    {
      mycatId: 3,
      mycatname: '율무',
      mycatchar: '기여운율무',
      mycatimgs: [
        { img: require('images/yulmu1.jpg') },
        { img: require('images/yulmu1.jpg') },
        { img: require('images/yulmu1.jpg') },
      ],
    },
  ];

  let matchData = [
    {
      mycatId: 1,

      matchcatId: 2,
      matchcatname: '치즈',
      matchcatchar: '치즈냥',
      matchcatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
    },
    {
      mycatId: 1,
      mycatname: '보리',
      mycatchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
      mycatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
      matchcatId: 3,
      matchcatname: '치즈2',
      matchcatchar: '치즈냥2',
      matchcatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
    },
    {
      mycatId: 1,
      mycatname: '보리',
      mycatchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
      mycatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
      matchcatId: 4,
      matchcatname: '치즈3',
      matchcatchar: '치즈냥3',
      matchcatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
    },
  ];

  let recomendationData = [
    {
      mycatId: 1,
      matchcatIds: [{ matchcatId: 2 }, { matchcatId: 3 }, { matchcatId: 4 }],
    },
    {
      mycatId: 2,
      matchcatIds: [{ matchcatId: 5 }, { matchcatId: 6 }],
    },
  ];

  const [myCats, setMyCats] = useState(mycatData);
  // const [matchCats, setMatchCats] = useState(matchcatData);
  const [match, setMatch] = useState(recomendationData);

  return (
    <div>
      <MatchingNav />
      <hr />
      <p class='mat-p'>혹시 같은 고양이를 돌보고 있나요?</p>
      {match &&
        match.map((match) => (
          <div class='mat-container'>
            <div class='matchBox'>
              <div class='match1'>
                {/* <MyCatCard myCats={myCats} setMyCats={setMyCats} /> */}
              </div>

              <div class='match3'>
                {/* <Recomendation
                  myCats={myCats}
                  setMyCats={setMyCats}
                  match={match}
                  setMatch={setMatch}
                /> */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecomendationPage;
