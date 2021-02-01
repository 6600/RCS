
<template>
 <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom"> 
   <div class="picker-toolbar-title">
   <div class="usi-btn-cancel" @click="cancel">取消</div>   
    <div class="">请选择{{title}}</div>
  <div class="usi-btn-sure"    @click="popupOk()">确定</div>
   </div>

      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    
  </mt-popup> 
</template>

<script>
import      {Picker,Popup }                                       from 'mint-ui'; 

export default {
  name:'mPicker',
  props:['type','title','data','Visible'],
  components:{
    Picker,Popup 
  },
  watch:{
    Visible(newV,oldV){
      if(this.type == newV){
              console.log(newV);
       this.popupVisible =true 
      }
    },
    popupVisible(newV,oldV){
      if(!newV){
        this.$emit('cancel','cancel') 
      }
    }
  },
  data(){
    return{ 
      popupVisible:false,
      slots:[],
      Type:'',
      Typeval:''
    }
  },
created(){
  this.slots = this.data
},methods:{

 popupOk(){
  this.Type = this.Typeval;
  this.popupVisible = false;
  this.$emit('confirm',this.Type)

 },
 //问题类型的弹框picker值发生改变
 onValuesChange(picker, values){
   console.log(values);
   this.Typeval = values[0];
 },
 cancel(){
   popupVisible = !popupVisible
   this.$emit('cancel','cancel')
 }
}
 
}
</script>

<style lang='less' scoped>
/**问题类型弹框样式 */
.mint-popup{
  width:100%;
  height:10rem;
}
.picker-toolbar-title {
  display: flex;
  height:2rem;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #eee;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  .usi-btn-cancel,.usi-btn-sure{
      color:#26a2ff;
      font-size: 16px;
  }
}
</style>