import React, { useEffect} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectNotes, selectNotesError, selectNotesLoading } from "../redux/notes/selectors";
import { selectUserId } from "../redux/user/selectors";
import { deleteNotes, getNotes } from "../redux/notes/actions";

export default function UserNotes() {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes)
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);
  const authorId = useSelector(selectUserId);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getNotes(authorId))
  }, []);

  if (loading) {
    return<div>Loading...</div>
  }

  if (error) {
    return<div>{error}</div>
  }
console.log(authorId);
  const handleDeleteNote = async (noteId) => {
    dispatch(deleteNotes(noteId, authorId));
    navigate(`/home/notes/${authorId}`);
  };

  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <Box className="flex flex-col h-full w-full">
      <Box>
        <Typography className="flex flex-col items-center" variant="h3">
          NOTES
        </Typography>
      </Box>
      <Box className="flex flex-col items-center mb-24 mt-24">
        <Button
          component={NavLink}
          to="/home/notes/create-note/"
          variant="contained"
        >
          <Typography className="pl-24 pr-24 pt-2 pb-2" variant="h6">
            Add new note
          </Typography>
        </Button>
      </Box>
      <Box className="flex flex-col items-center">
        {sortedNotes.map((note) => {
          const date = new Date(note.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });

            return (
              <Box
                className="mb-5  border-black border-2 p-4 w-8/12"
                key={note.id}
              >
                <Box className="flex flex-row w-full justify-between">
                  <NavLink to={`/home/notes/view-note/${note.id}`}>
                    <Box className="flex flex-row">
                      <Typography variant="h5" className="pr-4 font-bold">
                        {note.name}
                      </Typography>
                      <Typography variant="h5" className="pr-4 text-gray-500">
                        {formattedDate}
                      </Typography>
                    </Box>
                  </NavLink>
                  <Box>
                    <NavLink
                      className="pr-4"
                      to={`/home/notes/edit-note/${note.id}`}
                    >
                      <EditIcon fontSize="large" />
                    </NavLink>
                    <DeleteIcon
                      className=" cursor-pointer"
                      fontSize="large"
                      onClick={() => handleDeleteNote(note.id)}
                    />
                  </Box>
                </Box>
              </Box>
            );
          }
        )}
      </Box>
    </Box>
  );
}
