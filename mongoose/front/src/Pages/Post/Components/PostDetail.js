import { Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginTop: "4rem",
  },

  button: {
    display: "flex",
    gap: "0.5rem",
    alignSelf: "end",
    width: "max-content",
  },
}));

const PostDetail = ({ postData, openUpdateModal, openDeleteModal }) => {
  const classes = useStyle();
  return (
    <section className={classes.section}>
      <div>
        <Typography variant="h4">{postData.title}</Typography>
        <Typography variant="body2" color="gray" mt="0.5rem">
          작성자: {postData.user}
        </Typography>
      </div>
      <Typography variant="body1">{postData.content}</Typography>
      <div className={classes.button}>
        <Button variant="contained" color="primary" className={classes.button} onClick={openUpdateModal}>
          Update
        </Button>
        <Button onClick={openDeleteModal}>Delete</Button>
      </div>
    </section>
  );
};
export default PostDetail;
