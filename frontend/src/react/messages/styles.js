import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  messagesOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  messagesInnerContainer: {
    height: "200px",
    marginRight: "20px",
    overflowY: "scroll",
    width: "500px"
  },
}));
