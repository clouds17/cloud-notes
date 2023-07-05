<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title}}</span>          
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail" v-if="trashNotes.length">
      <div class="note-bar">
        <span> 创建日期: {{curTrashNote.createdAtFriendly}}</span> 
        <span> | </span>
        <span> 更新日期: {{curTrashNote.updatedAtFriendly}}</span>
        <span> | </span>
        <span> 所属笔记本: {{belongTo}}</span>

        <a class="btn action" @click.prevent="onRevert">恢复</a>
        <a class="btn action" @click.prevent="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
      </div>
      <div class="editor" v-if="curTrashNote.id">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
      <div v-else class="trash-empty">请选择笔记</div>
    </div>
    <div class="trash-empty" v-else>当前回收站很干净</div>
  </div>
</template>

<script>

import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions } from 'vuex'
let md = new MarkdownIt()

export default {
  data () {
    return {
    }
  },

  created() {
    this.__init()
  },

  computed: {
    ...mapGetters([
      'trashNotes',
      'curTrashNote',
      'belongTo'
    ]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '')
    }
  },
  beforeRouteUpdate(to, from, next) {
      this.setCurTrashNote({curTrashNoteId: to.query.noteId})
      next()
  },
  methods: {
    ...mapMutations([
      'setCurTrashNote'
    ]),
    ...mapActions([
      'getTrash_actions',
      'deleteTrash_actions',
      'revertTrash_actions',
      'getNotebooks_actions'
    ]),
    __init() {
      this.getNotebooks_actions()
      this.getTrash_actions()
        .then(() => {
            this.setCurTrashNote({curTrashNoteId: this.$route.query.noteId})
            this.$router.replace({
              path: '/trash',
              query: {
                noteId: this.trashNotes[0] ? this.trashNotes[0].id : ''
              }
            })
        })
    },
    onRevert() {
        this.$confirm('是否恢复当前笔记?', '恢复数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then((res) => {
            return this.revertTrash_actions({
              noteId: this.curTrashNote.id
            })
        }).then(res => {
            this.$message.success(res.msg)
        })
    },
    onDelete() {
        this.$confirm('是否将当前笔记从回收站移除?', '彻底删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then((res) => {
            return this.deleteTrash_actions({
              noteId: this.curTrashNote.id
            })
        }).then(res => {
            this.$message.success(res.msg)
        })
    }

  },


}
</script>

<style scoped lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
  .trash-empty {
      font-size: 50px;
      color: #ccc;
      text-align: center;
      margin-top: 100px;
      flex: 1;
  }
 }

</style>