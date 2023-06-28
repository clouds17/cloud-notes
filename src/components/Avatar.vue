<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '@/api/auth.js';
import $bus from '@/helpers/bus.js';
export default {
    data() {
        return {
            username: '未登录'
        }
    },
    computed: {
        slug() {
            return this.username.charAt(0)
        }
    },
    created() {
        $bus.$on('userInfo', (user) => {
            
            this.username = user.username
        })
        Auth.hx_getInfo().then(res => {
            console.log('res', res)
            if (res.isLogin) {
                this.username = res.data.username
            }
        })
    },
    beforeDestroy() {
        $bus.$off('userInfo', (e) => {})
    }
}
</script>

<style scoped>
span {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background-color: #f2b81c;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    margin-top: 15px;
}
</style>