export default function CategoryBtn({ name, catActive, handleSetCat }) {
  return (
    <button
      className={`cat_btn hover ${catActive ? 'active_btn' : null}`}
      onClick={() => handleSetCat(name)}
    >
      {name}
    </button>
  );
}
