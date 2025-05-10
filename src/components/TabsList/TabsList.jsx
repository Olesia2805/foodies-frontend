import styles from './TabsList.module.css';

const TabsList = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={styles.tabsList}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${tab.id === activeTab ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
export default TabsList;
