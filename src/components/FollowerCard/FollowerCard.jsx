import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ROUTER } from '../../constants/router';
import Icon from '../Icon/Icon';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
  profileApi,
} from '../../redux/auth/profileServices';
import { selectUser } from '../../redux/auth/selectors';
import styles from './FollowerCard.module.css';

const FOLLOW_STATUSES_KEY = 'user_follow_statuses';

const FollowerCard = ({ item }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const currentUserId = currentUser?.id;
  
  const userId = item?._id;
  
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  
  const saveToLocalStorage = useCallback((targetUserId, status) => {
    if (!currentUserId || !targetUserId) return;
    if (String(targetUserId) === String(currentUserId)) return; 
    
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
      console.error("[FollowerCard] Error saving to localStorage:", err);
    }
  }, [currentUserId]);
  
  const getFromLocalStorage = useCallback((targetUserId) => {
    if (!currentUserId || !targetUserId) return null;
    if (String(targetUserId) === String(currentUserId)) return null; // Не можна підписатися на себе
    
    try {
      const userIdStr = String(currentUserId);
      const targetIdStr = String(targetUserId);
      const stored = localStorage.getItem(FOLLOW_STATUSES_KEY);
      if (!stored) return null;
      const followData = JSON.parse(stored);
      if (followData[userIdStr] && followData[userIdStr][targetIdStr] !== undefined) {
        return Boolean(followData[userIdStr][targetIdStr]);
      }
      
      return null;
    } catch (err) {
      console.error("[FollowerCard] Error reading from localStorage:", err);
      return null;
    }
  }, [currentUserId]);
  
  useEffect(() => {
    if (!userId || !currentUserId || String(userId) === String(currentUserId)) return;
    
    const localStorageStatus = getFromLocalStorage(userId);    
    if (localStorageStatus !== null) {
      setIsFollowing(localStorageStatus);
    }
  }, [userId, currentUserId, getFromLocalStorage]);
  
  const handleFollowToggle = async () => {
    if (!userId || isLoading || String(userId) === String(currentUserId)) return;
    
    try {
      setIsLoading(true);
            let currentFollowStatus = getFromLocalStorage(userId);
      
      if (currentFollowStatus === null) {
        currentFollowStatus = isFollowing;
      }
      
      const newFollowStatus = !currentFollowStatus;
                setIsFollowing(newFollowStatus);
      
      saveToLocalStorage(userId, newFollowStatus);
      
      if (currentFollowStatus) {
        await unfollowUser(userId).unwrap();
        toast.success('Unfollowed successfully');
      } else {
        try {
          await followUser(userId).unwrap();
          toast.success('Now following this user');
        } catch (followError) {
          if (followError.status === 409) {
            toast('You are already following this user');
            setIsFollowing(true);
            saveToLocalStorage(userId, true);
          } else {
            setIsFollowing(currentFollowStatus);
            saveToLocalStorage(userId, currentFollowStatus);
            throw followError;
          }
        }
      }

      dispatch(
        profileApi.util.updateQueryData('fetchUserById', userId, (draft) => {
          if (draft) draft.isFollowed = newFollowStatus;
        })
      );
      
      dispatch(profileApi.util.invalidateTags(['Profile']));
      
    } catch (error) {
      console.error('[FollowerCard] Error toggling follow status:', error);
      toast.error('Failed to update follow status');
      
      const savedStatus = getFromLocalStorage(userId);
      if (savedStatus !== null) {
        setIsFollowing(savedStatus);
      } else {
        setIsFollowing(false);
        saveToLocalStorage(userId, false);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const isOwnProfile = String(userId) === String(currentUserId);
  
  return (
    <div className={styles.card}>
      <div className={styles.user}>
        <img src={item.avatar} alt={item.name} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.text}>
            Own recipes: {item.recipes?.length || 0}
          </p>
          {!isOwnProfile && (
            <button 
              className={`${styles.followBtn} ${isFollowing ? styles.followingBtn : ''}`}
              onClick={handleFollowToggle}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isFollowing ? 'Unfollow' : 'Follow')}
            </button>
          )}
        </div>
      </div>
      <div className={styles.recipes}>
        {item.recipes.map((recipe) => {
          return (
            <Link
              key={recipe._id}
              to={`${ROUTER.RECIPE}/${recipe._id}`}
              className={styles.recipeLink}
              title={recipe.title}
            >
              <img
                key={recipe._id}
                src={recipe.thumb}
                alt={recipe.title}
                className={styles.recipeImage}
              />
            </Link>
          );
        })}
      </div>
      <Link to={`${ROUTER.USER}/${item._id}`} className={styles.btn}>
        <Icon name="arrow-up-right" className={styles.btnIcon} size={16} />
      </Link>
    </div>
  );
};

export default FollowerCard;