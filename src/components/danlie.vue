<template>
    <div>
        <div>例一：登录框</div>
        <div v-show="isShow" class="login-layer">我是登录框</div>
        <div @click="hideBtn" v-show="isShow">隐藏登录框</div>
        <div @click="showBtn">我是按钮</div>

        <hr/>

        <div>例二：购物车</div>
        <div>当前购物车商品数量： {{count}}</div>
        <div @click="add">增加一件商品</div>
        <div @click="remove">减少一件商品</div>
        <div @click="goOtherPage">跳转到另外一页进行测试</div>
    </div>
</template>
<script>
    import {loginlayer, shopingcar} from '../util/LoginLayer' //引入刚导出的方法
    export default {
        data(){
            return{
                isShow: false,
                count: null
            }
        },
        methods:{
            showBtn(){//显示登陆窗口
                loginlayer.show(this)
            },
            hideBtn(){//隐藏登陆窗口
                loginlayer.hide(this)
            },
            add(){//增加商品
                shopingcar.add()
                this.count = shopingcar.count
            },
            remove(){//减少商品
                shopingcar.remove()
                this.count = shopingcar.count
            },
            goOtherPage(){//跳转到其它页面
                this.$router.push({'name': 'Danlie2'})
            }
        },
        created(){
            this.count = shopingcar.count//初始化count
        }
    }
</script>
<style>
.login-layer {
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, .6);
    text-align: center;
    line-height: 200px;
    display: inline-block;
    color: #fff;
}
</style>