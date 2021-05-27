import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";

async function ConfirmEmail1(id) {
  return await axios.get("http://localhost:3000/api/v1/users/confirm/" + id);
}
export default function ConfirmEmail() {
  const { id } = useParams();

  ConfirmEmail1(id);
  return (
    <div>
      <p>Email confirm. Go to Login</p>
      <Button variant="contained" color="primary" size="large" href={"/login"}>
        Login
      </Button>
    </div>
  );
}
