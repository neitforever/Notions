import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { z } from "zod";
import "tailwindcss/tailwind.css";
import { Note } from "../util/validation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { addNote } from "../redux/notes/actions";

export default function CreateNote() {
  const [name, setName] = useState("");
  const [noteText, setNoteText] = useState("");
  const [errors, setErrors] = useState({ name: null, noteText: null });

  const authorId = useSelector(selectUserId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleCreateNote() {
    try {
      Note.parse({
        name,
        noteText,
      });
      const note={
        id: crypto.randomUUID(),
        userId: authorId,
        name,
        noteText,
        createdAt: Date.now(),
      }
      setErrors({ name: null, noteText: null });
      dispatch(addNote(note));
      navigate(`/home/notes/${authorId}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          name: err.errors.find((error) => error.path[0] === "name") || null,
          noteText:
            err.errors.find((error) => error.path[0] === "noteText") || null,
        });
      }
    }
  }

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-8/12 mb-4 flex items-center justify-between">
        <Button
          component={NavLink}
          to={`/home/notes/${authorId}`}
          variant="contained"
        >
          <Typography className="pt-1 pb-1" variant="h8">
            Back
          </Typography>
        </Button>
        <Box className="pr-16">
          <Typography variant="h3">Create new note</Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box className="flex flex-col items-center w-8/12">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-black border-2 p-4 bg-slate-500 mb-2 h-12 w-full"
          maxLength={20}
        />
        {errors.name && (
          <Box className="text-red-400 absolute top-64">
            <Typography variant="h5">{errors.name.message}</Typography>
          </Box>
        )}
        <textarea
          placeholder="Note text..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="border-black border-2 p-4 bg-slate-500 mt-10 mb-2 h-52 w-full break-all resize-none overflow-y-hidden"
          maxLength={1200}
        />
        {errors.noteText && (
          <Box className="text-red-400 absolute top-96 pt-32">
            <Typography variant="h5">{errors.noteText.message}</Typography>
          </Box>
        )}
        <Box className="mt-10">
          <Button variant="contained" onClick={handleCreateNote}>
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Create
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
