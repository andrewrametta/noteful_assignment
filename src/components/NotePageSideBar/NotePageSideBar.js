import React from "react";
import Context from "../../Context";
import "../../App.css";
import { findNote, findFolder } from "../../NoteHelper";
import "./NotePageSideBar.css";

class NotePageSideBar extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = Context;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);

    return (
      <div className="NotePageSideBar">
        <button
          className="NotePageNav_back-button"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        {folder && <h3 className="NotePageNav_folder-name">{folder.name}</h3>}
      </div>
    );
  }
}

export default NotePageSideBar;
