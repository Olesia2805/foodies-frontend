import withAuthGuard from '../../hoc/withAuthGuard';
import UserProfile from '../../components/UserProfile/UserInfo';

const UserPage = () => {

  return <UserProfile/>;
};

export default withAuthGuard(UserPage);
