import React, { useContext } from "react";
import List2 from "../components/list";
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AuthContext from "../Contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

export default function MainPage() {
  const { user } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <Router>
        <Typography variant="h2" className={classes.root}>
          Forum Auto Romania
        </Typography>
        <Typography variant="h5" className={classes.root} align="left">
          Category
        </Typography>
        <List2 link1={"/api/v1/category/"} link2={"/category/"} />
        {user.Role === "Admin" || user.Role === "Support" ? (
          <div className={classes.root}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              href={"/category/create"}
            >
              Create new Category
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Router>
    </div>
  );
}
