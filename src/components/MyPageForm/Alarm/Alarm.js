import axiosInstance from 'api/customAxios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Alarm.scss';

const Alarm = (props) => {
  const { alarms, setAlarms, alarmCount } = props;
  const [notiId, setNotiId] = useState();
  let id = '';
  const user = useSelector((state) => state.auth.user);

  const today = moment();
  const timeDiff = (date) => {
    const dayDiff = Math.floor(
      moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asDays()
    );
    const hourDiff = Math.floor(
      moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
    );
    const minuteDiff = Math.floor(
      moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asMinutes()
    );
    if (dayDiff === 0) {
      if (hourDiff === 0) {
        return minuteDiff + '분 전';
      } else {
        return hourDiff + '시간 전';
      }
    } else {
      return dayDiff + '일 전';
    }
  };

  const handleSubmit = (e) => {
    console.log(e.target.id);
    axiosInstance
      .get(`/user/${user.id}/notification/${e.target.id}`)
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    const sorted = [...alarms];
    sorted.sort(function (a, b) {
      return b.id - a.id;
    });
    setAlarms(sorted);
  }, [alarmCount]);

  return (
    <div class='alarm-container'>
      {(() => {
        switch (alarmCount) {
          case 0:
            return (
              <div>
                <h3 className='alarm-header'>
                  <span className='alarm-icon'>🔔</span>
                  MY 알림
                </h3>
                <div className='alarm-header-msg'>알림이 없습니다.</div>
              </div>
            );

          default:
            return (
              <h3>
                <span className='alarm-icon'>🔔</span>
                MY 알림
                <span className='alarm-count'>{alarmCount}+</span>
              </h3>
            );
        }
      })()}

      <div class='alarmListBox'>
        {alarms.map((alarm) => (
          <div class='alarmListV15'>
            {(() => {
              switch (alarm.checked) {
                case false:
                  return (
                    <div>
                      <div class='almTodayV15'>
                        <p class='boxRd0V15'>{timeDiff(alarm.createdAt)}</p>
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
                                return (
                                  <Link
                                    class='cat-detail'
                                    to={`/mycat/${alarm.linkedId}`}
                                  >
                                    <button
                                      id={alarm.id}
                                      className='alarm-msg'
                                      onClick={handleSubmit}
                                    >
                                      {alarm.message}
                                    </button>
                                  </Link>
                                );
                              case 6:
                              case 7:
                                return (
                                  <Link class='cat-detail' to={`/mycat`}>
                                    <button
                                      id={alarm.id}
                                      className='alarm-msg'
                                      onClick={handleSubmit}
                                    >
                                      {alarm.message}
                                    </button>
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
                                    <button
                                      id={alarm.id}
                                      className='alarm-msg'
                                      onClick={handleSubmit}
                                    >
                                      {alarm.message}
                                    </button>
                                  </Link>
                                );

                              default:
                                return '알림타입이 없습니다.';
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  );

                default:
                  return '';
              }
            })()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;
