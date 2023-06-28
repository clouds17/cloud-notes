<template>
  <div id="note-detail">
        <h1>{{ msg }}: {{ $route.params.noteId }}</h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '笔记本详情'
        }
    }
}
</script>

<style scoped>
h1 {
    color: blue
}
</style>