import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1800,
    paddingLeft: 20,
  },
  //   demo: {
  //     backgroundColor: theme.palette.background.paper,
  //   },
  //   title: {
  //     margin: theme.spacing(4, 0, 2),
  //   },
}));

export default function InteractiveList(link1) {
  const classes = useStyles();

  const [category1, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const res = await axios.get(link1.link1);
    //console.log(res.data);
    setCategory(res.data);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <div className={classes[0]}>
          <List>
            {category1.map((cat, nr) => (
              <ListItem
                button
                type="submit"
                component="button"
                href={"/category/" + cat._id}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ForumIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={cat.Title} secondary={cat.CreatedDate} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </div>
  );
}
