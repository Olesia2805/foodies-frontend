import clsx from 'clsx';
import { USER_TABS } from '../../constants/userTabs';
import styles from './ListItems.module.css';

const ListItems = ({
  items = [],
  renderItem,
  isOwnProfile,
  emptyMessage,
  activeTab,
  onDelete,
}) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  const RenderItem = renderItem;

  return (
    <ul
      className={clsx(
        styles.list,
        (activeTab === USER_TABS.FOLLOWERS ||
          activeTab === USER_TABS.FOLLOWING) &&
          styles.divided
      )}
    >
      {items.map((item) => (
        <li key={item._id} className={styles.item}>
          <RenderItem
            item={item}
            isOwnProfile={isOwnProfile}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
