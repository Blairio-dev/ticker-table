export const headerNames: IDict<string> = {
  assetClass: "Asset Class",
  price: "Price",
  ticker: "Ticker",
};

export interface IDict<T> {
  [key: string]: T;
}

export interface Instrument {
  ticker: string;
  price: number;
  assetClass: string;
}
