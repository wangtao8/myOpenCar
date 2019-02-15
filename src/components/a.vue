<template>
    <div>
        <div>{{count}}</div>
        <div @click="Add">增加</div>
        <div @click="Remove">减少</div>
        <router-link :to="{path:'b'}">跳到b页面</router-link>
    </div>
</template>
<script>
import {Car} from '../util/shopingCar'
import axios from 'axios'
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
        }
    },
    mounted() {
        this.count = Car.count
        axios.post('/api/ttt?name=123')
            .then(res=>{
                console.log('res:', res)
            })
        
        // axios.post('http://127.0.0.1:3000/ttt',{name: 123})
        //     .then(res=>{
        //         console.log('res:', res)
        //     })
    },
}
</script>