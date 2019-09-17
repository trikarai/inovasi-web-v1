<template>
  <div class="backg" style="position: fixed">
        <loading v-show="loading"></loading>

    <div style="margin-top:65px"> 

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <div class="contain"  v-bind:class="{ active: isActive }">
        <div class="card"></div>
        <div class="card">

          <notifications group="first" position="top center" />
          <notifications group="second" position="top center" />
          <div>
            <h3 style="text-align: -webkit-center;color: #cecece;font-weight: 100;">MIKTI - <b>Start</b></h3>
          </div>
          <div>
            <h1 class="title">Login</h1>
            <div class="input-contain">
              <input
                id="usrnmp"
                type="text"
                v-model="credential.username"
                required="required"
                v-on:keyup.enter="nextClick()">
              <label>Username</label>
              <div class="bar"></div>
            </div>
          </div>

          <div class="footer">
             <h4>Personnel Area</h4>
             <span ><a href="/v2">Try &beta; BETA</a></span>
          </div>
        </div>
        <div class="card alt">
          <div class="toggle" v-on:click="nextClick()"></div>
          <h3 class="title">last step
            <div class="close" v-on:click="isActive = !isActive"></div>
          </h3>
          <div class="input-contain">
            <input
              type="password"
              v-model="credential.password"
              required="required"
              v-on:keyup.enter="submit()">
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
  import onSubmit from '@/components/onsubmit'
  import Loading from '@/components/loading'

  export default {
    data: function () {
      return {
        credential: {
          username: '',
          password: ''
        },
        error: false,
        user: '',
        isActive: false,
        success: false,
        err_msg: '',
        loading : false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,      
      'onsub' : onSubmit
    },
    methods: {
      nextClick : function () {
          if(this.credential.username === '') {
              this.$notify({
                  group: 'first',
                  title: 'Username kosong',
                  text: 'Mohon untuk mengisi username untuk melanjutkan ke tahap berikutnya',
                  type: 'warn'
                });
              this.isActive = false 
          }else {
            this.isActive = true
            $('#usrnmp').blur()
          }
      },
      submit: function () {
        var credentials = {
          username: this.credential.username,
          password: this.credential.password
        };
        if(this.credential.password === '') {
              this.$notify({
                  group: 'second',
                  title: 'Password kosong',
                  text: 'Mohon untuk mengisi password untuk login',
                  type: 'warn'
                });
              this.isActive = true 
          }else {
            httpcontrol.login(this, '/login/personnel',  credentials, 'Personnel')
          }
      }
    }
  }
</script>

<style scoped>    
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}
.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
    @import '/css/loginadmin.css';
    @import 'https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900|RobotoDraft:400,100,300,500,700,900';
    @import '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';
/*    @import '/css/bootstrap.min.css';*/
</style>