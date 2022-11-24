/**
 * A helper function to request data
 * @param {string} url where to request data from.
 * @param {function} setter function that uses the data
 * @returns the request Promise
 */
const quandary = (url, setter) =>
  fetch(url)
    .then((res) => (res.status === 200 ? res.json() : false))
    .then((data) => setter(data));

export default quandary;
