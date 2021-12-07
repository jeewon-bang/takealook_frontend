import React, { useState } from 'react';
import Category from 'components/Community/Category/Category';
import './PostWritePage.scss';
import WriteCategory from 'components/Community/Writes/WriteCategory/WriteCategory';
import Editor from 'components/Community/Writes/WriteEditor/Editor';
import Writeguide from 'components/Community/Writes/WriteGuide/WriteGuide';
import WriteGuidebtn from 'components/Community/Writes/WriteGuide/WriteGuidebtn';
import WriteThumbnail from 'components/Community/Writes/WriteThumbnail/WriteThumbnail';
import WriteTitle from 'components/Community/Writes/WriteTitle/WriteTitle';
import CatImageUpload from 'components/CatRegister/CatImageUpload/CatImageUpload';

const PostWritePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [catImg, setCatImg] = useState([]);
  const [category, setCategory] = useState();

  return (
    <div>
      <Category />
      <hr />
      <div className='write-wrapper'>
        <div className='header'>
          <WriteCategory setCategory={setCategory} />
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
          // onClick={async () => console.log(await postPost)}
        >
          글쓰기 완료 백으로 보내줘~~
        </button>
      </div>
    </div>
  );
};

export default PostWritePage;
