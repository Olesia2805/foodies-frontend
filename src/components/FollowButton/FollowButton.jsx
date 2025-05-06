import { useState } from 'react';
import styles from './FollowButton.module.css';

const FollowButton = ({ isFollowing, onFollow, onUnfollow }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleClick = async () => {
    if (following) {
      await onUnfollow();
    } else {
      await onFollow();
    }
    setFollowing(!following);
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      {following ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;