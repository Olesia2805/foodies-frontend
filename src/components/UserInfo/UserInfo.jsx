import styles from './UserInfo.module.css';
import clsx from 'clsx';

const UserInfo = ({ user }) => {
  if (!user) {
    return (
      <div className={styles.userInfo}>User information is not available.</div>
    );
  }

  return (
    <div className={clsx(styles.userInfo, styles.card)}>
      <img
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className={clsx(styles.avatar, styles.rounded)}
      />
      <div className={styles.details}>
        <h3 className={styles.name}>{user.name.toUpperCase()}</h3>
        <p className={styles.email}>Email: {user.email}</p>
        <p className={styles.stats}>Added recipes: {user.addedRecipes || 0}</p>
        <p className={styles.stats}>Followers: {user.followers || 0}</p>
      </div>
    </div>
  );
};

export default UserInfo;
