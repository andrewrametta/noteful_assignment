import React from 'react'
import {Link} from 'react-router-dom'
import Context from '../../Context'
import config from '../../config'
import {format} from 'date-fns'

class Note extends React.Component{
    static defaultProps = {
        onDeleteNote: ()=> {}
    }
    static contextType = Context

    handleClickDelete = e => {
        e.preventDefault();
        const noteId = this.props.noteId

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res=> {
            if (!res.ok)
            return res.json().then(e=>Promise.reject(e))
            return res.json()
        })
        .then(()=>{
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({error})
        })
    }
    render() {
        const {name, id, modified} = this.props
        return (
            <div className='Note'>
                <h2 className='Note_title'>
                    <Link to={`/note/${id}`}>{name}</Link>
                </h2>
                <button className='Note_delete' type='button' onClick={this.handleClickDelete}>Remove</button>
                <div className='Note_dates'>
                    <div className='Note_dates-modified'>Modified{''}<span className='Date'>{format(modified, 'Do MMM YYYY')}</span></div>
                </div>
            </div>

        )
    }
}

export default Note;