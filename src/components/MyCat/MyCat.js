import moment from 'moment';
import React from 'react';
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
      {cats &&
        cats.map((cat) => (
          <div class='cat'>
            <div class='cat-body-left'>
              <img class='cat' src={cat.image.default} alt='cat' />
              <h1>{cat.name}</h1>
            </div>
            <div class='cat-body-right'>
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
        ))}
    </div>
  );
};

export default MyCat;
