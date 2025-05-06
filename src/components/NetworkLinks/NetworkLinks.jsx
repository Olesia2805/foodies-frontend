import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon.jsx';

import { SOCIAL_NETWORKS } from '../../constants/socialNetworks.js';

import styles from './NetworkLinks.module.css';

const NetworkLinks = () => {
  return (
    <ul className={styles.networkLinks}>
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

export default NetworkLinks;
