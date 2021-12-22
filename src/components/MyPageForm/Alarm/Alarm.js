import axiosInstance from 'api/customAxios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Alarm.scss';

const Alarm = (props) => {
  const { alarm, setAlarm, alarmCount } = props;
  const [notiId, setNotiId] = useState('');

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

  const handleSubmit = () => {
    axiosInstance.get(`/user/${user.id}/notification/20`).then((res) => {
      console.log(res.data);
    });
    console.log(notiId);
  };

  useEffect(() => {
    const sorted = [...alarm];
    sorted.sort(function (a, b) {
      return b.id - a.id;
    });
    setAlarm(sorted);
  }, [alarmCount]);

  return (
    <div class='alarm-container'>
      <h3>
        <span className='alarm-icon'>🔔</span>
        MY 알림
        <span className='alarm-count'>{alarmCount}+</span>
      </h3>
      <div class='alarmListBox'>
        {alarm.map((alarm) => (
          <div class='alarmListV15'>
            <div class='almTodayV15'>
              <p class='boxRd0V15'>{timeDiff(alarm.modifiedAt)}</p>
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
                          <button className='alarm-msg' onClick={handleSubmit}>
                            {notiId}
                            {alarm.message}
                          </button>
                        </Link>
                      );
                    case 6:
                    case 7:
                      return (
                        <Link class='cat-detail' to={`/mycat`}>
                          <button className='alarm-msg' onClick={handleSubmit}>
                            {notiId}
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
                          <button className='alarm-msg' onClick={handleSubmit}>
                            {notiId}
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
        ))}
      </div>
    </div>
  );
};

export default Alarm;
