import styles from './UserInfo.module.css';

const UserInfo = ({ user }) => {
  return (
    <div className={styles.userInfo}>
      <img src={user.avatar} alt={`${user.name}'s avatar`} className={styles.avatar} />
      <div className={styles.details}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;