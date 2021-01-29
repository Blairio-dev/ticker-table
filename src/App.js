import "./App.css";
import sampleData from "./data/sampleData.json";
import { Table } from "./components/Table/Table";

const App = () => (
  <div className="App">
    <Table data={sampleData} />
  </div>
);

export { App };
