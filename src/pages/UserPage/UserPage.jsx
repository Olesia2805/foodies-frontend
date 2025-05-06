import { useState } from 'react';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import UserInfo from '../../components/UserInfo/UserInfo.jsx';
import LogOutModal from '../../components/LogOutModal/LogOutModal.jsx';
import FollowButton from '../../components/FollowButton/FollowButton.jsx';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import { useAuth } from '../../hooks';
import TabsList from '../../components/TabsList/TabsList.jsx';
import ListItems from '../../components/ListItems/ListItems.jsx';

const UserPage = () => {
  const { user, signOut } = useAuth();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([]);

  const handleLogOut = async () => {
    await signOut();
    setIsLogOutModalOpen(false);
  };

  const handleFollow = async () => {
    console.log('Follow user');
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    console.log('Unfollow user');
    setIsFollowing(false);
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    console.log(`Active tab changed to: ${index}`);
    // Fetch data based on the active tab
    const fetchedItems = index === 0 ? [{ id: 1, name: 'Recipe 1' }] : [{ id: 2, name: 'User 1' }];
    setItems(fetchedItems);
  };

  const tabs = user.isOwner
    ? ['My Recipes', 'My Favorites', 'Followers', 'Following']
    : ['Recipes', 'Followers'];

  const renderItem = (item) => {
    if (activeTab === 0) {
      return <div>{item.name} (RecipePreview)</div>;
    }
    return <div>{item.name} (UserCard)</div>;
  };

  return (
    <div>
      <PathInfo currentPage="User Profile" />
      <MainTitle title="User Profile" />
      <Subtitle subtitle="Welcome to your profile" />
      <UserInfo user={user} />

      <button onClick={() => setIsLogOutModalOpen(true)}>Log Out</button>

      {isLogOutModalOpen && (
        <LogOutModal
          onConfirm={handleLogOut}
          onCancel={() => setIsLogOutModalOpen(false)}
        />
      )}

      <FollowButton
        isFollowing={isFollowing}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
      />

      <TabsList tabs={tabs} onTabChange={handleTabChange} />

      <ListItems items={items} renderItem={renderItem} />
    </div>
  );
};

export default withAuthGuard(UserPage);
