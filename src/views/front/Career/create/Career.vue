<template>
  <div class="career-container">
    <el-form ref="form" :inline="false" :model="form" label-width="80px">
      <div class="row">
        <div class="col-4">
          <el-form-item label="Nombre">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="col-4">
          <el-form-item label="Ciclos">
            <el-input-number v-model="form.cycle" :min="1" :max="10"></el-input-number>
          </el-form-item>
        </div>
        <div class="col">
          <el-checkbox v-model="form.cycleZero"></el-checkbox>
          <span class="ml-2">Ciclo 0</span>
        </div>
        <div class="col-4">
          <el-form-item label="Codigo">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </div>
        <div class="col-4">
          <el-form-item label="Facultad">
            <el-select v-model="form.faculty" placeholder="Seleccione">
              <el-option v-for="item in faculties" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <h1 class="career-title"> Cursos por Carrera </h1>
    <div class="cycles my-4">
      <div class="cycle-item mt-2" v-if="form.cycleZero">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="cycle-item-title">Ciclo 0 </span>
          </div>
          <div class="text item">
            <el-tag class="mx-1 my-1"
              v-for="(tag, index) in cycleZeroTagList" @v-if="(cycleZeroTagList.length) && tag.disabled" :key="index"
              closable
              :disable-transitions="false"
              @close="onRemoveZeroTag(tag)">
              {{ tag.label }}
            </el-tag>
            <el-select v-model="form.currentZeroTagValue" placeholder="Agregar curso a ciclo" filterable @change="onSelectedZeroCourse">
              <el-option v-for="item in courses" :key="item.value" v-show="!item.disabled" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>
        </el-card>
      </div>
      <div class="cycle-item mt-2" v-for="o in form.cycle" :key="o">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="cycle-item-title">Ciclo {{ o }}</span>
          </div>
          <div class="text item">
            <el-tag class="mx-1 my-1"
              v-for="(tag, index) in cycleTagList[o - 1]" @v-if="(cycleTagList[o - 1].length) && tag.disabled" :key="index"
              closable
              :disable-transitions="false"
              @close="onRemoveTag(tag, o)">
              {{ tag.label }}
            </el-tag>
            <el-select v-model="form.currentTagValue" placeholder="Agregar curso a ciclo" filterable @change="onSelectedCourse" @focus="onSelectedOption(o)">
              <el-option v-for="item in courses" :key="item.value" v-show="!item.disabled" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>
        </el-card>
      </div>
    </div>
    <div class="actions-buttons">
      <el-button class="submit-btn mx-2">GUARDAR</el-button>
      <el-button class="cancel-btn" @click="onSubmit">CANCELAR</el-button>
    </div>
  </div>
</template>

<script>
import '@/views/front/Career/create/Career.scss'
import { mapGetters } from 'vuex'
import { DEFAULT_FACULTY_LIST, DEFAULT_COURSES_LIST, DEFAULT_COURSES_LIST_UPDATE } from '@/store/actions/defaultQueries'

export default {
  name: 'front.career.create',
  data: () => ({
    form: {
      name: '',
      cycle: 1,
      code: '',
      faculty: null,
      cycleZero: false
    },
    focusedIndex: null,
    cycleTagList: [[]],
    cycleZeroTagList: []
  }),
  watch: {
    'form.cycle': function (newVal, oldVal) {
      if (newVal > oldVal) {
        const newArray = []
        this.cycleTagList.push(newArray)
      } else {
        if (this.cycleTagList[newVal].length) {
          this.cycleTagList[newVal].forEach(item => {
            this.findAndUpdateList(item.value, false)
          })
        }
        this.cycleTagList.splice(newVal, 1)
      }
    },
    'form.cycleZero': function (val) {
      if (this.cycleZeroTagList.length && !this.form.cycleZero) {
        this.cycleZeroTagList.forEach(item => {
          this.findAndUpdateList(item.value, false)
        })
        this.cycleZeroTagList = []
      }
    }
  },
  computed: {
    ...mapGetters({ faculties: ['getFacultyList'], courses: ['getCoursesList'] })
  },
  methods: {
    fetchFaculties () {
      this.$store.dispatch(DEFAULT_FACULTY_LIST)
    },
    fetchCourses () {
      this.$store.dispatch(DEFAULT_COURSES_LIST)
    },
    updateCourses (data) {
      this.$store.dispatch(DEFAULT_COURSES_LIST_UPDATE, data)
    },
    onSelectedOption (focusIndex) {
      this.focusedIndex = focusIndex - 1
    },
    onRemoveZeroTag (tag) {
      const selectedTagIndex = this.cycleZeroTagList.indexOf(tag)
      this.cycleZeroTagList.splice(selectedTagIndex, 1)
      this.findAndUpdateList(tag.value, false)
    },
    onRemoveTag (tag, ArrayIndex) {
      const selectedTagIndex = this.cycleTagList[ArrayIndex - 1].indexOf(tag)
      this.cycleTagList[ArrayIndex - 1].splice(selectedTagIndex, 1)
      this.findAndUpdateList(tag.value, false)
    },
    onSelectedZeroCourse (value) {
      const selected = this.findAndUpdateList(value, true)
      this.cycleZeroTagList.push(selected)
      this.form.currentZeroTagValue = null
    },
    onSelectedCourse (value) {
      const selected = this.findAndUpdateList(value, true)
      this.cycleTagList[this.focusedIndex].push(selected)
      this.form.currentTagValue = null
    },
    findAndUpdateList (value, toggle) {
      const selected = this.courses.find(data => data.value === value)
      const indexOfItem = this.courses.indexOf(selected)
      const updatedList = this.courses
      updatedList[indexOfItem].disabled = toggle
      this.updateCourses(updatedList)
      return selected
    },
    onSubmit () {
      console.log('submit!')
    }
  },
  created () {
    this.fetchFaculties()
    this.fetchCourses()
  }
}
</script>
