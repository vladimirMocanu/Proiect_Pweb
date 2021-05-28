import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 40,
  },
}));

export default function BarChart() {
  const [data, setData] = useState();
  const monthData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  async function getUsers() {
    const res = await axios.get(
      "http://localhost:3000/api/v1/users/graph/user"
    );
    setData(res.data);
  }
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, []);

  let rows = [];
  if (data !== undefined) {
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i]._id.Month > data[i + 1]._id.Month) {
        let a = data[i];
        data[i] = data[i + 1];
        data[i + 1] = a;
      }
    }

    for (let i in data) {
      rows[i] = {
        year: monthData[data[i]._id.Month - 1] + "",
        population: data[i].count,
      };
    }
  }
  return (
    <div className={classes.root}>
      <Paper>
        <Chart data={rows}>
          <ArgumentAxis />
          <ValueAxis max={rows.length} />

          <BarSeries valueField="population" argumentField="year" />
          <Title text="NewUsers/per Month" />
          <Animation />
        </Chart>
      </Paper>
    </div>
  );
}
