import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Category.scss';

const Category = (props) => {
  const { posts, setPosts } = props;

  const filterHandler = () => {
    const filtered = [...posts];

    setPosts(filtered);
  };
  return (
    <div className='subnav'>
      <Navbar bg='white' variant='white'>
        <Container>
          <Nav className='me-auto'>
            <button onClick={filterHandler}>전체보기</button>
            <button>전국고양이자랑</button>
            <button>가출냥찾기</button>
            <button>도와주세요</button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Category;
