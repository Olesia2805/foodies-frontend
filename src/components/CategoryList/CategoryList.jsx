import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoriesError,
  fetchCategories,
} from '../../redux/categories/index.js';
import css from './CategoryList.module.css';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

const CategoryList = ({ onCategorySelect }) => {
  const categoryClasses = [
    'div1',
    'div2',
    'div3',
    'div4',
    'div5',
    'div6',
    'div7',
    'div8',
    'div9',
    'div10',
    'div11',
    'div12',
    'div13',
    'div14',
    'div15',
    'div16',
  ];

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={css.categoriesLoader}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className={css.categoriesContainer}>
      <ul className={css.categoriesContainer}>
        {categories.map((cat, index) => (
          <li
            key={cat._id}
            className={`${css.card} ${css[categoryClasses[index]]}`}
            style={{ backgroundImage: `url(${cat.thumb})` }}
          >
            <div className={css.chip}>
              <div className={css.nameWrapper}>
                <span className={css.name}>{cat.name}</span>
              </div>
              <button
                className={css.arrowButton}
                onClick={() =>
                  onCategorySelect({
                    id: cat._id,
                    name: cat.name,
                    description: cat.description,
                  })
                }
              >
                <Icon
                  name="arrow-up-right"
                  className={css.arrowIcon}
                  size={18}
                />
              </button>
            </div>
          </li>
        ))}
        <li
          key="all"
          onClick={() =>
            onCategorySelect({
              id: 'all',
              name: null,
              description: null,
            })
          }
          className={`${css.card} ${css[categoryClasses[categories.length]]} ${css.allCard}`}
        >
          <p className={css.allCategoriesText}>All Categories</p>
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;
