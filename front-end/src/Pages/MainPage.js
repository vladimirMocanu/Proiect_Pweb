import React from "react";
import Navbar from "../components/Navbar";
import List2 from "../components/list";
import { BrowserRouter as Router } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function MainPage() {
  return (
    <div>
      <Router>
        <h1>Main Page</h1>
        <List2 link1={"/api/v1/category/"} />
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          href={"/category/create/"}
        >
          Create new Category
        </Button>
      </Router>
    </div>
  );
}
