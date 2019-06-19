<template>
<div class="hello">
  <h1>{{msg}}</h1>
  <h2>TaskForce</h2>
  <p>Use login to get started ok</p><br/>
  <router-link :to="'loginadmin'">Login Admin Barapraja</router-link>
  <br/>
  <router-link :to="'loginadministrator'">Login Administrator Tenant</router-link>
  <br/>
  <router-link :to="'loginpersonnel'">Login Personnel</router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to TaskForce'
    }
  }
}
</script>

<style lang="scss">
  .hello {
    padding:2rem 2rem;
    h1 {
      color:purple;
    }
    h2 {
      margin:2rem 0;
      color:darkgreen;
    }
    p {
      color:darkblue;
    }
  }
</style>