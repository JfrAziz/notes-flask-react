import React from "react";
import ReactDOM from "react-dom";
import { DataProvider } from "./data/DataContext"

const App = () => {
  return (
    <div>

    </div>
  )
};

ReactDOM.render(<DataProvider><App /></DataProvider>, document.getElementById("root"));
