import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { postQuery, commentQuery } from "../../../Queries";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "end",
  },

  comment: {
    width: "100%",
  },

  button: {
    fontSize: "0.5rem",
  },
}));

const CommentUpdateFrom = ({ id, commentId, setUpdateStatus, commentData }) => {
  const classes = useStyles();
  const [comment, setComment] = useState(commentData);
  const [updateComment] = useMutation(commentQuery.UPDATE_COMMENT, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: postQuery.GET_POSTDETAIL,
        variables: {
          postId: id,
        },
      },
    ],
    onCompleted: () => {
      setUpdateStatus(false);
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    updateComment({
      variables: {
        commentId,
        content: comment,
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={submitForm}>
      <TextField
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={classes.comment}
        required
        multiline
        minRows={1}
        maxRows={2}
      />
      <div>
        <Button type="button" onClick={() => setUpdateStatus(false)} className={classes.button}>
          CANCLE
        </Button>
        <Button type="submit" color="secondary" className={classes.button}>
          UPDATE
        </Button>
      </div>
    </form>
  );
};

export default CommentUpdateFrom;
