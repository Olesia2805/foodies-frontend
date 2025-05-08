import { toUpperCase } from "./UpperCase.js";
import styles from "./UserInfo.module.css";

export const UserInfoItem = ({ name, value }) => {
  const CONSTANTS_NAME = {
    email: "email",
    createdRecipesCount: "added recipes",
    favoriteRecipesCount: "favorites",
    followersCount: "followers",
    followingCount: "following",
  };

  return (
    <li className={styles.profile_info_item}>
      {toUpperCase(CONSTANTS_NAME[name])}:
      <span className={styles.profile_info_content}>{value}</span>
    </li>
  );
};

export default UserInfoItem;