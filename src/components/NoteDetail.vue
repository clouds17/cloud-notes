<template>
    <div id="note" class="detail">
        <note-sidebar @update="event => notes = event"></note-sidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
            <div class="note-detail-ct" v-show="curNote.id">
                <div class="note-bar">
                    <span> 创建日期： {{ curNote.createdAtFriendly }} </span>
                    <span> 更新日期： {{ curNote.updatedAtFriendly }} </span>
                    <span> {{ statusText }} </span>
                    <span class="iconfont icon-delete" @click="deleteNote"></span>
                    <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
                </div>
                <div class="note-title">
                    <input 
                        type="text" 
                        v-model="curNote.title" 
                        placeholder="输入标题" 
                        @input="updateNote"
                        @keydown="statusText='正在输入...'"
                        >
                </div>
                <div class="editor">
                    <textarea 
                        v-show="!isShowPreview" 
                        v-model="curNote.content" 
                        placeholder="输入内容，支持 markdown 语法"
                        @input="updateNote"
                        @keydown="statusText='正在输入...'"
                        >
                    </textarea>
                    <div 
                        class="preview markdown-body" 
                        v-show="isShowPreview"
                        v-html="previewContent"
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar.vue';
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
let md = new MarkdownIt()
export default {
    components: {
        NoteSidebar
    },
    data() {
        return {
            statusText: '已提交',
            isShowPreview: false
        }
    },
    created() {
       
    },
    computed: {
        ...mapGetters([
            'notes',
            'curNote'
        ]),
        previewContent() {
            return md.render(this.curNote.content || '')
        }
    },
    beforeRouteUpdate(to, from, next) {
        console.log('这里')
        this.$store.commit('setCurNote', {curNoteId: to.query.noteId})
        next()
    },
    methods: {
        ...mapActions([
            'updateNote_actions',
            'deleteNote_actions'
        ]),
        __init() {

        },
        updateNote: _.debounce(function() {
            this.updateNote_actions({
                noteId: this.curNote.id,
                title: this.curNote.title,
                content: this.curNote.content 
            }).then(() => {
                this.statusText = '已保存'
            }).catch(() => {
                this.statusText = '保存失败'
            })
        }, 500),

        deleteNote() {
            this.deleteNote_actions({noteId: this.curNote.id})
                .then((res) => {
                    this.$message.success(res.msg)
                    this.$router.replace({ path: `/note?notebookId=${this.curNote.notebookId}` })
                })
        }
    }
}
</script>

<style scoped lang="less">
@import url(../assets/css/note-detail.less);
#note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
}
</style>