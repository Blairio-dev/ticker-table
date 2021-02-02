import "./App.css";
import sampleData from "./assets/sampleData.json";
import { Table } from "./components";

const App = () => (
  <div className="App">
    <Table data={sampleData} />
  </div>
);

export { App };
