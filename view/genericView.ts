/**
 * A utility function to generate views from SQL database responses.
 *
 * @param {Function} singleView a function that takes a single SQL row and
 * converts it to an appropriate view.
 * @returns another function that accepts data, and an optional 'unwrap'
 * parameter that defaults to false. If true, will always return an array of
 * responses.
 */
const genericView =
  <T = any>(singleView: <Data extends T>(data: Data) => T) =>
  <Data extends T>(data: Data[], unwrap: boolean = false) =>
    data.length > 1
      ? data.map((datum) => singleView(datum))
      : unwrap
      ? singleView(data[0])
      : [singleView(data[0])];

export default genericView;
