/**
 * A helper function to request data
 * @param url where to request data from.
 * @param setter function that uses the data
 * @returns the request Promise
 */
const quandary = <T = any>(
  url: string,
  setter: (data: T) => void,
  defaultValue: T = undefined
) =>
  fetch(url)
    .then((res) => (res.status === 200 ? res.json() : false))
    .then((data) => setter(data ? data : defaultValue));

export default quandary;
