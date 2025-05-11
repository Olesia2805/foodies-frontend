import { useState, useEffect } from 'react';
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
import { deleteRecipe, removeFromFavorites } from '../../redux/recipes';
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

  useEffect(() => {
    if (otherUserData && otherUserData.isFollowed !== undefined) {
      console.log(
        'Setting isFollowing from otherUserData:',
        otherUserData.isFollowed
      );
      setIsFollowing(otherUserData.isFollowed);
    }
  }, [otherUserData]);

  useEffect(() => {
    if (!isOwnProfile && myFollowings && urlUserId) {
      const isUserInFollowings =
        Array.isArray(myFollowings) &&
        myFollowings.some(
          (user) => user.id === urlUserId || user.id === parseInt(urlUserId)
        );

      console.log('Checking if user is in followings:', isUserInFollowings);
      if (isUserInFollowings !== undefined) {
        setIsFollowing(isUserInFollowings);
      }
    }
  }, [myFollowings, urlUserId, isOwnProfile]);

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
        await dispatch(removeFromFavorites(recipeId)).unwrap();
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

  const handleFollowToggle = async () => {
    if (!urlUserId) return;

    try {
      if (isFollowing) {
        await unfollowUser(urlUserId).unwrap();
        setIsFollowing(false);
        toast.success('Unfollowed successfully');
      } else {
        try {
          await followUser(urlUserId).unwrap();
          setIsFollowing(true);
          toast.success('Now following this user');
        } catch (followError) {
          if (followError.status === 409) {
            toast.error('You are already following this user');
            setIsFollowing(true);
          } else {
            throw followError;
          }
        }
      }

      dispatch(
        profileApi.util.updateQueryData('fetchUserById', urlUserId, (draft) => {
          if (draft) draft.isFollowed = !isFollowing;
        })
      );

      refetch();
    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast.error(
        `Failed to update follow status: ${error.data?.message || 'Unknown error'}`
      );
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
