import _ from "lodash";
import React from "react";
import { inject, observer } from "mobx-react";
import SearchResult from "./SearchResult";
import Button from "./Button";

class SelectCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { currencyStore, eventStore, searchStore } = this.props.rootstore;

    if (!_.isEmpty(searchStore.getResult)) {
      //Add selectedCurrency to selectedCurrencies in currenciesStore

      currencyStore.addSelectedCurrency(searchStore.getResult);
      eventStore.changeMode();
      searchStore.resetSearch();
    } else {
      eventStore.changeMode();
      searchStore.resetSearch();
    }
  }

  handleChange(e) {
    /**
     * This function used to handle search change
     * @param {object} e
     * @param {object} {event value}
     */

    const { value } = e.target;
    const { searchStore, currencyStore } = this.props.rootstore;

    let source = currencyStore.getCurrencies;

    searchStore.searchCurrencies(
      value,
      source,
      currencyStore.filteredCurrencies
    );
  }

  render() {
    const { searchStore } = this.props.rootstore;

    return (
      <div className={"search-container"}>
        <div className="ui search search-input">
          <input
            className="prompt"
            autoComplete={"false"}
            value={searchStore.getKeyword}
            onChange={this.handleChange}
          />
          {searchStore.getResults.length > 0 && <SearchResult />}
        </div>
        <Button
          className={`ui button search-submit`}
          onClick={this.handleSubmit}
          text="Submit"
        />
      </div>
    );
  }
}

export default inject("rootstore")(observer(SelectCurrencies));
