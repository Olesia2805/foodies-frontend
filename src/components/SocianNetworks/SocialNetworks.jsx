import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon.jsx';

import { SOCIAL_NETWORKS } from '../../constants/socialNetworks.js';

import styles from './SocialNetworks.module.css';

const SocialNetworks = () => {
  return (
    <ul className={styles.socialList}>
      {SOCIAL_NETWORKS.map(({ link, icon }) => (
        <li className={styles.item} key={link}>
          <Link className={styles.link} to={link} target="_blank">
            <Icon name={icon} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialNetworks;
