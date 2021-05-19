import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signUp";
import MainPage from "./Pages/MainPage";
import BrowserCategory from "./Pages/category/BrowserCategory";
import CreateCategory from "./Pages/category/CreateCategory";
import ShowTopic from "./Pages/category/ShowTopic";
import CreateTopic from "./Pages/category/CreateTopic";
import { useState } from "react";
import AuthContext from "./Contexts/AuthContext";
import { useEffect } from "react";
import NavBar from "./components/Navbar";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);
  const [isInitiated, setIsInitiated] = useState([]);

  const handleLogout = () => {
    setUser([]);
  };

  useEffect(() => {
    init1();
  }, []);

  const init1 = async () => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    const res1 = await axios.get("/api/v1/users/init", { params: { token } });
    const { user } = res1.data;
    setUser(user);
    setIsInitiated(true);
    console.log(user._id);
  };
  if (!user._id) {
    return <Login />;
  }
  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
          <Router>
            <div className="App">
              <div className="outer">
                <div className="inner">
                  <NavBar />
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/mainPage" component={MainPage} />
                    <Route path="/category/view" component={BrowserCategory} />
                    <Route path="/category/create" component={CreateCategory} />
                    <Route path="/topic/create/:id" component={CreateTopic} />
                    <Route path="/category/:id" component={ShowTopic} />
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
