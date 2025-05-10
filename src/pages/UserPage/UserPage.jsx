import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { toast } from "react-hot-toast"; 
import axios from 'axios';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import { 
  useFetchCurrentUserQuery,
  useFetchUserByIdQuery,
  useFollowUserMutation,       
  useUnfollowUserMutation,
  useFetchUserFollowingsQuery,
  profileApi
} from "../../redux/auth/profileServices";


import styles from './UserPage.module.css';

import PathInfo from '../../components/PathInfo/PathInfo.jsx';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
import FollowButton from '../../components/FollowButton/FollowButton.jsx';
import TabsList from '../../components/TabsList/TabsList.jsx';
import ListItems from '../../components/ListItems/ListItems.jsx';
import FollowerCard from '../../components/FollowerCard/FollowerCard.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import RecipeCard from '../../components/ListRecipeCard/ListRecipeCard.jsx';
import UserProfile from '../../components/UserProfile/UserInfo';
import Button from "../../components/Button/Button";
import LogOutModal from "../../components/LogOutModal/LogOutModal";
import Loader from "../../components/Loader/Loader"; 
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
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import UserProfile from '../../components/UserProfile/UserInfo';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import TabsList from '../../components/TabsList/TabsList.jsx';
import TabsContent from '../../components/TabsContent/TabsContent.jsx';
import ListRecipeCard from '../../components/ListRecipeCard/ListRecipeCard.jsx';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import {
  USER_TABS,
  USER_TABS_DATA,
  USER_TABS_MESSAGES,
} from '../../constants/userTabs.js';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState(USER_TABS.RECIPES);
  const { user } = useAuth();
  const { userId: urlUserId } = useParams();
  const { data: myProfileData } = useFetchCurrentUserQuery();
  const [isFollowing, setIsFollowing] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([]);
  const [paginationState, setPaginationState] = useState({ recipes: { total: 0, pages: 0, currentPage: 1 }, followers: { total: 0, pages: 0, currentPage: 1 },});
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useUnfollowUserMutation();
  const dispatch = useDispatch();
  const { userId: urlUserId } = useParams();
  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);
  const currentUser = useSelector(selectUser);
  const currentUserId = myProfileData?.id || currentUser?.id;
  const isButtonLoading = isFollowLoading || isUnfollowLoading;
  
  const myEmail = myProfileData?.email || currentUser?.email;
  const isUrlOwnProfile = !urlUserId;
  
  
  
  const { 
    data: otherUserData, 
    isLoading: isUserLoading,
    refetch 
  } = useFetchUserByIdQuery(urlUserId, {
    skip: !urlUserId,
    refetchOnMountOrArgChange: true, 
  });

  const preliminaryUserData = isUrlOwnProfile ? (myProfileData || currentUser) : otherUserData;

  const isOwnProfile = isUrlOwnProfile || (preliminaryUserData?.email && myEmail && preliminaryUserData.email === myEmail);


  
  
  const { 
    data: myFollowings, 
    isLoading: isFollowingsLoading 
  } = useFetchUserFollowingsQuery(currentUserId, {
    skip: !currentUserId,
    refetchOnMountOrArgChange: true,
  });

  const isDataLoading = isUserLoading || isFollowingsLoading;
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

  const userId = isUrlOwnProfile ? currentUserId : urlUserId;

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
      const isUserInFollowings = Array.isArray(myFollowings) && 
        myFollowings.some(user => user.id === urlUserId || user.id === parseInt(urlUserId));
      
      console.log("Checking if user is in followings:", isUserInFollowings);
      if (isUserInFollowings !== undefined) {
        setIsFollowing(isUserInFollowings);
      }
    }
  }, [myFollowings, urlUserId, isOwnProfile]);

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
            toast.error("You are already following this user");
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
      console.error("Error toggling follow status:", error);
      toast.error(`Failed to update follow status: ${error.data?.message || 'Unknown error'}`);
    }
  };

  const recipes = useSelector(selectUserRecipes);
  const favorites = useSelector(selectUserFavorites);
  const followers = useSelector(selectUserFollowers);
  const following = useSelector(selectUserFollowing);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const visibleTabs = USER_TABS_DATA.filter((tab) =>
    isUrlOwnProfile ? true : tab.visibleTo === 'all'
  );

  console.log('recipes.data:', recipes.data);
  console.log('favorites.data:', favorites.data);
  console.log('followers.data:', followers.data);
  console.log('following.data:', following.data);

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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '30px',
          minHeight: '50vh',
        }}
      >
        {isDataLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              padding: '40px 0',
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
            <div style={{ width: '100%', maxWidth: '394px' }}>
              <UserProfile />
            </div>

            <div
              style={{
                width: '100%',
                maxWidth: '394px',
                padding: '20px 0',
              }}
            >
              {isOwnProfile ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={openLogOutModal}
                  fullWidth={true}
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleFollowToggle}
                  fullWidth={true}
                  disabled={isButtonLoading}
                  loading={isButtonLoading}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              )}
            </div>
          </>
        )}

        <LogOutModal isOpen={isLogOutModalOpen} onClose={closeLogOutModal} />
      </div>
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
    </>
    <div className={styles.container}>
      <PathInfo currentPage="User Profile" />
      <MainTitle title="User Profile" />
      <Subtitle subtitle="Welcome to your profile" />

      <div className={styles.layout}>
        <div className={styles.leftColumn}>


        <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: '100%',
      gap: '30px',
      minHeight: '50vh'
    }}>
      {isDataLoading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%',
          height: '100%', 
          padding: '40px 0'
        }}>
          <Loader />
        </div>
      ) : (
        <>
          <div style={{ width: '100%', maxWidth: '394px' }}>
            <UserProfile />
          </div>
          
          <div style={{ 
            width: '100%', 
            maxWidth: '394px', 
            padding: '20px 0'
          }}>
            {isOwnProfile ? (
              <Button 
                type="button"
                variant="primary" 
                onClick={openLogOutModal}
                fullWidth={true}
              >
                Log Out
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleFollowToggle}
                fullWidth={true}
                disabled={isButtonLoading}
                loading={isButtonLoading}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </>
      )}
      
      <LogOutModal 
        isOpen={isLogOutModalOpen} 
        onClose={closeLogOutModal} 
      />
    </div>


        </div>

        <div className={styles.rightColumn}>
          <div className={styles.tabsWrapper}>
            <TabsList tabs={tabs} onTabChange={handleTabChange} />
          </div>
          <ListItems items={items} renderItem={renderItem} activeTab={activeTab} />
          <Pagination
            currentPage={paginationState[activeTab === 0 ? 'recipes' : 'followers'].currentPage}
            totalPages={paginationState[activeTab === 0 ? 'recipes' : 'followers'].pages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

const ProtectedUserPage = withAuthGuard(UserPage);
export default ProtectedUserPage;
