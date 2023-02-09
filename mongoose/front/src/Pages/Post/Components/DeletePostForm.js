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
}));

const DeletePostForm = ({ open, onClose, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [deletePost] = useMutation(postQuery.DELETE_POST, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: postQuery.GET_POST,
      },
    ],
    onCompleted: () => {
      navigate("/");
    },
  });
  const submitForm = (e) => {
    e.preventDefault();
    deletePost({
      variables: {
        postId: id,
        password,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.paper }}>
      <Typography variant="h5" fontWeight={500}>
        DeletePost
      </Typography>
      <form onSubmit={submitForm} className={classes.form}>
        <TextField
          id="delete-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="please input post password"
          required
        />
        <Button type="submit">Delete</Button>
      </form>
    </Dialog>
  );
};
export default DeletePostForm;
