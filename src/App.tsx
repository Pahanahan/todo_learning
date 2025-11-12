import Table from "./components/Table/Table";
import Timer from "./components/Timer/Timer";

import "./assets/styles/reset.css";
import "./assets/styles/fonts.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Timer />
      <Table />
    </div>
  );
}

export default App;
