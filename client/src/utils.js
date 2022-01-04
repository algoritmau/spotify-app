/**
 * Higher-order function to handle async/await errors
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors =
  (fn) =>
  (...args) =>
    fn(...args).catch((err) => console.error(err))
