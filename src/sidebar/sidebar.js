import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebarItem";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

class SidebarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingNote: false,
      title: null
    };
  }

  render() {
    const { notes, selectedNoteIndex, classes } = this.props;
    return (
      <div className={classes.sidebarContainer} id="sidebarComp">
        <NavigateNextIcon id="expandBtn" className={classes.expandSidebar} />
        <NavigateBeforeIcon id="closeBtn" className={classes.closeSidebar} />
        <Button className={classes.newNoteBtn} onClick={this.newNoteBtnClick}>
          {this.state.addingNote ? "Cancel" : "New Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={e => this.updateTitle(e.target.value)}
            />
            <Button
              className={classes.newNoteSubmitBtn}
              onClick={this.submitNewNote}
            >
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes &&
            notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider />
                </div>
              );
            })}
        </List>
      </div>
    );
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };
  updateTitle = txt => {
    this.setState({ title: txt });
  };
  submitNewNote = () => {
    if (this.state.title.trim() !== "") {
      this.props.submitNewNote(this.state.title);
      this.setState({ addingNote: false, title: null });
    }
  };
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = note => this.props.deleteNote(note);
}

export default withStyles(styles)(SidebarComponent);
