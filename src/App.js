import React, { Component } from "react";
import "./App.css";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

const firebase = require("firebase");

window.onload = () => {
  const sidebarComp = document.getElementById("sidebarComp");
  const expandBtn = document.getElementById("expandBtn");
  const closeBtn = document.getElementById("closeBtn");
  sidebarComp.classList.add("sidebarOpen");

  closeBtn.addEventListener("click", () => {
    sidebarComp.classList.remove("sidebarOpen");
    expandBtn.style.visibility = "visible";
    closeBtn.style.visibility = "hidden";
  });
  expandBtn.addEventListener("click", () => {
    sidebarComp.classList.add("sidebarOpen");
    closeBtn.style.visibility = "visible";
    expandBtn.style.visibility = "hidden";
  });
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      SelectedNote: null,
      notes: null
    };
  }

  render() {
    const { selectedNoteIndex, selectedNote, notes } = this.state;
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          submitNewNote={this.submitNewNote}
        />
        {selectedNote && (
          <EditorComponent
            selectedNoteIndex={selectedNoteIndex}
            selectedNote={selectedNote}
            notes={notes}
            noteUpdate={this.noteUpdate}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        this.setState({ notes: notes });
      });
  }

  selectNote = (note, index) => {
    this.setState({
      ...this.state,
      selectedNote: note,
      selectedNoteIndex: index
    });
  };

  deleteNote = async note => {
    const noteIndex = this.state.notes.indexOf(note);
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        ...this.state,
        selectedNoteIndex: null,
        selectedNote: null
      });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.selectedNoteIndex < this.state.notes.indexOf(note)
              ? this.state.notes[this.state.selectedNoteIndex]
              : this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex < this.state.notes.indexOf(note)
              ? this.state.selectedNoteIndex
              : this.state.selectedNoteIndex - 1
          )
        : this.setState({
            ...this.state,
            selectedNoteIndex: null,
            selectedNote: null
          });
    }
    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  submitNewNote = async title => {
    const newNote = {
      title: title,
      body: ""
    };
    const newFromDB = await firebase
      .firestore()
      .collection("notes")
      .add({
        title: newNote.title,
        body: newNote.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, newNote] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(_note => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };
}

export default App;
