import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchUserInfo,
  fetchUserRecipes,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  selectUserRecipes,
  selectUserFavorites,
  selectUserFollowers,
  selectUserFollowing,
  selectUserLoading,
  selectUserError,
} from '../../redux/user';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import { useAuth } from '../../hooks';
import TabsList from '../../components/TabsListExample/TabsList.jsx';
import TabsContent from '../../components/TabsContent/TabsContent.jsx';
import ListRecipeCard from '../../components/ListRecipeCard/ListRecipeCard.jsx';
import {
  USER_TABS,
  USER_TABS_DATA,
  USER_TABS_MESSAGES,
} from '../../constants/userTabs.js';

const UserPageExample = () => {
  const [activeTab, setActiveTab] = useState(USER_TABS.RECIPES);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const isUrlOwnProfile = !id;
  const userId = isUrlOwnProfile ? currentUser?.id : id;

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchUserInfo(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId) return;

    switch (activeTab) {
      case USER_TABS.RECIPES:
        dispatch(fetchUserRecipes(userId));
        break;
      case USER_TABS.FAVORITES:
        dispatch(fetchUserFavorites());
        break;
      case USER_TABS.FOLLOWERS:
        dispatch(fetchUserFollowers(userId));
        break;
      case USER_TABS.FOLLOWING:
        dispatch(fetchUserFollowing(userId));
        break;
      default:
        break;
    }
  }, [activeTab, userId, dispatch]);

  const recipes = useSelector(selectUserRecipes);
  const favorites = useSelector(selectUserFavorites);
  const followers = useSelector(selectUserFollowers);
  const following = useSelector(selectUserFollowing);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const visibleTabs = useMemo(() => {
    return USER_TABS_DATA.filter((tab) =>
      isUrlOwnProfile ? true : tab.visibleTo === 'all'
    );
  }, [isUrlOwnProfile]);

  const tabsConfig = {
    [USER_TABS.RECIPES]: {
      items: recipes.data,
      renderItem: ListRecipeCard,
      emptyMessage: USER_TABS_MESSAGES.NO_RECIPES,
      showDivider: false,
    },
    [USER_TABS.FAVORITES]: {
      items: favorites.data,
      renderItem: ListRecipeCard,
      emptyMessage: USER_TABS_MESSAGES.NO_FAVORITES,
      showDivider: false,
    },
    [USER_TABS.FOLLOWERS]: {
      items: followers.data,
      renderItem: ListRecipeCard,
      emptyMessage: USER_TABS_MESSAGES.NO_FOLLOWERS,
      showDivider: true,
    },
    [USER_TABS.FOLLOWING]: {
      items: following.data,
      renderItem: ListRecipeCard,
      emptyMessage: USER_TABS_MESSAGES.NO_FOLLOWING,
      showDivider: true,
    },
  };

  return (
    <div>
      <TabsList
        tabs={visibleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <TabsContent
        activeTab={activeTab}
        tabsConfig={tabsConfig}
        loading={loading}
        error={error}
      />
    </div>
  );
};

const ProtectedUserPage = withAuthGuard(UserPageExample);
export default ProtectedUserPage;
