import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useFetchCurrentUserQuery,
  useFetchUserByIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useFetchUserFollowingsQuery,
  profileApi,
} from '../../redux/auth/profileServices.js';
import { selectUser } from '../../redux/auth/selectors';
import {
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
import {
  deleteRecipe,
  fetchFavoriteRecipes,
  removeFromFavorites,
} from '../../redux/recipes';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import Container from '../../components/Container/Container';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import UserBlock from '../../components/UserBlock/UserBlock.jsx';
import TabsList from '../../components/TabsList/TabsList.jsx';
import TabsContent from '../../components/TabsContent/TabsContent.jsx';
import ListRecipeCard from '../../components/ListRecipeCard/ListRecipeCard.jsx';
import FollowerCard from '../../components/FollowerCard/FollowerCard.jsx';
import {
  USER_TABS,
  USER_TABS_MESSAGES,
  RECIPES_PER_PAGE,
} from '../../constants/userTabs.js';
import styles from './UserPage.module.css';

const FOLLOW_STATUSES_KEY = 'user_follow_statuses';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState(USER_TABS.RECIPES);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { userId: urlUserId } = useParams();
  const currentUser = useSelector(selectUser);

  const { data: myProfileData } = useFetchCurrentUserQuery();
  const currentUserId = myProfileData?.id || currentUser?.id;

  const {
    data: otherUserData,
    isLoading: isUserLoading,
    refetch,
  } = useFetchUserByIdQuery(urlUserId, {
    skip: !urlUserId,
    refetchOnMountOrArgChange: true,
  });

  const { data: myFollowings, isLoading: isFollowingsLoading } =
    useFetchUserFollowingsQuery(currentUserId, {
      skip: !currentUserId,
      refetchOnMountOrArgChange: true,
    });

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation();
  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);

  const isButtonLoading = isFollowLoading || isUnfollowLoading;
  const isDataLoading = isUserLoading || isFollowingsLoading;

  const myEmail = myProfileData?.email || currentUser?.email;
  const isUrlOwnProfile = !urlUserId;
  const preliminaryUserData = isUrlOwnProfile
    ? myProfileData || currentUser
    : otherUserData;
  const isOwnProfile =
    isUrlOwnProfile ||
    (preliminaryUserData?.email &&
      myEmail &&
      preliminaryUserData.email === myEmail);

  const userId = isOwnProfile ? currentUserId : urlUserId;

  const saveToLocalStorage = useCallback(
    (targetUserId, status) => {
      if (!currentUserId || !targetUserId) return;

      try {
        const userIdStr = String(currentUserId);
        const targetIdStr = String(targetUserId);
        let followData = {};
        const stored = localStorage.getItem(FOLLOW_STATUSES_KEY);
        if (stored) {
          followData = JSON.parse(stored);
        }
        if (!followData[userIdStr]) {
          followData[userIdStr] = {};
        }
        followData[userIdStr][targetIdStr] = status;
        localStorage.setItem(FOLLOW_STATUSES_KEY, JSON.stringify(followData));
      } catch (err) {
        console.error('Error saving follow status to localStorage:', err);
      }
    },
    [currentUserId]
  );

  const getFromLocalStorage = useCallback(
    (targetUserId) => {
      if (!currentUserId || !targetUserId) return null;

      try {
        const userIdStr = String(currentUserId);
        const targetIdStr = String(targetUserId);
        const stored = localStorage.getItem(FOLLOW_STATUSES_KEY);
        if (!stored) return null;
        const followData = JSON.parse(stored);
        if (
          followData[userIdStr] &&
          followData[userIdStr][targetIdStr] !== undefined
        ) {
          return Boolean(followData[userIdStr][targetIdStr]);
        }

        return null;
      } catch (err) {
        console.error('Error reading follow status from localStorage:', err);
        return null;
      }
    },
    [currentUserId]
  );

  useEffect(() => {
    if (!isOwnProfile && urlUserId && currentUserId) {
      const localStorageStatus = getFromLocalStorage(urlUserId);
      if (localStorageStatus !== null) {
        setIsFollowing(localStorageStatus);
      } else if (otherUserData && otherUserData.isFollowed !== undefined) {
        setIsFollowing(otherUserData.isFollowed);
        saveToLocalStorage(urlUserId, otherUserData.isFollowed);
      } else if (myFollowings && Array.isArray(myFollowings)) {
        const isInFollowings = myFollowings.some(
          (user) => String(user.id) === String(urlUserId)
        );
        setIsFollowing(isInFollowings);
        saveToLocalStorage(urlUserId, isInFollowings);
      } else {
        setIsFollowing(false);
        saveToLocalStorage(urlUserId, false);
      }
    }
  }, [
    isOwnProfile,
    urlUserId,
    currentUserId,
    getFromLocalStorage,
    saveToLocalStorage,
  ]);

  useEffect(() => {
    if (
      !isOwnProfile &&
      urlUserId &&
      currentUserId &&
      otherUserData &&
      otherUserData.isFollowed !== undefined
    ) {
      const localStorageStatus = getFromLocalStorage(urlUserId);
      if (
        localStorageStatus === null ||
        localStorageStatus !== otherUserData.isFollowed
      ) {
        if (localStorageStatus === null) {
          setIsFollowing(otherUserData.isFollowed);
          saveToLocalStorage(urlUserId, otherUserData.isFollowed);
        }
      }
    }
  }, [
    otherUserData,
    isOwnProfile,
    urlUserId,
    currentUserId,
    getFromLocalStorage,
    saveToLocalStorage,
  ]);

  const handleFollowToggle = async () => {
    if (!urlUserId || isButtonLoading) return;
    try {
      let currentFollowStatus = getFromLocalStorage(urlUserId);
      if (currentFollowStatus === null) {
        currentFollowStatus = isFollowing;
      }
      const newFollowStatus = !currentFollowStatus;
      setIsFollowing(newFollowStatus);
      saveToLocalStorage(urlUserId, newFollowStatus);
      if (currentFollowStatus) {
        await unfollowUser(urlUserId).unwrap();
        toast.success('Unfollowed successfully');
      } else {
        try {
          await followUser(urlUserId).unwrap();
          toast.success('Now following this user');
        } catch (followError) {
          if (followError.status === 409) {
            toast('You are already following this user');
            setIsFollowing(true);
            saveToLocalStorage(urlUserId, true);
          } else {
            setIsFollowing(currentFollowStatus);
            saveToLocalStorage(urlUserId, currentFollowStatus);
            throw followError;
          }
        }
      }
      dispatch(
        profileApi.util.updateQueryData('fetchUserById', urlUserId, (draft) => {
          if (draft) draft.isFollowed = newFollowStatus;
        })
      );
      dispatch(profileApi.util.invalidateTags(['Profile']));
      setTimeout(() => {
        refetch();
      }, 300);

      saveToLocalStorage(urlUserId, newFollowStatus);
      setTimeout(() => {}, 500);
    } catch (error) {
      toast.error(
        `Failed to update follow status: ${error.data?.message || 'Unknown error'}`
      );
      const savedStatus = getFromLocalStorage(urlUserId);
      if (savedStatus !== null) {
        setIsFollowing(savedStatus);
      } else {
        setIsFollowing(false);
        saveToLocalStorage(urlUserId, false);
      }
    }
  };

  useEffect(() => {
    setActiveTab(USER_TABS.RECIPES);
    setCurrentPage(1);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const params = { userId, page: currentPage };

    switch (activeTab) {
      case USER_TABS.RECIPES:
        dispatch(fetchUserRecipes(params));
        break;
      case USER_TABS.FAVORITES:
        dispatch(fetchUserFavorites({ page: currentPage }));
        break;
      case USER_TABS.FOLLOWERS:
        dispatch(fetchUserFollowers(params));
        break;
      case USER_TABS.FOLLOWING:
        dispatch(fetchUserFollowing(params));
        break;
      default:
        break;
    }
  }, [activeTab, userId, currentPage, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (recipeId) => {
    try {
      let updatedTotal;
      if (activeTab === USER_TABS.RECIPES) {
        await dispatch(deleteRecipe(recipeId)).unwrap();
        updatedTotal = recipes.total - 1;
      } else if (activeTab === USER_TABS.FAVORITES) {
        await dispatch(removeFromFavorites(recipeId));
        await dispatch(fetchFavoriteRecipes());
        updatedTotal = favorites.total - 1;
      }

      const newTotalPages = Math.ceil(updatedTotal / RECIPES_PER_PAGE);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }

      toast.success('Recipe removed');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const recipes = useSelector(selectUserRecipes);
  const favorites = useSelector(selectUserFavorites);
  const followers = useSelector(selectUserFollowers);
  const following = useSelector(selectUserFollowing);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const tabs = [
    {
      id: USER_TABS.RECIPES,
      label: `${isOwnProfile ? 'My recipes' : 'Recipes'}`,
      visibleTo: 'all',
    },
    {
      id: USER_TABS.FAVORITES,
      label: `${isOwnProfile ? 'My favorites' : 'Favorites'}`,
      visibleTo: 'self',
    },
    { id: USER_TABS.FOLLOWERS, label: 'Followers', visibleTo: 'all' },
    { id: USER_TABS.FOLLOWING, label: 'Following', visibleTo: 'self' },
  ];

  const visibleTabs = tabs.filter((tab) =>
    isOwnProfile ? true : tab.visibleTo === 'all'
  );

  const tabsConfig = {
    [USER_TABS.RECIPES]: {
      items: recipes.data,
      renderItem: ListRecipeCard,
      emptyMessage: USER_TABS_MESSAGES.NO_RECIPES,
      totalPages: recipes.pages,
    },
    [USER_TABS.FAVORITES]: {
      items: favorites.data,
      renderItem: ListRecipeCard,
      emptyMessage: USER_TABS_MESSAGES.NO_FAVORITES,
      totalPages: favorites.pages,
    },
    [USER_TABS.FOLLOWERS]: {
      items: followers.data,
      renderItem: FollowerCard,
      emptyMessage: USER_TABS_MESSAGES.NO_FOLLOWERS,
      totalPages: followers.pages,
    },
    [USER_TABS.FOLLOWING]: {
      items: following.data,
      renderItem: FollowerCard,
      emptyMessage: USER_TABS_MESSAGES.NO_FOLLOWING,
      totalPages: following.pages,
    },
  };

  return (
    <Container>
      <Breadcrumbs
        items={[{ label: 'Home', link: '/' }, { label: 'Profile' }]}
      />
      <MainTitle title="Profile" />
      <Subtitle subtitle="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <UserBlock
            isDataLoading={isDataLoading}
            isOwnProfile={isOwnProfile}
            openLogOutModal={openLogOutModal}
            handleFollowToggle={handleFollowToggle}
            isButtonLoading={isButtonLoading}
            isFollowing={isFollowing}
            isLogOutModalOpen={isLogOutModalOpen}
            closeLogOutModal={closeLogOutModal}
          />
        </div>

        <div className={styles.rightColumn}>
          <TabsList
            tabs={visibleTabs}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          />
          <TabsContent
            activeTab={activeTab}
            tabsConfig={tabsConfig}
            isOwnProfile={isOwnProfile}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            handleDelete={handleDelete}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </Container>
  );
};

const ProtectedUserPage = withAuthGuard(UserPage);
export default ProtectedUserPage;
