import React from 'react';
import './Sorting.scss';

const Sorting = (props) => {
  const { posts, setPosts } = props;

  const sortHandler = (e) => {
    console.log(e.target.value);

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
      return sorted.indexOf(b) - sorted.indexOf(a);
    });
    setPosts(sorted);
  };

  const sortByReverseCreated_At = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return sorted.indexOf(a) - sorted.indexOf(b);
    }); //왜 과거순은 안되는거같지???
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
        <option value='lately' selected='selected' className='option'>
          최근순
        </option>
        <option value='past' selected='selected' className='option'>
          과거순
        </option>
        <option value='like' selected='selected' className='option'>
          좋아요순
        </option>
        <option value='cmt' selected='selected' className='option'>
          댓글순
        </option>
      </select>
    </div>
  );
};

export default Sorting;
