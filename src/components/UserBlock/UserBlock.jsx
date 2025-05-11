import UserProfile from '../UserProfile/UserInfo';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import styles from './UserBlock.module.css';

const UserBlock = ({
  isDataLoading,
  isOwnProfile,
  openLogOutModal,
  handleFollowToggle,
  isButtonLoading,
  isFollowing,
  isLogOutModalOpen,
  closeLogOutModal,
}) => {
  return (
    <>
      {isDataLoading ? (
        <div className={styles.loader}>
          <Loader size="small" />
        </div>
      ) : (
        <div className={styles.user}>
          <UserProfile />
          {isOwnProfile ? (
            <Button
              type="button"
              variant="contained"
              onClick={openLogOutModal}
              fullWidth={true}
            >
              Log Out
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              onClick={handleFollowToggle}
              fullWidth={true}
              disabled={isButtonLoading}
              loading={isButtonLoading}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      )}

      <LogOutModal isOpen={isLogOutModalOpen} onClose={closeLogOutModal} />
    </>
  );
};

export default UserBlock;
