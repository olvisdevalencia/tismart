import { LAYOUT_TITLE } from '@/store/actions/layout'

const state = { title: 'CARRERAS' }

const getters = {
  getTitle: state => state.title
}

const actions = {
  [LAYOUT_TITLE] ({ commit }, details) {
    commit(LAYOUT_TITLE, details)
  }
}

const mutations = {
  [LAYOUT_TITLE] (state, title) {
    state.title = title
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
