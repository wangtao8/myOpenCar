<template>
  <div>
      <img v-for="(item, index) in imgList" :src="item" :key="index"/>

      <van-button type="primary" @click="isShow">主要按钮2332</van-button>
      <van-popup v-model="show">弹出内容</van-popup>
      <van-button @touchstart.native.stop="show2 = true">
        弹出默认键盘
      </van-button>

      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
      />


      <van-number-keyboard
        :show="show2"
        extra-key="."
        close-button-text="完成"
        @input="onInput"
        @delete="onDelete"
        @blur="onBlur"
      />
  </div>
</template>

<script>
import {Button,Popup,NumberKeyboard,Toast,PasswordInput, Dialog } from 'vant';
import 'vant/lib/button/style';
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: '',
      show: false,
      show2: false,
      imgList: []
    }
  },
  components: {
    "van-button": Button,
    "van-popup": Popup,
    "van-number-keyboard": NumberKeyboard,
    "van-password-input": PasswordInput,
  },
  created(){
    for(let i = 1; i <= 3; i++){
        this.imgList.push(require('../assets/' + i + '.jpg'))
    }
  },
  methods: {
    isShow(){//显示模态框
      // this.show = !this.show
      Dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      }).then(() => {
        // window.location.href = 'tel://10086'
        window.location.href = 'tel:10086'
        console.log('点击确认')
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    onInput(values) {//输入事件
      var oldVal = this.value//旧值
      var newVal = oldVal.split('')
      var newsVal//新值字符串(最终值)
      if(oldVal.length < 6) {
        newVal.push(values)//新值
        newsVal = newVal.join('')
        this.value = newsVal
      } else {
        Toast('密码已经输入完成')
      }
    },
    onDelete() {//删除事件
      var oldVal = this.value//旧值
      var newVal = oldVal.split('')
      var newsVal//新值字符串(最终值)
      if(oldVal.length > 0) {
        newVal.splice(oldVal.length-1, 1)//新值
        newsVal = newVal.join('')
        this.value = newsVal
      } else {
        Toast('删不动了')
      }
    },
    onBlur(){//点击关闭按钮或非键盘区域时触发
      this.show2 = false
    },

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.imgs{
  width: 40px;
  height: 40px;
}
.van-popup{
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}
</style>
