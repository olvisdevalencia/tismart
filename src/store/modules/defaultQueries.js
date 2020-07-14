import { DEFAULT_FACULTY_LIST } from '@/store/actions/defaultQueries'
import Default from '@/services/DefaultService'
const api = new Default()

const state = {
  facultyList: []
}

const getters = {
  getFacultyList: state => state.facultyList
}

const actions = {
  async [DEFAULT_FACULTY_LIST] ({ commit }, data) {
    api.getFaculties(data).then(faculties => {
      console.log('we bring anything here VUEX')
      console.log(faculties)
      if (faculties.length) {
        commit(DEFAULT_FACULTY_LIST, faculties)
      }
    }).catch(err => {
      console.error('ERROR bringing faculties')
      console.log(err)
    })
  }
}

const mutations = {
  [DEFAULT_FACULTY_LIST] (state, faculties) {
    state.facultyList = faculties
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
