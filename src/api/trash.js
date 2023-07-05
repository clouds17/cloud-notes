import request from "../helpers/request";
import { friendlyDate } from '@/helpers/util.js';

const URL = {
    // 获取列表
    GET: '/notes/trash',
    // 恢复列表
    REVERT: '/notes/:noteId/revert',
    // 删除列表
    DELETE: '/notes/:noteId/confirm'
}

export default {
    hx_getTrash: () => {
        return new Promise((resolve, reject) => {
            request(URL.GET).then(res => {
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

    hx_revertTrash: ({ noteId }) => {
        return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
    },

    hx_deleteTrash: ({ noteId }) => {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    }
}