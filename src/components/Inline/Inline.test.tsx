import React from "react";
import { mount } from "enzyme";
import { Inline } from "./Inline";

const DEFAULT_PROPS = {
  nodes: [<div>Left node</div>, <div>Right node</div>],
};

const wrapper = mount(<Inline {...DEFAULT_PROPS} />);

describe("Inline", () => {
  describe("Basic rendering and semantics", () => {
    it("Renders with default props", () => {
      expect(wrapper.length).toEqual(1);
    });
  });
});
