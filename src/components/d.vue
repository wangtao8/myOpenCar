<template>
  <div>
    <div class="openCar" @click="openCar">
        <div class="card">打卡</div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
    <!-- <input type="text" placeholder="请输入上班时间" v-model="times">
        <button @click="countTime">开始计算</button>
        <div v-if="end">下班时间为： {{end}}</div>
    <div @click="addrouters">动态添加路由</div>-->
    <div class="orderBox">
      <div :class="['title',{typeing:isText}]">{{text}}</div>
      <!-- <div class="punchRecord" v-if="timeArray.length > 0">
        <van-swipe-cell :right-width="65" v-for="(item, index) in timeArray" :key="index" :class="index == 0 && show == true ? 'toShow' : ''">
          <span class="xinqi">{{item.xinQi}}</span>
          <ul class="time">
            <li>打卡时间：{{item.statrtTime}}</li>
            <li>下班时间：{{item.endTimes}}</li>
          </ul>
          <span class="delete" slot="right" @click="delet(index)">删除记录</span>
        </van-swipe-cell>
      </div> -->
      <van-collapse class="punchRecord" v-model="activeNames" v-if="timeArray.length > 0">
            <van-collapse-item v-for="(item, index) in zongSJ.years" :title="item + '年'" :name="index" :key="'Y'+index">
                    <van-collapse v-model="a">
                      <van-collapse-item v-for="(item3, index3) in zongSJ.shuju[item]['mon']" :title="item3 +'月份'" :name="item+index3" :key="item+index3">
                        <van-swipe-cell :right-width="65" v-for="(item2, index2) in zongSJ.shuju[item][item3]" :key="'E'+index2" :class="new Date().format('MM') == item3 && index2 == 0 && show == true ? 'toShow' : ''">
                            <span class="xinqi">{{item2.xinQi}}</span>
                            <ul class="time">
                                <li>打卡时间：{{item2.statrtTime}}</li>
                                <li>下班时间：{{item2.endTimes}}</li>
                            </ul>
                            <span class="delete" slot="right" @click="delet(index)">删除记录</span>
                        </van-swipe-cell>
                      </van-collapse-item>
                    </van-collapse>
            </van-collapse-item>
      </van-collapse>
      <div v-else class="punchRecord2">
          暂时没有打卡记录哦~~
      </div>
    </div>
    
  </div>
