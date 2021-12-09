import React from 'react';
import './WriteGuide.scss';

const Writeguide = (props) => {
  const { setShowModal } = props;

  // 캘린더 모달창 끄는 함수
  const closeModal = (e) => {
    e.target.className === 'modal-wrapper'
      ? setShowModal(false)
      : setShowModal(true);
  };

  return (
    <div className='modal-background' onClick={closeModal}>
      <div className='modal-wrapper'>
        <div className='guide'>
          <div className='guide-header'>
            <font font-size='6'>
              <strong>게시글 작성 가이드</strong>
            </font>
          </div>
          <div className='guide-body'>
            <ul>
              <li>카테고리는 필수로 선택해야 합니다.</li>
              <li>제목과 본문 글 작성은 필수로 입력해야 합니다.</li>
              <li>제목은 최대 255자까지 입력 가능합니다.</li>
              <li>본문은 최대 1000자까지 입력 가능합니다.</li>
              <li>최대 10개의 사진을 추가할 수 있습니다.</li>
            </ul>
            <hr className='dot' />
            <font size='3'>
              <strong>사진 업로드</strong>
            </font>
            <ul>
              <li>
                사진은 한번에 최대 10MB까지의 파일을 업로드할 수 있습니다.
              </li>
              <li>
                업로드된 사진을 클릭하면 사진 변경 및 태그 수정이 가능합니다.
              </li>
            </ul>
            <hr className='dot' />
            <span>
              <font color='#ffa800'>
                <strong>도와주세요</strong>&nbsp;
              </font>
              게시판의 콘텐츠는&nbsp;
              <font color='#ffa800'>
                <strong>관리자 검수후 업로드</strong>
              </font>
              되며 부적절한 게시물임이 확인될 경우 임의로 삭제될 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writeguide;
