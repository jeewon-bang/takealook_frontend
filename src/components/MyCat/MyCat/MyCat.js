import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './MyCat.scss';

const MyCat = (props) => {
  const { cats, setCats } = props;
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
          <Link class='cat-detail' to={`/mycat/${cat.id}`}>
            <div class='cat'>
              <div class='cat-body-left'>
                <img class='catimg' src={cat.image.default} alt='cat' />
              </div>
              <div class='cat-body-right'>
                <span class='cat-name'>{cat.name}</span>
                <span class='cat-status'> {cat.catStatus}</span>
                {cat.catCare.map((v) => (
                  <div class='care'>
                    {(() => {
                      switch (v.type) {
                        case 0:
                          return (
                            <img
                              class='icon'
                              src={require('images/cat-food1.png').default}
                              alt='cat'
                            />
                          );
                        case 1:
                          return (
                            <img
                              class='icon'
                              src={require('images/cat-food2.png').default}
                              alt='cat'
                            />
                          );
                        case 2:
                          return (
                            <img
                              class='icon'
                              src={require('images/pill.png').default}
                              alt='cat'
                            />
                          );
                        case 3:
                          return (
                            <img
                              class='icon'
                              src={require('images/first-aid-kit.png').default}
                              alt='cat'
                            />
                          );
                        case 4:
                          return (
                            <img
                              class='icon'
                              src={
                                require('images/water-dispenser.png').default
                              }
                              alt='cat'
                            />
                          );
                        default:
                          return '케어타입이 없습니다.';
                      }
                    })()}

                    <div class='time'>{timeDiff(v.time)}시간 전</div>
                    <div class='message'>{v.message}</div>
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
