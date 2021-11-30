import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router';
import CareCalendar from '../../components/CareCalendar/CareCalendar';
import CatCare from '../../components/CatDetail/CatCare/CatCare';
import CatInfo from '../../components/CatDetail/CatInfo/CatInfo';
import './CatDetailPage.scss';

let data = [
	{
		id: 1,
		user: '혜민',
		userImg: '',
		time: '2021-11-10 12:40:33',
		type: '사료 급여',
		message: '사료 바꿨어요!',
	},
	{
		id: 2,
		user: '지원',
		userImg: '',
		time: '2021-11-29 22:24:10',
		type: '약 급여',
		message: '',
	},
	{
		id: 3,
		user: '세은',
		userImg: '',
		time: '2021-11-30 10:55:00',
		type: '치료',
		message: '구내염 처방받으러 병원갔다왔어요ㅠㅠ',
	},
];

const MyCatPage = () => {
	const { catId } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [care, setCare] = useState(data);

	return (
		<div className='container'>
			<CatInfo catId={catId} />
			<CatCare
				catId={catId}
				showModal={showModal}
				setShowModal={setShowModal}
				care={care}
				setCare={setCare}
			/>
			{showModal && (
				<CareCalendar
					showModal={showModal}
					setShowModal={setShowModal}
					care={care}
					setCare={setCare}
				/>
			)}
		</div>
	);
};

export default MyCatPage;
