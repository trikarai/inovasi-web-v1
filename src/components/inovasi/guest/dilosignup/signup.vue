<template>
<div class="backg"> 
  
  <loading v-show="loading"></loading>
  
  <div class="modal fade bd-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1">
    <div class="modal-dialog modal-sm">
        <div class="modal-content" style="width: 48px">
            <span class="fa fa-spinner fa-spin fa-3x"></span>
        </div>
    </div>
  </div>

  <div class="contain">

    <notifications group="unsignup" position="top center" />
    <notifications group="passsignup" position="top center" />
    <notifications group="nsignup" position="top center" />
    <notifications group="psignup" position="top center" />
    <notifications group="emsignup" position="top center" />
    <notifications group="cofsignup" position="top center" />
    <notifications group="bdsignup" position="top center" />
    <notifications group="gsignup" position="top center" />
    <notifications group="risignup" position="top center" />
                
    
<!--
    <div id="myDiv" v-show="closes" style="margin-bottom:20px;" class="errorssu notifications" v-if="errors.length">
      <div @click="close">X</div>
      <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="fault in errors">{{ fault }}</li>
    </ul>
    </div>
-->

    
    <div class="card" style="margin-top:65px">
        <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        <h1 class="title">Sign Up </h1>
        <div class="input-contain diloma">DILo Member Area</div>
        <p class="keterangan">* Gunakan username dan password yang sudah terdaftar di website DILo</p>
        <div class="input-contain">
          <input type="text" v-model="signup.username" required="required">
          <label><i style="color:#96cc62" class="fa fa-user-circle"></i> Username</label>
          <div class="bar"></div>
        </div>


        <div class="input-contain">
          <input type="password" v-model="signup.password " required="required">
          <label><i style="color:#96cc62" class="fa fa-key"></i> Password</label>
          <div class="bar"></div>
        </div>

<!--
        <div class="input-contain">
          <input type="password" v-model="signup.cpassword " required="required">
          <label><i style="color:#96cc62" class="fa fa-key"></i> Confirm Password</label>
          <div class="bar"></div>
        </div>
-->

        <div class="input-contain">
            <label style="line-height: 5px;"><i style="color:#96cc62" class="fa fa-globe"></i> Region</label>
          <select style="margin-top: 30px;width: 100%;padding: 8px;border-color: #e0e0e0;" v-model="signup.region_id"> 
            <option disabled value="">Select Region</option>
            <option v-for="region in data.list" :value="region.id">{{region.name}}</option>
          </select>

          
        </div>

        <div class="input-contain">
          <input type="text" v-model="signup.name" required="required">
          <label><i style="color:#96cc62" class="fa fa-user"></i> Name</label>
          <div class="bar"></div>
        </div>

<!--
        <div class="input-contain">
          <input type="text" v-model="signup.email" required="required">
          <label><i style="color:#96cc62" class="fa fa-envelope"></i> Email</label>
          <div class="bar"></div>
        </div>
-->

        <div class="input-contain">
          <input type="text" v-model="signup.phone" required="required">
          <label><i style="color:#96cc62" class="fa fa-phone"></i> Phone (08xxx)</label>
          <div class="bar"></div>
        </div>
        <div class="input-contain">
          <input type="text" v-model="signup.city_of_origin" required="required">
          <label><i style="color:#96cc62" class="fa fa-building"></i> City of Origin</label>
          <div class="bar"></div>
        </div>
        
        <div class="input-contain">
          <label style="line-height: 0px;"><i style="color:#96cc62" class="fa fa-birthday-cake"></i> Birthdate</label>
          <input style="margin-top:20px" type="date" v-model="signup.birthdate" required="required">
          
        </div>
        <div class="input-contain">
          <label style="line-height: 0px"><i style="color:#96cc62" class="fa fa-transgender"></i> Gender</label>
          
          <select style="margin: 0 0 0 0;margin-top: 35px;width: 100%;padding: 8px;border-color: #e0e0e0;" class="input-contain" v-model="signup.gender">
            <option disabled value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          
        </div>

        <div class="button-contain">
<!--
           <vue-recaptcha
              @verify="onVerify"
              @expired="onExpired"
              v-bind:sitekey="sitekey">
-->
              <button @click="submit"><span>Sign Up</span></button> 
<!--           </vue-recaptcha> -->
        </div>
    </div>    
    
<!--
     <div style="margin-top:20px" class="errorssu" v-if="errors.length">
      <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="fault in errors">{{ fault }}</li>
        </ul>
    </div>
-->

  </div>

</div>


</template>

