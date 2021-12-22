import './MyLeftCat.scss';

const MyLeftCat = (props) => {
  const { catName, catImg, message } = props;

  return (
    <div>
      <div class='catCard'>
        <img class='catimg' src={catImg} alt='cat' />
        <p class='cat-name'>{catName}</p>
        <p class='cat-message'>{message}</p>
      </div>
    </div>
  );
};

export default MyLeftCat;
