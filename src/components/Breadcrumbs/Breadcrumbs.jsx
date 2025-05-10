import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

/**
 * A breadcrumbs component, which displays a sequence of links
 * separated by '/'s. The last item in the sequence is not a link.
 *
 * @param {object} props Component props
 * @param {array} props.items An array of objects with the following
 *   shape: { label: string, link?: string }
 * @return {ReactElement} A React element representing the
 *   breadcrumbs component
 *
 * @example
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', link: '/' },
 *     { label: 'Recipes', link: '/recipes' },
 *     { label: recipe.title }
 *   ]}
 * />
 */

const Breadcrumbs = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          {item.link ? (
            <Link to={item.link} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
