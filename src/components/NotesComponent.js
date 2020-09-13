import React from 'react'
import { deleteNotesById } from 'data/ApiConsumer'
import "styles/_notesComponent.scss"
import Button from 'shared/Button'

const NotesComponent = (props) => {
  const { id, title, notes, editNotes, afterDelete } = props
  const deleteNotes = async (id) => {
    try {
      const response = await deleteNotesById(id)
      console.log(response)
      afterDelete()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="notes">
      <h3>{title}</h3>
      <p>{notes}</p>
      <Button className="notes-btn" onClick={editNotes}>Edit notes</Button>
      <Button className="notes-btn" onClick={()=>deleteNotes(id)}>Delete notes</Button>
    </div>
  )
}

export default NotesComponent