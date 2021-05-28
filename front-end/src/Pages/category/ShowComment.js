import React, { useEffect, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import axios from "axios";
import List2 from "../../components/list";
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export default function ShowComment() {
  const [title, setTitle] = useState();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const res = await axios.get("/api/v1/topic/getTopic/" + id);
    setTitle(res.data);
  };

  console.log(title);
  return (
    <div>
      <BrowserRouter>
        {title && (
          <div>
            <Typography variant="h3" className={classes.root}>
              Topic : {title.Title}
            </Typography>
            <Typography variant="h6" className={classes.root}>
              {title.Description}
            </Typography>
          </div>
        )}

        <Typography variant="h5" className={classes.root} align="left">
          Comments
        </Typography>
        <List2 link1={"/api/v1/comment/" + id} />
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            href={"/comment/create/" + id}
          >
            Create new Comment
          </Button>
        </div>
      </BrowserRouter>
    </div>
  );
}
