<template>
<section class="header row">
<div class="col-lg-6 col-md-6">
  <h1>TaskForce </h1>
</div>
<div class="col-lg-6 col-md-6">
  <!--<h2 v-on:click="logout()" style="cursor:pointer;">Logout</h2>-->
  <h2 v-on:click="logout()" style="cursor:pointer;" v-if="checkLogin">Logout</h2>
</div>
  
</section>
</template>

<script>
  import VueRouter from 'vue-router';
  export default {
    data() {
      return {
        message:'Header'
      }
    },
    methods: {
        logout:function() {
         var app = this;
         localStorage.removeItem("access_token");
         localStorage.removeItem("access_data");
         localStorage.removeItem("role");
         app.$router.push({ name: '/'});
         app.$store.state.isLoggedIn = false;
        }
    },
    computed: {
      checkLogin() {
        return this.$store.state.isLoggedIn;
      }
    }
  }

</script>

<style>
</style>