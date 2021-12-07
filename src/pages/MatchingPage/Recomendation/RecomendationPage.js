import MatchingNav from 'components/Matching/SubNav/MatchingNav';
import React, { useState } from 'react';

const RecomendationPage = () => {
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

  let recCatData = [
    {
      mycatId: 1,
      recCat: [
        {
          catname: '보리추천냥1',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/bori2.jpg'),
        },
        {
          catname: '보리추천냥2',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/bori2.jpg'),
        },
        {
          catname: '보리추천냥3',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/bori2.jpg'),
        },
        {
          catname: '보리추천냥4',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/bori2.jpg'),
        },
      ],
    },
    {
      mycatId: 2,
      recCat: [
        {
          catname: '리태추천냥1',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/ritae1.jpg'),
        },
        {
          catname: '리태추천냥2',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/ritae1.jpg'),
        },
        {
          catname: '리태추천냥3',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/ritae1.jpg'),
        },
        {
          catname: '리태추천냥4',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/ritae1.jpg'),
        },
      ],
    },
    {
      mycatId: 3,
      recCat: [
        {
          catname: '율무추천냥1',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/yulmu1.jpg'),
        },
        {
          catname: '율무추천냥2',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/yulmu1.jpg'),
        },
        {
          catname: '율무추천냥3',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/yulmu1.jpg'),
        },
        {
          catname: '율무추천냥4',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: require('images/yulmu1.jpg'),
        },
      ],
    },
  ];

  const [myCats, setMyCats] = useState(mycatData);
  // const [matchCats, setMatchCats] = useState(matchcatData);
  const [recCats, setRecCats] = useState(recCatData);

  return (
    <div>
      <MatchingNav />
      <hr />
      <p class='mat-p'>혹시 같은 고양이를 돌보고 있나요?</p>
      {myCats &&
        myCats.map((cat) => (
          <div class='content-container'>
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
