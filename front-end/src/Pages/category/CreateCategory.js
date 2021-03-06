import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AuthContext from "../../Contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

export default function CreateTopic() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const { user } = useContext(AuthContext);

  async function createTopic(credentials) {
    return axios
      .post("/api/v1/category/create", {
        Title: credentials.title,
        Description: credentials.content,
        CreatedBy: credentials.user.FirstName,
      })
      .then(() => (window.location = "/mainPage"));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTopic({
      title,
      content,
      user,
    });
  };
  const classes = useStyles();
  return (
    <div>
      <BrowserRouter>
        <Typography variant="h2" className={classes.root}>
          Create Category
        </Typography>
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
