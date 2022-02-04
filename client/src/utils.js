/**
 * Higher-order function to handle async/await errors
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors =
  (fn) =>
  (...args) =>
    fn(...args).catch((err) => console.error(err))

/**
 * Format milliseconds to a human readable format
 * @param {number} ms: number of milliseconds
 * @returns {string} formatted time
 * @example formatTrackLength(216699) -> '3:36'
 */
export const formatTrackLength = (ms) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export const truncateString = (str) =>
  str.length > 24 ? `${str.substring(0, 12)}…` : str
