import NotebooksAPI from '@/api/notebooks.js';
export default {
    state: {
        notebooks: null,
        curBookId: null,
    },
    getters: {
        notebooks: state => state.notebooks || [],
        curBook: state => {
            if (!state.notebooks || !state.notebooks.length) return {}
            if (!state.curBookId) return state.notebooks[0]
            return state.notebooks.find(notebook => notebook.id == state.curBookId)
        }
    },
    mutations: {
        setNotebooks(state, payload) {
            state.notebooks = payload.notebooks || []
        },
        addNotebook(state, payload) {
            state.notebooks.unshift(payload.notebooks)
        },
        updateNotebook(state, payload) {
            let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
            notebook.title = payload.title
        },
        deleteNotebook(state, payload) {
            state.notebooks = state.notebooks.filter(notebook => notebook.id !== payload.notebookId)
        },
        setCurBook(state, payload) {
            state.curBook = state.notebooks.filter(notebook => notebook.id == payload.notebookId) 
                || state.notebooks[0] || { title: '我的笔记本' }
        },
        setCurBook(state, payload) {
            state.curBookId = payload.curBookId
        }
    },
    actions: {
        getNotebooks_actions({ commit, state, getters }) {
            // 如果请求过了，那就不请求它了
            if (state.notebooks !== null) 
                return Promise.resolve(getters.notebooks)

            return new Promise((resolve, reject) => {
                NotebooksAPI.hx_getNoteBooks()
                    .then(res => {
                        commit('setNotebooks', { notebooks: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
            
        },
        addNotebook_actions({ commit }, payload) {
            return new Promise((resolve, reject) => {
                NotebooksAPI.hx_addNoteBook({ title: payload.title })
                    .then(res => {
                        commit('addNotebook', { notebooks: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
            
        },
        updateNotebook_actions({ commit }, payload) {
            return new Promise((resolve, reject) => {
                NotebooksAPI.hx_updateNoteBook(payload.notebookId, { title: payload.title })
                    .then(res => {
                        commit('updateNotebook', payload)
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
        },
        deleteNotebook_actions({ commit }, payload) {
            return new Promise((resolve, reject) => {
                NotebooksAPI.hx_deleteNoteBook(payload.notebookId)
                    .then(res => {
                        commit('deleteNotebook', payload)
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    }) 
            })
        }
    }
}