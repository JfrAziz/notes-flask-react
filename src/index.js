import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import DataContext, { DataProvider } from "./data/DataContext";
import Login from "./page/Login";
import Notes from "./page/Notes";
import Sampel from "./page/Sampel";

const App = () => {
  const { isLogin } = useContext(DataContext)
  const rootRoute = () => isLogin() ? <Notes/> : <Redirect to="/login"/>
  const loginRoute = () => !isLogin() ? <Login/> : <Redirect to="/"/>
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {loginRoute()}
        </Route>
        <Route path="/sampel">
          <Sampel/>
        </Route>
        <Route path="/">
          {rootRoute}
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById("root")
);
