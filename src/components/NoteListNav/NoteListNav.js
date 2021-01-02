import React from "react";
import Context from "../../Context";
import {NavLink} from 'react-router-dom'
import {countNotesForFolder} from '../../note-helpers'

class NoteListNav extends React.Component {
  static contextType = Context;
  render() {
    const { folders = [], notes = [] } = this.context;
    return <div className="NoteListNav">
        <ul>
            {folders.map(folder => <li key={folder.id}><NavLink className='NoteListNav_folder-link' to={`/folder/${folder.id}`}><span className='NoteListNav_num-notes'>{countNotesForFolder(notes, folder.id)}</span>{folder.name}</NavLink></li>)}
        </ul>
        <div className='NoteListNav_button-wrapper'>
            <button>Add a folder</button>
        </div>
    </div>;
  }

}

NoteListNav.defaultProps = {
    folders: []
}

export default NoteListNav;
