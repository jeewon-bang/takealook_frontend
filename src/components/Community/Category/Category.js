import React from 'react';
import './Category.scss';

const Category = (props) => {
  const { setBoardId } = props;

  const handleBoardId = (e) => {
    setBoardId(e.target.value);
    if (e.target.value === 0) {
      document.getElementById('category1').style.color = '#ffa800';
      document.getElementById('category2').style.color = 'black';
      document.getElementById('category3').style.color = 'black';
      document.getElementById('category4').style.color = 'black';
    } else if (e.target.value === 1) {
      document.getElementById('category1').style.color = 'black';
      document.getElementById('category2').style.color = '#ffa800';
      document.getElementById('category3').style.color = 'black';
      document.getElementById('category4').style.color = 'black';
    } else if (e.target.value === 2) {
      document.getElementById('category1').style.color = 'black';
      document.getElementById('category2').style.color = 'black';
      document.getElementById('category3').style.color = '#ffa800';
      document.getElementById('category4').style.color = 'black';
    } else if (e.target.value === 3) {
      document.getElementById('category1').style.color = 'black';
      document.getElementById('category2').style.color = 'black';
      document.getElementById('category3').style.color = 'black';
      document.getElementById('category4').style.color = '#ffa800';
    }
  };

  return (
    <div className='category'>
      <ul className='category-ul' onClick={handleBoardId}>
        <li className='category-li' value='0' name='모두보기' id='category1'>
          모두보기
        </li>
        <li
          className='category-li'
          value='1'
          name='전국고양이자랑'
          id='category2'
        >
          전국고양이자랑
        </li>
        <li className='category-li' value='2' name='가출냥찾기' id='category3'>
          가출냥찾기
        </li>
        <li className='category-li' value='3' name='도와주세요' id='category4'>
          도와주세요
        </li>
      </ul>
    </div>
  );
};

export default Category;
