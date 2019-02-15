// 定义一个混入对象
export const myMixin = {
    created: function () {
        this.client.connect({onSuccess:this.onConnect});//连接服务器并注册连接成功处理事件
        this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
        this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
    },
    data() {
        return {
            client : new Paho.MQTT.Client("openapi.moerlong.com", 28083, ""),//第三个参数是clientID可以为空
            topic: "2018121713093900001"// 订阅的主题
        }
    },
    methods: {
        onConnectionLost:function (responseObject) {
            if (responseObject.errorCode !== 0) {
              console.log("onConnectionLost:"+responseObject.errorMessage);
              console.log("连接已断开");
            }
          },
          onMessageArrived: function(message) {
            console.log("收到消息:"+message.payloadString);
          },
          onConnect : function() {
            console.log("onConnected");
            this.client.subscribe(this.topic);//订阅主题
          }
    }
  }

export const NewMixins = {
    methods: {
        aa(){
            alert(1)
        }
    }
}