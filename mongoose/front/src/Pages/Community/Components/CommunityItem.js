import { Card, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    all: "unset",
    width: "100%",
    cursor: "pointer",
  },

  card: {
    width: "100%",
    padding: "1rem 2rem",
  },
});

const CommunityItem = ({ data: { id, title, content, user } }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const clickCardButton = () => {
    navigate(`/${id}`);
  };
  return (
    <button className={classes.button} onClick={clickCardButton}>
      <Card className={classes.card}>
        <Typography variant="h6">📚 {title}</Typography>
        <Typography variant="body1" color="gray" fontWeight="200">
          {content}
        </Typography>
        <Typography variant="caption" color="gray" fontWeight="600">
          작성자: {user}
        </Typography>
      </Card>
    </button>
  );
};

export default CommunityItem;
