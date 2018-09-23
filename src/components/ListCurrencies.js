import React from "react";
import { inject, observer } from "mobx-react";
import ListItem from "./ListItem";

class ListCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      baseCurrency: {},
      defaultPrice: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //Define currencyStore from nextProps (updated data from store) before use in component

    let {
      filteredCurrencies,
      getBaseCurrency,
      getDefaultPrice
    } = nextProps.rootstore.currencyStore;
    let { currencies, baseCurrency, defaultPrice } = prevState;
    //If length of filteredCurrencies in currencyStore not same at filteredCurrencies in state
    // Update state with new data from store
    if (filteredCurrencies.length !== currencies.length) {
      return {
        currencies: filteredCurrencies,
        baseCurrency: getBaseCurrency,
        defaultPrice: getDefaultPrice
      };
    }
    return false;
  }

  removeCurrency(currency) {
    //This function to remove SelectedCurrency
    let { currencyStore } = this.props.rootstore;
    currencyStore.removeSelectedCurrency(currency);
  }

  render() {
    return (
      <div className={"currencies-list"}>
        {this.state.currencies.map((currency, index) => {
          return (
            typeof currency !== "undefined" && (
              <ListItem
                key={index}
                currency={currency}
                removecurrency={this.removeCurrency.bind(this, currency)}
                basecurrency={this.state.baseCurrency}
                defaultprice={this.state.defaultPrice}
              />
            )
          );
        })}
      </div>
    );
  }
}

export default inject("rootstore")(observer(ListCurrencies));
