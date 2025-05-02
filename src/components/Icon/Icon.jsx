import styles from './Icon.module.css'

/**
 * Renders an SVG icon using IcoMoon symbol ID.
 * Use the 'name' prop to select the icon.
 * Icon names can be found in demo.html.
 *
 * Example:
 * <Icon name="heart" className="favorite" size={32} />
 */

const Icon = ({ name, className = '', size = 20, ...otherProps }) => (
  <svg
    className={className ? `${styles.icon} ${className}` : styles.icon}
    width={size}
    height={size}
    {...otherProps}>
    <use xlinkHref={`/icons/symbol-defs.svg#icon-${name}`} />
  </svg>
)

export default Icon
