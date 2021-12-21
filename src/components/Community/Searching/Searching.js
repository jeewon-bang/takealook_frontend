import axiosInstance from 'api/customAxios';
import React, { useState } from 'react';
import './Searching.scss';

const Searching = (props) => {
  const { search, setSearch, setPosts, setLoaded } = props;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEnter = () => {
    if (!search) {
      alert('검색어를 입력해주세요!');
    } else {
      console.log(search);

      axiosInstance
        .get(`/post/search?search=${search}`)
        .then((res) => {
          console.log(res);
          setPosts(res.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div class='list-search'>
        <i class='fas fa-search'></i>
        <input
          className='list-searching-ipt'
          type='text'
          onChange={handleSearch}
          onKeyPress={handleEnter}
        />
      </div>
    </div>
  );
};

export default Searching;
