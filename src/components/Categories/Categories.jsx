import CategoryList from '../CategoryList/CategoryList';
import css from './Categories.module.css';

const Categories = ({ onCategorySelect }) => {
  return (
    <div>
      <h2 className={css.title}>Categories</h2>
      <p className={css.description}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </p>
      <CategoryList onCategorySelect={onCategorySelect}></CategoryList>
    </div>
  );
};

export default Categories;
