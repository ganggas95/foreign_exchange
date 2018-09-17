import React from "react";
import { inject, observer } from "mobx-react";

import CurrenciesView from "./Currencies";
import SelectCurrencies from "./SelectCurrencies";
import cardStyle from "../styles/card.css";
import buttonStyle from "../styles/button.css";
import formatPrice from "../common/formatPrice";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      baseCurrency: {}
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    /**
     * Function to get Updated data from store.
     * This lifecycle function to change older function lifecycle (componentWillReceiveProps)
     */

    //Define currencyStore from nextProps (updated data from store) before use in component
    var currencyStore = nextProps.rootstore.currencyStore;
    //If currencyStore is exist or not null
    // Update state with new data from store
    if (currencyStore) {
      return {
        currencies: currencyStore.filteredCurrencies,
        baseCurrency: currencyStore.getBaseCurrency
      };
    }
    //Else return Null
    return null;
  }

  componentDidMount() {
    //Define currencyStore before use in component
    var currencyStore = this.props.rootstore.currencyStore;

    //Use action store to fetch data from api
    currencyStore.fetchCurrencies(this.state.baseCurrency.code);
  }

  changeMode() {
    /**
     * This function to trigger add mode
     */
    this.props.rootstore.eventStore.changeMode();
  }

  render() {
    const { eventStore, currencyStore } = this.props.rootstore;
    return (
      <div className={`ui card ${cardStyle.cardContainer}`}>
        <div className={`header ${cardStyle.cardHeader}`}>
          <h5 className={cardStyle.cardHeaderTitle}>
            {this.state.baseCurrency.code}-{this.state.baseCurrency.name}
          </h5>
          <div className={cardStyle.cardHeaderLabel}>
            <h3 className={cardStyle.cardTextLabel}>
              {this.state.baseCurrency.code}{" "}
            </h3>
            <h3 className={cardStyle.cardTextValue}>
              {formatPrice(
                parseFloat(currencyStore.getDefaultPrice).toFixed(3),
                currencyStore.getBaseCurrency.symbol
              )}
            </h3>
          </div>
        </div>
        <div className={`content ${cardStyle.cardContent}`}>
          <CurrenciesView />
          {eventStore.add_mode ? (
            <SelectCurrencies />
          ) : (
            <button
              onClick={this.changeMode.bind(this)}
              className={`ui left labeled icon button ${buttonStyle.buttonAdd}`}
            >
              <i className="right plus icon" />
              Add more currencies
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default inject("rootstore")(observer(Container));
