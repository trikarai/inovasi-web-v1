<template>
   <div class="backg" style="position:fixed !important">
     
             <loading v-show="loading"></loading>

     <div style="margin-top:65px"> 
        <div class="contain"  v-bind:class="{ active: isActive }">
              <div class="card"></div>
              <div class="card" style="height: 350px;">
                <h1 class="title">Login</h1>
                
                <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                
                <div class="alert alert-danger" v-if="error">
                    <p>{{ error }}</p>
                </div>
                  
                  <div class="input-contain">
                    <input
                          type="text"
                          v-model="credential.username"
                          required="required"
                          v-on:keyup.enter="isActive = !isActive">
                    <label>Username</label>
                    <div class="bar"></div>
                  </div>
                  
                  <div class="footer"><a href="#">Administrator Area</a></div>
              </div>
              <div class="card alt">
                <div class="toggle" v-on:click="isActive = !isActive"></div>
                <h3 class="title">last step
                  <div class="close" v-on:click="isActive = !isActive"></div>
                </h3>
                  <div class="alert alert-danger" v-if="error">
                    <p>{{ error }}</p>
                 </div>
                  <div class="input-contain">
                    <input
                          type="password"
                          v-model="credential.password"
                          required="required"
                          v-on:keyup.enter="submit">
                    <label>Password</label>
                    <div class="bar"></div>
                  </div>
                  <div class="button-contain">
                    <button @click="submit()"><span>submit</span></button>
                  </div>
                  
              </div>
        </div>

       </div>
      
   </div>
  </template>

<script>
  import httpcontrol from '@/httpcontrol'
  import ErrorFlash from '../../errorflash'
  import Loading from '@/components/loading'

  export default {
    data: function () {
      return {
        credential: {
          username: '',
          password: ''
        },
        error: '',
        user: '',
        isActive: false,
        loading : false

      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,      
    },
    methods: {
      submit: function () {
        var credentials = {
          username: this.credential.username,
          password: this.credential.password
        }
        httpcontrol.login(this, '/login/administrator',  credentials, 'Admin')
      }
    }
  }
</script>

<style scoped>

    @import '/css/loginadmin.css';
    @import '//fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900|RobotoDraft:400,100,300,500,700,900';
    @import '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';
/*    @import '/css/bootstrap.min.css';*/
    
</style>