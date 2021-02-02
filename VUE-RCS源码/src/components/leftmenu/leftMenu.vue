 
<template>
<!-- @mouseleave="leave" -->
<div @mouseenter="enter" >
       <el-menu router  background-color="#003c79"  text-color="#fff" 
        :collapse="false" mode="vertical">
        <!-- <el-menu-item  index="/homepage" class='menuItem'>
            <i class="el-icon-menu"></i>  <span slot="title" >首页</span>
        </el-menu-item> -->
        <el-menu-item  index="/DispatchMonitor" class='menuItem'     @click.native.prevent="handleback">
            <i class="iconfont icon-jiankong"></i> <span slot="title" >调度监控</span>
        </el-menu-item>
        <!-- <el-menu-item  index="/Connections"     class='menuItem'     @click.native.prevent="handleback">
            <i class="iconfont icon-lianjie"></i> <span slot="title" >连接管理</span>
        </el-menu-item>  -->
        <!-- <el-menu-item  index="/TaskList" class='menuItem'>
            <i class="iconfont icon-task"></i> <span slot="title" >任务列表</span>
        </el-menu-item> -->
     
        <el-menu-item  index="/DataStatistics" class='menuItem'      @click.native.prevent="handleback">  
            <i class="iconfont icon-kujialeqiyezhan_shujutongji"></i> <span slot="title" >数据统计</span> 
        </el-menu-item>
        <el-menu-item  index="/TaskList"       class='menuItem'>
            <i class="iconfont icon-task"></i> <span slot="title" >任务列表</span>
        </el-menu-item>
        <el-submenu    index='/TaskList' id='elsubmenu'>
        <template slot="title" >
          <i class="iconfont icon-task"></i>
          <span>任务列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/TaskList"       @click.native.prevent="handleback">> 历史查询</el-menu-item>
          <el-menu-item index="/ScrollTaskList" @click.native.prevent="handleback">> 实时任务</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</div>
</template>

<script>
export default {
    data(){
        return{
          menulist:[{name:'首页',icon:''},
          {name:'调度监控',icon:''},
          {name:'连接管理',icon:''},
          {name:'物料管理'},
          {name:'数据统计',icon:''}],
          isCollapse:false, 
        }
    }, 
    onLoad(){
    },
    methods: {
        handleback(key, keyPath) {     
          this.isCollapse = false
          this.$('#elsubmenu .el-menu').css({'display':'none','over-flow':'auto'}) 
          this.$('#elsubmenu .el-menu')
        }, 
        enter(){
            this.isCollapse=false;
        },
        leave(){
            this.isCollapse=true;
        }
    }
}
</script>

<style lang="less">
div .del-menu-vertical-demo{
    background-color:#003c79;
    border-radius:30px;
    @text-color:#fff;
    @active-text-color:#8bcbff;
    font-size: 18px;
}
#app .el-menu{
    border-radius:0 25px 0 0;
    height:100%;
}
.el-submenu__title{
  padding-left:10px!important;
}
.el-menu--collapse{
  width:40px;
}
.el-tooltip{padding:0 10px!important;}
.menuItem{
  height:50px;top:40px;padding-left:10px!important;
}
</style>
