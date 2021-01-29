import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Table.scss";
import { isNumberPositive } from "../../utilities/functions";

const getPriceClassNameSuffix = (price) =>
  isNumberPositive(price) ? "positive" : "negative";

const headerNames = {
  assetClass: "Asset Class",
  price: "Price",
  ticker: "Ticker",
};

const sortAlphabetically = (data) => [
  ...data.sort(function (a, b) {
    const x = a.ticker.toLowerCase();
    const y = b.ticker.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  }),
];

const sortNumerically = (data) => [
  ...data.sort(function (a, b) {
    return b.price - a.price;
  }),
];

const sortByAssetClass = (data) => {
  const creditAssets = data.filter((asset) => asset.assetClass === "Credit");
  const equityAssets = data.filter((asset) => asset.assetClass === "Equities");
  const macroAssets = data.filter((asset) => asset.assetClass === "Macro");

  return equityAssets.concat(macroAssets).concat(creditAssets);
};

const onClickHandler = (key, data) => {
  switch (key) {
    case "ticker":
      return sortAlphabetically(data);
    case "price":
      return sortNumerically(data);
    case "assetClass":
      return sortByAssetClass(data);
    default:
      return data;
  }
};

const Table = ({ data }) => {
  const [sortedData, sortData] = useState(data);
  const keys = Object.keys(data[0]);
  return (
    <table>
      <caption>Financial Instruments</caption>
      <thead>
        <tr>
          {keys.map(
            (key) =>
              headerNames[key] && (
                <th key={key}>
                  <button
                    onClick={() => sortData(onClickHandler(key, sortedData))}
                  >
                    {headerNames[key]}
                  </button>
                </th>
              )
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((asset) => (
          <tr className={`assetClass-${asset.assetClass}`} key={asset.ticker}>
            <td>{asset.ticker}</td>
            <td className={`price-${getPriceClassNameSuffix(asset.price)}`}>
              {asset.price}
            </td>
            <td>{asset.assetClass}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      assetClass: PropTypes.string.isRequired,
    })
  ),
};

export { Table };
