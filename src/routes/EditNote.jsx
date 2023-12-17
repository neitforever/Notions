import React, { useCallback,  useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { z } from "zod";
import "tailwindcss/tailwind.css";
import { Note } from "../util/validation";
import API from "../util/api";

export const loader = async ({ params: { id } }) => {
  const note = await API.getNote(id);
  return { note };
};

export default function EditNote() {
  const { note } = useLoaderData();
  const [NoteName, setNoteName] = useState(note.name);
  const [NoteText, setNoteText] = useState(note.noteText);
  const [errors, setErrors] = useState({ name: null, noteText: null });
  const navigate = useNavigate();

  const handleSetNoteName = useCallback((e) => {
    setNoteName(e.target.value);
  }, []);

  const handleSetNoteText = useCallback((e) => {
    setNoteText(e.target.value);
  }, []);

  const handleSaveEditNote = async () => {

    try {
      Note.parse({
        name: NoteName,
        noteText: NoteText,
      });
      setErrors({ name: null, noteText: null });

      const newNote={
        id:note.id,
        userId: note.userId,
        name:NoteName,
        noteText:NoteText,
        createdAt: note.createdAt,
        }

      await API.updateNote(note.id, newNote);
      navigate(`/home/notes/view-note/${note.id}`);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors({
          name: err.errors.find((error) => error.path[0] === "name") || null,
          noteText:
            err.errors.find((error) => error.path[0] === "noteText") || null,
        });
      }
    }
  };

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-8/12 mb-4 flex items-center justify-between">
        <Button
          component={NavLink}
          to={`/home/notes/view-note/${note.id}`}
          variant="contained"
        >
          <Typography className="pt-1 pb-1" variant="h8">
            Back
          </Typography>
        </Button>
        <Box className="pr-16">
          <Typography variant="h3">Edit note</Typography>
        </Box>
        <Box></Box>
      </Box>
      <Box className="flex flex-col items-center w-8/12">
        <input
          placeholder="Name"
          value={NoteName}
          onChange={handleSetNoteName}
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
          value={NoteText}
          onChange={handleSetNoteText}
          className="border-black border-2 p-4 bg-slate-500 mt-10 mb-2 h-52 w-full break-all resize-none overflow-y-hidden"
          maxLength={1200}
        />
        {errors.noteText && (
          <Box className="text-red-400 absolute top-96 pt-32">
            <Typography variant="h5">{errors.noteText.message}</Typography>
          </Box>
        )}
        <Box className="mt-10">
          <Button
            variant="contained"
            onClick={handleSaveEditNote}
            className="mt-4"
          >
            <Typography className="pl-32 pr-32 pt-4 pb-4" variant="h4">
              Save
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
