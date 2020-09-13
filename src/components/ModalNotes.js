import React, { useState, useEffect, useContext } from "react";
import Modal from "shared/Modal";
import { getNotesById, addNotes, editNotesById } from "data/ApiConsumer";

const ModalNotes = (props) => {
  const { onClose, isOpen, notesId } = props;

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const continueLabel = notesId ? "Edit Note" : "Add Note";

  const add = async () => {
    try {
      await addNotes({
        title: title,
        notes: notes,
      });
      closeModal()
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async () => {
    try {
      await editNotesById(notesId, {
        title: title,
        notes: notes,
      });
      closeModal()
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setTitle("")
    setNotes("")
    onClose();
  }

  useEffect(() => {
    const fetchNotesById = async () => {
      try {
        const { title, notes } = await getNotesById(notesId);
        setTitle(title);
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    notesId && fetchNotesById();
  }, [notesId]);

  const onContinue = () => {
    if (notesId) return edit();
    return add();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      continueLabel={continueLabel}
      onContinue={onContinue}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="notes"
      />
    </Modal>
  );
};

export default ModalNotes;
