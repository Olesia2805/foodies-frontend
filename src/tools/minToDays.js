/**
 *
 * @param {number} min
 * @param {number} ep
 * @returns {{d?: number, h?: number, min: number}}
 */
export function minToDays(min, ep = 1) {
  const days = Math.floor((min * ep) / 1440);
  const remainingTime = parseInt(min * ep - Math.floor(days * 1440));
  const hours = Math.floor(remainingTime / 60);
  const remainingMin = Math.floor(remainingTime - hours * 60);
  return { d: days, h: hours, min: remainingMin };
}
