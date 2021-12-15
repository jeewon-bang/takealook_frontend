import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import CareDetail from '../CareDetail/CareDetail';
import './CareCalendar.scss';

const CareCalendar = (props) => {
	const { careHistory, setCareHistory } = props;

	// 달력의 기준날짜가 될 변수 - 초기값: 현재날짜
	const [date, setDate] = useState(moment());

	// 이전달, 다음달 보여주는 함수
	const jumpToMonth = (num) => {
		if (num) {
			setDate(date.clone().add(30, 'day'));
		} else {
			setDate(date.clone().subtract(30, 'day'));
			console.log('axios 요청전송'); // 이전달 눌렀을 때 이전 달 돌봄기록 요청 전송
		}
	};

	// 달력 생성하는 함수
	const generate = () => {
		const today = date;

		// startOf('month') : 이번 달의 첫번 째 날로 설정
		// week() : 이번 년도의 몇번째 주인지 반환
		const startWeek = today.clone().startOf('month').week();

		// endOf('month').week() : 이번 달의 마지막 날로 설정 한 후 그것이 이번 년도의 몇번째 주인지 체크
		// 만약 이번 해의 첫번째 주(1월 1일이 속한 주)라면 53으로 세팅, 아니라면 그대로 유지
		const endWeek =
			today.clone().endOf('month').week() === 1
				? 53
				: today.clone().endOf('month').week();

		let calendar = [];

		// 시작 주부터 마지막 주까지 +1 씩 증가시킴
		// 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기
		for (let week = startWeek; week <= endWeek; week++) {
			calendar.push(
				<div className='row' key={week}>
					{Array(7)
						.fill(0)
						.map((n, i) => {
							// 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
							let current = today
								.clone()
								.week(week)
								.startOf('week')
								.add(n + i, 'day');

							// 오늘이 current와 같다면 우선 '선택'으로 두자
							let isSelected =
								today.format('YYYYMMDD') === current.format('YYYYMMDD')
									? 'selected'
									: '';

							// 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시
							let isGrayed =
								current.format('MM') !== today.format('MM') ? 'grayed' : '';

							return (
								<div className={`box ${isSelected} ${isGrayed}`} key={i}>
									<span className='text'>{current.format('D')}</span>
									<div>
										{/* {careDaily
											.filter(
												(v) =>
													v.datetime.split(' ')[0] ===
													current.format('yyyy-MM-DD')
											)
											.map((v) => {
												return (
													<CareDetail
														children={v.type}
														message={v.type}></CareDetail>
												);
											})} */}

										<CareDetail
											careType={0}
											careList={careHistory.filter(
												(v) =>
													v.createdAt.split('T')[0] ===
														current.format('yyyy-MM-DD') && v.type === 0
											)}></CareDetail>
										<CareDetail
											careType={1}
											careList={careHistory.filter(
												(v) =>
													v.createdAt.split('T')[0] ===
														current.format('yyyy-MM-DD') && v.type === 1
											)}></CareDetail>
										<CareDetail
											careType={2}
											careList={careHistory.filter(
												(v) =>
													v.createdAt.split('T')[0] ===
														current.format('yyyy-MM-DD') && v.type === 2
											)}></CareDetail>
										<CareDetail
											careType={3}
											careList={careHistory.filter(
												(v) =>
													v.createdAt.split('T')[0] ===
														current.format('yyyy-MM-DD') && v.type === 3
											)}></CareDetail>
									</div>
								</div>
							);
						})}
				</div>
			);
		}
		return calendar;
	};

	return (
		<div className='calendar'>
			<div className='calendar-head'>
				<div className='head'>
					<button onClick={() => jumpToMonth(0)}>◁</button>
					<span className='title'>{date.format('MMMM YYYY')}</span>
					<button onClick={() => jumpToMonth(1)}>▷</button>
				</div>
			</div>

			<div className='calendar-body'>
				<div className='row'>
					{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((el) => (
						<div className='box-head' key={el}>
							<span className='text'>{el}</span>
						</div>
					))}
				</div>
				{generate()}
			</div>
		</div>
	);
};

export default CareCalendar;
