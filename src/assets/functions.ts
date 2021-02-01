import { Instrument } from "./interfaces";

const isNumberPositive = (price: number) => price > 0;

const sortAlphabetically = (data: Instrument[]) => [
  ...data.sort(function (a: Instrument, b: Instrument) {
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

const sortByAssetClass = (data: Instrument[]) => {
  const creditAssets = data.filter((asset) => asset.assetClass === "Credit");
  const equityAssets = data.filter((asset) => asset.assetClass === "Equities");
  const macroAssets = data.filter((asset) => asset.assetClass === "Macro");

  return equityAssets.concat(macroAssets).concat(creditAssets);
};

const sortNumerically = (data: Instrument[]) => [
  ...data.sort(function (a, b) {
    return b.price - a.price;
  }),
];

export {
  isNumberPositive,
  sortAlphabetically,
  sortByAssetClass,
  sortNumerically,
};
