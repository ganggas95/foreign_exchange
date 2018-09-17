import React from "react";
import currencyStyle from "../styles/currencies.css";
import { inject, observer } from "mobx-react";
import formatPrice from "../common/formatPrice";

class CurrenciesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCurrencies: [],
      baseCurrency: {},
      defaultPrice: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    /**
     * Function to get Updated data from store.
     * This lifecycle function to change older function lifecycle (componentWillReceiveProps)
     */

    //Define currencyStore from nextProps (updated data from store) before use in component
    var currencyStore = nextProps.rootstore.currencyStore;

    //If length of filteredCurrencies in currencyStore not same at filteredCurrencies in state
    // Update state with new data from store
    if (
      currencyStore.filteredCurrencies.length !==
      prevState.filteredCurrencies.length
    ) {
      return {
        filteredCurrencies: currencyStore.filteredCurrencies,
        baseCurrency: currencyStore.getBaseCurrency,
        defaultPrice: currencyStore.getDefaultPrice
      };
    }

    //Else return null
    return null;
  }

  removeCurrency(currency) {

    /**
     * This function to remove SelectedCurrency
     */
    var currencyStore = this.props.rootstore.currencyStore;
    currencyStore.removeSelectedCurrency(currency);
  }

  render() {
    return (
      <div className={currencyStyle.currenciesList}>
        {this.state.filteredCurrencies.map((currency, index) => {
          return (
            <div key={index} className={currencyStyle.currenciesListItem}>
              <div className={currencyStyle.currencyDetails}>
                <div className={currencyStyle.currencyHeader}>
                  <h3 className={currencyStyle.currencyLabel}>
                    {currency.key}
                  </h3>
                  <h3 className={currencyStyle.currencyValue}>
                    {formatPrice(
                      (
                        parseFloat(this.state.defaultPrice) *
                        parseFloat(currency.value)
                      ).toFixed(4),
                      currency.symbol
                    )}
                  </h3>
                </div>
                <p className={currencyStyle.currencyTarget}>
                  {`${currency.key}-${currency.description}`}
                </p>
                <p className={currencyStyle.currencyTargetValue}>
                  1 {this.state.baseCurrency.code} ={" "}
                  {formatPrice(
                    parseFloat(currency.value).toFixed(4),
                    currency.symbol
                  )}
                </p>
              </div>
              <div className={currencyStyle.currencyAction}>
                <button
                  className={currencyStyle.currencyDelete}
                  onClick={this.removeCurrency.bind(this, currency)}
                >
                  <i className="ui times icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default inject("rootstore")(observer(CurrenciesView));
