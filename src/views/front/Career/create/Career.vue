<template>
  <div class="career-container" v-loading.fullscreen.lock="isLoading">
    <el-form ref="form" :model="form" :inline="false" label-width="80px">
      <div class="row">
        <div class="col-4">
          <el-form-item label="Nombre" prop="name" :rules="[{ required: true, message: 'El nombre es requerido', trigger: 'blur' }]">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="col-4">
          <el-form-item label="Ciclos">
            <el-input-number v-model="form.cycle" :min="1" :max="10"></el-input-number>
          </el-form-item>
        </div>
        <div class="col">
          <el-checkbox v-model="form.cycleZero" class="checkbox-zero"></el-checkbox>
          <span class="ml-2"> Ciclo 0 </span>
        </div>
        <div class="col-4">
          <el-form-item label="Codigo" prop="code" :rules="[{ required: true, message: 'El codigo es requerido', trigger: 'blur' }]">
          <el-input v-model="form.code" :rules="rules.code"></el-input></el-form-item>
        </div>
        <div class="col-4">
          <el-form-item label="Facultad" prop="faculty" :rules="[{ required: true, message: 'Facultad es requerido', trigger: 'blur' }]">
            <el-select v-model="form.faculty" placeholder="Seleccione" :rules="rules.faculty">
              <el-option v-for="item in faculties" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            <span class="cycle-item-title"> Ciclo 0 </span>
          </div>
          <div class="text item">
            <el-tag class="mx-1 my-1" v-for="(tag, index) in cycleZeroTagList" @v-if="(cycleZeroTagList.length) && tag.disabled" :key="index" closable
              :disable-transitions="false"
              @close="onRemoveZeroTag(tag)">
              {{ tag.label }}
            </el-tag>
            <el-select v-model="form.currentZeroTagValue" placeholder="Agregar curso a ciclo" filterable @change="onSelectedZeroCourse">
              <el-option v-for="item in courses" :key="item.value" v-show="!item.disabled" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
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
            <el-tag class="mx-1 my-1" v-for="(tag, index) in cycleTagList[o - 1]" @v-if="(cycleTagList[o - 1].length) && tag.disabled" :key="index" closable
              :disable-transitions="false"
              @close="onRemoveTag(tag, o)">
              {{ tag.label }}
            </el-tag>
            <el-select v-model="form.currentTagValue" placeholder="Agregar curso a ciclo" filterable @change="onSelectedCourse" @focus="onSelectedOption(o)">
              <el-option v-for="item in courses" :key="item.value" v-show="!item.disabled" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </div>
        </el-card>
      </div>
    </div>
    <div class="actions-buttons">
      <el-button class="submit-btn mx-2" :disabled="isDisabled()" @click="onSubmit">GUARDAR</el-button>
      <el-button class="cancel-btn">CANCELAR</el-button>
    </div>
  </div>
</template>

<script>
import '@/views/front/Career/create/Career.scss'
import rules, { arrayCheckZero, arrayCheck } from '@/views/front/Career/create/rules'
import { mapGetters } from 'vuex'
import { DEFAULT_FACULTY_LIST, DEFAULT_COURSES_LIST, DEFAULT_COURSES_LIST_UPDATE, DEFAULT_CAREER_CREATE } from '@/store/actions/defaultQueries'

export default {
  name: 'front.career.create',
  data: () => ({
    form: {
      name: '',
      cycle: 1,
      code: '',
      faculty: null,
      cycleZero: false,
      validated: {
        name: 0,
        code: 0,
        faculty: 0
      }
    },
    focusedIndex: null,
    cycleTagList: [[]],
    cycleZeroTagList: [],
    rules: [],
    isLoading: false
  }),
  watch: {
    'form.name': function (val) {
      this.form.name = this.blockSpecialChar(val).toUpperCase()
      this.form.validated.name = this.form.name.length ? this.form.name.length : 0
    },
    'form.code': function (val) {
      this.form.code = this.blockSpecialChar(val).toUpperCase()
      this.form.validated.code = this.form.code.length ? this.form.code.length : 0
    },
    'form.faculty': function (val) {
      this.form.validated.faculty = this.form.faculty.length ? this.form.faculty.length : 0
    },
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
    isDisabled () {
      let isDisabled = true
      if (this.form.validated.name && this.form.validated.code && this.form.validated.faculty) {
        isDisabled = false
      }
      return isDisabled
    },
    blockSpecialChar (val) {
      const re = /[^A-Z0-9]/gi
      return val.replace(re, '')
    },
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
      const { form, cycleTagList, cycleZeroTagList } = this
      const cicleZeroData = arrayCheckZero(cycleZeroTagList)
      const cicleData = arrayCheck(cycleTagList)
      const selectedFaculty = this.faculties.find(data => data.value === form.faculty)
      const courses = cicleZeroData.concat(cicleData)
      const noCoursesTxt = 'No pueden haber ciclos sin cursos'
      const submitData = {
        name: form.name,
        code: form.code,
        faculty: {
          _id: selectedFaculty.value,
          name: selectedFaculty.label
        },
        courses
      }

      if (form.cycleZero) {
        if ((!cicleZeroData.length) || (!cicleData.length)) {
          this.$message({ type: 'info', message: noCoursesTxt })
        } else {
          this.processForm(submitData)
        }
      } else {
        if (!cicleData.length) {
          this.$message({ type: 'info', message: noCoursesTxt })
        } else {
          this.processForm(submitData)
        }
      }
    },
    processForm (submitData) {
      const notCreatedTxt = 'No pudimos procesar la transacción'
      this.$confirm('Esta seguro de crear esta carrera ?', 'Advertencia', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.isLoading = true
        this.$store.dispatch(DEFAULT_CAREER_CREATE, submitData).then((data) => {
          if (data.success) {
            this.$message({ type: 'success', message: 'Carrera creada con exito' })
          } else {
            this.$message({ type: 'info', message: notCreatedTxt })
          }
          this.isLoading = false
        })
      }).catch(() => {
        this.$message({ type: 'info', message: notCreatedTxt })
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.rules = rules
  },
  created () {
    this.fetchFaculties()
    this.fetchCourses()
  }
}
</script>
