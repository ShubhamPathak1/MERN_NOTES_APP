import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    content: {
        type:String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,          
    },
    bookmarked: {
        type:Boolean,
        default:false,
    },
    tags: {
        type: [String], // array of type string
        default:[]
    }
}, {timestamps:true})       // automatically provides created at, updated at 


// notesSchema.index({title:'text', content:'text'})

export const Notes = mongoose.model("Notes", notesSchema)