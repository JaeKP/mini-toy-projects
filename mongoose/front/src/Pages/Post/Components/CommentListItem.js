import React, { useState } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { postQuery, commentQuery } from "../../../Queries";
import { CommentUpdateFrom } from "./index";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    display: "flex",
    gap: "1rem",
    minHeight: "3rem",
    padding: "1.5rem 2rem 1rem",
  },

  w15: {
    width: "15%",
    wordBreak: "break-all",
  },

  wb: {
    width: "80%",
    flexGrow: "1",
    wordBreak: "break-all",
  },

  container: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },

  button: {
    fontSize: "0.5rem",
  },
}));

const CommentListItem = ({ data, id }) => {
  const classes = useStyles();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [deleteComment] = useMutation(commentQuery.DELETE_COMMENT, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: postQuery.GET_POSTDETAIL,
        variables: {
          postId: id,
        },
      },
    ],
  });

  const clickDelete = () => {
    deleteComment({
      variables: {
        commentId: data.id,
      },
    });
  };
  return (
    <Paper className={classes.card} variant="outlined">
      <Typography variant="caption" className={classes.w15}>
        {data.user}
      </Typography>
      {!updateStatus && (
        <>
          <Typography variant="body1" className={classes.wb}>
            {data.content}
          </Typography>
          <div className={classes.container}>
            <Button className={classes.button} onClick={() => setUpdateStatus(true)}>
              update
            </Button>
            <Button className={classes.button} color="secondary" onClick={clickDelete}>
              delete
            </Button>
          </div>
        </>
      )}
      {updateStatus && (
        <CommentUpdateFrom id={id} commentData={data.content} commentId={data.id} setUpdateStatus={setUpdateStatus} />
      )}
    </Paper>
  );
};

export default CommentListItem;
