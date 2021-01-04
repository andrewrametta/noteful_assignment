import React from "react";
import { NavLink, Link } from "react-router-dom";
import Context from "../../Context";
import "./SideBar.css";
import { countNotesForFolder } from "../../NoteHelper";

class SideBar extends React.Component {
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
    const { notes = [], folders = [] } = this.context;

    console.log(notes);

    return (
      <div className="SideBar">
        <ul className="SideBar_list">
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink
                className="NoteListNav_folder-link"
                to={`/folder/${folder.id}`}
              >
                <span className="NoteListNav_num-notes">
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="button-container">
          <Link className="addFolder-button" to="/add-folder">
            Add Folder
          </Link>
        </div>
      </div>
    );
  }
}

SideBar.defaultProps = {
  folders: [],
  notes: [],
};

export default SideBar;
