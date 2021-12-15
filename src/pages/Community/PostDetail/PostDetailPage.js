import PostComment from 'components/Community/Post/PostComment/PostComment';
import WritePostComment from 'components/Community/Post/PostComment/WritePostComment';
import PostDetail from 'components/Community/Post/PostDetail/PostDetail';
import React, { useState, useEffect } from 'react';
import './PostDetailPage.scss';
import axios from 'axios';
import axiosInstance from 'api/customAxios';

const PostDetailPage = () => {
  const [postDetails, setPostDetails] = useState([
    {
      id: 0,
      board: '전국고양이자랑',
      like: 10,
      comment: 5,
      created_at: '2021-12-07',
      title:
        '고양이와 함께 하는 재택근무 드디어 편하게 일할 수 있게 되었습니다😻',
      content:
        '사무실에서 냥이들 맨날 노트북 위에 올라와서 행복하지만 현실적으로 바쁜데 ㅠㅠ 신경써야해서 난처했는데 이건 무슨 고양이 터널마냥 ㅋㅋㅋㅋ 공간있어서 냥이들 저 공간으로 지나가거나 앉아있더라구요 ㅋㅎㅎ 노트북 발열때문에 따뜻해지니깐 노곤한지 자고 ㅋㅋㅋ 요즘은 재택근무 땜시 집에 있는데, 집에서도 저희 냥이님이 즐겨 앉아계셔서 다행입니다 :)  ',
      writer: '지혜',
      writer_img: '../../images/bori2.jpg',
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 0,
      board: '전국고양이자랑',
      comment:
        'ㅋㅋㅋㅋㅋ율무도 그래요 그래서 저는 노트북 닫아놓고 모니터 보면서 일한답니다ㅎㅎㅎㅎ',
      created_at: '2021-12-07',
      modefied_at: '',
      writer: '지수',
    },
    {
      id: 1,
      board: '전국고양이자랑',
      comment:
        '노트북 덕분에 따뜻하고, 숨을 수 있는 공간이라는게 고양이 집이 따로 없네요 저기서 잘 있나요?정보좀 주세요 노트북 작업할 때마다 울 냥이가 저랑같이 있고싶은지 컴퓨터 키보드 위에 항상 앉아있어요 저런 곳에 간식 먹으면서 가만히 있으면 엄청 좋을 것 같아요',
      created_at: '2021-12-07',
      modefied_at: '',
      writer: '세은',
    },
    {
      id: 2,
      board: '전국고양이자랑',
      comment: 'zzzzzzzzz율무는 왜 항상 누워있을까?.? ',
      created_at: '2021-12-07',
      modefied_at: '',
      writer: '혜민',
    },
  ]);

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   console.log('PostDetailPage');

  //   axios.all([axiosInstance.get(`/post/1`)]).then(
  //     axios.spread((postDetailRes) => {
  //       setPostDetails(postDetailRes.data);
  //       setLoaded(true);
  //     })
  //   );
  // });

  return (
    <div className='content-container'>
      <div className='post-detail'>
        {postDetails.map((post) => (
          <PostDetail
            id={post.id}
            postDetails={postDetails}
            setPostDetails={setPostDetails}
          />
        ))}
      </div>
      <div className='post-writecomment'>
        <WritePostComment postId={postDetails[0].id} />
      </div>
      <div className='post-listcomment'>
        <h1>
          <font color='#ffa800'>{postDetails[0].comment}</font>
          개의 댓글
        </h1>
        {comments.map((cmt) => (
          <PostComment id={cmt.id} comments={comments} />
        ))}
      </div>
    </div>
    // ) : (
    //   <div>로딩중</div>
  );
};

export default PostDetailPage;
