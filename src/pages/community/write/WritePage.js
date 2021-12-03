import React, { useState } from 'react';
import Category from 'components/community/category/Category';
import SelectCategory from 'components/community/selectcategory/SelectCategory';
import WriteGuidebtn from 'components/community/writeguide/WriteGuidebtn';
import WriteTitle from 'components/community/writetitle/WriteTitle';
import Writeguide from 'components/community/writeguide/WriteGuide';
import './WritePage.scss';
import Editor from 'components/community/writeeditor/Editor';

const WritePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Category />
      <hr />
      <div className='write-wrapper'>
        <div className='header'>
          <SelectCategory />
          <WriteGuidebtn setShowModal={setShowModal} />
          {showModal && <Writeguide setShowModal={setShowModal} />}
        </div>
        <div className='body'>
          <WriteTitle />
          <Editor />
        </div>
        <div className='footer'></div>
      </div>
    </div>
  );
};

export default WritePage;
