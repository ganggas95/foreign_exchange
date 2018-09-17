/**
 * This class is mobx store classess.
 * All data in this simple app stored in this class Store.
 */

import { observable, computed, action } from "mobx";
import { getCurrencies } from "../api/currencyApi";
import currencyCode from "../common/currencyCode";
import formatPrice from "../common/formatPrice";

class CurrencyStore {
  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @observable
  currencies = [];

  @observable
  selectedCurrencies = [];

  @observable
  baseCurrency = "USD";

  @observable
  defaultPrice = "10.0000";

  @computed
  get getBaseCurrency() {
    /**
     * Functon to get baseCurrency
     */

    // return baseCurrency with object from currencyCode.js
    return currencyCode[this.baseCurrency];
  }

  @computed
  get getDefaultPrice() {
    /**
     * Function to get default price currency
     */
    return this.defaultPrice;
  }

  @computed
  get filteredCurrencies() {
    /**
     * Function to get selectedCurrencies from store
     */
    return this.selectedCurrencies;
  }

  @computed
  get getCurrencies() {
    /**
     * Function to get currencies from store
     */
    return this.currencies;
  }

  @action
  fetchCurrencies = base => {
    /**
     * Action to fetch currencies data from api getCurrencies
     * @param {string} base
     */
    getCurrencies((error, response) => {
      if (!error) {
        for (var key in response.rates) {
          //Create new object to save currency from response

          let currency = new Object();
          //Set Attribute with value to new object
          currency.key = key;
          currency.title = key;

          //Get Symbol of country currency from currencyCode.js
          currency.symbol = currencyCode[key].symbol;
          //Get Description of country currency from currencyCode.js
          currency.description = currencyCode[key].name;

          currency.value = response.rates[key];

          //Set price Currency with formatPrice and merge with currency symbol
          currency.price = formatPrice(
            parseFloat(response.rates[key]).toFixed(4),
            currency.symbol
          );

          //Add currency object to currency store
          this.addCurrencies(currency);
        }
      }
    }, base);
  };

  @action
  addCurrencies = currency => {
    /**
     * Action Add Currencies with currency object
     * @param {object} currency
     */

    //Push currency object to currencies store
    this.currencies.push(currency);
  };

  @action
  addSelectedCurrency = currency => {
    /**
     * Action to add selected currency to selectedCurrencies store
     * @param {object} currency
     */
    //Push currency object to selectedCurrencies store
    this.selectedCurrencies.push(currency);
  };

  @action
  removeSelectedCurrency = currency => {
    /**
     * Action To remove currency from selectedCurrencies store
     * @param {object} currency
     */

    // Remove currency from selectedCurrencies store
    var index = this.selectedCurrencies.indexOf(currency);
    this.selectedCurrencies.splice(index, 1);
  };
}

//Export with new CurrencyStore initalization
export default new CurrencyStore();
