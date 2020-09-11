import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect,} from "react-router-dom";
import AuthContext, { AuthProvider } from "./data/AuthContext";
import { DataProvider } from "./data/DataContext";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Register from "./pages/Regsiter";

const App = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          {!isLogin ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!isLogin ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          {isLogin ? <Notes /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </AuthProvider>,
  document.getElementById("root")
);
