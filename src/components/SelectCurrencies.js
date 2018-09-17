import lodash from "lodash";
import React from "react";
import { inject, observer } from "mobx-react";

import { Search } from "semantic-ui-react";
import searchStyle from "../styles/search.css";

class SelectCurrencies extends React.Component {
  constructor(props) {
    super(props);

    //Initialization state
    this.state = {
      isLoading: false,
      results: [],
      selectedCurrency: {},
      value: ""
    };
  }

  resetComponent() {
    /**
     * Function to resetComponent
     */
    this.setState({
      isLoading: false,
      results: [],
      value: ""
    });
  }

  handleSubmit() {
    /**
     * Function to handle Submit button
     */

    //Define currencyStore and eventStore before use it;
    const { currencyStore, eventStore } = this.props.rootstore;

    //Add selectedCurrency to selectedCurrencies in currenciesStore
    currencyStore.addSelectedCurrency(this.state.selectedCurrency);
    //Change Add mode to list only mode
    //This function will be toggle add mode to list mode
    eventStore.changeMode();

    //Reset component after add currency successully
    this.resetComponent();
  }

  handleResultSelect(e, { result }) {
    /**
     * This function used to handle selected search currency result
     * @param {object} e
     * @param {object} {event value}
     */
    this.setState({
      value: result.title,
      selectedCurrency: result
    });
  }

  handleSearchChange(e, { value }) {
    /**
     * This function used to handle search change
     * @param {object} e
     * @param {object} {event value}
     */

    //Set loading true to show up loading bar
    //Set Value of search to state value
    this.setState({
      isLoading: true,
      value: value
    });

    //Define CurrencyStore from rootstore
    var currencyStore = this.props.rootstore.currencyStore;

    //Define source of currencies to use in search.
    //Source data from currencyStore that return from getCurrencies function
    var source = currencyStore.getCurrencies;

    //Give time 300ms to application to show loader before result displayed in dropdown
    setTimeout(() => {
      // If state value < 1 resetComponent
      if (this.state.value.length < 1) return this.resetComponent();

      //Else Search data with regex and lodash.js
      const re = new RegExp(lodash.escapeRegExp(this.state.value), "i");

      // Function to Check searching result
      const isMatch = result => {
        // If check search returning true and currency not exist in selectedCurrencies in currencyStore
        // Return Result
        return (
          re.test(result.title) &&
          typeof currencyStore.filteredCurrencies.find(
            data => data.key === result.key
          ) === "undefined"
        );
      };

      // Set Isloading to false to hide loading bar
      // Set search results to state before user select one to store in selectedCurrencies
      this.setState({
        isLoading: false,
        results: lodash.filter(source, isMatch)
      });
    }, 300);
  }
  render() {
    return (
      <div className={searchStyle.searchContainer}>
        <Search
          className={searchStyle.search}
          fluid
          input={{
            icon: null,
            className: `${searchStyle.searchInput}`
          }}
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect.bind(this)}
          onSearchChange={this.handleSearchChange.bind(this)}
          results={this.state.results}
          value={this.state.value}
          {...this.props}
        />
        <button
          className={`ui button ${searchStyle.searchSubmit}`}
          onClick={this.handleSubmit.bind(this)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default inject("rootstore")(observer(SelectCurrencies));
