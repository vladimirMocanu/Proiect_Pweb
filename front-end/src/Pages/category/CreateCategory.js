import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";

async function createCategory(credentials) {
  return axios
    .post("/api/v1/category/create", {
      Title: credentials.title,
    })
    .then(() => (window.location = "/mainPage"));
}

export default function CreateCategory() {
  const [title, setTitle] = useState();
  //de adaugat descriere

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({
      title,
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <h1>Create Category</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            required
            fullWidth
            margin="normal"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </BrowserRouter>
    </div>
  );
}
