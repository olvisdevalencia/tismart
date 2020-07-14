<template>
<div class="flex-center position-ref full-height">
    <div class="code">
      404
    </div>

    <div class="message" style="padding: 10px;">
      <p>
        Pagina no encontrada ! <router-link class="btn btn-link" :to="{ name: 'front.home' }" > Regresar al inicio </router-link>
      </p>
    </div>
</div>
</template>
<style scoped>

  html, body {
    background-color: #fff;
    color: #636b6f;
    font-family: 'Nunito', sans-serif;
    font-weight: 100;
    height: 70vh;
    margin: 0;
  }

  .full-height {
    height: 70vh;
  }

  .flex-center {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .position-ref {
    position: relative;
  }

  .code {
    border-right: 2px solid;
    font-size: 40px;
    padding: 0 15px 0 15px;
    text-align: center;
  }

  .message {
    margin-top: 1%;
    font-size: 20px;
    text-align: center;
  }
  .message>p {
    color: #207DFF;
  }

</style>
