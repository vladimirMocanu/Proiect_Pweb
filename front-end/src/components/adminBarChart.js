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

// const data = [
//   { year: "1950", population: 2.525 },
//   { year: "1960", population: 3.018 },
//   { year: "1970", population: 3.682 },
//   { year: "1980", population: 4.44 },
//   { year: "1990", population: 5.31 },
//   { year: "2000", population: 6.127 },
//   { year: "2010", population: 6.93 },
// ];

export default function BarChart() {
  const [data, setData] = useState();

  async function getUsers() {
    const res = await axios.get(
      "http://localhost:3000/api/v1/users/graph/user"
    );
    setData(res.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  let rows = [];
  if (data != undefined) {
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i]._id.Month > data[i + 1]._id.Month) {
        let a = data[i];
        data[i] = data[i + 1];
        data[i + 1] = a;
      }
    }

    for (let i in data) {
      rows[i] = {
        year: data[i]._id.Month + "",
        population: data[i].count,
      };
    }
  }
  return (
    <Paper>
      <Chart data={rows}>
        <ArgumentAxis />
        <ValueAxis max={rows.length} />

        <BarSeries valueField="population" argumentField="year" />
        <Title text="NewUsers/per Month" />
        <Animation />
      </Chart>
    </Paper>
  );
}
