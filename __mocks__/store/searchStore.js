import { observable, action, computed, runInAction } from "mobx";
import _ from "lodash";

class SearchStore {
  constructor(rootstore) {
    this.rootstore = rootstore;
  }
  @observable
  keyword = "";

  @observable
  results = [];

  @observable
  result = {};

  @computed
  get getKeyword() {
    return this.keyword;
  }

  @computed
  get getResults() {
    return this.results;
  }

  @computed
  get getResult() {
    return this.result;
  }

  @action
  setResults(results) {
    this.results = results;
  }

  @action
  setResult(result) {
    this.result = result;
  }

  @action
  onchange(keyword) {
    this.keyword = keyword;
  }

  @action
  emptyResults() {
    this.results = [];
  }

  @action
  resetSearch() {
    this.result = {};
    this.results = [];
    this.keyword = "";
  }

  @action
  searchCurrencies(keyword, source, filteredCurrencies) {
    runInAction(() => {
      this.keyword = keyword;
    });
    // Search data with regex and lodash.js
    if (keyword.length > 0) {
      const re = new RegExp(_.escapeRegExp(this.keyword), "i");

      // Function to Check searching result
      const isMatch = result => {
        // If check search returning true and currency not exist in selectedCurrencies in currencyStore
        // Return Result
        return (
          re.test(result.title) &&
          typeof filteredCurrencies.find(data => data.key === result.key) ===
            "undefined"
        );
      };
      runInAction(() => {
        this.setResults(_.filter(source, isMatch));
        this.setResult(this.results.length > 0 ? this.results[0] : {});
      });
    } else {
      runInAction(() => this.resetSearch());
    }
  }
}

export default new SearchStore();
