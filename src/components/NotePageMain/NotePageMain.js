import React from 'react';
import Note from '../Note/Note'
import Context from '../../Context'
import {findNote} from '../../note-helpers'

class NotePageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = Context
    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }
    render() {
        const {notes = []} = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId || {content: ''})
        return (
            <section className='NotePageMain'>
                <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePageMain_content'>
                    {note.content.split(/\n \r|\n/).map((para, i)=>
                    <p key={i}>{para}</p>
                    )}

                </div>
            </section>

        )
    }
}

export default NotePageMain;