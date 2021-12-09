import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './MyCat.scss';

const MyCat = (props) => {
  const { cats, setCats } = props;
  // const { care, setCare } = props;
  const today = moment();
  const timeDiff = (date) => {
    return Math.floor(
      moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
    );
  };
  return (
    <div>
      <Link to='/mycat/new'>새 고양이 등록</Link>
      {cats &&
        cats.map((cat) => (
          <Link to={`/mycat/${cat.id}`}>
            <div class='cat'>
              <div class='cat-body-left'>
                <img class='cat' src={cat.image.default} alt='cat' />
                <h1>{cat.name}</h1>
              </div>
              <div class='cat-body-right'>
                <span class='cat-status'> {cat.catStatus}</span>
                {cat.catCare.map((v) => (
                  <div className='care'>
                    <div className='user-img'></div>
                    <span>{v.user} / </span>
                    <span>{timeDiff(v.time)}시간 전/</span>
                    <span>{v.type} / </span>
                    <span>{v.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MyCat;
