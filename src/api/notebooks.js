import request from "../helpers/request";
import { friendlyDate } from '@/helpers/util.js';

const URL = {
    // 获取列表
    GET: '/notebooks',
    // 添加列表
    ADD: '/notebooks',
    // 修改列表
    UPDATE: '/notebooks/:id',
    // 删除列表
    DELETE: '/notebooks/:id'
}

export default {
    hx_getNoteBooks: () => {
        return new Promise((resolve, reject) => {
            request(URL.GET).then(res => {
                res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1)
                res.data.map(notebook => {
                    notebook.createdAtFriendly = friendlyDate(notebook.createdAt)
                    notebook.updatedAtFriendly = friendlyDate(notebook.updatedAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    hx_addNoteBook: ({ title = '' } = { title: '' }) => {
        return new Promise((resolve, reject) => {
            request(URL.ADD, 'POST', { title })
                .then(res => {
                    res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
                    res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },

    hx_updateNoteBook: (notebookId, { title = '' } = { title: '' }) => request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title }),

    hx_deleteNoteBook: (notebookId) => request(URL.DELETE.replace(':id', notebookId), 'DELETE')
}