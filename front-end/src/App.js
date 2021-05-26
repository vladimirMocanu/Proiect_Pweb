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
import ShowComment from "./Pages/category/ShowComment";
import CreateComment from "./Pages/category/CreateComment";
import ConfirmEmail from "./Pages/ConfirmEmail";
import adminPage from "./Pages/adminPage";
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
    init1();
  }, []);

  const init1 = async () => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    const res1 = await axios.get("/api/v1/users/init", { params: { token } });
    const { user } = res1.data;
    setUser(user);
    setIsInitiated(true);
  };
  // if (!user._id) {
  //   return <Login />;
  // }
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
                    {!user._id ? (
                      <>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/signUp" component={SignUp} />
                        <Route path="/confirm/:id" component={ConfirmEmail} />
                      </>
                    ) : (
                      <>
                        <Route exact path="/" component={MainPage} />
                        <Route path="/mainPage" component={MainPage} />
                        <Route
                          path="/category/view"
                          component={BrowserCategory}
                        />
                        <Route
                          path="/category/create"
                          component={CreateCategory}
                        />
                        <Route
                          path="/topic/create/:id"
                          component={CreateTopic}
                        />
                        <Route path="/category/:id" component={ShowTopic} />
                        <Route path="/topic/:id" component={ShowComment} />
                        <Route
                          path="/comment/create/:id"
                          component={CreateComment}
                        />
                        {user.Role == "Admin" ? (
                          <Route path="/adminPage" component={adminPage} />
                        ) : (
                          <Redirect to="/mainPage" />
                        )}
                      </>
                    )}
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
