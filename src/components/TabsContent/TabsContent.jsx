import ListItems from '../../components/ListItems/ListItems.jsx';
import TabsPagination from '../../components/TabsPagination/TabsPagination.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Error from '../../components/Error/Error.jsx';
import styles from './TabsContent.module.css';

const TabsContent = ({
  activeTab,
  tabsConfig,
  isOwnProfile,
  onPageChange,
  currentPage,
  handleDelete,
  loading,
  error,
}) => {
  const tab = tabsConfig[activeTab];

  return (
    <>
      {loading && (
        <div className={styles.loader}>
          <Loader size="small" />
        </div>
      )}
      {error && <Error message={error} />}
      {!loading && !error && activeTab in tabsConfig && (
        <ListItems
          items={tab.items}
          renderItem={tab.renderItem}
          isOwnProfile={isOwnProfile}
          emptyMessage={tab.emptyMessage}
          activeTab={activeTab}
          onDelete={handleDelete}
        />
      )}
      {tab.totalPages > 1 && (
        <TabsPagination
          totalPages={tab.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default TabsContent;
