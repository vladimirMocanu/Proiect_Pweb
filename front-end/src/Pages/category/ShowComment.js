import React, { useEffect, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import axios from "axios";
import List2 from "../../components/list";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function ShowComment() {
  const [title, setTitle] = useState();
  const { id } = useParams();

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const res = await axios.get("/api/v1/comment/" + id);
    setTitle(res.data);
  };
  console.log(id);
  return (
    <div>
      <BrowserRouter>
        {title && <h1>{title.Title}</h1>}
        <List2 link1={"/api/v1/comment/" + id} />
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          href={"/comment/create/" + id}
        >
          Create new Comment
        </Button>
      </BrowserRouter>
    </div>
  );
}
