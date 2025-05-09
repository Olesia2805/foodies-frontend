/**
 *
 * @param {number} min
 * @param {number} ep
 * @returns {{d?: number, h?: number, min: number}}
 */
export function minToDays(min, ep = 1) {
  let days = Math.floor((min * ep) / 1440);
  let remainingTime = parseInt(min * ep - Math.floor(days * 1440));
  let hours = Math.floor(remainingTime / 60);
  let remainingMin = Math.floor(remainingTime - hours * 60);
  return { d: days, h: hours, min: remainingMin };
}
