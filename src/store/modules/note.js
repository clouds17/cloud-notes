import NotesAPI from '@/api/notes.js';
export default {
    state: {
        notes: null,
        curNoteId: null,
    },
    getters: {
        notes: state => state.notes || [],
        curNote: state => {
            if (!state.notes || !state.notes.length) return {}
            return state.notes.find(note => note.id == state.curNoteId) || {}
        }
    },
    mutations: {
        setNotes(state, payload) {
            state.notes = payload.notes || []
        },
        addNote(state, payload) {
            state.notes.unshift(payload.notes)
        },
        updateNote(state, payload) {
            let note = state.notes.find(note => note.id == payload.noteId) || {}
            note.title = payload.title
            note.content = payload.content
        },
        deleteNote(state, payload) {
            state.notes = state.notes.filter(note => note.id !== payload.noteId)
        },
        setCurNote(state, payload) {
            state.curNoteId = payload.curNoteId
        }
    },
    actions: {
        getNotes_actions({ commit }, { notebookId }) {
            return new Promise((resolve, reject) => {
                NotesAPI.hx_getNotes({ notebookId })
                    .then(res => {
                        commit('setNotes', { notes: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
            
        },
        addNote_actions({ commit }, { notebookId, title, content }) {
            return new Promise((resolve, reject) => {
                NotesAPI.hx_addNote(
                    {notebookId}, 
                    { title, content }
                ).then(res => {
                        commit('addNote', { notes: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
            
        },
        updateNote_actions({ commit }, {noteId, title, content}) {
            return new Promise((resolve, reject) => {
                NotesAPI.hx_updateNote(
                    { noteId }, 
                    { title, content }
                ).then(res => {
                        commit('updateNote', {noteId, title, content})
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
        },
        deleteNote_actions({ commit }, { noteId }) {
            return new Promise((resolve, reject) => {
                NotesAPI.hx_deleteNote({ noteId })
                    .then(res => {
                        commit('deleteNote', { noteId })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
        }
    }
}