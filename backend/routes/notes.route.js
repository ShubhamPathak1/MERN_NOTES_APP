import express from "express"
import { createNotes, deleteNotes, getNotes, updateNotes, getANote, bookmarkNotes } from "../controllers/notes.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";



const notesrouter = express.Router();

notesrouter.get("/", verifyToken, getNotes)
notesrouter.get("/note/:id", verifyToken, getANote)
notesrouter.post("/create", verifyToken, createNotes);
notesrouter.put("/update/:id", verifyToken, updateNotes);
notesrouter.delete("/:id", verifyToken, deleteNotes);
notesrouter.patch("/bookmark/:id", verifyToken, bookmarkNotes);


export default notesrouter;