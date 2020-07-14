<template>
  <div class="aside-container">
    <div class="container mt-5">
      <div class="row mb-4">
        <div class="col-4 ml-2 mr-0">
          <el-image :src="icons.logo" fit="cover"></el-image>
        </div>
        <div class="col-1 m-0 p-0">
          <el-divider direction="vertical" class="line"></el-divider>
        </div>
        <div class="col m-0 p-0">
          <p class="pais">PAIS</p>
          <p class="peru">Perú</p>
        </div>
      </div>
      <div class="row">
        <div class="col-9 user ml-2 mr-0">
          <h1 class="full-name"> {{ user.fullName }} </h1>
          <p class="position"> {{ user.position }} </p>
        </div>
        <div class="col">
          <el-image :src="icons.logOut" fit="cover"></el-image>
        </div>
      </div>
      <div class="row">
        <div class="col-1 ml-2">
          <i class="el-icon-arrow-left left-arrow"></i>
        </div>
        <div class="col">
          <span class="institute"> {{ user.institute }} </span>
        </div>
      </div>
    </div>
    <el-menu default-active="3">
      <el-menu-item index="1" @click="redirectTo('INICIO', 'front.home')">
        <i class="el-icon-house"></i>
        <span>INICIO</span>
      </el-menu-item>
      <el-menu-item index="2" @click="redirectTo('REPORTES', 'front.home')">
        <i class="el-icon-notebook-1"></i>
        <span>REPORTES</span>
      </el-menu-item>
      <el-menu-item index="3" @click="redirectTo('CARRERAS', 'front.home')">
        <i class="el-icon-medal"></i>
        <span>CARRERAS</span>
      </el-menu-item>
      <el-menu-item index="4" @click="redirectTo('CURSOS', 'front.home')">
        <i class="el-icon-wind-power"></i>
        <span>CURSOS</span>
      </el-menu-item>
      <el-menu-item index="5" @click="redirectTo('PROFESORES', 'front.home')">
        <i class="el-icon-s-custom"></i>
        <span>PROFESORES</span>
      </el-menu-item>
      <el-menu-item index="6" @click="redirectTo('ALUMNOS', 'front.home')">
        <i class="el-icon-user"></i>
        <span>ALUMNOS</span>
      </el-menu-item>
      <el-menu-item index="7" @click="redirectTo('CONTENIDO', 'front.home')">
        <i class="el-icon-document-copy"></i>
        <span>CONTENIDO</span>
      </el-menu-item>
      <el-menu-item index="8" @click="redirectTo('NO DESEADOS', 'front.home')">
        <i class="el-icon-circle-close"></i>
        <span>NO DESEADOS</span>
      </el-menu-item>
      <el-menu-item index="9" @click="redirectTo('SOLICITUDES', 'front.home')">
        <i class="el-icon-s-management"></i>
        <span>SOLICITUDES</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import '@/views/layouts/default/Aside.scss'
import logoWabu from '@/assets/img_logowabu.png'
import logOut from '@/assets/icon_logout.png'
import leftArrow from '@/assets/left_arrow.svg'
import { LAYOUT_TITLE } from '@/store/actions/layout'

export default {
  name: 'layouts.default.aside',
  data: () => ({
    icons: {
      logo: logoWabu,
      logOut,
      leftArrow
    },
    user: {
      fullName: 'Eduardo Salas',
      position: 'Administrador País',
      institute: 'PUCP'
    }
  }),
  methods: {
    redirectTo: function (title, route) {
      console.log(`go to following route ${route}`)
      this.$store.dispatch(LAYOUT_TITLE, title)
      if (this.$route.name !== route) {
        this.$router.push({ name: route })
      }
    }
  }
}
</script>
