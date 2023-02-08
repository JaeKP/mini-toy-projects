import { useState } from "react";
import { TextField, Dialog, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { postQuery } from "../../../Queries";
import { useNavigate } from "react-router-dom";

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

const CreatePostForm = ({ open, onClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [createPost] = useMutation(postQuery.CREATE_POST, {
    refetchQueries: [{ query: postQuery.GET_POST }],
    onCompleted: ({ writePost }) => {
      onClose();
      navigate(`/${writePost.id}`);
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    createPost({
      variables: {
        user,
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
          id="create-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Please input a title"
          required
        />
        <div className={classes.div}>
          <TextField
            id="create-username"
            label="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={classes.w100}
            required
          />
          <TextField
            id="create-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.w100}
            type="password"
            required
          />
        </div>
        <TextField
          id="create-content"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Please input contents"
          multiline
          rows={3}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Dialog>
  );
};

export default CreatePostForm;
