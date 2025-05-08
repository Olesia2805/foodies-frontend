import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchUserInfo,
  fetchUserRecipes,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  // selectUserInfo,
  // selectUserRecipes,
  // selectUserFavorites,
  // selectUserFollowers,
  // selectUserFollowing,
  // selectUserLoading,
  // selectUserError,
} from '../../redux/user';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import { useAuth } from '../../hooks';

export const USER_TABS = [
  { id: 'recipes', label: 'Recipes', visibleTo: 'all' },
  { id: 'favorites', label: 'Favorites', visibleTo: 'self' },
  { id: 'followers', label: 'Followers', visibleTo: 'all' },
  { id: 'following', label: 'Following', visibleTo: 'self' },
];

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('recipes');
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const isCurrentUser = !id;
  const userId = id || currentUser?.id;

  // const loading = useSelector(selectUserLoading);
  // const error = useSelector(selectUserError);

  const visibleTabs = () => {
    return USER_TABS.filter((tab) =>
      isCurrentUser ? true : tab.visibleTo === 'all'
    );
  };

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchUserInfo(userId));
    // dispatch(fetchUserRecipes(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId) return;

    switch (activeTab) {
      case 'recipes':
        dispatch(fetchUserRecipes(userId));
        break;
      case 'favorites':
        dispatch(fetchUserFavorites());
        break;
      case 'followers':
        dispatch(fetchUserFollowers(userId));
        break;
      case 'following':
        dispatch(fetchUserFollowing(userId));
        break;
      default:
        break;
    }
  }, [activeTab, userId, dispatch]);

  return (
    <div>
      <UserTabs
        tabs={visibleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {/* Tab content */}
    </div>
  );
};

const UserTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id && 'active'}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const ProtectedUserPage = withAuthGuard(UserPage);
export default ProtectedUserPage;
