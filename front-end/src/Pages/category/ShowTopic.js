import React, { useEffect, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import List2 from "../../components/list";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default function ShowCategory() {
  const [title, setTitle] = useState();
  const { id } = useParams();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const res = await axios.get("/api/v1/category/" + id);
    setTitle(res.data);
  };

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
          href="/topic/create"
        >
          Create new Topic
        </Button>
      </BrowserRouter>
    </div>
  );
}
