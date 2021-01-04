import React from "react";
import Context from "../../Context";
import { findNote } from "../../NoteHelper";
import NoteContent from "../NoteContent/NoteContent";
import NoteError from "../NoteError/NoteError";
import "./Note.css";

class Note extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = Context;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes } = this.context;
    const { noteId } = this.props.match.params;

    const note = findNote(notes, noteId) || { content: "" };

    return (
      <section className="Note">
        <NoteError>
          <NoteContent
            id={note.id}
            name={note.name}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
          />

          <div className="note_content">{note.content}</div>
        </NoteError>
      </section>
    );
  }
}

export default Note;
