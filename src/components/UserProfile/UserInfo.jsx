import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import IconButton from './IconButtonWrapper';
import styles from './UserInfo.module.css';
import { nanoid } from '@reduxjs/toolkit';
import withoutAvatar from '../../assets/img/user_without_avatar.jpg';
import { UserInfoItem } from './UserInfoItem';
import { selectUser } from '../../redux/auth/selectors';
import {
  useFetchUserByIdQuery,
  useFetchCurrentUserQuery,
  useUpdateUserAvatarMutation,
  useFetchFavoriteRecipesQuery,
} from '../../redux/auth/profileServices';
import { getAvatarURL } from '../../redux/auth/userSlicer';
import Loader from '../Loader/Loader';
import useFavorites from '../../hooks/useFavorites.js';

export const UserInfo = () => {
  const dispatch = useDispatch();
  const { userId: urlUserId } = useParams();
  const [updateUserAvatar] = useUpdateUserAvatarMutation();

  const { favoritesCount } = useFavorites();

  const currentUser = useSelector(selectUser);
  const { data: myProfileData } = useFetchCurrentUserQuery();

  const { data: favoriteRecipes } = useFetchFavoriteRecipesQuery(undefined, {
    skip: !myProfileData && !currentUser,
  });

  const { data: favoriteRecipesResponse } = useFetchFavoriteRecipesQuery(
    undefined,
    {
      skip: !myProfileData && !currentUser,
    }
  );
  const myEmail = myProfileData?.email || currentUser?.email;
  const { data: otherUserData, isLoading } = useFetchUserByIdQuery(urlUserId, {
    skip: !urlUserId,
  });
  const isUrlOwnProfile = !urlUserId;

  const preliminaryUserData = isUrlOwnProfile
    ? myProfileData || currentUser
    : otherUserData;

  const isOwnProfile =
    isUrlOwnProfile ||
    (preliminaryUserData?.email &&
      myEmail &&
      preliminaryUserData.email === myEmail);
  const userData = !urlUserId ? myProfileData || currentUser : otherUserData;

  useEffect(() => {
    setAvatar(userData?.avatar || withoutAvatar);
  }, [userData]);
  const [avatar, setAvatar] = useState(withoutAvatar);

  const displayFields = isOwnProfile
    ? [
        { name: 'email', visible: true, label: 'Email' },
        { name: 'createdRecipesCount', visible: true, label: 'Added Recipes' },
        { name: 'favoritesCount', visible: true, label: 'Favorites' },
        { name: 'followersCount', visible: true, label: 'Followers' },
        { name: 'followingCount', visible: true, label: 'Following' },
      ]
    : [
        { name: 'email', visible: true, label: 'Email' },
        { name: 'createdRecipesCount', visible: true, label: 'Added Recipes' },
        { name: 'followersCount', visible: true, label: 'Followers' },
      ];

  const handleAvatarUpdate = async (file) => {
    if (!isOwnProfile) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await updateUserAvatar(formData).unwrap();
      setAvatar(response.avatarURL);
      dispatch(getAvatarURL(response.avatarURL));
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        handleAvatarUpdate(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [iconSize, setIconSize] = useState({ width: 16, height: 16 });
  useEffect(() => {
    const updateIconSize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setIconSize({ width: 12, height: 12 });
      } else {
        setIconSize({ width: 16, height: 16 });
      }
    };
    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  if (!isOwnProfile && isLoading) {
    return (
      <div className={styles.profile_card_wrapper}>
        <Loader />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.profile_card_wrapper}>No user data found</div>
    );
  }

  const enhancedUserData = {
    email: userData.email || '',
    name: userData.name || 'User',
    avatar: userData.avatar || withoutAvatar,
    createdRecipesCount: userData.recipes || 0,
    favoritesCount: favoritesCount,
    followersCount: userData.followers || 0,
    followingCount: userData.following || 0,
  };

  return (
    <div className={styles.profile_card_wrapper}>
      <div className={styles.profile_card}>
        <img
          className={styles.profile_photo}
          src={avatar}
          alt={`${enhancedUserData.name} avatar`}
        />

        {isOwnProfile && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <IconButton
              iconId="plus"
              style={styles.profile_big_card_button}
              styleSVG={styles.profile_big_card_icon}
              stroke="#FFF"
              width={iconSize.width}
              height={iconSize.height}
              onClick={handleButtonClick}
            />
          </>
        )}

        <h3 className={styles.profile_name}>{enhancedUserData.name}</h3>

        <ul className={styles.profile_info}>
          {displayFields.map(
            (field) =>
              field.visible && (
                <UserInfoItem
                  key={nanoid()}
                  name={field.name}
                  value={enhancedUserData[field.name]}
                  label={field.label}
                />
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
