import React, { useState } from 'react';
import * as addr from '../../data/address';

const Location = (props) => {
	const [sidoList, setSidoList] = useState(
		['선택'].concat(addr.SIDO.map((v) => v.sido))
	);
	const [gunguList, setGunguList] = useState(['선택']);
	const [dongList, setDongList] = useState(['선택']);

	const [sido, setSido] = useState('');
	const [gungu, setGungu] = useState('');
	const [dong, setDong] = useState('');

	const selectSido = (e) => {
		setSido(e.target.value);
		setGunguList(
			// 선택한 시도에 해당하는 군구 리스트 셋팅
			['선택'].concat(
				addr.GUNGU.filter((v) => v.sido === e.target.value).map((v) => v.gungu)
			)
		);
	};
	const selectGungu = (e) => {
		setGungu(e.target.value);
		setDongList(
			// 선택한 시도, 군구에 해당하는 동 리스트 셋팅
			['선택'].concat(
				addr.DONG.filter(
					(v) => v.sido === sido && v.gungu === e.target.value
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
				{ sido: sido, gungu: gungu, dong: dong },
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
			<select id='gungu' onChange={selectGungu} value={gungu}>
				{gunguList.map((v) => (
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
