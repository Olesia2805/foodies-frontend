import withAuthGuard from '../../hoc/withAuthGuard';
import UserProfile from '../../components/UserProfile/UserInfo';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import { selectUser } from '../../redux/auth/selectors';
import {
  useFetchCurrentUserQuery,
  useFetchUserByIdQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useFetchUserFollowingsQuery,
  profileApi,
} from '../../redux/auth/profileServices';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';
import axios from 'axios';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
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

import LogOutModal from '../../components/LogOutModal/LogOutModal';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const UserPage = () => {
  const { user } = useAuth();
  const { userId: urlUserId } = useParams();
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [items, setItems] = useState([]);
  const { data: myProfileData } = useFetchCurrentUserQuery();
  const currentUserId = myProfileData?.id || currentUser?.id;
  const [paginationState, setPaginationState] = useState({
    recipes: { total: 0, pages: 0, currentPage: 1 },
    followers: { total: 0, pages: 0, currentPage: 1 },
  })
  
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
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useUnfollowUserMutation();
  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);

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


    if (index === 1) {
      fetchFollowers();
    } else {
      const fetchedItems = index === 0 ? [{ id: 1, name: 'Recipe 1' }] : [{ id: 2, name: 'User 1' }];
      setItems(fetchedItems);
    }
  };

  const fetchUserRecipes = async (page = 1) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/users/${userId}?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data.res.data);
      setPaginationState((prevState) => ({
        ...prevState,
        recipes: {
          total: response.data.res.total,
          pages: response.data.res.pages,
          currentPage: response.data.res.currentPage,
        },
      }));
    } catch (error) {
          console.error('Error fetching user recipes:', error);
        }
      };

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

    try {
      const token = localStorage.getItem('token');
      const response = axios.get(`http://localhost:3000/api/users/followers/${userId}?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
      setPaginationState((prevState) => ({
        ...prevState,
        followers: {
          total: response.data.total,
          pages: response.data.pages,
          currentPage: response.data.currentPage,
        },
      }));
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
    }
  }, [myFollowings, urlUserId, isOwnProfile]);

  const isButtonLoading = isFollowLoading || isUnfollowLoading;
  const isDataLoading = isUserLoading || isFollowingsLoading;
  const tabs = user?.isOwner ? ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'] : ['RECIPES', 'FOLLOWERS'];

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

  return (
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


    <>
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

      <LogOutModal isOpen={isLogOutModalOpen} onClose={closeLogOutModal} />
    </>
    </div>
  );

export default withAuthGuard(UserPage);
