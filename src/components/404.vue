<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
<!--          <img src="/static/img/logo.png" class="center-block logo">-->
          <div class="center text-center col-sm-6 col-sm-offset-3">
            <h1>You are lost.</h1>
            <h4>This page doesn't exist.</h4>
            <!--<router-link to="/">Take me home.</router-link>-->
            <a @click="$router.go(-1)">Take me back.</a>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>

<style>
.center {
   margin-top: 200px; 
}


</style>
