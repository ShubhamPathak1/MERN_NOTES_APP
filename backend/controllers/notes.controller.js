import mongoose from "mongoose";
import { Notes } from "../models/notes.model.js";



export const getNotes = async (req, res)=> {
    const {user} = req.query;
    try {
        if (!user) {
            return res.status(400).json({success:false, message:"User Not Authorized"})
        }
        const notes = await Notes.find({user}).sort({updatedAt:-1})
        res.status(200).json({success:true, notes})
    } catch (error) {
        console.log("Error fetching notes", error.message)
        res.status(500).json({success:false, message:error.message})
    }
}

export const getANote = async (req, res)=> {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Notes not Found"})
    }
    try {
        const note = await Notes.findById(id)
        if (!note) {
            return res.status(404).json({success:false, message:"Note not found"})
        }
        res.status(200).json({success:true, note})
        
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export const createNotes = async (req, res)=> {
    const {title, content, tags, user} = req.body;
    try {
        if(!title || !content) {
            return res.status(400).json({success:false, message:"Empty Fields"});
        }

        const note = new Notes({title:title.trim(), content:content.trim(), tags, user})
        
        await note.save()

        res.status(201).json({success:true, message:"Notes Created Successfully", note:note});
        
    } catch (error) {
        console.log("Error in creating note", error.message);
        res.status(500).json({success:false, message:error.message});
    }
}

export const updateNotes = async (req, res)=> {
    const {id} = req.params;
    const {title, content, tags, user} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Notes not Found"})
    }
    try {
        const updatedNote = await Notes.findByIdAndUpdate(id, {title, content, tags, user}, {
            new:true
        })
        res.status(200).json({success:true, note:updatedNote, message:"Notes Updated Successfully"})
    } catch (error) {
        console.log("Error updating product", error.message)
        res.status(500).json({success:false, message:error.message})
    }
}

export const deleteNotes = async (req, res)=> {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Note not found" });
  }
    try {
        await Notes.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Note Deleted"})
    } catch (error) {
        console.log("Error deleting note", error.message)
        res.status(500).json({success:false, message:error.message})
    }
}

