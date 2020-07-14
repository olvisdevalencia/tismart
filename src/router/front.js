import Career from '@/views/front/Career/create/Career.vue'
import FrontErrorPage from '@/views/layouts/default/Error.vue'

export default [
  {
    path: '/',
    name: 'front.home',
    component: Career
  },
  {
    path: '*',
    name: '404Front*',
    component: FrontErrorPage
  }
]
