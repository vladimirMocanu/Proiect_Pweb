import React from "react";
import Navbar from "../components/Navbar";
import List2 from "../components/list";
import { BrowserRouter as Router } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <Router>
        <Navbar />
        <h1>Main Page</h1>
        <List2 link1={"/api/v1/category/"} />
      </Router>
    </div>
  );
}
