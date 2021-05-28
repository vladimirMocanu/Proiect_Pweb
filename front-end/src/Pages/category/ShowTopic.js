import React, { useEffect, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import axios from "axios";
import List2 from "../../components/list";
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export default function ShowTopic() {
  const [title, setTitle] = useState();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    getTopic();
  }, []);

  const getTopic = async () => {
    const res = await axios.get("/api/v1/category/" + id);
    setTitle(res.data);
  };
  return (
    <div>
      <BrowserRouter>
        {title && (
          <div>
            <Typography variant="h3" className={classes.root}>
              {title.Title}
            </Typography>
            <Typography variant="h5" className={classes.root}>
              {title.Description}
            </Typography>
          </div>
        )}
        <Typography variant="h5" className={classes.root} align="left">
          Topics
        </Typography>
        <List2 link1={"/api/v1/topic/" + id} link2={"/topic/"} />
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            href={"/topic/create/" + id}
          >
            Create new Topic
          </Button>
        </div>
      </BrowserRouter>
    </div>
  );
}
