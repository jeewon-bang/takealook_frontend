import React, { useState } from 'react';
import * as addr from '../../data/address';

const Location = (props) => {
	const [sidoList, setSidoList] = useState(
		['선택'].concat(addr.SIDO.map((v) => v.sido))
	);
	const [gugunList, setGugunList] = useState(['선택']);
	const [dongList, setDongList] = useState(['선택']);

	const [sido, setSido] = useState('');
	const [gugun, setGugun] = useState('');
	const [dong, setDong] = useState('');

	const selectSido = (e) => {
		setSido(e.target.value);
		setGugunList(
			// 선택한 시도에 해당하는 구군 리스트 셋팅
			['선택'].concat(
				addr.GUGUN.filter((v) => v.sido === e.target.value).map((v) => v.gugun)
			)
		);
	};
	const selectGUGUN = (e) => {
		setGugun(e.target.value);
		setDongList(
			// 선택한 시도, 구군에 해당하는 동 리스트 셋팅
			['선택'].concat(
				addr.DONG.filter(
					(v) => v.sido === sido && v.gugun === e.target.value
				).map((v) => v.dong)
			)
		);
	};
	const selectDong = (e) => {
		setDong(e.target.value);
	};

	const handleSubmit = () => {
		props.setValues({
			...props.values,
			location: [
				...props.values.location,
				{ sido: sido, gugun: gugun, dong: dong },
			],
		});
	};

	return (
		<div>
			<select id='sido' onChange={selectSido} value={sido}>
				{sidoList.map((v) => (
					<option value={v}>{v}</option>
				))}
			</select>
			<select id='GUGUN' onChange={selectGUGUN} value={gugun}>
				{gugunList.map((v) => (
					<option value={v}>{v}</option>
				))}
			</select>
			<select
				id='dong'
				onChange={selectDong}
				onBlur={handleSubmit}
				value={dong}>
				{dongList.map((v) => (
					<option value={v}>{v}</option>
				))}
			</select>
		</div>
	);
};

export default Location;
