export interface IDict<T> {
  [key: string]: T;
}

export interface Instrument {
  ticker: string;
  price: number;
  assetClass: string;
}
