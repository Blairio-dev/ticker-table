import React from "react";
import { mount } from "enzyme";
import { Table } from "./Table";
import { headerNames } from "../../assets/interfaces";

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

// Arrange
const wrapper = mount(<Table {...DEFAULT_PROPS} />);

describe("Table", () => {
  describe("Basic rendering and semantics", () => {
    it("Renders with default props", () => {
      expect(wrapper.length).toEqual(1);
    });
    it("Single table element", () => {
      const table = wrapper.find("table");
      expect(table).toHaveLength(1);
    });
    it("Single thead element", () => {
      const thead = wrapper.find("thead");
      expect(thead).toHaveLength(1);
    });
    it("Single tbody element", () => {
      const tbody = wrapper.find("tbody");
      expect(tbody).toHaveLength(1);
    });
    it("Only three columns", () => {
      const headers = wrapper.find("th");
      expect(headers).toHaveLength(3);
    });
    it("Only data six rows", () => {
      const rows = wrapper.find("tbody").find("tr");
      expect(rows).toHaveLength(6);
    });
  });
  describe("Content checks", () => {
    it("Table headers", () => {
      const headers = wrapper.find("th");
      const keys = Object.keys(data[0]);
      headers.forEach((th, idx) => {
        expect(th.find("button").find("div").at(1).text()).toEqual(
          headerNames[keys[idx]]
        );
      });
    });
    it("Rows content", () => {
      const rows = wrapper.find("tbody").find("tr");
      rows.forEach((tr, rowIndex) => {
        const cells = tr.find("td");
        expect(cells).toHaveLength(Object.keys(headerNames).length);
        expect(cells.at(0).text()).toEqual(data[rowIndex].ticker);
        expect(cells.at(1).text()).toEqual(data[rowIndex].price.toString());
        expect(cells.at(2).text()).toEqual(data[rowIndex].assetClass);
      });
    });
  });
});
