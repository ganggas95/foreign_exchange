import React from "react";
import { inject, observer } from "mobx-react";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
  }
  handleResultSelect(result) {
    /**
     * This function used to handle selected search currency result
     * @param {object} result
     */
    const { searchStore } = this.props.rootstore;
    searchStore.onchange(result.title);
    searchStore.setResult(result);
    searchStore.emptyResults();
  }
  render() {
    const { searchStore } = this.props.rootstore;
    return (
      <div className="results transition visible">
        {searchStore.getResults.map((result, index) => {
          return (
            <div
              className="result"
              key={index}
              onClick={this.handleResultSelect.bind(this, result)}
            >
              <div className="content">
                <div className="title">{result.title}</div>
                <div className="price">{result.price}</div>
                <div className="desc">{result.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default inject("rootstore")(observer(SearchResult));
