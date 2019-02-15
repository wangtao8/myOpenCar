<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #03a9f4;
}
#app, #app>div{
  width: 100%;
  height: 100%;
}
</style>
