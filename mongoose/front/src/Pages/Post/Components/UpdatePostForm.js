import { useState } from "react";
import { TextField, Dialog, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { postQuery } from "../../../Queries";

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: "600px",
    padding: "3rem 2rem",
    gap: "2rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "100%",
  },

  div: {
    display: "flex",
    gap: "2rem",
  },

  w100: {
    width: "100%",
  },
}));

const UpdatePostForm = ({ open, onClose, postData, setPostData }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(postData.title);
  const [user, setUser] = useState(postData.user);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(postData.content);

  const [updatePost] = useMutation(postQuery.UPDATE_POST, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: postQuery.GET_POSTDETAIL,
        variables: {
          postId: postData.id,
        },
      },
      {
        query: postQuery.GET_POST,
      },
    ],
    onCompleted: (data) => {
      onClose();
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    updatePost({
      variables: {
        postId: postData.id,
        password,
        title,
        content,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.paper }}>
      <Typography variant="h4" fontWeight="500">
        CreatePost
      </Typography>
      <form className={classes.form} onSubmit={submitForm}>
        <TextField
          id="update-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Please input a title"
          required
        />
        <div className={classes.div}>
          <TextField
            id="update-username"
            label="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={classes.w100}
            disabled
          />
          <TextField
            id="update-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.w100}
            type="password"
            required
          />
        </div>
        <TextField
          id="update-content"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Please input contents"
          multiline
          rows={3}
        />
        <Button type="submit">Update</Button>
      </form>
    </Dialog>
  );
};

export default UpdatePostForm;
