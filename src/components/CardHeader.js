import React from "react";
import formatPrice from "../common/formatPrice";
import { inject, observer } from "mobx-react";

class CardHeader extends React.Component {
  render() {
    const {
      getDefaultPrice,
      getBaseCurrency
    } = this.props.rootstore.currencyStore;

    const baseCurrency = parseFloat(getDefaultPrice).toFixed(3),
      symbol = getBaseCurrency.symbol;
    const calculateCurrency = formatPrice(baseCurrency, symbol);

    return (
      <div className={`header card-header`}>
        <h5 className="card-header__title">
          {getBaseCurrency.code}-{getBaseCurrency.name}
        </h5>
        <div className="card-header__label">
          <h3 className="card-header__label-code">{getBaseCurrency.code}</h3>
          <h3 className="card-header__label-value">{calculateCurrency}</h3>
        </div>
      </div>
    );
  }
}

export default inject("rootstore")(observer(CardHeader));
