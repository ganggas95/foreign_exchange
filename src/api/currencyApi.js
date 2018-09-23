import { BASE_URL as BaseUrl } from "./base";
// import CurrencyIface from "../interfaces/CurrencyIface";

export default class CurrencyAPI {
  GetCurrencies = (base = "USD") => {
    BaseUrl.search = new URLSearchParams({ base: base });
    return new Promise((resolve, reject) => {
      fetch(BaseUrl, {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(() => reject(null));
    });
  };
}
