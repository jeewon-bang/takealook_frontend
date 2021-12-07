import React, { useState } from 'react';
import { useParams } from 'react-router';
import CatCare from 'components/CatDetail/CatCare/CatCare';
import CatInfo from 'components/CatDetail/CatInfo/CatInfo';
import CatMap from 'components/CatDetail/CatMap/CatMap';
import './CatDetailPage.scss';
import { Link } from 'react-router-dom';

// 0 : 밥, 1: 간식, 2: 약, 3:병원  4:기타
let data = [
	{
		id: 1,
		user: '혜민',
		userImg: '',
		datetime: '2021-11-10 12:40:33',
		type: 0,
		message: '사료 바꿨어요!',
	},
	{
		id: 2,
		user: '지원',
		userImg: '',
		datetime: '2021-11-29 22:24:10',
		type: 2,
		message: '',
	},
	{
		id: 3,
		user: '세은',
		userImg: '',
		datetime: '2021-11-30 10:55:00',
		type: 3,
		message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
	},
	{
		id: 4,
		user: '지수',
		userImg: '',
		datetime: '2021-11-30 14:55:00',
		type: 2,
		message: '츄르 짭짭',
	},
	{
		id: 5,
		user: '지혜',
		userImg: '',
		datetime: '2021-11-30 15:55:00',
		type: 2,
		message: '앗 나도 간식줬는데',
	},

	{
		id: 6,
		user: '혜민',
		userImg: '',
		datetime: '2021-11-30 15:55:00',
		type: 0,
		message: '밥먹자',
	},
	{
		id: 7,
		user: '혜민',
		userImg: '',
		datetime: '2021-11-30 15:55:00',
		type: 1,
		message: '간식먹쟝',
	},
	{
		id: 7,
		user: '지혜',
		userImg: '',
		datetime: '2021-11-30 20:55:00',
		type: 2,
		message: '귀여우니까 간식 또줘야징',
	},
];

const CatDetailPage = () => {
	const { catId } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [careHistory, setCareHistory] = useState(data);

	return (
		<div className='container-wrapper'>
			<div className='container'>
				<CatInfo catId={catId} />
				<CatMap />
				<div class='button-box'>
					<Link to='/mycat/update'>
						<button className='cat-info-update-button'>정보 수정하기</button>
					</Link>
				</div>
				<CatCare
					catId={catId}
					showModal={showModal}
					setShowModal={setShowModal}
					careHistory={careHistory}
					setCareHistory={setCareHistory}
				/>
				<div class='button-box'>
					<Link to='/mycat/update'>
						<button className='cat-info-update-button'>돌봄 기록 추가</button>
					</Link>
				</div>
				{/* {showModal && (
					<CareCalendar
						showModal={showModal}
						setShowModal={setShowModal}
						careHistory={careHistory}
						setCareHistory={setCareHistory}
					/>
				)} */}
			</div>
		</div>
	);
};

export default CatDetailPage;
