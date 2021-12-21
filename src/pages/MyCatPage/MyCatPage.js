import axiosInstance from 'api/customAxios';
import axios from 'axios';
import MyCat from 'components/MyCat/MyCat/MyCat';
import MyLeftCat from 'components/MyCat/MyLeftCat/MyLeftCat';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyCatPage.scss';

const MyCatPage = () => {
  const [myCats, setMyCats] = useState([]);
  const [adoptedCats, setAdoptedCats] = useState([]);
  const [catStar, setCatStar] = useState([]);
  const [selectType, setSelectType] = useState('mycat');
  const [loaded, setLoaded] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const sortHandler = (e) => {
    console.log(e.target.value);

    const value = e.target.value;
    switch (value) {
      case 'mycat':
        moveToMycat();
        break;
      case 'adopted':
        moveToAdopted();
        break;
      case 'cat-star':
        moveToCatstar();
        break;
      default:
        break;
    }
  };

  const moveToMycat = () => {
    setSelectType('mycat');
  };

  const moveToAdopted = () => {
    setSelectType('adopted');
  };

  const moveToCatstar = () => {
    setSelectType('cat-star');
  };

  useEffect(() => {
    axios
      .all([
        axiosInstance.get(`/user/${user.id}/cats`),
        axiosInstance.get(`/user/${user.id}/cat-stars`),
        axiosInstance.get(`/user/${user.id}/adopted`),
      ])
      .then(
        axios.spread((myCatsRes, adoptedCatsRes, catStarRes) => {
          setMyCats(myCatsRes.data);
          setAdoptedCats(adoptedCatsRes.data);
          setCatStar(catStarRes.data);
          setLoaded(true);
        })
      );
  }, []);

  return loaded ? (
    <div className='mycat-container'>
      <div className='mycat-sorting'>
        <select name='choice' className='sorting' onChange={sortHandler}>
          <option value='mycat' className='option'>
            내 고양이
          </option>
          <option value='adopted' className='option'>
            입양된 고양이
          </option>
          <option value='cat-star' className='option'>
            고양이 별
          </option>
        </select>
      </div>
      <Link to='/mycat/new'>
        <button className='new-cat-button'>새 고양이 등록</button>
      </Link>
      {(() => {
        switch (selectType) {
          case 'mycat':
            return <MyCat cats={myCats} />;
          case 'adopted':
            return (
              <div className='catCard-container'>
                {adoptedCats.map((cat) => (
                  <MyLeftCat
                    catId={cat.id}
                    catName={cat.name}
                    catImg={cat.image}
                  />
                ))}
              </div>
            );
          case 'cat-star':
            return (
              <div className='catCard-container'>
                {catStar.map((cat) => (
                  <MyLeftCat
                    catId={cat.id}
                    catName={cat.name}
                    catImg={cat.image}
                  />
                ))}
              </div>
            );

          default:
            return '잘못된 접근입니다.';
        }
      })()}
    </div>
  ) : (
    <div>로딩중</div>
  );
};

export default MyCatPage;
