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
      return b.id - a.id;
    });
    setPosts(sorted);
  };

  const sortByReverseCreated_At = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return a.id - b.id;
    });
    setPosts(sorted);
  };

  const sortByLike = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return b.like - a.like;
    });
    setPosts(sorted);
  };

  const sortByCmt = () => {
    const sorted = [...posts];
    sorted.sort(function (a, b) {
      return b.comment - a.comment;
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
