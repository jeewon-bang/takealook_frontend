import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SubNav.css';

const SubNav = () => {
  const [textColor, setTextColor] = useState('#000');

  const onClickChangeTextColor = (e) => {
    setTextColor(textColor === '#000' ? '#ffa800' : '#000');
  };

  let navlink = document.getElementById('nav-link');

  return (
    <div>
      <Navbar bg='white' variant='white'>
        <Container>
          <Nav className='me-auto'>
            <Link to='/all' className='nav-link'>
              전체보기
            </Link>
            <Link to='/bestcat' className='nav-link'>
              전국고양이자랑
            </Link>
            <Link to='/findcat' className='nav-link'>
              가출냥찾기
            </Link>
            <Link to='/helpcat' className='nav-link'>
              도와주세요
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default SubNav;
