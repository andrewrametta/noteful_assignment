import React from "react";
import Context from "../../Context";
import ValidationError from "../ValidationError/ValidationError";
import "./AddNote.css";

class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: "",
        touched: false,
      },
      content: {
        value: "",
      },
      folder: {
        value: "",
      },
    };
    console.log(this.state.name.value);
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
    console.log(this.state.name.value);
  }

  updateContent(content) {
    this.setState({ content: { value: content } });
    console.log(this.state.content.value);
  }

  updateFolder(folder) {
    this.setState({ folder: { value: folder } }, () => {
      console.log(this.state.folder.value);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, content, folder } = this.state;
    console.log(name);
    const addNote = {
      name: name.value,
      content: content.value,
      folderId: folder.value,
      modified: new Date(),
    };
    console.log(addNote);

    fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.rejected(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folderId}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();

    return (
      <div className="AddNote">
        <h2> Add Note </h2>
        <form className="AddNote-form" onSubmit={this.handleSubmit}>
          <div className="flex-name">
            <label htmlFor="AddNote-name">Name: </label>
            <input
              required
              type="text"
              className="addNote-name"
              id="addNote-name"
              name="name"
              onChange={(e) => this.updateName(e.target.value)}
            />
          </div>

          <div className="flex-content">
            <label htmlFor="AddNote-content">Content: </label>
            <input
              required
              type="text"
              className="AddNote-content"
              id="addNote-content"
              name="addNote-content"
              onChange={(e) => this.updateContent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="AddNote-folder">Folder: </label>
            <select
              required
              id="AddNote-folder"
              name="AddNote-folder"
              onChange={(e) => this.updateFolder(e.target.value)}
            >
              <option value={""}>Please select a folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {this.state.name.touched && <ValidationError message={nameError} />}

          <div className="AddNote-button-container">
            <button type="submit" disabled={this.validateName()}>
              Submit
            </button>
          </div>
          {this.state.name.touched && <ValidationError message={nameError} />}
        </form>
      </div>
    );
  }
}

export default AddNote;
