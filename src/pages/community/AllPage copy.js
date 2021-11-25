import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const AllPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      posts: '',
      writer: '혜민',
      title: '노릇노릇',
      content: '보리전이 익어간다',
      created_at: '2021-11-22',
      modified_at: '',
      img: 'bori2.jpg',
    },
    {
      id: 2,
      writer: '세은',
      title: '율무야ㅠㅠ',
      content: '율무 너무 귀여워',
      created_at: '2021-11-23',
      modified_at: '',
      img: 'yulmu1.jpg',
    },
    {
      id: 3,
      writer: '지수',
      title: '부비',
      content: '영종도에서 부비를 잃어버렸어요',
      created_at: '2021-11-24',
      modified_at: '',
      img: 'yulmu2.jpg',
    },
    {
      id: 4,
      writer: '지혜',
      title: '서리태',
      content: '서리태 시크냥',
      created_at: '2021-11-25',
      modified_at: '',
      img: '../../images/ritae1.jpg',
    },
  ]);

  return (
    <div>
      <h1>전체보기 페이지</h1>
      <hr />
      {posts.map((post) => (
        <Row
          xs={1}
          md={3}
          className='g-4'
          style={{ padding: '5px', border: 'rounded' }}
        >
          {/* {Array.from({ length: 3 }).map((_, idx) => ( */}
          <Col>
            <Card
              style={{ height: '20rem', width: '14rem', position: 'relative' }}
              border='secondary'
            >
              <Card.Img
                variant='top'
                src={post.img}
                style={{ height: '11rem' }}
              />
              <Card.Body style={{ height: '7rem' }}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                {post.writer} {post.created_at}
              </Card.Footer>
            </Card>
          </Col>
          {/* ))} */}
        </Row>
      ))}
    </div>
  );
};

export default AllPage;
