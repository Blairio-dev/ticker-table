import React from "react";
import renderer from "react-test-renderer";
import { Inline } from "./Inline";

const DEFAULT_PROPS = {
  nodes: [<div>Left node</div>, <div>Right node</div>],
};

describe("DataTable Snapshots", () => {
  it("Renders with default props", () => {
    const tree = renderer.create(<Inline {...DEFAULT_PROPS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
