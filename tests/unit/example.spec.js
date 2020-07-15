import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Career from '@/views/front/Career/create/Career.vue'
const localVue = createLocalVue()
localVue.use(Vuex)
describe('Testing text and should fail because others non native components', () => {
  describe('with a store', () => {
    let store
    let getters
    beforeEach(() => {
      getters = {
        getter_1: () => 'value_1',
        getter_2: () => (arg) => arg
      }
      store = new Vuex.Store({ getters })
    })
    it('renders a values from getters', () => {
      const wrapper = shallowMount(Career, {
        store,
        localVue
      })
      expect(wrapper.find('.career-container .career-title')
        .text().trim()).toEqual('Cursos por Carrera')
    })
  })
})
