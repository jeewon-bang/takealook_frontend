import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Category.scss';
import CategoryBtn from './CategoryBtn';

const Category = (props) => {
  const { posts2, posts, setPosts, activateCat, setActivateCat } = props;

  // const filterHandler = (e) => {
  //   console.log(e.target.value);
  //   const value = e.target.value;
  //   switch (value) {
  //     case '모두보기':
  //       setPosts(posts.filter((post) => post.board === value));
  //       break;
  //     case 'best':
  //       setBoard(1);
  //       break;
  //     case 'find':
  //       setBoard(2);
  //       break;
  //     case 'help':
  //       setBoard(3);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const filterHandler = (e) => {
    console.log(e.target);
    const value = e.target.value;

    value === '모두보기'
      ? setPosts(...posts2)
      : setPosts(posts.filter((post) => post.board === value));
  };

  return (
    <div className='subnav'>
      <Navbar bg='white' variant='white'>
        <Container>
          <Nav className='me-auto'>
            <button onClick={filterHandler} value='모두보기'>
              모두보기
            </button>
            <button onClick={filterHandler} value='전국고양이자랑'>
              전국고양이자랑
            </button>
            <button onClick={filterHandler} value='가출냥찾기'>
              가출냥찾기
            </button>
            {/* <CategoryBtn
              onClick={filterHandler}
              name='모두보기'
              catActive={activateCat === '모두보기' ? true : false}
              handleSetCat={setActivateCat}
            />
            <CategoryBtn
              onClick={filterHandler}
              name='전국고양이자랑'
              catActive={activateCat === '전국고양이자랑' ? true : false}
              handleSetCat={setActivateCat}
            />
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
            {/* <button onClick={filterHandler} value='all'>
              전체보기
            </button>
            <button onClick={filterHandler} value='best'>
              전국고양이자랑
            </button>
            <button onClick={filterHandler} value='find'>
              가출냥찾기
            </button>
            <button onClick={filterHandler} value='help'>
              도와주세요
            </button> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Category;
