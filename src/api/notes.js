import request from "../helpers/request";
import { friendlyDate } from '@/helpers/util.js';

const URL = {
    // 获取列表
    GET: '/notes/from/:notebookId',
    // 添加列表
    ADD: '/notes/to/:notebookId',
    // 修改列表
    UPDATE: '/notes/:noteId',
    // 删除列表
    DELETE: '/notes/:noteId'
}

export default {
    hx_getNotes: ({ notebookId }) => {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId)).then(res => {
                res.data = res.data.map(note => {
                    note.createdAtFriendly = friendlyDate(note.createdAt)
                    note.updatedAtFriendly = friendlyDate(note.updatedAt)
                    return note
                }).sort((note1, note2) => {
                    return note1.updatedAt > note2.updatedAt ? -1 : 1
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    hx_addNote: ({ notebookId }, { title = '', content = '' } = { title: '', content: '' }) => {
        return new Promise((resolve, reject) => {
            request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
                .then(res => {
                    res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
                    res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    hx_updateNote: ({ noteId }, { title, content }) => {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },

    hx_deleteNote: ({ noteId }) => {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    }
}