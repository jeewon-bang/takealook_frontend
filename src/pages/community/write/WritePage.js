import React, { useState } from 'react';
import Category from 'components/community/category/Category';
import SelectCategory from 'components/community/selectcategory/SelectCategory';
import WriteGuidebtn from 'components/community/writeguide/WriteGuidebtn';
import WriteTitle from 'components/community/writetitle/WriteTitle';
import Writeguide from 'components/community/writeguide/WriteGuide';
import './WritePage.scss';
import Editor from 'components/community/writeeditor/Editor';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';
import WriteThumbnail from 'components/community/writethumbnail/WriteThumbnail';
import { postPost } from 'api/communityApi';

const WritePage = () => {
	const [showModal, setShowModal] = useState(false);
	const [catImg, setCatImg] = useState([]);
	const [category, setCategory] = useState();

	return (
		<div>
			<Category />
			<hr />
			<div className='write-wrapper'>
				<div className='header'>
					<SelectCategory setCategory={setCategory} />
					<WriteGuidebtn setShowModal={setShowModal} />
					{showModal && <Writeguide setShowModal={setShowModal} />}
				</div>
				<div className='body'>
					<WriteTitle />
					<Editor />
				</div>
				<div className='footer'>
					<WriteThumbnail />
					<CatImageUpload catImg={catImg} setCatImg={setCatImg} />
				</div>
				<button
					className='write-btn'
					onClick={async () => console.log(await postPost)}>
					글쓰기 완료 백으로 보내줘~~
				</button>
			</div>
		</div>
	);
};

export default WritePage;
