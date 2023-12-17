import React, {  useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../util/api";

export const loader = async ({ params: { id } }) => {
  const note = await API.getNote(id);
  return { note, id };
};


export default function ViewNote() {
  const { note ,id} = useLoaderData();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (note === null) {
      navigate("/404");
    }
  }, [note, navigate]);

  if (!note) {
    return <Typography>Loading...</Typography>;
  }

  const handleDeleteNote = async (id) => {
    API.deleteNote(id);
    navigate(`/home/notes/${note.userId}`);
  };

  return (
    <Box className="flex flex-col items-center">
      <Box className="w-8/12 mb-4 flex items-center justify-between">
        <Button
          component={NavLink}
          to={`/home/notes/${note.userId}`}
          variant="contained"
        >
          <Typography className="pt-1 pb-1" variant="h8">
            Back
          </Typography>
        </Button>
        <Box className="pr-16">
          <Typography variant="h3">{note.name}</Typography>
        </Box>
        <Box>
          <NavLink
            className="pr-4"
            to={`/home/notes/edit-note/${note.id}`}
            end={true}
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
      <Box className="flex flex-col items-center w-8/12">
        <Typography className="border-black border-2 p-4 bg-slate-500 mb-2 w-full break-all h-auto whitespace-pre-line">
          {note.noteText}
        </Typography>
      </Box>
    </Box>
  );
}
