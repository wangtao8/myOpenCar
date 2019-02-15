<template>
    <div>
        <div>值：{{count}}</div>
        <div @click="Add">增加</div>
        <div @click="Remove">减少</div>
        <router-link :to="{path:'d'}">跳到d页面</router-link>
        <div @click="goback">返回</div>
    </div>
</template>
<script>
import {Car} from '../util/shopingCar'
export default {
    data(){
        return{
            count: null
        }
    },
    methods:{
        Add(){
            Car.CarAdd()
            this.count = Car.count
        },
        Remove(){
            Car.CarRemove()
            this.count = Car.count
        },
        goback(){
            this.$router.go(-1)
        }
    },
    mounted() {
        this.count = Car.count
    },
}
</script>