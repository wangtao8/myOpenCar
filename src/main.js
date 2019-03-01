import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


//全局注册 过滤非法字符
Vue.filter('validate', function (val) {
  val = val.toString();
  var reg = /[`~!@#$%^&*()_+<>?:"{},\/;']/im;

  if (reg.test(val)) {
    alert("请勿输入非法字符", "温馨提示");
    //返回时删除非法字符
    return val.substr(0, val.length - 1);
  } else {
    //原内容返回
    return val;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
