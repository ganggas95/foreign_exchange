import "../../enzyme.config";
import React from "react";
import { shallow } from "enzyme";
import { Provider } from "mobx-react";
import { stores } from "../../__mocks__/store";
import Index from "../../src/components";

describe("Test App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider {...stores}>
        <Index />
      </Provider>
    );
  });
  it("Sould render index Component", () => {
    expect(wrapper).toHaveLength(1);
  });
});
