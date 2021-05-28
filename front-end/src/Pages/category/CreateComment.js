import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
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
  const [content, setContent] = useState();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const classes = useStyles();

  async function createTopic(credentials) {
    return axios
      .post("/api/v1/comment/create", {
        Content: credentials.content,
        CreatedBy: credentials.user.FirstName,
        IdTopic: credentials.id,
      })
      .then(() => (window.location = "/topic/" + id));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTopic({
      content,
      user,
      id,
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Typography variant="h2" className={classes.root}>
          Create Comment
        </Typography>
        <form onSubmit={handleSubmit}>
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
