import { create } from "zustand";
import axios from 'axios'

const NOTES_API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/notes" : "/api/notes"

axios.defaults.withCredentials = true;


export const useNotesStore = create((set)=> ({
    notes: [],
    note: null,
    error:null,
    isLoading: false,
    setNotes: (notes)=> set({notes}),

    createNote: async (title, content, tags, user) => {
        set({isLoading:true})
        try {
            
            if (!title || !content || !user) {
                return {success:false, message:"Please fill in all required fields"}
            }
            const response = await axios.post(`${NOTES_API_URL}/create`, {title, content, tags, user});
            
            set((state)=>({notes: [...state.notes, response.data.note], isLoading:false}))
            
            return {success:true, message:response.data.message}
        } catch (error) {
            set({isLoading:false, error:error.response.data.message})
            throw error;
        }
            
    },
    getNotes: async (user)=> {
        set({isLoading:true})
        try {
            const response = await axios.get(`${NOTES_API_URL}/?user=${user}`);

            set({notes:response.data.notes, isLoading:false})
        } catch (error) {
            set({isLoading:false, error:error.response.data.message})
            throw error;
        }
    },

    getNote: async (noteId)=> {
        set({isLoading:true})
        try {
            const response = await axios.get(`${NOTES_API_URL}/note/${noteId}`);

            set({isLoading:false, note:response.data.note})
        } catch (error) {
            set({isLoading:false, error:error.response.data.message})
            throw error;
        }
    },
    
    updateNote: async (title, content, tags, user, noteId)=> {
        set({isLoading:true})
        try {
            const response = await axios.put(`${NOTES_API_URL}/update/${noteId}`, {title, content, tags, user})

            set((state)=>({notes:state.notes.map(note=>(note._id===noteId ? response.data.note : note))}))
            set({isLoading:false})
        } catch (error) {
            set({isLoading:false, error:error.response.data.message})
            throw error;
        }
    },

    deleteNote: async (noteId)=> {
        set({isLoading:true})
        try {
            await axios.delete(`${NOTES_API_URL}/${noteId}`)
            set(state => ({notes:state.notes.filter(note=>note._id!==noteId)}))
            set({isLoading:false})
        } catch (error) {  
            set({isLoading:true, error:error.response.data.message})
            throw error;
        }
    }

}))