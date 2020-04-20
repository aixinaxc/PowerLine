import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    event: {
      name: '',
      data: null
    },
    data: {
      scale: 1,
      lineName: 'curve',
      fromArrowType: '',
      toArrowType: 'triangleSolid',
      locked: 0,
      bkColor : '#000000'
    }
  },
  mutations: {
    data(state, data) {
      state.data = data
    },
    emit(state, event) {
      state.event = event
    },
    dataUpdata(state, data){
      console.log("dataUpdata==============================")
      switch (data.key) {
        case "locked":
          state.data.locked = data.value
          break;
        case "lineName":
          state.data.lineName = data.value
              break;
        case "fromArrowType":
          state.data.fromArrowType = data.value
              break
        case "toArrowType":
          state.data.toArrowType = data.value
        default:
      }
    }
  },
  actions: {

  }
})
