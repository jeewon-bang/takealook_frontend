import React from 'react';
import './Sorting.scss';

const Sorting = (props) => {
  const { posts, setPosts } = props;

  const sortHandler = (e) => {
    const value = e.target.value;
    switch (value) {
      case 'lately':
        sortByCreated_At();
        break;
      case 'past':
        sortByReverseCreated_At();
        break;
      case 'like':
        sortByLike();
        break;
      case 'cmt':
        sortByCmt();
        break;
      default:
        break;
    }
  };

  const sortByCreated_At = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return b.postId - a.postId;
    });
    setPosts(sorted);
  };

  const sortByReverseCreated_At = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return a.postId - b.postId;
    });
    setPosts(sorted);
  };

  const sortByLike = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return b.postLike - a.postLike;
    });
    setPosts(sorted);
  };

  const sortByCmt = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return b.commentListCount - a.commentListCount;
    });
    setPosts(sorted);
  };

  return (
    <div>
      <select
        name='sorting'
        id='sorting'
        className='sorting'
        onChange={sortHandler}
      >
        <option defaultValue='' className='option' selected disabled hidden>
          - 정렬 -
        </option>
        <option value='lately' className='option'>
          최근순
        </option>
        <option value='past' className='option'>
          과거순
        </option>
        <option value='like' className='option'>
          좋아요순
        </option>
        <option value='cmt' className='option'>
          댓글순
        </option>
      </select>
    </div>
  );
};

export default Sorting;
