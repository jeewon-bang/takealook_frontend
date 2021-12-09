import React, { useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import MatchingNav from 'components/Matching/SubNav/MatchingNav';
import MyCatCard from 'components/Matching/MyCatCard/MyCatCard';
import MatchCatCard from 'components/Matching/MatchCatCard/MatchCatCard';
import '../MatchingPage.scss';

SwiperCore.use([Navigation, Pagination]);

const MatchingPage = () => {
  let matchData = [
    {
      mycatId: 1,
      mycatname: '보리',
      mycatchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
      mycatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
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
  const [match, setMatch] = useState(matchData);
  return (
    <div class='content-container'>
      <MatchingNav />

      <hr />
      <p class='mat-p'>같은 고양이를 돌보고 있다면 요청을 수락해주세요!</p>
      {match &&
        match.map((match) => (
          <div class='content-container'>
            <div class='matchBox'>
              <div class='match1'>
                <MyCatCard
                  mycatname={match.mycatname}
                  mycatimgs={match.mycatimgs}
                  mycatchar={match.mycatchar}
                />
              </div>

              <div class='match2'>
                <MatchCatCard match={match} setMatch={setMatch} />
                {/* 매칭신청수락(patch) */}
                <button class='match-btn'>수락하기</button>
                {/* 매칭신청거절(patch) */}
                <button class='match-btn'>거절하기</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MatchingPage;
