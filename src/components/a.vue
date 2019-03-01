<template>
    <div>
        <div>{{count}}</div>
        <div @click="Add">增加</div>
        <div @click="Remove">减少</div>
        <div v-clipboard:success="clipboardSuccess"  v-clipboard:copy='inputData'>复制</div>
        <router-link :to="{path:'b'}">跳到b页面</router-link>
    </div>
</template>
<script>
import {Car} from '../util/shopingCar'
import axios from 'axios'
import clip from '../util/clipboard' // use clipboard directly 
import clipboard from '../directive/clipboard' // use clipboard by v-directive
export default {
    data(){
        return{
            count: null,
            inputData: ''
        }
    },
    directives: {
        clipboard
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
        clipboardSuccess() {
            this.inputData = '上班时间：2019/02/16 18:06，下班时间：2019/02/16 09:36'
            alert('复制成功')
        }
    },
    mounted() {
        this.count = Car.count
        // axios.post('/api/ttt?name=123')
        //     .then(res=>{
        //         console.log('res:', res)
        //     })
        
        // axios.post('http://127.0.0.1:3000/ttt',{name: 123})
        //     .then(res=>{
        //         console.log('res:', res)
        //     })
    },
}
</script>