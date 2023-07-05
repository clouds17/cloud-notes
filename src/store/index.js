import Vue from 'vue'
import Vuex from 'vuex'

import User from '@/store/modules/user.js'
import Note from '@/store/modules/note.js'
import NoteBook from '@/store/modules/notebook.js'
import Trash from '@/store/modules/trash.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        User,
        Note,
        NoteBook,
        Trash
    }
})
