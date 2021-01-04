import React from "react";
import { Route, Link } from "react-router-dom";
import Main from "./components/Main/Main";
import SideBar from "./components/SideBar/SideBar";
import NotePageSideBar from "./components/NotePageSideBar/NotePageSideBar";
import Note from "./components/Note/Note";
import Context from "./Context";
import AddFolder from "./components/AddFolder/AddFolder";
import AddNote from "./components/AddNote/AddNote";
import "./App.css";

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/notes"),
      fetch("http://localhost:9090/folders"),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({
          notes,
          folders,
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => noteId !== note.id),
    });
  };

  handleAddFolder = (folderName) => {
    console.log(folderName);
    this.setState({
      folders: [...this.state.folders, folderName],
    });
  };

  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  renderSidebar() {
    return (
      <>
        <Route exact path="/" component={SideBar} />

        <Route path="/folder/:folderId" component={SideBar} />

        <Route exact path="/note/:noteId" component={NotePageSideBar} />

        <Route exact path="/add-folder" component={NotePageSideBar} />

        <Route exact path="/add-note" component={NotePageSideBar} />
      </>
    );
  }

  renderMain() {
    return (
      <>
        <Route path="/note/:noteId" component={Note} />

        <Route path="/folder/:folderId" component={Main} />

        <Route exact path="/" component={Main} />

        <Route exact path="/add-folder" component={AddFolder} />

        <Route exact path="/add-note" component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <nav className="App__sidebar">{this.renderSidebar()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <main className="App__main">{this.renderMain()}</main>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
