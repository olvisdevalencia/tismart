import { DEFAULT_FACULTY_LIST, DEFAULT_COURSES_LIST, DEFAULT_COURSES_LIST_UPDATE, DEFAULT_CAREER_CREATE } from '@/store/actions/defaultQueries'
import Default from '@/services/DefaultService'
const api = new Default()

const state = {
  facultyList: [],
  coursesList: [],
  selectedCourses: []
}

const getters = {
  getFacultyList: state => state.facultyList,
  getCoursesList: state => state.coursesList,
  getSelectedCourses: state => state.selectedCourses
}

const actions = {
  async [DEFAULT_FACULTY_LIST] ({ commit }, data) {
    api.getFaculties(data).then(faculties => {
      if ('data' in faculties && faculties.data.length) {
        const items = faculties.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        commit(DEFAULT_FACULTY_LIST, items)
      }
    }).catch(err => {
      console.error('ERROR bringing faculties')
      console.log(err)
    })
  },
  async [DEFAULT_COURSES_LIST] ({ commit }, data) {
    api.getCourses(data).then(courses => {
      if ('data' in courses && courses.data.length) {
        const items = courses.data.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        commit(DEFAULT_COURSES_LIST, items)
      }
    }).catch(err => {
      console.error('ERROR bringing courses')
      console.log(err)
    })
  },
  async [DEFAULT_CAREER_CREATE] ({ commit }, data) {
    console.log('la info que me llega desde el component')
    console.log(data)
    let message
    const success = false

    return { data: null, success: success, message }
  },
  [DEFAULT_COURSES_LIST_UPDATE] ({ commit }, data) {
    commit(DEFAULT_COURSES_LIST, data)
  }
}

const mutations = {
  [DEFAULT_FACULTY_LIST] (state, faculties) {
    state.facultyList = faculties
  },
  [DEFAULT_COURSES_LIST] (state, courses) {
    state.coursesList = courses
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
