import { observable, computed, action, runInAction } from "mobx";
import CurrencyAPI from "../api/currencyApiMock";
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
  @observable
  error = null;
  @computed
  get getBaseCurrency() {
    //Function to get baseCurrency
    return currencyCode[this.baseCurrency];
  }
  @computed
  get getDefaultPrice() {
    //Function to get default price currency
    return this.defaultPrice;
  }
  @computed
  get filteredCurrencies() {
    //Function to get selectedCurrencies from store
    return this.selectedCurrencies;
  }
  @computed
  get getCurrencies() {
    //Function to get currencies from store
    return this.currencies;
  }

  @action
  addCurrencies(currency) {
    this.currencies.push(currency);
  }

  @action
  fetchCurrencies = async () => {
    //Action to fetch currencies data from api getCurrencies
    let currencyAPI = new CurrencyAPI();

    await currencyAPI
      .GetCurrencies(this.baseCurrency)
      .then(response => {
        for (let key in response.rates) {
          let currency = {};
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
          runInAction(() => {
            this.addCurrencies(currency);
          });
        }
      })
      .catch(() => {
        // Do nothing
      });
  };

  @action
  addSelectedCurrency = currency => {
    /**
     * Action to add selected currency to selectedCurrencies store
     * @param {object} currency
     */
    this.selectedCurrencies.push(currency);
  };

  @action
  removeSelectedCurrency = currency => {
    /**
     * Action To remove currency from selectedCurrencies store
     * @param {object} currency
     */
    let index = this.selectedCurrencies.indexOf(currency);
    this.selectedCurrencies.splice(index, 1);
  };
}

export default new CurrencyStore();
