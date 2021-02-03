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

const wrapper = mount(<Table {...DEFAULT_PROPS} />);
const headers = wrapper.find("th");
const rows = wrapper.find("tbody").find("tr");

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
      expect(headers).toHaveLength(3);
    });
    it("Only data six rows", () => {
      expect(rows).toHaveLength(6);
    });
  });
  describe("Content checks", () => {
    it("Table headers", () => {
      const keys = Object.keys(data[0]);
      headers.forEach((th, idx) => {
        expect(th.find("button").find("div").at(1).text()).toEqual(
          headerNames[keys[idx]]
        );
      });
    });
    it("Rows content", () => {
      rows.forEach((tr, rowIndex) => {
        const cells = tr.find("td");
        expect(cells).toHaveLength(Object.keys(headerNames).length);
        expect(cells.at(0).text()).toEqual(data[rowIndex].ticker);
        expect(cells.at(1).text()).toEqual(data[rowIndex].price.toString());
        expect(cells.at(2).text()).toEqual(data[rowIndex].assetClass);
      });
    });
  });
  describe("Sorting", () => {
    it("By Ticker alphabetically", () => {
      const tickerSortButton = wrapper.find("th").find("button").at(0);
      tickerSortButton.find("button").simulate("click");
      const sortedRows = wrapper.find("tbody").find("tr");

      const firstRowCells = sortedRows.at(0).find("td");
      const lastRowCells = sortedRows.at(5).find("td");
      expect(firstRowCells.at(0).text()).toEqual("DEUX");
      expect(lastRowCells.at(0).text()).toEqual("UNO");
    });
    it("By Price descending", () => {
      const priceSortButton = wrapper.find("th").find("button").at(1);
      priceSortButton.find("button").simulate("click");
      const sortedRows = wrapper.find("tbody").find("tr");

      const firstRowCells = sortedRows.at(0).find("td");
      const lastRowCells = sortedRows.at(5).find("td");
      expect(firstRowCells.at(1).text()).toEqual("3333.33");
      expect(lastRowCells.at(1).text()).toEqual("-2222.22");
    });
    it("By Asset Class", () => {
      const priceSortButton = wrapper.find("th").find("button").at(2);
      priceSortButton.find("button").simulate("click");
      const sortedRows = wrapper.find("tbody").find("tr");

      const firstRowCells = sortedRows.at(0).find("td");
      const thirdRowCells = sortedRows.at(2).find("td");
      const lastRowCells = sortedRows.at(5).find("td");
      expect(firstRowCells.at(2).text()).toEqual("Equities");
      expect(thirdRowCells.at(2).text()).toEqual("Macro");
      expect(lastRowCells.at(2).text()).toEqual("Credit");
    });
  });
});
