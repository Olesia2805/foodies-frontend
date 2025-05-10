import React from 'react';
import styles from './ListItems.module.css';

const ListItems = ({ items = [], renderItem, emptyMessage, showDivider }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  const RenderItem = renderItem;

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {showDivider && <div className={styles.divider}></div>}
          <RenderItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
