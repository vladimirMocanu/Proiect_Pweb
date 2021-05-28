import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1800,
    paddingLeft: 20,
  },
}));

export default function InteractiveList(link1) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [category1, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const res = await axios.get(link1.link1);
    setCategory(res.data);
  };

  const Delete1 = async (id1) => {
    await axios.delete(link1.link1 + "/" + id1);
  };

  let star = false;
  return (
    <Box display="flex" m={1} bgcolor="background.paper">
      <div className={classes.root}>
        <Grid item xs={12} md={12}>
          <div className={classes[0]}>
            <List>
              {category1.map((cat, nr) => (
                <ListItem
                  button
                  type="submit"
                  component="button"
                  href={link1.link2 + cat._id}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <ForumIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {cat.Title === undefined ? (
                    <ListItemText primary={cat.Description} />
                  ) : (
                    <ListItemText
                      primary={cat.Title}
                      secondary={cat.Description}
                    />
                  )}

                  <ListItemText
                    primary={" Creat de " + cat.CreatedBy}
                    secondary={cat.CreatedDate}
                  />
                  {user.Role === "Admin" || user.Role === "Support" ? (
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          Delete1(cat._id);
                          // window.location.reload(false);
                          getCategory();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  ) : (
                    <></>
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </div>
    </Box>
  );
}
