import React from 'react';
import './Category.scss';

const Category = (props) => {
  const { boardId, setBoardId } = props;

  const handleBoardId = (e) => {
    setBoardId(e.target.value);
  };

  return (
    <div className='category'>
      <ul className='category-ul' onClick={handleBoardId}>
        <li className='category-li' value='0'>
          모두보기
        </li>
        <li className='category-li' value='1'>
          전국고양이자랑
        </li>
        <li className='category-li' value='2'>
          가출냥찾기
        </li>
        <li className='category-li' value='3'>
          도와주세요
        </li>
      </ul>
      {/* <CategoryBtn
              name='모두보기'
              catActive={activeCat === '모두보기' ? true : false}
              handleSetCat={setActivateCat}
            />
            <CategoryBtn
              name='전국고양이자랑'
              catActive={activeCat === '전국고양이자랑' ? true : false}
              handleSetCat={setActivateCat}
            /> */}
      {/*
            <CategoryBtn
              name='가출냥찾기'
              catActive={activateCat === '가출냥찾기' ? true : false}
              handleSetCat={setActivateCat}
            />
            <CategoryBtn
              name='도와주세요'
              catActive={activateCat === '도와주세요' ? true : false}
              handleSetCat={setActivateCat}
            /> */}
    </div>
  );
};

export default Category;
