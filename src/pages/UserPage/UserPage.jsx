import withAuthGuard from '../../hoc/withAuthGuard';
import UserProfile from '../../components/UserProfile/UserInfo';
import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { selectUser } from "../../redux/auth/selectors";
import { 
  useFetchCurrentUserQuery,
  useFetchUserByIdQuery,
} from "../../redux/auth/profileServices";
import { useParams } from 'react-router-dom';
import LogOutModal from "../../components/LogOutModal/LogOutModal";



const UserPage = () => {
  const { userId: urlUserId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const currentUser = useSelector(selectUser);
  const { data: myProfileData } = useFetchCurrentUserQuery();
  const myEmail = myProfileData?.email || currentUser?.email;
  const isUrlOwnProfile = !urlUserId;
  
  const openLogOutModal = () => {
    setIsLogOutModalOpen(true);
  };
  
  const closeLogOutModal = () => {
    setIsLogOutModalOpen(false);
  };
  
  const { 
    data: otherUserData, 
    isLoading: _isLoading 
  } = useFetchUserByIdQuery(urlUserId, {
    skip: !urlUserId 
  });
  
  const preliminaryUserData = isUrlOwnProfile ? (myProfileData || currentUser) : otherUserData;
  
  const isOwnProfile = isUrlOwnProfile || 
    (preliminaryUserData?.email && myEmail && preliminaryUserData.email === myEmail);
  
  
  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
    console.log(isFollowing ? "Unfollowing user..." : "Following user...");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <UserProfile/>
      <div style={{ marginTop: '20px' }}>
        {isOwnProfile ? (
          <Button 
            type="button"
            variant="primary" 
            onClick={openLogOutModal}
            style={{ padding: '8px 16px' }}
          >
            Log Out
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={handleFollowToggle}
            style={{ padding: '8px 16px' }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
      <LogOutModal 
        isOpen={isLogOutModalOpen} 
        onClose={closeLogOutModal} 
      />
    </div>
  );
};

export default withAuthGuard(UserPage);