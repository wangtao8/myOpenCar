<template>
 
  <ul>
    <li v-for="(item,index) in list" :key="index">
      <p @click="changeStatus(index)">{{item.name}}</p>
      <!-- 递归组件 每次往下传入下一级的数据  scopesDefault[index]控制显隐-->
      <tree-menus v-if="scopesDefault[index]" :list="item.cList"></tree-menus>
    </li>
  </ul>
 
</template>
<script>
export default {
  name: 'treeMenus',
  props: {
    list: Array
  },
  data() {
    return {
      scopesDefault: [],
      scopes: []
    }
  },
  methods: {
    changeStatus(index) {
      if (this.scopesDefault[index] == true) {//控制下级显隐
        this.$set(this.scopesDefault, index, false)
      } else {
        this.$set(this.scopesDefault, index, this.scopes[index])
      }
    },
    scope() {//遍历数据
      this.list.forEach((item, index) => {//循环数据
        this.scopesDefault[index] = false
        if ('cList' in item) {//当前还有下级
          this.scopes[index] = true
        } else {//当前没有下级
          this.scopes[index] = false
        }
      })
    }
  },
  created() {
    this.scope()//初始化显示内容
  }
}
</script>

 <style>
  ul {
    margin-top: 50px;
    padding-left: 20px !important;
  }
</style>
