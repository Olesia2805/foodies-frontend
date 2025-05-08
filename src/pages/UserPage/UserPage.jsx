import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
import FollowButton from '../../components/FollowButton/FollowButton.jsx';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import { useAuth } from '../../hooks';
import TabsList from '../../components/TabsList/TabsList.jsx';
import ListItems from '../../components/ListItems/ListItems.jsx';
import FollowerCard from '../../components/FollowerCard/FollowerCard.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import styles from './UserPage.module.css';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard/RecipeCard.jsx';

const UserPage = () => {
  const { user } = useAuth();
  const { id: userId } = useParams(); // Extract user ID from URL
  console.log('User from useAuth:', user); // Debug log
  console.log('User ID from URL:', userId); // Debug log
  console.log('Extracted userId from useParams:', userId); // Debug log
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([]);
  const [paginationState, setPaginationState] = useState({
    recipes: { total: 0, pages: 0, currentPage: 1 },
    followers: { total: 0, pages: 0, currentPage: 1 },
  });

  const handleFollow = async () => {
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    setIsFollowing(false);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);

    if (index === 1) {
      console.log('Fetching followers for user ID:', user?.id); // Debug log
      fetchFollowers();
    } else {
      const fetchedItems = index === 0 ? [{ id: 1, name: 'Recipe 1' }] : [{ id: 2, name: 'User 1' }];
      setItems(fetchedItems);
    }
  };

  const fetchUserRecipes = async (page = 1) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.get(`http://localhost:3000/api/users/${userId}?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Added limit=5 for pagination
      console.log('API response for recipes:', response.data); // Debug log
      setItems(response.data.res.data); // Assuming the recipes are in the nested `data` field
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

  const fetchFollowers = async (page = 1) => {
    try {
      if (!userId) {
        console.error('User ID is not defined. Cannot fetch followers.');
        return;
      }
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.get(`http://localhost:3000/api/users/followers/${userId}?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API response for FOLLOWERS:', response.data); // Debug log
      setItems(response.data); // Assuming the followers are in the nested `data` field
      setPaginationState((prevState) => ({
        ...prevState,
        followers: {
          total: response.data.total,
          pages: response.data.pages,
          currentPage: response.data.currentPage,
        },
      }));
    } catch (error) {
      console.log('Error fetching followers:', error); // Debug log
      console.error('Error fetching followers:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 0) {
      fetchUserRecipes(paginationState.recipes.currentPage);
    } else if (activeTab === 2) {
      fetchFollowers(paginationState.followers.currentPage);
    }
  }, [activeTab]);

  const handlePageChange = (page) => {
    if (activeTab === 0) {
      fetchUserRecipes(page);
    } else if (activeTab === 2) {
      fetchFollowers(page);
    }
  };

  const tabs = user?.isOwner
    ? ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING']
    : ['RECIPES', 'FOLLOWERS'];

  const renderItem = (item, index) => {
    if (activeTab === 0) {
      return <RecipeCard key={item._id} recipe={item} />;
    } else if (activeTab === 1) {
      return (
        <>
          {index > 0 && activeTab === 1 && <div className={styles.divider}></div>} {/* Divider only for followers */}
          <FollowerCard key={item.id} follower={item} />
        </>
      );
    }
    return <div>{item.name} (UserCard)</div>;
  };

  return (
    <div className={styles.container}>
      <PathInfo currentPage="User Profile" />
      <MainTitle title="User Profile" />
      <Subtitle subtitle="Welcome to your profile" />

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <UserInfo user={user} />

          <FollowButton
            isFollowing={isFollowing}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
          />
        </div>

        <div className={styles.rightColumn}>
          <TabsList tabs={tabs} onTabChange={handleTabChange} />
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

export default withAuthGuard(UserPage);
