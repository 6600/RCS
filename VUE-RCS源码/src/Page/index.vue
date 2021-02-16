<template>
<div class="con">
    <!-- <div class="leftss" style="float:right;background-color:red;width:100px;height:1111px;"> </div> --> 
<el-row class="pageMain" > 
    <el-col :span="24" class = 'head' style="height:70px;">
        <el-col :span="6" class="logo" >
            <img src="../../static/img/logo/logo-3.png" class="logoimg"/>
        </el-col>
        <el-col :span="4" >
            <div class="wel">欢迎你，{{username}}</div>
        </el-col>
        <el-col :span="6" class = 'btngroup'>
          <div v-show='!isMoniter'>
            <el-button type="primary" class="storage"  @click="diaodu" plain>             调度监控  </el-button>
            <el-button  type="primary" class="basic-info" @click="ScrollTaskList" plain > 实时列表  </el-button>
            <el-button type="primary" class="excel" @click="datachart" plain>             数据统计  </el-button>
          </div>  
          <div v-show="isMoniter" class = 'floorGroup'>
             <ul class='floorbtn' >
              <li v-for='item in 4' @click='SelectFloor(item)'>
                <div :class="tweenClass(item)" >
                <div class="floor"><span>{{item}}F</span></div></div></li>  
            </ul>
            <div class='thumb' :class="{thumbborder:flooridx==-1}"> 
               <i @click="SelectFloor('thumb')" class = 'iconfont icon-suolvetuxianshi' :class="{color:flooridx==-1?'#ffffff':'#049de4'}"></i> 
            </div>
          </div>
           
        </el-col> 
        <!-- mint选择楼层组件 -->
        <div class="mintfloor" v-show='isMoniter'>
            <mPicker type="floor"    title= '楼层' :data = 'mintfloor'  :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
            <mt-button type="default" @click = "Picker('floor')">选择楼层</mt-button>

        </div>
        <el-col :span="4" class="right"> 
         <el-dropdown class="user-menu"> 
          <span class="el-dropdown-link c-gra">   <i class="el-icon-service"></i> 个人中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span> 
          <el-dropdown-menu slot="dropdown"> 
             <el-dropdown-item command="logout"><span @click="Taskmail"><i class="el-icon-message"></i> 邮箱设置</span></el-dropdown-item>
              <el-dropdown-item command="logout"><span @click="showlogout"><i class="el-icon-circle-close"></i> 安全退出</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-col>
    </el-col>
    <el-col :span="18" class="panel-center" >
        <aside class="w-40 ovf-hd">
            <LeftMenu class="leftmenu" ></LeftMenu>   
        </aside>
        <section class="panel">
          <el-col :span="24">
            <transition name="fade" mode="out-in" appear>  <router-view></router-view>  </transition>
          </el-col>
        </section>
    </el-col>
    <logout-dialog class="loading" v-show="iflogout"  @close="closedialog"/>
    <el-col :span="24"> 
        <my-footer class="foot"></my-footer>
    </el-col>
</el-row>
<mt-tabbar v-model="selected">
  <mt-tab-item id="DispatchMonitor">
      <i  slot="icon"  class="iconfont icon-jiankong"></i>
    监控
  </mt-tab-item>
  <mt-tab-item id="Connections"> 
     <i slot="icon" class="iconfont icon-lianjie"></i>
    连接
  </mt-tab-item>
  <mt-tab-item id="TaskList">
     <i  slot="icon" class="iconfont icon-task"></i> 
    任务
  </mt-tab-item>
  <mt-tab-item id="DataStatistics">
     <i  slot="icon" class="iconfont icon-kujialeqiyezhan_shujutongji"></i> 
    统计
  </mt-tab-item>
</mt-tabbar>
</div>
</template>

<script>
import LeftMenu                            from '../components/leftmenu/leftMenu' 
import myFooter                            from '../components/footer' 
import logoutDialog                        from '../components/logout-dialog'
import {mapState,mapMutations}             from 'vuex'
import         $                           from 'webpack-zepto'
import { Tabbar, TabItem }                 from 'mint-ui';
import      mPicker                        from './TaskList/Picker'
import    config                           from '../assets/config/config'
import    Mythod                           from '../assets/js/Mythod'

