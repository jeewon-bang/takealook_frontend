import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Category.scss';
import CategoryBtn from './CategoryBtn';

const Category = (props) => {
  const { posts, setPosts } = props;

  const filterHandler = (e) => {
    console.log(e.target.value);

    const value = e.target.value;
    switch (value) {
      case '모두보기':
        sortByCreated_At();
        break;
      case '전국고양이자랑':
        sortByReverseCreated_At();
        break;
      case '가출냥찾기':
        sortByLike();
        break;
      case '도와주세요':
        sortByCmt();
        break;
      default:
        break;
    }
  };

  const [postList, setPostList] = useState(posts);

  const sortByCreated_At = () => {
    const filtered = [...posts];
    const c = filtered.filter((post) => {
      return post.board === '모두보기';
    });
    setPostList(c);
  };
  const sortByReverseCreated_At = () => {
    const filtered = [...posts];
    const c = filtered.filter((post) => {
      return post.board === '전국고양이자랑';
    });
    setPostList(c);
    console.log(posts);
  };
  const sortByLike = () => {
    const filtered = [...posts];
    const c = filtered.filter((post) => {
      return post.board === '가출냥찾기';
    });
    setPosts(c);
    console.log(posts);
  };
  const sortByCmt = () => {
    const filtered = [...posts];
    const c = filtered.filter((post) => {
      return post.board === '도와주세요';
    });
    setPosts(c);
  };

  return (
    <div className='subnav'>
      <Navbar bg='white' variant='white'>
        <Container>
          <Nav className='me-auto'>
            <button
              className='category'
              onClick={filterHandler}
              value='모두보기'
            >
              모두보기
            </button>
            <button
              className='category'
              onClick={filterHandler}
              value='전국고양이자랑'
            >
              전국고양이자랑
            </button>
            <button
              className='category'
              onClick={filterHandler}
              value='가출냥찾기'
            >
              가출냥찾기
            </button>
            <button
              className='category'
              onClick={filterHandler}
              value='도와주세요'
            >
              도와주세요
            </button>
            {/* <CategoryBtn
              name='모두보기'
              catActive={activeCat === '모두보기' ? true : false}
              handleSetCat={setActivateCat}
            />
            <CategoryBtn
              name='전국고양이자랑'
              catActive={activeCat === '전국고양이자랑' ? true : false}
              handleSetCat={setActivateCat}
            /> */}
            {/*
            <CategoryBtn
              name='가출냥찾기'
              catActive={activateCat === '가출냥찾기' ? true : false}
              handleSetCat={setActivateCat}
            />
            <CategoryBtn
              name='도와주세요'
              catActive={activateCat === '도와주세요' ? true : false}
              handleSetCat={setActivateCat}
            /> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Category;
