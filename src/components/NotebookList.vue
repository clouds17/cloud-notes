<template>
  <div id="notebook-list" class="detail">
       <header>
            <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
       </header>
       <main>
            <div class="layout">
                <h3>笔记本列表({{ bookList.length }})</h3>
                <div class="book-list">
                    <router-link class="notebook" 
                        v-for="(item, index) in bookList" :key="index"
                        :to="`/NoteDetail?id=${item.id}`"    
                    >
                        <div>
                            <span class="iconfont icon-notebook"></span> {{ item.title }} 
                            <span>{{ item.noteCounts }}</span>
                            <span class="action" @click.stop.prevent="onDelete(item, index)">删除</span>
                            <span class="action" @click.stop.prevent="onEdit(item, index)">编辑</span>
                            <span class="date">{{ item.friendlyCreatedAt }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
       </main>
  </div>
</template>

<script>
import Notebooks from '@/api/notebooks.js';
import { friendlyDate } from '@/helpers/util.js';
export default {
    name: 'NotebookList',
    data() {
        return {
            msg: '笔记本列表',
            bookList: []
        }
    },
    created() {
        this.__init()
    },
    computed: {
    },
    methods: {
        __init() {
            Notebooks.hx_getNoteBooks()
                .then(res => {
                    console.log('数据', res)
                    this.bookList = res.data
                })
        },
        onCreate() {
            this.$prompt('输入新笔记本标题', '创建笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
               Notebooks.hx_addNoteBook({ title: value })
                .then(res => {
                    res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
                    this.bookList.unshift(res.data)
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                })
            })
        },
        onEdit(item, index) {
            this.$prompt('修改笔记本标题', '修改笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: item.title,
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
                Notebooks.hx_updateNoteBook(item.id, { title: value })
                .then(res => {
                    this.bookList[index].title = value
                    this.$message({
                        type: 'success',
                        message: res.msg
                    });
                })
            })

        },
        onDelete(item, index) {
            this.$confirm('确定要删除当前笔记本吗?', '删除笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                Notebooks.hx_deleteNoteBook(item.id)
                    .then(res => {
                        this.bookList.splice(index, 1)
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                    })
            })
        },
        friendlyDate_func(createdAt) {
           return friendlyDate(createdAt)
        }
    }
}
</script>

<style scoped lang="less">
@import url(../assets/css/notebook-list.less);
</style>