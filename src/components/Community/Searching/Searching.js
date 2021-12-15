import axiosInstance from 'api/customAxios';
import React, { useState } from 'react';
import './Searching.scss';

const Searching = (props) => {
  // const { setSearch } = props;

  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEnter = () => {
    if (!search) {
      alert('댓글을 입력해주세요!');
    } else {
      console.log(search);

      axiosInstance.post(`/post`, search, {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  return (
    <div>
      <div class='search'>
        <i class='fas fa-search'></i>
        <input type='text' onChange={handleSearch} onKeyPress={handleEnter} />
      </div>
    </div>
  );
};

export default Searching;
