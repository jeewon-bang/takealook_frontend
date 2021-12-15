import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './Alarm.scss';

const Alarm = (props) => {
  const { alarm } = props;

  const today = moment();
  const timeDiff = (date) => {
    return Math.floor(
      moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
    );
  };

  return (
    <div class='alarm-container'>
      <h3>
        <span></span>MY 알림
      </h3>
      <div class='alarmListBox'>
        {alarm.map((alarm) => (
          <div class='alarmListV15'>
            <div class='almTodayV15'>
              <p class='boxRd0V15'>{timeDiff(alarm.created_at)}시간 전</p>
            </div>
            <div class='alarmUnitV15'>
              <div class='evtPartV15'>
                {(() => {
                  switch (alarm.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                      return (
                        <Link
                          class='cat-detail'
                          to={`/mycat/${alarm.linkedId}`}
                        >
                          <p>{alarm.message}</p>
                        </Link>
                      );
                    case 8:
                    case 9:
                    case 10:
                      return (
                        <Link
                          class='cat-detail'
                          to={`/community/post/${alarm.linkedId}`}
                        >
                          <p>{alarm.message}</p>
                        </Link>
                      );

                    default:
                      return '알림타입이 없습니다.';
                  }
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;
