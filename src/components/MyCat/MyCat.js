import React from 'react';
import './MyCat.scss';

const MyCat = (props) => {
  const { cats } = props;
  return (
    <div>
      {cats &&
        cats.map((cat) => (
          <div class='cat'>
            <div class='cat-body-left'>
              {/* <img
                class='cat'
                //실제 파일 가지고 있는 사람 주소/이미지경로?
                src={`${HOST}${cat.image}`}
                alt='cat'
              /> */}
              <img class='cat' src={cat.image.default} alt='cat' />
              <h1>{cat.name}</h1>
            </div>
            <div class='cat-body-right'>
              <h1 class='care'>
                <img
                  class='care'
                  src={require('images/pet-bowl.png').default}
                  alt='cat'
                />
                {cat.username}/{cat.datetime}/{cat.message}
              </h1>
              <h1 class='care'>
                <img
                  class='care'
                  src={require('images/pet-bowl.png').default}
                  alt='cat'
                />
                {cat.username}/{cat.datetime}/{cat.message}
              </h1>
              <h1 class='care'>
                <img
                  class='care'
                  src={require('images/pet-bowl.png').default}
                  alt='cat'
                />
                {cat.username}/{cat.datetime}/{cat.message}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyCat;
