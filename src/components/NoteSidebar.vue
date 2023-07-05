<template>
  <div class="note-sidebar">
        <span class="btn add-note" @click="addNote">添加笔记</span>
        <el-dropdown 
            class="notebook-title"
            @command="handleCommand"
            placement="bottom"
        >
            <span class="el-dropdown-link">
                {{curBook.title ? curBook.title : '请添加笔记'}} <i class="iconfont icon-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                    v-for="notebook in notebooks"
                    :key="notebook.id"
                    :command="notebook.id"
                >
                    {{ notebook.title }}
                </el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes">
            <li
                v-for="note in notes"
                :key="note.id"
            >
                <router-link :to="`/note?notebookId=${curBook.id}&noteId=${note.id}`">
                    <span class="data">{{ note.updatedAtFriendly }}</span>
                    <span class="title">{{ note.title }}</span>
                </router-link>
            </li>
        </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'notebooks',
            'notes',
            'curBook',
            'curNote'
        ])
    },
    created() {
        this.__init()
    },
    methods: {
        ...mapActions([
            'getNotebooks_actions',
            'getNotes_actions',
            'addNote_actions'
        ]),
        __init() {
            this.getNotebooks_actions()
                .then(() => {
                    this.getCurBook()
                    this.$nextTick(() => {
                        if (this.curBook.id) {
                            this.handleCommand(this.curBook.id)
                        }
                    })
                })
            
        },
        handleCommand(notebookId) {
            if (notebookId == 'trash') {
                return this.$router.push({ path: '/trash' })
            }
            if (this.curBook.id != notebookId) {
                this.getCurBook(notebookId)
            }
            this.getNotes_actions({ notebookId })
                .then(() => {
                    this.$store.commit('setCurNote', { curNoteId: this.$route.query.noteId })
                    this.$router.replace({
                        path: '/note',
                        query: {
                            notebookId: this.curBook.id || notebookId || '',
                            noteId: this.notes[0] ? this.notes[0].id : ''
                        }
                    })
                })
        },
        getCurBook(bookId = 0) {
            if (!bookId) {
                bookId = this.$route.query.notebookId
            }
            this.$store.commit('setCurBook', {curBookId: bookId})
        },
        addNote() {
            if (!this.curBook.id) {
                this.$message.warning('请先添加笔记本')
                return this.$router.replace('/notebooks')
            }
            this.addNote_actions({ notebookId: this.curBook.id })
                .then((res) => {
                    this.$router.replace(`/note?notebookId=${this.curBook.id}&noteId=${res.data.id}`)
                })
        }
    }
}
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
</style>