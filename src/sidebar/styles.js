const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  newNoteBtn: {
    fontFamily: '"Titillium Web", sans-serif',
    width: "100%",
    height: "35px",
    borderRadius: "0px",
    backgroundColor: "#0c8eb6",
    color: "white",
    "&:hover": {
      backgroundColor: "#256a84"
    }
  },
  sidebarContainer: {
    marginTop: "0px",
    width: "300px",
    height: "100%",
    boxSizing: "border-box",
    float: "left",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  newNoteInput: {
    fontFamily: '"Titillium Web", sans-serif',
    width: "100%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)"
    }
  },
  newNoteSubmitBtn: {
    fontFamily: '"Titillium Web", sans-serif',
    width: "100%",
    backgroundColor: "#18784c",
    borderRadius: "0px",
    color: "white",
    "&:hover": {
      backgroundColor: "#18612c"
    }
  },
  expandSidebar: {
    position: "fixed",
    left: "0px",
    top: "0px",
    zIndex: 1,
    color: "#ccc",
    margin: "7px 0px",
    padding: "5px",
    visibility: "hidden",
    cursor: "pointer",
    "&:hover": {
      color: "#eee",
      backgroundColor: "rgba(220, 220, 220, 0.5)",
      borderRadius: "50%"
    }
  },
  closeSidebar: {
    position: "fixed",
    left: "250px",
    top: "0px",
    color: "#fff",
    padding: "5px",
    zIndex: 1,
    visibility: "visible",
    cursor: "pointer",
    "&:hover": {
      color: "#eee",
      backgroundColor: "rgba(220, 220, 220, 0.5)",
      borderRadius: "50%"
    }
  }
});

export default styles;
