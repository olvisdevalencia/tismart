<template>
  <div class="home-container">
    <el-form ref="form" :inline="false" :model="form" label-width="80px">
      <div class="row">
        <div class="col-4">
          <el-form-item label="Nombre">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="col-4">
          <el-form-item label="Ciclos">
            <el-input-number v-model="form.cycle" @change="handleChange" :min="1" :max="10"></el-input-number>
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
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-12">
          <el-form-item class="float-right">
            <el-button>CANCELAR</el-button>
            <el-button type="primary" @click="onSubmit">GUARDAR</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <h1 class="creer-title"> Cursos por Carrera </h1>
    <div class="cycles">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Ciclo {{ 1 }}</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'List item ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DEFAULT_FACULTY_LIST } from '@/store/actions/defaultQueries'

export default {
  name: 'front.career.create',
  data: () => ({
    form: {
      name: '',
      cycle: 1,
      code: '',
      faculty: null
    },
    options: []
  }),
  computed: {
    ...mapGetters({ faculties: ['getFacultyList'] })
  },
  methods: {
    fetchFaculties () {
      this.$store.dispatch(DEFAULT_FACULTY_LIST)
    },
    handleChange (value) {
      console.log(value)
    },
    onSubmit () {
      console.log('submit!')
    }
  },
  created () {
    this.fetchFaculties()
  }
}
</script>
