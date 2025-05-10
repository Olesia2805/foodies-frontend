import { toUpperCase } from "./UpperCase.js";
import styles from "./UserInfo.module.css";

export const UserInfoItem = ({ name, value, label }) => {
  const CONSTANTS_NAME = {
    email: "email",
    createdRecipesCount: "added recipes",
    favoritesCount: "favorites", 
    followersCount: "followers",
    followingCount: "following",
  };

  const displayLabel = label || CONSTANTS_NAME[name] || name || "";

  return (
    <li className={styles.profile_info_item}>
      {displayLabel ? toUpperCase(displayLabel) : ""}:
      <span className={styles.profile_info_content}>{value}</span>
    </li>
  );
};

export default UserInfoItem;