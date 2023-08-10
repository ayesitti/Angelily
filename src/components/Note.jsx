import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import axios from "axios";

function Note({ user, favoriteId, shouldFetch, setShouldFetch }) {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  //   let editNote;

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `https://hooks.adaptable.app/notes?userId=${user.id}&favoriteId=${favoriteId}`
      );
      // if (!response.data.length) {
      //     await axios.post(`https://hooks.adaptable.app/notes`, {userId: user.id, favoriteId: favoriteId})
      //     return
      // }
      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (shouldFetch) {
      fetchNotes();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  if (notes.length === 0) {
    return "Add a note here..";
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hooks.adaptable.app/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleEditText = async (id) => {
  //     try {
  //       await axios
  //         .get(`https://hooks.adaptable.app/notes/${id}`)
  //         .then((response) => {
  //           editNote = response.data;
  //           console.log(editNote);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return notes.map((note) => (
    // {editingNoteId === note.id ?  (
    <div className="note">
      <div>
        <div key={note.id} className="note-item">
          <p>{note.note}</p>
        </div>
      </div>
      <div className="note-footer">
        <small>29/10/2023</small>
        <button onClick={() => setEditingNoteId(note.id)}>Edit</button>
        <RiDeleteBin2Line
          className="delete-icon"
          size="1.2rem"
          onClick={() => handleDelete(note.id)}
        />
      </div>
    </div>
  ));
}

export default Note;
