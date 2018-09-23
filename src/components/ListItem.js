import React from "react";
import PropTypes from "prop-types";
import formatPrice from "../common/formatPrice";

export default class ListItem extends React.Component {
  static propTypes = {
    currency: PropTypes.object.isRequired,
    defaultprice: PropTypes.string.isRequired,
    basecurrency: PropTypes.object.isRequired,
    removecurrency: PropTypes.func.isRequired
  };
  render() {
    const { currency, defaultprice, basecurrency, removecurrency } = this.props;

    return (
      <div className={"list-item"}>
        <div className={"item-detail"}>
          <div className={"item-detail__header"}>
            <h3 className={"item-detail__header-code"}>{currency.key}</h3>
            <h3 className={"item-detail__header-value"}>
              {formatPrice(
                (parseFloat(defaultprice) * parseFloat(currency.value)).toFixed(
                  4
                ),
                currency.symbol
              )}
            </h3>
          </div>
          <p className={"item-detail__desc"}>
            {`${currency.key}-${currency.description}`}
          </p>
          <p className={"item-detail__currency"}>
            1 {basecurrency.code}
            {" = "}{" "}
            {formatPrice(
              parseFloat(currency.value).toFixed(4),
              currency.symbol
            )}
          </p>
        </div>
        <div className={"item-action"}>
          <button
            className={"item-action__delete"}
            name={"btn-delete"}
            onClick={removecurrency}
          >
            <i className="ui times icon" />
          </button>
        </div>
      </div>
    );
  }
}
