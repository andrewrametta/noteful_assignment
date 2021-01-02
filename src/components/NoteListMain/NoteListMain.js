import React from 'react'
import Context from '../../Context'
import Note from '../Note/Note'
import {getNotesForFolder} from '../../note-helpers'

class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = Context
    render () {
        const { folderId } = this.props.match.params
        const { notes= []}= this.context
        const notesForFolder = getNotesForFolder(notes,folderId)
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note=> 
                        <li key={note.id}>
                            <Note
                            id={note.id}
                            name={note.name}
                            modified={note.modified}
                            />
                        </li>
                        )}
                </ul>
                <div className='NoteListMain_button-container'>
                    <button className='NoteListMain_add-button'type='button'>Add Note</button>
                </div>

            </section>
        )
    }

}


export default NoteListMain;