export default {
    data(){
    return{
        iflogout:false,
        showware:false,
        isMoniter:true, 
        value1:'',
        value2:'', 
        mintfloor: [ {  values: ['1楼','2楼', '3楼', '4楼']  } ], 
        mpopupVisible:'',
        selected:'',
        preselect:''                   //上一次点击的按钮index
    }
    },
    computed:{
      ...mapState({
        username:  state  =>state.user.username,
        flooridx:  state  =>state.map.flooridx,
        EdgeCache: state  =>state.map.EdgeCache,
        PlaceCache:state  =>state.map.PlaceCache,
        floormap:  state  =>state.map.floormap
        
        }),
      tweenClass(idx){
        return function(idx){ 
        return 'tweenFloor'+idx
        }
      } 
    },
    watch:{
       $route(to,from){  this.isMoniter = to.path =='/DispatchMonitor'?true:false
  },
  selected(newV,oldV){
    console.log(newV);
       if(newV=='DispatchMonitor'){
         this.isMoniter = true
       }else{
        this.isMoniter = false 
       } 
      this.$router.push({path:'/'+newV, query:{path: 'mint'}})                    //mintUI  页面跳转 

       this.setFloorIdx(1) 
  }
    },
    components:{
      LeftMenu,
      myFooter,
      logoutDialog,
      mPicker,
      Tabbar, 
      TabItem
     },
    mounted(){
      var path =this.$route.path
      let that = this
     // let devOrpub = {dev:'http://192.168.43.119:8083/static/map/map.json',pub:'/static/map/map.json'}
      let url      = 'http://'+Mythod.gethost()+"/static/json/"                                //适配开发和部署的图片路径
      let mapRang    = new Array()
      console.log(url);
      this.axios.get(url+'map.json').then(res=>{    
       let data = res.data 
       that.InitFloormap(res.data)  

       data.forEach((item,index)=>{
        let mapRangObj ={x1:item.x, x2:item.x+item.w, y1:item.y,y2:item.y+item.h,x:item.x ,y:item.y}

        item.place.forEach((place,idx)=>{
          if(typeof(that.PlaceCache[index][place.PlaceID])!='undefined'){
            that.floormap[index].place[idx].Locked = that.PlaceCache[index][place.PlaceID].Locked   
             console.log('载入缓存车库',that.PlaceCache[index][place.PlaceID]);  
          }            
 
        })
        item.path.forEach((path,idx)=>{
           if(typeof(that.EdgeCache[index][path.ID])!='undefined'){
            that.floormap[index].path[idx].Occupy = that.EdgeCache[index][path.ID].Occupy
              console.log('载入缓存路径', that.EdgeCache[index][path.ID].Occupy);   
          }
        })
        mapRang.push(mapRangObj)
       })     
        that.setMapRang(mapRang) 
     })
     this.axios.get(url+'TaskList.json').then(res=>{    
       let data = res.data 
       this.setAGV_Option(data.AGV_Option)
       this.setStatus_Option(data.Status_Option)
       this.setStart_Option(data.Start_Option)
       this.setEnd_Option(data.End_Option)
        console.log(data)
     })

      if(path!='/DispatchMonitor')
        this.isMoniter = false
      },
    methods:{
        ...mapMutations(['setFloorIdx','InitFloormap','setMapRang','setAGV_Option','setStatus_Option','setStart_Option','setEnd_Option']),
 
        diaodu(){ 
           this.$router.push('/DispatchMonitor') 
           },
        ScrollTaskList(){
           this.$router.push('/ScrollTaskList')  
           },
        datachart(){
           this.$router.push('/DataStatistics')
             },
        info(){
           this.$router.push('/basic/account')  
          },
        Taskmail(){
           this.$router.push('/Taskemail')  
        },
        showlogout(){
          this.iflogout=true 
           },
        closedialog(){ 
          this.iflogout=false 
           },
        tweenBtn(idx){                                        //切换楼层的缓动动画 
           this.tween.to('.tweenFloor'+this.preselect+' .floor',{backgroundColor:'#049de4',color:"#ffffff"})
           this.tween.to('.tweenFloor'+this.preselect,{scaleX:1,scaleY:1})
           this.tween.to('.tweenFloor'+idx+' .floor',{backgroundColor:'#ffffff',color:"#049de4"})
           this.tween.to('.tweenFloor'+idx,{scaleX:1.05,scaleY:1.05})
           this.preselect = idx

         if(idx == 'thumb'){                                //切换到缩略图效果

           this.tween.to('.thumb',{backgroundColor:'#049de4',color:"#ffffff"}) 
           this.tween.to('.thumb i',{color:"#ffffff"}) 
         }else{
            this.tween.to('.thumb',{backgroundColor:'#ffffff',color:"#049de4"}) 
            this.tween.to('.thumb i',{color:"#049de4"})  
         }
        },
        SelectFloor(idx){                    //楼层选择
          this.tweenBtn(idx)
          this.setFloorIdx(idx)
         // this.$router.push({ name: 'diaodu', params: { floor: 123 }})
         },                     
     //mint组件     
      Picker(val){ 
        this.mpopupVisible = val 
      },
      confirm(val){
        var cov = {'1楼':1,'2楼':2,'3楼':3,'4楼':4}
        this.setFloorIdx(cov[val]) 
      },
      cancel(val){
        this.mpopupVisible = val  
      }, 
    }
}
</script>

