import React from "react";
import renderer from "react-test-renderer";
import { Table } from "./Table";

const data = [
  {
    ticker: "UNO",
    price: 1111.11,
    assetClass: "Credit",
    unsupportedKey: "test",
  },
  {
    ticker: "DOS",
    price: 2222.22,
    assetClass: "Equities",
  },
  {
    ticker: "TRES",
    price: 3333.33,
    assetClass: "Macro",
  },
  {
    ticker: "UN",
    price: -1111.11,
    assetClass: "Credit",
  },
  {
    ticker: "DEUX",
    price: -2222.22,
    assetClass: "Equities",
  },
  {
    ticker: "TROIS",
    price: -333.33,
    assetClass: "Macro",
  },
];

const DEFAULT_PROPS = {
  data,
};

describe("DataTable Snapshots", () => {
  it("Renders with default props", () => {
    const tree = renderer.create(<Table {...DEFAULT_PROPS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
