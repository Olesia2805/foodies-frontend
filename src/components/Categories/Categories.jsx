// src/components/Categories/Categories.jsx (заглушка)
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories
} from '../../redux/common/index.js';
import {
  selectCategories,
  selectIsCommonLoading
} from '../../redux/common/index.js';
import styles from './Categories.module.css';

const Categories = ({ onCategorySelect }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsCommonLoading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <div className={styles.loading}>Loading categories...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.categoryCard}
            onClick={() => onCategorySelect(category)}
          >
            <h3 className={styles.categoryName}>{category.name}</h3>
            {category.description && (
              <p className={styles.categoryDescription}>{category.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;