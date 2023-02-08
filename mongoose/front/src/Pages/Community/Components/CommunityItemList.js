import { CommunityItem } from "./index";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    marginTop: "2rem",
  },
}));

const CommunityItemList = ({ listData }) => {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      {listData.map((data) => {
        return <CommunityItem data={data} key={data.id} />;
      })}
    </section>
  );
};

export default CommunityItemList;
