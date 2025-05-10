import ListItems from '../../components/ListItems/ListItems.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Error from '../../components/Error/Error.jsx';

const TabsContent = ({ activeTab, tabsConfig, loading, error }) => {
  const tab = tabsConfig[activeTab];
  console.log('tab items', tab.items);
  return (
    <>
      {loading && <Loader size="small" />}
      {error && <Error message={error} />}
      {!loading && !error && activeTab in tabsConfig && (
        <ListItems
          items={tab.items}
          renderItem={tab.renderItem}
          emptyMessage={tab.emptyMessage}
          showDivider={tab.showDivider}
        />
      )}
    </>
  );
};

export default TabsContent;
