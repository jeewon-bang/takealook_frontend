import MatchCatCard from 'components/Matching/MatchCatCard/MatchCatCard';
import MyCatCard from 'components/Matching/MyCatCard/MyCatCard';
import MatchingNav from 'components/Matching/SubNav/MatchingNav';
import React, { useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

const MyMatchingPage = () => {
  SwiperCore.use([Navigation, Pagination]);

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
      status: 1,
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
      status: 2,
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
      status: 3,
    },
  ];

  // const [myCats, setMyCats] = useState(mycatData);
  // const [matchCats, setMatchCats] = useState(matchcatData);
  const [match, setMatch] = useState(matchData);
  return (
    <div>
      <MatchingNav />

      <hr />
      {/* 수락대기중/거절됨/수락됨 */}
      <p class='mat-p'>보낸 요청이 대기중입니다😺</p>
      {match &&
        match.map((match) => (
          <div class='content-container'>
            <div class='matchBox'>
              <div class='match1'>
                <MyCatCard match={match} setMatch={setMatch} />
              </div>

              <div class='match2'>
                <MatchCatCard match={match} setMatch={setMatch} />
                {(() => {
                  switch (match.status) {
                    case 1:
                      return <p>수락대기중</p>;
                    case 2:
                      return <p>거절됨</p>;
                    case 3:
                      return <p>수락됨</p>;
                    default:
                      return null;
                  }
                })()}

                <button class='match-btn'>요청취소</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyMatchingPage;
