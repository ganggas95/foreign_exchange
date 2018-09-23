import "../../enzyme.config";
import React from "react";
import { mount, shallow } from "enzyme";
import * as _ from "lodash";
import { Provider } from "mobx-react";
import { stores } from "../../__mocks__/store";
import SearchCurrencies from "../../src/components/SearchCurrencies";

describe("Test SearchCurrencies render;", () => {
  let searchWrapper, rootstore, searchContainer;
  beforeEach(() => {
    searchWrapper = mount(
      <Provider {...stores}>
        <SearchCurrencies />
      </Provider>
    );
    rootstore = searchWrapper.instance().props.rootstore;

    searchContainer = searchWrapper.find(".search-container");
  });

  it("Search must be rendered if eventStore.addMode is true", () => {
    expect(searchContainer).toHaveLength(1);
  });

  describe("Test render Input", () => {
    let input;
    beforeEach(() => {
      input = searchWrapper.find("input.prompt");
    });
    it("Input should be rendered", () => {
      expect(input).toHaveLength(1);
    });

    it("When input value is changed, searchStore.keyword must be change", () => {
      input.simulate("change", { target: { value: "IDR" } });
      const { searchStore } = rootstore;

      expect(searchStore.getKeyword).toHaveLength(3);
      expect(searchStore.getKeyword).toBe("IDR");
    });
  });
});
