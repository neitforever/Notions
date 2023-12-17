import API from "../../util/api"
export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: "NOTES/LOADING" });
    const notes = await API.getNotes(authorId);
    dispatch({
      type: "NOTES/SET",
      payload: notes,
    });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err });
  }
};

export const deleteNotes = (noteId, authorId) => async (dispatch) => {
  try {
    const notes = await API.getNotes(authorId);
    API.deleteNote(noteId);
    dispatch({
      type: "NOTES/DELETE",
      payload: notes.filter((n) => n.id != noteId),
    });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err });
  }
};

export const addNote = (note) => async (dispatch) => {
  try {
    await API.addNote(note);
    dispatch({
      type: "NOTES/ADD",
      payload: note,
    });
  } catch (err) {
    dispatch({ type: "NOTES/ERROR", payload: err });
  }
};
