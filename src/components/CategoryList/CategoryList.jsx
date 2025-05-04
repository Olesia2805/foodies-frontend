import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/operations';
import {
  selectCategories,
  selectIsLoading,
  selectError,
} from '../../redux/categories/selectors';
import css from './CategoryList.module.css';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import categoryImages from './categoryImages';

const CategoryList = ({ onCategorySelect }) => {
  const categoryClasses = [
    'div1', 'div2', 'div3', 'div4', 'div5', 'div6',
    'div7', 'div8', 'div9', 'div10', 'div11', 'div12',
    'div13', 'div14', 'div15', 'div16'
  ];


  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={css.categoriesContainer}>
      {categories.map((cat, index) => (
        <div
          key={cat.id}
          className={`${css.card} ${css[categoryClasses[index]]}`}
          style={{ backgroundImage: `url(${categoryImages[index]})` }}
        >
          <div className={css.chip}>
            <div className={css.nameWrapper}>
              <span className={css.name}>{cat.name}</span>
            </div>
            <button
              className={css.arrowButton}
              onClick={() => onCategorySelect(cat._id)}
            >
              <Icon name="arrow-up-right" className={css.arrowIcon} size={18} />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => onCategorySelect('')}
        className={`${css.card} ${css[categoryClasses[categories.length]]} ${css.allCard}`}
      >
        <p className={css.allCategoriesText}>All Categories</p>
      </button>
    </div>
  );
};

export default CategoryList;
