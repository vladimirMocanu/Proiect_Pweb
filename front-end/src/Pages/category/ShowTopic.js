import React, { useEffect, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import axios from "axios";
import List2 from "../../components/list";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function ShowTopic() {
  const [title, setTitle] = useState();
  const { id } = useParams();

  useEffect(() => {
    getTopic();
  }, []);

  const getTopic = async () => {
    const res = await axios.get("/api/v1/category/" + id);
    setTitle(res.data);
  };
  console.log(id);
  return (
    <div>
      <BrowserRouter>
        {title && <h1>{title.Title}</h1>}
        <List2 link1={"/api/v1/topic/" + id} />
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          href={"/topic/create/" + id}
        >
          Create new Topic
        </Button>
      </BrowserRouter>
    </div>
  );
}
