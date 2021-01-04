import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Context from "../../Context";
import "./NoteContent.css";

class NoteContent extends React.Component {
  static contextType = Context;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.rejected(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { id, name, modified } = this.props;
    console.log(this.props.id);

    return (
      <div className="NoteContent">
        <div className="noteContent-title">
          <Link to={`/note/${id}`}>
            <h2>{name}</h2>
          </Link>
        </div>

        <button
          className="noteContent-delete-button"
          onClick={this.handleClickDelete}
        >
          Delete
        </button>
        <div className="noteContent-modified">
          Modified {new Date(modified).toLocaleString()}
        </div>
      </div>
    );
  }
}

NoteContent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string,
};

export default NoteContent;
