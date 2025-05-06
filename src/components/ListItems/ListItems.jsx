import styles from './ListItems.module.css';

const ListItems = ({ items, renderItem }) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>No items to display</div>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ListItems;