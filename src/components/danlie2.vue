<template>
    <div>
        <div>当前购物车商品数量： {{count}}</div>
        <div @click="add">增加一件商品</div>
        <div @click="remove">减少一件商品</div>
        <div @click="goBack">返回上一页</div>
    </div>
</template>
<script>
import {shopingcar} from '../util/LoginLayer'
export default {
    data(){
        return{
            count: null
        }
    },
    methods: {
        add(){
            shopingcar.add()
            this.count = shopingcar.count
        },
        remove(){
            shopingcar.remove()
            this.count = shopingcar.count
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    created(){
        this.count = shopingcar.count
    }
}
</script>