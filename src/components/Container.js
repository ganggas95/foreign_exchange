import React from "react";
import { inject, observer } from "mobx-react";
import Button from "./Button";
import ListCurrencies from "./ListCurrencies";
import SearchCurrencies from "./SearchCurrencies";
import CardHeader from "./CardHeader";

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //Use action store to fetch data from api
    let { currencyStore } = this.props.rootstore;

    currencyStore.fetchCurrencies();
  }

  render() {
    const { eventStore } = this.props.rootstore;
    return (
      <div className={`ui card`}>
        <CardHeader />
        <div className={`content`}>
          <ListCurrencies />
          {eventStore.addMode ? (
            <SearchCurrencies />
          ) : (
            <Button
              className={`ui left labeled icon button button-add`}
              onClick={() => {
                eventStore.changeMode();
              }}
              name={"btn-add"}
              text="Add more currencies"
              icon={{
                name: "plus",
                position: "right"
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default inject("rootstore")(observer(Container));
