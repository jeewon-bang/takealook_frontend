import MyCatCard from 'components/Matching/MyCatCard/MyCatCard';
import Recomendation from 'components/Matching/Recomendation/Recomendation/Recomendation';
import MatchingNav from 'components/Matching/SubNav/MatchingNav';
import React, { useState } from 'react';
import '../MatchingPage.scss';

const RecomendationPage = () => {
  let recomendationData = [
    {
      mycatId: 1,
      mycatname: '보리',
      mycatchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
      mycatimgs: [
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
        { img: require('images/bori2.jpg') },
      ],
      recCat: [
        {
          catname: '보리추천냥1',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/bori2.jpg') },
            { img: require('images/ritae1.jpg') },
            { img: require('images/yulmu1.jpg') },
          ],
        },
        {
          catname: '보리추천냥2',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/bori2.jpg') },
            { img: require('images/bori2.jpg') },
            { img: require('images/bori2.jpg') },
          ],
        },
        {
          catname: '보리추천냥3',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/bori2.jpg') },
            { img: require('images/bori2.jpg') },
            { img: require('images/bori2.jpg') },
          ],
        },
        {
          catname: '보리추천냥4',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/bori2.jpg') },
            { img: require('images/bori2.jpg') },
            { img: require('images/bori2.jpg') },
          ],
        },
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
      recCat: [
        {
          catname: '리태추천냥1',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
          ],
        },
        {
          catname: '리태추천냥2',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
          ],
        },
        {
          catname: '리태추천냥3',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
          ],
        },
        {
          catname: '리태추천냥4',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
            { img: require('images/ritae1.jpg') },
          ],
        },
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
      recCat: [
        {
          catname: '율무추천냥1',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
          ],
        },
        {
          catname: '율무추천냥2',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
          ],
        },
        {
          catname: '율무추천냥3',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
          ],
        },
        {
          catname: '율무추천냥4',
          catchar: '치즈냥이고 씨유편의점 앞에서 잘 나타납니다',
          catimgs: [
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
            { img: require('images/yulmu1.jpg') },
          ],
        },
      ],
    },
  ];

  const [reco, setReco] = useState(recomendationData);

  return (
    <div class='content-container'>
      <MatchingNav />
      <hr />
      <p class='mat-p'>혹시 같은 고양이를 돌보고 있나요?</p>
      {reco &&
        // 나의 고양이 하나씩 꺼내기
        reco.map((reco) => (
          <div class='content-container'>
            <div class='matchBox'>
              <div class='match1'>
                <MyCatCard
                  mycatname={reco.mycatname}
                  mycatimgs={reco.mycatimgs}
                  mycatchar={reco.mycatchar}
                />
              </div>
              <div class='match2'>
                <Recomendation recCats={reco.recCat} />
                {/* 매칭신청추가(post) */}
                <button class='match-btn'>합치기</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecomendationPage;
