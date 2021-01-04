import React from "react";
import Context from "../../Context";
import ValidationError from "../ValidationError/ValidationError";
import "./AddFolder.css";

class AddFolder extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.state = {
      name: "",
    };
  }

  updateName(name) {
    this.setState({ name: name });
    console.log(this.state.name);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name } = this.state;
    console.log(name);
    const folder = {
      name,
    };
    console.log(folder);

    fetch("http://localhost:9090/folders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.rejected(e));
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }

  render() {
    const nameError = this.validateName();
    return (
      <div className="AddFolder">
        <h2>Add Folder</h2>
        <form
          className="AddFolder_form"
          onSubmit={(e) => this.handleSubmit(e)}
          action="#"
        >
          <label htmlFor="name">Folder Name: </label>
          <input
            type="text"
            id="name"
            className="AddFolder_name"
            name="name"
            onChange={(e) => this.updateName(e.target.value)}
            aria-label="Folder Name"
          />

          <button type="submit-button" disabled={this.validateName()}>
            Submit
          </button>
          <ValidationError message={nameError} />
        </form>
      </div>
    );
  }
}

export default AddFolder;
