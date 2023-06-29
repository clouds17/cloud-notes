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
                    notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    hx_addNoteBook: ({ title = '' } = { title: '' }) => request(URL.ADD, 'POST', { title }),

    hx_updateNoteBook: (notebookId, { title = '' } = { title: '' }) => request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title }),

    hx_deleteNoteBook: (notebookId) => request(URL.DELETE.replace(':id', notebookId), 'DELETE')
}