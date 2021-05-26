import React, { useContext } from "react";
import List2 from "../components/list";
import { BrowserRouter as Router } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AuthContext from "../Contexts/AuthContext";

export default function MainPage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <h1>Main Page</h1>
        <List2 link1={"/api/v1/category/"} link2={"/category/"} />
        {user.Role == "Admin" ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            href={"/category/create/"}
          >
            Create new Category
          </Button>
        ) : (
          <></>
        )}
      </Router>
    </div>
  );
}
