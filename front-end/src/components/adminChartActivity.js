import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import axios from "axios";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

export default function ChartActivity() {
  const [topic, setTopic] = useState();
  const [category, setCategory] = useState();
  const [comment, setComment] = useState();
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

  async function getData() {
    let res = await axios.get(
      "http://localhost:3000/api/v1/category/graph/category"
    );
    setCategory(res.data);

    res = await axios.get("http://localhost:3000/api/v1/topic/graph/topic");

    setTopic(res.data);
    res = await axios.get("http://localhost:3000/api/v1/comment/graph/comment");
    setComment(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  let rows = [];
  if (category != undefined && topic != undefined && comment != undefined) {
    for (let i = 0; i < category.length - 1; i++) {
      if (category[i]._id.Month > category[i + 1]._id.Month) {
        let a = category[i];
        category[i] = category[i + 1];
        category[i + 1] = a;
      }
    }

    for (let i in category) {
      rows[i] = {
        month: monthData[category[i]._id.Month - 1] + "",
        category: category[i].count,
        topic: topic[i].count,
        bronze: comment[i].count,
      };
    }
  }

  return (
    <Paper>
      <Chart data={rows}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name="Category"
          valueField="category"
          argumentField="month"
          color="#ffd700"
        />
        <BarSeries
          name="Topic"
          valueField="topic"
          argumentField="month"
          color="#c0c0c0"
        />
        <BarSeries
          name="Comment"
          valueField="bronze"
          argumentField="month"
          color="#cd7f32"
        />
        <Animation />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <Title text="Activity / Month" />
        <Stack />
      </Chart>
    </Paper>
  );
}
