import TrashAPI from '@/api/trash.js';
export default {
    state: {
        trashNotes: null,
        curTrashNoteId: null,
    },
    getters: {
        trashNotes: state => state.trashNotes || [],
        curTrashNote: (state, getters) => {
            if (!getters.trashNotes.length) return {}
            return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {}
        },
        belongTo: (state, getters) => {
            let notebook = getters.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId) || {}
            return notebook.title || ''
        }
    },
    mutations: {
        setTrashNotes(state, payload) {
            state.trashNotes = payload.trashNote || []
        },
        addTrashNote(state, payload) {
            state.trashNotes.unshift(payload.trashNote)
        },
        deleteTrashNote(state, payload) {
            state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId)
        },
        setCurTrashNote(state, payload) {
            state.curTrashNoteId = payload.curTrashNoteId
        }
    },
    actions: {
        getTrash_actions({ commit }) {
            return new Promise((resolve, reject) => {
                TrashAPI.hx_getTrash()
                    .then(res => {
                        commit('setTrashNotes', { trashNote: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
            
        },
        
        deleteTrash_actions({ commit }, { noteId }) {
            return new Promise((resolve, reject) => {
                TrashAPI.hx_deleteTrash({ noteId })
                    .then(res => {
                        commit('deleteTrashNote', { noteId })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
        },

        revertTrash_actions({ commit }, { noteId }) {
            return new Promise((resolve, reject) => {
                TrashAPI.hx_revertTrash({ noteId })
                    .then(res => {
                        commit('deleteTrashNote', { noteId })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
        }
    }
}