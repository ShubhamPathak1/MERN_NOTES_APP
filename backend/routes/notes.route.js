import express from "express"
import { createNotes, deleteNotes, getNotes, updateNotes, getANote } from "../controllers/notes.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";



const notesrouter = express.Router();

notesrouter.get("/", verifyToken, getNotes)
notesrouter.get("/note/:id", verifyToken, getANote)
notesrouter.post("/create", verifyToken, createNotes);
notesrouter.put("/update/:id", verifyToken, updateNotes);
notesrouter.delete("/:id", verifyToken, deleteNotes);


export default notesrouter;