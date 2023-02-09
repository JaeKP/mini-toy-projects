import React from "react";
import { CommentListItem } from "./index";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
}));

const CommentList = ({ commentData, id }) => {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      {commentData.map((data) => {
        return <CommentListItem data={data} key={data.id} id={id} />;
      })}
    </section>
  );
};

export default CommentList;