<style lang="less">
.pageMain{
    height:100%;
    top:0px;
    left:0px;
    margin:0 auto;
    width:100%;
    border-radius:0 0 25px 25px; 
    box-shadow: 0 4px 4px rgb(185, 180, 180);
    .logo {  
       height:70px;
     img{
       height: 40px;
       line-height:70px;
       margin-left:10px;
       margin-top:10px;
       display:inline-block;
       } 
    }
    .btngroup{ 
      display: flex; 
      margin-top:15px; 
    }
    .wel { 
      margin-top:30px; 
      }
    .right{  
      position: absolute;
      left:90%;
      top: 20px;
      width: 30% 
    }
    .sel1{ 
      position: absolute;
      left:60%;
      top: 20px;
      width: 30% }
    .operation-storage{ 
      width:25%;
      position: absolute;
      left: 15%;top:10px 
    }
    .operation-loader{
       width: 25%;
       position: absolute;
       left: 45%;top:10px 
       }
    .user-menu{ 
      cursor:default;
       position:absolute;
       top:20px;  }
    .leftmenu{
      width: 40px;
      left: 0;
      height: 100%;
      z-index: 999;
      overflow: hidden;
      position: absolute;
      transition: width 0.5s;
     }
    .panel{ 
      width: calc(100% - 40px);
    }
    .foot{
       height:80px; 
       width:100%;
    }
}
.leftmenu .el-menu {
  width: 120px;
}
.leftmenu .el-menu-item {
  padding: 0 !important;
}
.w-40.ovf-hd {
  width: 40px;
}
.w-40.ovf-hd:hover .leftmenu {
  width: 120px;
}
.floorGroup{
  width:1000px; 
  .thumb{ 
    float: left;
    margin-left:30px;
    cursor: pointer;
  }
  i{
   margin:5px;
   font-size: 2.5rem;
   color: #049de4;
  }
  .thumbborder{
    border: 1px solid #049de4; 
    color:white!important;
    //background-color: #049de4;
  }
}
.btngroup{
  width:35%!important;
}
  .floorbtn{             //楼层按钮切换样式
    li{
      float:left;
    margin-left:1rem;}
    
    .border{
     margin-top:-0.4rem;
    border: 1px solid #049de4;
    padding:0.5rem;
    border-radius: 3.5rem;
    display:flex;
    align-items: center;
    }
    
    .floor{
      margin:0 auto;
      line-height:3.5rem;
      width: 2.5rem;
      height:2.5rem;
      border-radius: 2.5rem;
      border-width: 1px;
      border-style:solid;
      background-color:#049de4;
      color:white;
      line-height: 2.5rem;
      text-align: center;cursor: pointer;
    }
  }
  .el-dropdown-link:hover{
    cursor: pointer;
  }
//  Mint样式
.mintfloor{
  text-align: center;
  margin-top:20px;
}
.menuItem .iconfont {
  display: inline-block;
  width: 40px;
  text-align: center;
  font-size: 29px;
}
</style>
