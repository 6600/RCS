import Vue from 'vue'
import      moment                                           from 'moment'

export default {

  state:{  
    ValidateForm: {
      emails: [
        {
          value: "liyueyangzp@sina.com",
        },
         
      ], 
    }
  },
  mutations:{
    setTaskemail(state,data){
      state.ValidateForm = data
   
    }
  },
  actions:{
    
 
  }
}