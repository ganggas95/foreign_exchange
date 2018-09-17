import { BASE_URL } from "./base";

export function getCurrencies(callback, base = "USD") {
  /**
   * getCurrencies is function for get data from BASE_URL
   * @param {function} callback
   * @param {string} base
   *
   */
  var params = new URLSearchParams({ base: base });
  BASE_URL.search = params;
  fetch(BASE_URL, {
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      callback(false, res);
    })
    .catch(callback(true, null));
}
