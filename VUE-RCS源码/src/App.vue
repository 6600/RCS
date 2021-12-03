<template>
  <div id="app">
    <router-view/>
  </div>
</template> 

<script>
export default {
  name: 'App',
  created () {
    console.log('程序初始化!')
  }
}
</script>

<style lang='less'>
@import url('./assets/less/tablefix.less');
@import url('./assets/less/mycss.less');

* {
  margin: 0;
  padding: 0;
}

html,
body,
#app,
.con,
.wrapper {
  width: 100%;
  height: 100%;
  overflow:hidden;
}

body {
  font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}
 .page{
   width: 100%;
   height:100%;   
   }
   ul{
     list-style: none;
   }
  .el-input__inner,.el-input--small .el-input__inner,.el-picker-panel,.el-select-dropdown{
    border-radius: 0px!important;
  }
 .el-popper{
   margin-top: 2px!important;
 }
  .el-popper .popper__arrow{
    display: none;
  }
.pageMain .panel-center {
  height: calc(100% - 120px);
  width: 100%;
  display: flex;
  overflow: auto;
}
.el-col-24 {
  height: auto;
  overflow: auto;
  display: flex;
  align-items: center;
}
.panel .el-col-24 {
  overflow: auto;
  height: 100%;
}
.leaflet-ant-path.active {
  stroke: #ff0000;
}
.Monitor {
  height: 100%;
}
.main .leaflet-container {
  background: white;
}
.clear {
  clear: both;
}
.leaflet-tooltip-top {
  margin-top: -20px;
  font-size: 20px;
}
</style>
