import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function BrowserCategory() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <h1>Browser1 Category</h1>
      </BrowserRouter>
    </div>
  );
}
