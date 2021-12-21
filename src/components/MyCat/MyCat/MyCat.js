import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './MyCat.scss';

const MyCat = (props) => {
	const { cats } = props;
	const today = moment();
	const timeDiff = (date) => {
		return Math.floor(
			moment.duration(today.diff(moment(date, 'yyyy-MM-DD HH:mm'))).asHours()
		);
	};
	return (
		<div>
			{cats ? (
				cats.map((cat) => (
					<Link class='cat-detail' to={`/mycat/${cat.id}`}>
						<div class='cat'>
							<div class='cat-body-left'>
								<img class='catimg' src={cat.mainImage} alt='cat' />
							</div>

							<div class='cat-body-right'>
								<span class='cat-name'>{cat.name}</span>

								<span class='cat-status'>
									{cat.status === 0 ? '건강함' : '치료 필요'}
								</span>

								{cat.recentCares.length > 0 ? (
									cat.recentCares.map((care) => (
										<div class='care'>
											{(() => {
												switch (care.type) {
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
																src={
																	require('images/first-aid-kit.png').default
																}
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

											<div class='time'>{timeDiff(care.createdAt)}시간 전</div>
											<div class='message'>{care.message}</div>
										</div>
									))
								) : (
									<div>최근 돌봄기록이 없습니다.</div>
								)}
							</div>
						</div>
					</Link>
				))
			) : (
				<div>등록된 고양이가 없습니다.</div>
			)}
		</div>
	);
};

export default MyCat;
