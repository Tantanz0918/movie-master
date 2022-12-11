import { createStore } from 'vuex'
import { cityData } from '../util'

export default createStore({
  state: {
    cd:{
        ci:-1,
        ct:"",
    }
  },
  mutations: {
   UpdateCityData(state:any,data:cityData) {
        state.cd.ci=data.ci
        state.cd.ct=data.ct
    },
  },
  actions: {
     updateCityData(context:any,data:cityData) {
        context.commit('UpdateCityData',data)
    },
  },
  modules: {
  }
})

