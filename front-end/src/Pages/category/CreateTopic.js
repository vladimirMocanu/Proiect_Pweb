import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

async function createCategory(credentials) {
  return axios
    .post("/api/v1/topic/create", {
      Title: credentials.title,
      Description: credentials.content,
    })
    .then(() => (window.location = "/api/v1/topic/"));
}

export default function CreateCategory() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  //de adaugat descriere

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({
      title,
      content,
    });
  };

  return (
    <div>
      <BrowserRouter>
        <h1>Create Topic</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="Title"
            name="Title"
            variant="outlined"
            required
            fullWidth
            id="Title"
            label="Title"
            margin="normal"
            style={{ width: "95%" }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoComplete="Content"
            name="Content"
            variant="outlined"
            required
            fullWidth
            id="Content"
            label="Content"
            margin="normal"
            style={{ width: "95%", height: 100 }}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowUpwardIcon />}
          >
            Create
          </Button>
        </form>
      </BrowserRouter>
    </div>
  );
}