</template>
<script>
import { endtime } from "../util/workTime";
import router from "../router";
import { superAdmin } from "../router";
import { SwipeCell, Notify, Dialog, Collapse, CollapseItem} from "vant";
import {p} from '../util/shuju'
export default {
  data() {
    return {
      activeNames: [0],//当前打开的面板
      a: [0],
      show: false,//闪耀文字的动画
      times: null,
      end: null,
      timeArray: [],//未整理的数据
      zongSJ: [],//整理好的显示数据
      actor: "",//待显示的字段
      text: "",//正在显示的字段
      isText: false,//是否关闭动画
      count: 0,//当前显示的文案下标
      content: ['Hello！', '欢迎您回来！', '这里是您的打卡记录', '您可想死我了 T _ T', '常到这里看看哟$ _$', '千万不要迟到哦~~']//待显示的文案数组
    };
  },
  components: {
    "van-swipe-cell": SwipeCell,
    "van-collapse": Collapse,
    "van-collapse-item": CollapseItem,
    Dialog
  },
  methods: {
    getData() {// 准备待显示的文案
        // if (this.count < this.content.length - 1) { // 这里是按顺序显示
        //     this.count++
        // } else {
        //     this.count = 0
        // }
        this.count = Math.floor(Math.random()*(this.content.length))// 这里是随机显示
        this.isText = true
        this.actor = this.content[this.count]
    },
    setData() {//设置正在显示的文案
      let num = 0;
      let count = 0;
      let active = false;
      const timeoutstart = 5000;
      const timeoutend = 1000;
      const timespeed = 10;
      setInterval(() => {
        if (this.isText) {
          if (count === this.actor.length) {
            active = true;
          } else {
            active = false;
          }
          if (active) {
            num--;
            this.text = this.actor.substr(0, num);
            if (num === 0) {
              this.isText = false;
              setTimeout(() => {
                count = 0;
                this.getData();
              }, timeoutend);
            }
          } else {
            num++;
            this.text = this.actor.substr(0, num);
            if (num === this.actor.length) {
              this.isText = false;
              setTimeout(() => {
                this.isText = true;
                count = this.actor.length;
              }, timeoutstart);
            }
          }
        }
      }, timespeed);
    },
    openCar() {
      let nowTime = new Date().format("yyyy/MM/dd hh:mm");
      let time = new Date().format("hh:mm");
      let end = endtime.countTime(time);
      let xinQi = endtime.nowXinQi();
      let timeObj = {
        statrtTime: nowTime,
        endTimes: end,
        xinQi: xinQi
      };
      let timeArray = this.timeArray;
      timeArray.unshift(timeObj);
      localStorage.setItem("timeArray", JSON.stringify(timeArray));
      p.getYears()
      let zongSJ = JSON.parse(localStorage.getItem("zongSJ")) || [];
      this.zongSJ = zongSJ
      // console.log(`nowTime: ${nowTime}  endTime: ${end}`)
      this.show = true;
      setTimeout(() => {
          this.show = false;
      }, 1000);
      Notify({
        message: "打卡成功!!",
        duration: 1000,
        background: "#4caf50"
      });
    },
    delet(index) {
      let timeArray = this.timeArray;
      Dialog.confirm({
        message: "确定删除吗？"
      }).then(() => {
        timeArray.splice(index, 1);
        this.timeArray = timeArray;
        localStorage.setItem("timeArray", JSON.stringify(timeArray));
        p.getYears()
        let zongSJ = JSON.parse(localStorage.getItem("zongSJ")) || [];
        this.zongSJ = zongSJ
        Notify({
          message: "删除成功!!",
          duration: 1000,
          background: "#d7120d"
        });
      });
    },
    countTime() {
      let time = this.times || "9:30";
      let end = endtime.countTime(time);
      this.end = end;
    },
    addrouters() {
      router.addRoutes(superAdmin);
      console.log(this.$router.options.routes);
    }
  },
  created() {
    let timeArray = JSON.parse(localStorage.getItem("timeArray")) || [];
    let zongSJ = JSON.parse(localStorage.getItem("zongSJ")) || [];
    this.timeArray = timeArray//初始化打卡记录
    this.zongSJ = zongSJ//初始化打卡记录
    this.actor = "Hello!";//初始化显示文案
    setTimeout(() => {
      this.isText = true;
      this.setData();
    }, 2000);
  }
};
</script>
<style>
.van-collapse-item__content{
    padding: 15px 0 0 5px;
}
.van-hairline--top-bottom::after,[class*=van-hairline]:after,.van-cell:not(:last-child):after{
    border: none!important;
}
ul {
  list-style: none;
  margin-top: 0 !important;
}
.openCar {
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border-radius: 40px;
  font-size: 24px;
  margin: 90px auto 90px;
  position: relative;
}
.card{
    position: absolute;
    z-index: 99999;
    width: 80px;
    height: 80px;
    background: #f44336;
    color: white;
    border-radius: 40px;
}
.circle:first-child{
    animation: circle-opacity 2s infinite;
}
.circle:nth-child(2) {
    animation: circle-opacity 2s infinite;
    animation-delay: .3s;
}
.circle:nth-child(3) {
    animation: circle-opacity 2s infinite;
    animation-delay: .6s;
}
.circle {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border: 3px solid #fff;
    border-color: #f44336;
    top: 0;
}
@keyframes circle-opacity {
    from {
        opacity: 1;
        transform: scale(0);
    }

    to {
        opacity: 0;
        transform: scale(1.5);
    }
}
.orderBox {
  width: 100%;
  height: calc(100% - 240px);
  position: relative;
  box-sizing: border-box;
  padding: 20px 0;
  background: #fff;
}
.punchRecord {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.punchRecord2{
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 80px;
    background: rgb(240,240,240);
    color: #554c4c;
    text-shadow: 1px 1px 1px white;
}
.title {
  width: 94%;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  line-height: 32px;
  position: absolute;
  top: -26px;
  left: 10px;
  color: #f8f8f8;
  background: #221f19;
  box-shadow: 2px 2px 6px black;
}
.title:after {
  content: "";
  width: 3px;
  height: 24px;
  vertical-align: -6px;
  margin-left: 5px;
  background-color: #797777;
  display: inline-block;
  animation: blink 0.4s infinite alternate;
}
.typeing:after {
  animation: none;
}
@keyframes blink {
  to {
    opacity: 0;
  }
}
.time {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 70%;
  height: 40px;
  margin-left: 20px;
  padding: 0!important;
}
.toShow{
  color: red;
  animation: blink .5s linear 3;
}
@keyframes blink{
  0%{opacity: 1;}
  100%{opacity: 0;} 
}
.xinqi {
  display: inline-block;
  width: 16%;
  height: 40px;
  line-height: 40px;
  background: #66ca66;
  text-align: center;
  float: left;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
}
.delete {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
}
.van-swipe-cell {
  width: 90%;
  margin: 4px 20px;
  border-bottom: 1px solid #00eeff;
  padding: 10px 0;
}
.van-swipe-cell__wrapper {
  width: 100%;
}
.van-swipe-cell__left,
.van-swipe-cell__right {
  top: 0;
  height: 100%;
  position: absolute;
  line-height: 40px;
  background: red;
  color: #fff;
  padding: 0 4px;
  box-sizing: border-box;
  border-radius: 6px;
}
.van-collapse-item__content{
  color: black!important;
}
</style>
