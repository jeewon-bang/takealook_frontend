import React from 'react';
import './Alarm.scss';

const Alarm = (props) => {
  const { alarm } = props;
  return (
    <div>
      <div class='section section3'>
        <div class='article alarmV15'>
          <h3>
            <span></span>MY 알림
          </h3>
          {alarm &&
            alarm.map((alarm) => (
              <div class='alarmListV15'>
                <div class='almTodayV15'>
                  <p class='boxRd0V15'>2021.12.06 (월)</p>
                </div>
                <ul class='alarmUnitV15'>
                  <li class='evtPartV15'>
                    <a href='/event/eventmain.asp?eventid=115634'>
                      <p>{alarm.message}</p>
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          <p class='expire'>수신일로부터 5일이 지난 알림은 자동 삭제됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Alarm;
