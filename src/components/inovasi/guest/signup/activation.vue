<template>
  <div class="backg">
  <loading v-show="loading"></loading>
  <section class="content">
      
        <error-flash v-bind:error="error" v-bind:err_msg="err_msg"/>
  
        <div v-show="success">
          <div id="wrapcontain">
             <div id="success-box">
                <div class="dot"></div>
                <div class="dot two"></div>
                <div class="face">
                  <i class="fa fa-check mailpos2"></i>
                </div>
                
                <div class="shadow scale"></div>
                <div class="message"><sc class="alertinfo">Activated!</sc><h4 style="color: #565656;font-size:12px">Your account has been activated, please login</h4></div>
                <router-link :to="'/login'">
                  <button class="button-box"><sc class="green">login</sc></button>
                </router-link>
              </div>
        </div>
        </div>
    
        <div v-show="error">
          <div id="wrapcontain">
             <div id="error-box">
                <div class="dot"></div>
                <div class="dot two"></div>
                <div class="face">
                  <i class="fa fa-times mailpos2"></i>
                </div>
                
                <div class="shadow scale"></div>
                <div class="message"><sc class="alertinfo">Error!</sc><h4 style="color: #565656;font-size:12px">oh no, something went wrong.</h4></div>
                <router-link :to="'/resend-activation'">
                    <button class="button-box"><sc class="green">Resend Activation Link</sc></button>
                </router-link>
              </div>
        </div>
          
        </div>  
    
    
  </section>
    </div>
</template>

<script>
import * as CONFIG from '@/app.config.js'
import alertControl from '@/alertcontrol'
import auth from '@/httpcontrol'
import ErrorFlash from '../../errorflash'
import Loading from '@/components/loading'

export default {
    name: 'Activation',
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading
    },
    data: function () {
      return {
        email: this.$route.query.email,
        token: this.$route.query.token,
        data: '',
        err_msg: '',
        success: false,
        error: false,
        loading : false
      }
    },
    created: function () {
      this.sendActivation()
    },
    methods: {
      sendActivation: function(){
        this.loading = true
        auth.putData2(this, '/activate-account?email='+this.email+ '&token=' + this.token )
                .then(res=>{
                  console.log(res)
                  this.success = true
                  this.loading = false
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      }
    }
}

</script>

<style scoped>
.mailpos {
    position: absolute;
    left: 23px;
    top: 19px;
    font-size: 38px;
}
.mailpos2 {
    position: absolute;
    left: 26px;
    top: 20px;
    font-size: 38px;
}
.alertinfo {
    font-weight: 700;
    letter-spacing: 5px;
    font-size: 21px;
}
a {
  color: #aaaaaa;
  transition: all ease-in-out 200ms;
}
a:hover {
  color: #333333;
  text-decoration: none;
}
/*=== 4. Main Form ===*/
.login-form-1 {
  max-width: 300px;
  border-radius: 5px;
    margin: 0 auto;
/*  display: inline-block;*/
  width: 70%;
}
.main-login-form {
  position: relative;
}
.login-form-1 .form-control {
  border: 0;
  box-shadow: 0 0 0;
  border-radius: 0;
  background: transparent;
  color: #555555;
  padding: 7px 0;
  font-weight: bold;
  height:auto;
}
.login-form-1 .form-control::-webkit-input-placeholder {
  color: #999999;
}
.login-form-1 .form-control:-moz-placeholder,
.login-form-1 .form-control::-moz-placeholder,
.login-form-1 .form-control:-ms-input-placeholder {
  color: #999999;
}
.login-form-1 .form-group {
  margin-bottom: 0;
  border-bottom: 2px solid #efefef;
  padding-right: 20px;
  position: relative;
}
.login-form-1 .form-group:last-child {
  border-bottom: 0;
}
.login-group {
  background: #ffffff;
  color: #999999;
  border-radius: 8px;
  padding: 10px 20px;
}
.login-group-checkbox {
  padding: 5px 0;
}
/*=== 5. Login Button ===*/
.login-form-1 .login-button {
  position: absolute;
  right: -25px;
  top: 50%;
  background: #ffffff;
  color: #999999;
  padding: 11px 0;
  width: 50px;
  height: 50px;
  margin-top: -25px;
  border: 5px solid #efefef;
  border-radius: 50%;
  transition: all ease-in-out 500ms;
}
.login-form-1 .login-button:hover {
  color: #555555;
  transform: rotate(450deg);
}
.login-form-1 .login-button.clicked {
  color: #555555;
}
.login-form-1 .login-button.clicked:hover {
  transform: none;
}
.login-form-1 .login-button.clicked.success {
  color: #2ecc71;
}
.login-form-1 .login-button.clicked.error {
  color: #e74c3c;
}
/*=== 6. Form Invalid ===*/
label.form-invalid {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 5;
  display: block;
  margin-top: -25px;
  padding: 7px 9px;
  background: #777777;
  color: #ffffff;
  border-radius: 5px;
  font-weight: bold;
  font-size: 11px;
}
label.form-invalid:after {
  top: 100%;
  right: 10px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: transparent;
  border-top-color: #777777;
  border-width: 6px;
}
    
@import '/css/loginadmin.css';
@import '/css/notif.css';
</style>