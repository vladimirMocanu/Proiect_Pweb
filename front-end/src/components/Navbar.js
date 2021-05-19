import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import AuthContext from "../Contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Button color="inherit" href="/mainPage">
            Main
          </Button>
          <Button color="inherit" href="/category/create">
            Category
          </Button>
          <Button color="inherit">Login</Button>
          {user ? (
            <Button color="inherit">{user.FirstName}</Button>
          ) : (
            <Button color="inherit">Nu Merge</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
