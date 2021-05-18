import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import { Router } from "react-router";

import Login from "./components/login";
import SignUp from "./components/signUp";
import MainPage from "./Pages/MainPage";
import BrowserCategory from "./Pages/category/BrowserCategory";
import CreateCategory from "./Pages/category/CreateCategory";
import ShowCategory from "./Pages/category/ShowCategory";
import { createBrowserHistory } from "history";

function App() {
  const historyInstance = createBrowserHistory();

  return (
    <Router history={historyInstance}>
      <div className="App">
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              RemoteStack
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}

        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/mainPage" component={MainPage} />
              <Route path="/category/view" component={BrowserCategory} />
              <Route path="/category/create" component={CreateCategory} />
              <Route path="/category/:id" component={ShowCategory} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