<script>
//import adminService from './adminService.js';
import * as CONFIG from '@/app.config.js'
import alertControl from '@/alertcontrol'
import auth from '@/httpcontrol'
import ErrorFlash from '../../errorflash'
import VueRouter from 'vue-router';
import Loading from '@/components/loading'
//import VueRecaptcha from 'vue-recaptcha';

export default {
//    template:require('./signup.html'),
    name: 'SignUp',
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
//      'vue-recaptcha': VueRecaptcha
    },
    data: function () {
      return {
        data: '',
//     recaptcha v2
//        sitekey: '6LcSDRkUAAAAAJ5kyOhvg4fxtbakNk90zXx5cWCf',
//     invicible captcha
//        sitekey: '6Ld0e2YUAAAAAFvCqmbH47DmAWCIcoUqA08tGNcq',
        errors: [],
        err_msg: '',
        error: false,
        success: false,
        closes: false,
        loading: false,
        signup: {
          username: '',
          password: '',
          region_id: '',
          name: '',
          phone: '',
          city_of_origin: '',
          birthdate: '',
          gender: ''
        } 
      }
    },
    created: function () {
      this.getRegion()
    },
    methods: {
      close: function () {
        this.closes = false  
      },
      submit: function () {
          
          if(this.signup.username === '') {
              this.$notify({
                  group: 'unsignup',
                  title: 'username kosong',
                  text: 'Mohon untuk mengisi username',
                  type: 'warn'
                });
              this.checkForm()
              this.closes = true
        }else if(this.signup.password === '') {
              this.$notify({
                  group: 'passsignup',
                  title: 'password kosong',
                  text: 'Mohon untuk mengisi password',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.region_id === '') {
              this.$notify({
                  group: 'risignup',
                  title: 'Region kosong',
                  text: 'Mohon untuk mengisi region',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.name === '') {
              this.$notify({
                  group: 'nsignup',
                  title: 'name kosong',
                  text: 'Mohon untuk mengisi name',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.phone === '') {
              this.$notify({
                  group: 'psignup',
                  title: 'phone kosong',
                  text: 'Mohon untuk mengisi phone',
                  type: 'warn'
                });
              this.checkForm()
         }else if(!this.validPhone(this.signup.phone)) {
              this.$notify({
                  group: 'psignup',
                  title: 'phone',
                  text: 'Nomor telepon harus alphanumeric dan minimal 10 digit',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.city_of_origin === '') {
              this.$notify({
                  group: 'cofsignup',
                  title: 'City of origin kosong',
                  text: 'Mohon untuk mengisi City of origin',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.birthdate === '') {
              this.$notify({
                  group: 'bdsignup',
                  title: 'birthdate kosong',
                  text: 'Mohon untuk mengisi birthdate',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.gender === '') {
              this.$notify({
                  group: 'gsignup',
                  title: 'gender kosong',
                  text: 'Mohon untuk mengisi gender',
                  type: 'warn'
                });
              this.checkForm()
         
        } else if(this.checkForm()){
            this.loading = true
            this.$http.post(CONFIG.APIENDPOINT + '/signup/dilo_member', this.signup, {headers: auth.getAuthHeader()})
              .then(response => {
                console.log(response)
                this.loading = false
                this.$router.replace('/login')
              }, error => {
                this.loading = false
                alertControl.showError(this, error.body.meta)
              })
        }
      },
      getRegion(){
        auth.getData(this, '/region')
      },
      checkForm(e){
        this.errors = []
        if(!this.signup.username) this.errors.push("Username required.")
        if(!this.signup.name) this.errors.push("Name required.")
        if(!this.signup.phone) {
          this.errors.push("Phone required.")
        } else if (this.signup.phone.search(/\d/) === -1){
          this.errors.push("Phone must be a number only")
        }
        if(!this.signup.region_id) this.errors.push("Region Required")
        if(!this.signup.city_of_origin) this.errors.push("City of Origin required.")
        if(!this.signup.birthdate) this.errors.push("Birthdate required.")
        if(!this.signup.gender) this.errors.push("Gender required.")
        if(!this.signup.password) {
          this.errors.push("Password Required")
        }      
        if(!this.errors.length) 
          return true;
//          e.preventDefault()
      },
      validEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
      },
      validPhone(phone){
        var re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        return re.test(phone)
      }
    }      
}

</script>

<style lang='scss'>
.bd-example-modal-lg .modal-dialog{
  display: table;
  position: relative;
  margin: 0 auto;
  top: calc(50% - 24px);
}
.bd-example-modal-lg .modal-dialog .modal-content{
  background-color: transparent;
  border: none;
}
@import '/css/loginadmin.css';
@import './signup.scss';
</style>

<!--<style src="../loginadmin.css" scoped></style>-->