const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  titleInput: {
    fontFamily: '"Titillium Web", sans-serif',
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "24px",
    width: "calc(100% - 300px)",
    backgroundColor: "#0c8eb6",
    color: "white",
    paddingLeft: "80px"
  },
  editIcon: {
    position: "absolute",
    left: "40px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10"
  },
  editorContainer: {
    height: "100%",
    boxSizing: "border-box"
  }
});

export default styles;
