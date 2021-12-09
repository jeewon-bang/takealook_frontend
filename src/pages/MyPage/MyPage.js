import axios from 'axios';
import Alarm from 'components/MyPageForm/Alarm/Alarm';

import React, { useState, useEffect } from 'react';
import './MyPage.scss';

const MyPage = () => {
  let postData = [
    {
      id: 1,
      writer: '혜민',
      title: '노릇노릇',
      content: '보리전이 익어간다',
      modified_at: '2021-11-22',
      board: '전국고양이자랑',
    },
  ];

  let notiData = [
    {
      id: 1,
      message: ' 지원님이 율무에게 돌봄이력을 추가했습니다.',
      type: 1,
      created_at: '2021-11-22',
      checked: 1,
    },
    {
      id: 2,
      message: '내 게시글에 새로운 댓글이 달렸습니다',
      type: 2,
      created_at: '2021-11-23',
      checked: 2,
    },
  ];
  const [posts, setPosts] = useState(postData);
  const [alarm, setAlarm] = useState(notiData);

  return (
    <div class='mypage-container'>
      <div class='section1'>
        <img
          class='img-circle'
          src={require('images/happy.png').default}
          alt='cat'
        />
        <p>
          <span>박세은</span>
        </p>
      </div>
      {posts &&
        posts.map((post) => (
          <div class='section2'>
            {/* 나의 게시물 5개 */}
            <div class='article'>
              <div class='block-title'>
                <h2>나의 게시글</h2>

                <button onclick='/'>더보기</button>
              </div>
            </div>
            {/* 좋아요 5개 */}
            <div class='article'>
              <div class='block-title'>
                <h2>좋아한 게시글</h2>
                <button onclick='/'>더보기</button>
              </div>
              <div class='active-list'>
                <ul class='list-v0 list-v2'>
                  <li class='active'>
                    <div class='list-title'>
                      <p>
                        [<span>{post.board}</span>]
                      </p>
                    </div>
                    <ul class='22'>
                      <li class='subject'>
                        {/* 상세페이지로 이동하기 */}
                        {post.title}
                      </li>
                      <li>
                        <ul>
                          <li>
                            <span>{post.modified_at}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div
                      class='profile'
                      onclick="location.href='/follower/4160/home?page=1'"
                    >
                      <p>{post.writer}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      <div class='section-alarm'>
        <Alarm alarm={alarm} />
      </div>
    </div>
  );
};

export default MyPage;
