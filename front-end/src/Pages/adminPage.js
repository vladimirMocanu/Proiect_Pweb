import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import UserList from "../components/userList";
import AdminBarChart from "../components/adminBarChart";
import AdminChartActivity from "../components/adminChartActivity";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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
          Admin Page
        </Typography>
        {user.Role === "Admin" ? (
          <>
            <UserList />
            <AdminBarChart />
            <AdminChartActivity />
          </>
        ) : (
          <></>
        )}
      </Router>
    </div>
  );
}
