import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class EditorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      title: "",
      id: ""
    };
  }

  componentDidMount() {
    const { body, title, id } = this.props.selectedNote;
    this.setState({ text: body, title, id });
  }

  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id) {
      const { body, title, id } = this.props.selectedNote;
      this.setState({ text: body, title, id });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer} id="editorComp">
        <BorderColorIcon className={classes.editIcon} />
        <input
          type="text"
          className={classes.titleInput}
          placeholder="Note Title..."
          value={this.state.title ? this.state.title : ""}
          onChange={e => this.updateTitle(e.target.value)}
        />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    );
  }
  updateBody = async val => {
    await this.setState({ text: val });
    this.update();
  };
  updateTitle = async txt => {
    await this.setState({ title: txt });
    this.update();
  };
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  }, 1500);
}

export default withStyles(styles)(EditorComponent);
