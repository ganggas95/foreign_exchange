import "../../enzyme.config";
import React from "react";
import { mount, shallow } from "enzyme";

import * as _ from "lodash";
import { Provider } from "mobx-react";
import { stores } from "../../__mocks__/store";
import Container from "../../src/components/Container";
import SearchCurrencies from "../../src/components/SearchCurrencies";

describe("Test Render Contianer", () => {
  let wrapper, rootstore;
  beforeEach(() => {
    wrapper = mount(
      <Provider {...stores}>
        <Container />
      </Provider>
    );
    rootstore = wrapper.instance().props.rootstore;
  });

  it("Container should be rendered", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("Rootstore in props must be not null", () => {
    expect(rootstore).not.toBeNull();
  });

  describe("Test Render Card Header", () => {
    let cardHeader;
    beforeEach(() => {
      cardHeader = wrapper.find(".card-header");
    });
    it("CardHeader should rendered", () => {
      expect(cardHeader).toHaveLength(1);
    });
    it("CardHeader title should rendered", () => {
      expect(cardHeader.find(".card-header__title")).toHaveLength(1);
    });
    it("CardHeader title should rendered", () => {
      expect(cardHeader.find(".card-header__title")).toHaveLength(1);
    });
    describe("Test CardHeader label container", () => {
      let headerLabel;
      beforeEach(() => {
        headerLabel = cardHeader.find(".card-header__label");
      });
      it("Card Header label should rendered", () => {
        expect(headerLabel).toHaveLength(1);
      });
      it("Card Header label currency code should rendered", () => {
        expect(headerLabel.find(".card-header__label-code")).toHaveLength(1);
      });
      it("Card Header label currency value should rendered", () => {
        expect(headerLabel.find(".card-header__label-value")).toHaveLength(1);
      });
    });
  });

  describe("Test Render ListCurrencies", () => {
    let listCurrencies;
    beforeEach(() => {
      listCurrencies = wrapper.find("ListCurrencies");
    });

    it("ListCurrencies should rendered", () => {
      expect(listCurrencies).toHaveLength(1);
    });
  });

  describe("Test Render Button", () => {
    let button;
    beforeEach(() => {
      button = wrapper.find("Button");
    });

    it("Button should rendered", () => {
      expect(button).toHaveLength(1);
    });

    describe("Test Button UI interaction", () => {
      it("EventStore.addMode must be true after click button", () => {
        button.simulate("click");

        expect(rootstore.eventStore.addMode).toBe(true);
      });

      describe("Test SearchCurrencies render after click button", () => {
        let searchContainer;
        beforeEach(() => {
          let newStores = {
            rootstore: rootstore
          };
          searchContainer = mount(
            <Provider {...newStores}>
              {rootstore.eventStore.addMode && <SearchCurrencies />}
            </Provider>
          );
        });

        it("SelectCurrencies must be rendered after click button", () => {
          expect(searchContainer).toHaveLength(1);
        });
      });
    });
  });
});
