import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchUserInfo,
  fetchUserRecipes,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
  // selectUserInfo,
  selectUserRecipes,
  selectUserFavorites,
  selectUserFollowers,
  selectUserFollowing,
  selectUserLoading,
  selectUserError,
} from '../../redux/user';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import { useAuth } from '../../hooks';
import { USER_TABS, USER_TABS_DATA } from '../../constants/userTabs.js';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState(USER_TABS.RECIPES);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const isCurrentUser = !id;
  const userId = isCurrentUser ? currentUser?.id : id;

  // const userInfo = useSelector(selectUserInfo);
  const recipes = useSelector(selectUserRecipes);
  const favorites = useSelector(selectUserFavorites);
  const followers = useSelector(selectUserFollowers);
  const following = useSelector(selectUserFollowing);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const visibleTabs = useMemo(() => {
    return USER_TABS_DATA.filter((tab) =>
      isCurrentUser ? true : tab.visibleTo === 'all'
    );
  }, [isCurrentUser]);

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

  return (
    <div>
      <UserTabs
        tabs={visibleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {activeTab === USER_TABS.RECIPES && (
            <div>
              {recipes?.data.length > 0 ? (
                <ul>
                  {recipes.data.map((r) => (
                    <li key={r.id}>{r.title}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  Nothing has been added to your recipes list yet. Please browse
                  our recipes and add your favorites for easy access in the
                  future.
                </p>
              )}
            </div>
          )}

          {activeTab === USER_TABS.FAVORITES && (
            <div>
              {favorites.length > 0 ? (
                <ul>
                  {favorites.map((r) => (
                    <li key={r.id}>{r.title}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  Nothing has been added to your favorite recipes list yet.
                  Please browse our recipes and add your favorites for easy
                  access in the future.
                </p>
              )}
            </div>
          )}

          {activeTab === USER_TABS.FOLLOWERS && (
            <div>
              {followers.length > 0 ? (
                <ul>
                  {followers.map((u) => (
                    <li key={u.id}>{u.name}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  There are currently no followers on your account. Please
                  engage our visitors with interesting content and draw their
                  attention to your profile.
                </p>
              )}
            </div>
          )}

          {activeTab === USER_TABS.FOLLOWING && (
            <div>
              {following.length > 0 ? (
                <ul>
                  {following.map((u) => (
                    <li key={u.id}>{u.name}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  Your account currently has no subscriptions to other users.
                  Learn more about our users and select those whose content
                  interests you.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const UserTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? 'active' : ''}
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
