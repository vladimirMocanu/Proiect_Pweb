import React, { useContext } from "react";
import List2 from "../components/list";
import { BrowserRouter as Router } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AuthContext from "../Contexts/AuthContext";
import UserList from "../components/userList";

export default function MainPage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <h1>admin Page</h1>
        {user.Role == "Admin" ? <UserList /> : <></>}
      </Router>
    </div>
  );
}
