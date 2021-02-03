import { useState } from "react";
import "./Table.scss";
import {
  isNumberPositive,
  sortAlphabetically,
  sortByAssetClass,
  sortNumerically,
} from "../../assets/functions";
import { headerNames, Instrument } from "../../assets/interfaces";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

const getPriceClassNameSuffix = (price: number) =>
  isNumberPositive(price) ? "positive" : "negative";

const onClickHandler = (key: string, data: Instrument[]) => {
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

interface TableProps {
  data: Instrument[];
}

const Table = ({ data }: TableProps) => {
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
                    <div className="inline-wrapper">
                      {headerNames[key]}
                      <SortIcon />
                    </div>
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

export { Table };
