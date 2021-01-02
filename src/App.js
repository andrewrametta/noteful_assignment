import React, { Component } from "react";
import config from './config'
import Context from "./Context";
import NotePageNav from './components/NotePageNav/NotePageNav'
import NoteListNav from './components/NoteListNav/NoteListNav'
import NoteListMain from './components/NoteListMain/NoteListMain'
import NotePageMain from './components/NotePageMain/NotePageMain'
import "./App.css";
import { Route, Link } from "react-router-dom";

class App extends Component {
  static contextType = Context;
  state = {
    notes: [],
    folders: [],
  };
// fetch note api when page renders
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
    .then (([notesRes, foldersRes])=> {
      if (!notesRes.ok)
      return notesRes.json().then(e=>Promise.reject(e));
      if (!foldersRes.ok)
      return foldersRes.json().then(e=>Promise.reject(e));

      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders])=> {
      this.setState({notes, folders})
    })
    .catch(error=>console.error({error}))
  }
  // delete note
  handleDeleteNote= noteId => {
    this.setState({
      note: this.state.notes.filter(note=> note.id !== noteId)
    })
  }

  // render nav routes
  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
      {['/', '/folder/:folderId'].map(path => (
        <Route 
        exact
        key={path}
        path={path}
        component={NoteListMain}
        />
      ))}
      <Route path='.note/:noteId' component={NotePageMain} />
      </>
    )
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <nav className='App_nav'>{this.renderNavRoutes()}</nav>
          <header className='App_header'>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <main className='App_main'>{this.renderMainRoutes()}</main>
          </div>
      </Context.Provider>
    );
  }
}

export default App;
