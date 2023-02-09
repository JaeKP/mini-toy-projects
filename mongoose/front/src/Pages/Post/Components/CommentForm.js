import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { postQuery, commentQuery } from "../../../Queries";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    gap: "1rem",
    width: "100%",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem ",
  },

  username: {
    height: "0.3rem",
    maxWidth: "8rem",
  },
  button: {
    width: "100%",
  },

  comment: {
    flexGrow: "1",
  },
}));

const CommentForm = ({ id }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");
  const [createComment] = useMutation(commentQuery.CREATE_COMMENT, {
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
      setUser("");
      setComment("");
    },
  });
  const submitForm = (e) => {
    e.preventDefault();
    createComment({
      variables: {
        postId: id,
        user,
        content: comment,
      },
    });
  };

  return (
    <form className={classes.form} onSubmit={submitForm}>
      <div className={classes.container}>
        <TextField
          placeholder={"username"}
          variant={"outlined"}
          value={user}
          onChange={(e) => setUser(e.target.value)}
          inputProps={{ className: classes.username }}
          required
        />
        <Button variant="outlined" color="secondary" type="submit" className={classes.button}>
          submit
        </Button>
      </div>
      <TextField
        className={classes.comment}
        variant={"outlined"}
        placeholder={"please input comment"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        multiline
        minRows={4}
        maxRows={4}
      />
    </form>
  );
};

export default CommentForm;
