import React from 'react';
import styles from './ListItems.module.css';

const ListItems = ({ items = [], renderItem, activeTab }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && activeTab === 1 && <div className={styles.divider}></div>} {/* Divider only for followers */}
          <li className={styles.item}>{renderItem(item, index)}</li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ListItems;