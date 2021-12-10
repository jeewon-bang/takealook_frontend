import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MatchingNav.scss';

const MatchingNav = () => {
  return (
    <div className='subnav'>
      <Navbar bg='white' variant='white'>
        <Container>
          <Nav className='me-auto'>
            <Link to='/recomendation' className='mat-link'>
              매칭추천
            </Link>
            <Link to='/mymatch' className='mat-link'>
              보낸 매칭
            </Link>
            <Link to='/match' className='mat-link'>
              받은 매칭
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MatchingNav;
