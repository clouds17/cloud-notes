<template>
  <div id="notebook-list" class="detail">
       <header>
            <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
       </header>
       <main>
            <div class="layout">
                <h3>笔记本列表({{ notebooks.length }})</h3>
                <div class="book-list" v-if="notebooks.length">
                    <router-link class="notebook" 
                        v-for="(item, index) in notebooks" :key="index"
                        :to="`/note?notebookId=${item.id}`"    
                    >
                        <div>
                            <span class="iconfont icon-notebook"></span> {{ item.title }} 
                            <span>{{ item.noteCounts }}</span>
                            <span class="action" @click.stop.prevent="onDelete(item)">删除</span>
                            <span class="action" @click.stop.prevent="onEdit(item)">编辑</span>
                            <span class="date">{{ item.createdAtFriendly }}</span>
                        </div>
                    </router-link>
                </div>
                <div v-else class="noneBooks"> 请添加笔记本 </div>
            </div>
       </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'NotebookList',
    data() {
        return {
            msg: '笔记本列表'
        }
    },
    created() {
        this.__init()
    },
    computed: {
        ...mapGetters([
            'notebooks'
        ])
    },
    methods: {
        ...mapActions([
            'getNotebooks_actions',
            'addNotebook_actions',
            'updateNotebook_actions',
            'deleteNotebook_actions'
        ]),
        __init() {
            // 获取notebooks列表
            this.getNotebooks_actions()
        },
        onCreate() {
            this.$prompt('输入新笔记本标题', '创建笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then( ({ value }) => {
                return this.addNotebook_actions({ title: value })
            }).then(res => {
                this.$message.success(res.msg)
            })
        },
        onEdit(item) {
            this.$prompt('修改笔记本标题', '修改笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: item.title,
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
                return this.updateNotebook_actions({ 
                    notebookId: item.id, 
                    title: value 
                })
            }).then(res => {
                this.$message.success(res.msg)
            })

        },
        onDelete(item) {
            this.$confirm('确定要删除当前笔记本吗?', '删除笔记本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                return this.deleteNotebook_actions({
                    notebookId: item.id
                })
            }).then(res => {
                this.$message.success(res.msg)
            })
        }
    }
}
</script>

<style scoped lang="less">
@import url(../assets/css/notebook-list.less);
</style>