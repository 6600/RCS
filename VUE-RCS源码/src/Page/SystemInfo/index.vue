<template>
<div class="system-info">
  <div class="info-item" v-for="(infoItem, infoInd) in webConfig.systemInfo" :key="infoInd">
    <h3>{{infoInd}}</h3>
    <ul class="card-box clear">
      <li v-for="(item, idx) in infoItem" :key="idx" :class="item.state || 'normal'" :style="{width: item.width || '240px', height: item.height || '80px'}">
        <img :src="item.icon">
        <div class="system-info-card-right">
          <h4>{{item.name}}</h4>
          <h4>{{item.ip}}</h4>
        </div>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</div>
  
</template>

<script>
import      {mapState}                          from 'vuex'
export default { 
  computed:{
    //VueX状态管理Module的使用 mapState:https://www.jianshu.com/p/0b42a876561e
    ...mapState( { 
      webConfig: state => state.DataStatistics.webConfig
    })
  },
}
</script>

<style lang='less' scoped>
.system-info {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  position: relative;
  padding: 10px;
}
li {
  float: left;
  display: flex;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  align-items: center;
  h4 {
    line-height: 30px;
    color: #333;
  }
}
.card-box li img {
  display: block;
  height: calc(92% - 15px);
  margin: 4%;
}
h3 {
  line-height: 30px;
  margin-bottom: 10px;
}
.warn {
  background-color: #ffeb3b;
  h4 {
    color: black;
  }
}
.error {
  background-color: red;
  h4 {
    color: white;
  }
}
.normal {
  background-color: #4caf50;
  h4 {
    color: white;
  }
}
.info-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>