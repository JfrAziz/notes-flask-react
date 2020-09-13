import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "data/AuthContext";
import { getNotes } from "data/ApiConsumer";
import ModalNotes from "components/ModalNotes";
import NotesComponent from "components/NotesComponent";
import "styles/_notesPages.scss"

const Notes = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => logout() && history.push("/login");

  const [isModalOpen, setModalOpen] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [notesId, setNotesId] = useState(null);

  const fetchNotes = async () => {
    try {
      const result = await getNotes();
      setNotesData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const openModal = (id = null) => {
    setNotesId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchNotes();
  };

  const deletNotesFromState = (id) => {
    const newNotes = notesData.filter((item)=> item.id!==id)
    setNotesData(newNotes)
  }

  return (
    <div id="notes-page">
      <h1>This is notes page</h1>
      <button onClick={() => handleLogout()}>Logout</button>
      <button onClick={() => openModal()}>Open Modal</button>
      <div id="notes-container">
        {notesData.map(({ id, title, notes }) => {
          return (
            <NotesComponent
              key={id}
              id={id}
              title={title}
              notes={notes}
              editNotes={() => openModal(id)}
              afterDelete={()=> deletNotesFromState(id)}
            />
          );
        })}
      </div>

      {notesId ? (
        <ModalNotes
          isOpen={isModalOpen}
          onClose={closeModal}
          notesId={notesId}
        />
      ) : (
        <ModalNotes isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default Notes;
