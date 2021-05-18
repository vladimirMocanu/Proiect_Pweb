import React, { useEffect, useState } from "react";
import { BrowserRouter, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import List2 from "../../components/list";

export default function ShowCategory() {
  const [title, setTitle] = useState();
  const { id } = useParams();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const res = await axios.get("/api/v1/category/" + id);
    //console.log(res.data);
    setTitle(res.data);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {title && <h1>{title.Title}</h1>}
        <List2 link1={"/api/v1/category/"} />
      </BrowserRouter>
    </div>
  );
}
