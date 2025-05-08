import { useState } from 'react';
import styles from './TabsList.module.css';

const TabsList = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };

  return (
    <div className={styles.tabsListContainer}>
      <div className={styles.tabsList}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${index === activeTab ? styles.active : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsList;