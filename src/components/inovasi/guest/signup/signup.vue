<template>
<div class="backg" > 
  <div class="contain">
    
    <loading v-show="loading"></loading>
    
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
      
    <div style="margin-top:65px" class="card">
        <error-flash class="alertloginsu" v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
        <h1 class="title">Daftar</h1>
            <div class="input-contain dilomal">
                MIKTI - Start
            </div>
<!--
            <div class="input-contain" style="color:#adadad;font-size:12px;"> 
                <b>Technical problem contact : support@bekup.web.id</b></br>
                <a href="https://wa.me/6281319420262" target="_blank"><i class="fa fa-whatsapp "> Chat Technical Support (081319420262) </i></a>
                </br>
                <a href="https://wa.me/628988256662" target="_blank"><i class="fa fa-whatsapp "> Chat PR Bekup (08988256662) </i></a>
                </br>    
                <span style="color: red;font-size: 11px;margin-top: 5px;position: relative;top: 12px;">* Aktifasi akun anda via email setelah berhasil melakukan registrasi (cek SPAM folder)</span>
            </div>

            <router-link style="text-decoration: none !important" to="/dilosignup">
                <div class="input-contain dilorg">
                    <i class="fa fa-pencil-square"></i> Click here for <b>DILo member</b> registration
                </div>
            </router-link>
-->
        
        <div class="input-contain">
          <input type="text" v-model="signup.username" required="required" autocomplete="off">
          <label><i style="color:#96cc62" class="fa fa-user-circle"></i> Username</label>
          <div class="bar"></div>
        </div>

        
        <div class="input-contain">
            <div class="row" style="margin-left:0px">
              <div style="display: -webkit-inline-box">
                  <input type="password" v-model="signup.password " required="required" autocomplete="off">
                    <label><i style="color:#96cc62" class="fa fa-key"></i> Password </label><div class=""  style="font-size: 18px;margin-top: 19px;"><a href="#" data-toggle="tooltip" data-placement="right" title="Password merupakan gabungan huruf dan angka dengan minimal 8 karakter"><i class="fa fa-info-circle"></i></a></div>
              </div>
<!--              <div class=""  style="font-size: 18px;margin-top: 19px;"><a href="#" data-toggle="tooltip" data-placement="right" title="Password must alphanumeric and 8 character minimum"><i class="fa fa-question-circle"></i></a></div>-->
            </div>
          <div class="bar"></div>
          
        </div>

        <div class="input-contain">
          <input type="password" v-model="signup.cpassword " required="required">
          <label><i style="color:#96cc62" class="fa fa-key"></i> Konfirmasi Password</label>
          <div class="bar"></div>
        </div>

        <div class="input-contain">
          <label style="line-height: 5px;"><i style="color:#96cc62" class="fa fa-globe"></i> Wilayah</label>
          <select style="margin-top: 30px;width: 100%;padding: 8px;border-color: #e0e0e0;" v-model="signup.region_id"> 
            <option disabled value="">Pilih Wilayah</option>
            <option v-for="region in data.list" :value="region.id">{{region.name}}</option>
          </select>

<!--          <label style="line-height: 5px;"><i style="color:#96cc62" class="fa fa-globe"></i> Region</label>
          <select style="margin-top: 30px;width: 100%;padding: 8px;border-color: #e0e0e0;" v-model="signup.region_id"> 
            <option disabled value="">Select Region</option>
            <option value="e70a7ef7-434a-4404-bd83-fd2137ec5398">Semarang</option>
            <option value="ff147a73-1371-4b66-94a5-350938020590">Bandung</option>
            <option value="0aaee019-f5ae-4f77-a85d-8efdd3f2046c">Yogyakarta</option>
            <option value="1dff57b1-1d80-4077-9e19-18daf4d5e053">Malang</option>
            <option value="cb8fdcd9-85b2-4cf7-b041-02040613d3fc">Makassar</option>
            <option value="af7f93da-6a40-488c-99d6-71e998a6f27d">Medan</option>
            <option value="58aa7b0f-8629-4121-8442-cbb14ce58ad2">Padang</option>
            <option value="a55de498-35ba-4399-9878-286e2ef99175">Balikpapan</option>
            <option value="02dcf713-1959-4eaa-88b1-1f080dbc33dc">Tangerang</option>
            <option value="a78d3dc5-d482-49a0-9c79-b2d10e9b754e">Denpasar</option>
          </select>-->

          
        </div>

        <div class="input-contain">
          <input type="text" v-model="signup.name" required="required">
          <label><i style="color:#96cc62" class="fa fa-user"></i> Nama</label>
          <div class="bar"></div>
        </div>

        <div class="input-contain">
          <div class="row" style="margin-left:0px">
              <div style="display: -webkit-inline-box">
          <input type="text" v-model="signup.email" required="required">
          <label><i style="color:#96cc62" class="fa fa-envelope"></i> Email</label><div class=""  style="font-size: 18px;margin-top: 19px;"><a href="#" data-toggle="tooltip" data-placement="right" title="Masukan email yang valid untuk verifikasi"><i class="fa fa-info-circle"></i></a></div>
              </div>
              </div>
          <div class="bar"></div>
        </div>

        <div class="input-contain">
          <input type="text" v-model="signup.phone" required="required">
          <label><i style="color:#96cc62" class="fa fa-phone"></i>Telepon (08xxx)</label>
          <div class="bar"></div>
        </div>
        <div class="input-contain">
          <input type="text" v-model="signup.city_of_origin" required="required">
          <label><i style="color:#96cc62" class="fa fa-building"></i> Kota Asal</label>
          <div class="bar"></div>
        </div>
        
        <div class="input-contain">
          <label style="line-height: 0px;"><i style="color:#96cc62" class="fa fa-birthday-cake"></i> Tanggal Lahir</label>
          <input type="date" style="margin-top:20px;" v-model="signup.birthdate" required="required">
        </div>

        <div class="input-contain">
          <label style="line-height: 0px"><i style="color:#96cc62" class="fa fa-transgender"></i> Jenis Kelamin</label>
          
          <select style="margin: 0 0 0 0;margin-top: 35px;width: 100%;padding: 8px;border-color: #e0e0e0;" class="input-contain" v-model="signup.gender">
            <option disabled value="">Pilih Jenis Kelamin</option>
            <option value="M">Laki-laki</option>
            <option value="F">Perempuan</option>
          </select>

          
        </div>
        
<!--
        <div class="input-contain">
            <vue-recaptcha
              ref="recaptcha"
              @verify="onVerify"
              @expired="onExpired"
              v-bind:sitekey="sitekey">
            </vue-recaptcha>
            <button @click="resetRecaptcha"> Reset ReCAPTCHA </button>
          </div>
-->
<!--
          <div class="input-contain">
            <h3> Bind ReCAPTCHA to button </h3>
            <vue-recaptcha
              @verify="onVerify"
              @expired="onExpired"
              v-bind:sitekey="sitekey">
              <button>Click me</button>
            </vue-recaptcha>
          </div>
-->

        <div class="button-contain">
           <vue-recaptcha
              @verify="onVerify"
              @expired="onExpired"
              v-bind:sitekey="sitekey">
              <button @click="submit"><span>Daftar</span></button> 
           </vue-recaptcha>
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
import * as CONFIG from '@/app.config.js'
import alertControl from '@/alertcontrol'
import auth from '@/httpcontrol'
import ErrorFlash from '../../errorflash'
import VueRouter from 'vue-router'
import Loading from '@/components/loading'
import VueRecaptcha from 'vue-recaptcha';

export default {
//    template:require('./signup.html'),
    name: 'SignUp',
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'vue-recaptcha': VueRecaptcha
    },
    data: function () {
      return {
        data: '',
//     recaptcha v2
//        sitekey: '6LcSDRkUAAAAAJ5kyOhvg4fxtbakNk90zXx5cWCf',
//     invicible captcha
        sitekey: '6Ld47ZMUAAAAAM26YnKZuHXc6jfWKnM6xRW2eY4b',
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
          email: '',
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
        onSubmit: function () {
          this.$refs.invisibleRecaptcha.execute()
        },
        onVerify: function (response) {
          console.log('Verify: ' + response)
        },
        onExpired: function () {
          console.log('Expired')
        },
        resetRecaptcha () {
          this.$refs.recaptcha.reset() // Direct call reset method
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
        }else if(this.signup.password.length < 8) {
              this.$notify({
                  group: 'passsignup',
                  title: 'Password length',
                  text: 'password harus lebih dari 8 karakter',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.password !== this.signup.cpassword) {
              this.$notify({
                  group: 'passsignup',
                  title: 'Password',
                  text: 'password tidak cocok',
                  type: 'warn'
                });
              this.checkForm()
         }else if(this.signup.password.search(/[a-zA-Z]/) === -1 || this.signup.password.search(/\d/) === -1) {
              this.$notify({
                  group: 'passsignup',
                  title: 'Password',
                  text: 'password harus alphanumeric, minimal 1 alphabet dan 1 numeric',
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
         }else if(this.signup.email === '') {
              this.$notify({
                  group: 'emsignup',
                  title: 'email kosong',
                  text: 'Mohon untuk mengisi email',
                  type: 'warn'
                });
              this.checkForm()
         }else if(!this.validEmail(this.signup.email)) {
              this.$notify({
                  group: 'emsignup',
                  title: 'email',
                  text: 'Gunakan format email yang benar',
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
            auth.postData2(this, '/signup', this.signup)
                    .then(res => {
                      console.log(res)
                      this.loading = false
                      this.$router.push({path: '/login', query: {activate: true}})
                    }, error => {
                      console.log(error)
//                      alertControl.showError(this,error.body.meta)
                      this.loading = false
                      this.$notify({
                          group: 'passsignup',
                          title: 'ERROR',
                          text: error.body.meta.error_details[0] + ', try sign-up using DILo Member Registration Form',
                          type: 'error'
                        });
                    })
        }
      },
      test: function () {
        this.$router.push({path: '/login', query: {activate: true}})
      },
      getRegion(){
        this.loading = true
        auth.getData2(this, '/region')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
          this.loading = false
        }).then(data => {
          this.data = data.data
          this.loading = false
        })
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
        } else if(this.signup.password.length < 8){
          this.errors.push("Password must be 8 digit password with at least 1 alphabet and 1 number")
        } else if(this.signup.password !== this.signup.cpassword){
          this.errors.push("Password didn't match")
        } else if(this.signup.password.search(/[a-zA-Z]/) === -1 || this.signup.password.search(/\d/) === -1){
          this.errors.push("Password must be with at least 1 alphabet and 1 number")  
        }        
        if(!this.signup.email) {
          this.errors.push("Email required.")
        } else if(!this.validEmail(this.signup.email)) {
          this.errors.push("Valid email required.");       
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
    @import '/css/loginadmin.css';
    @import './signup.scss';
    
    .dilorg {
            background: #e7543b;
            color: #fff;
            padding: 10px;
            text-align: center;
            cursor: pointer;
    }
    .dilomal {
        background: #8bc751;
        color: #fff;
        display: -webkit-inline-box;
        padding: 2px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        margin-bottom: 0px !important;
        position: relative;
        bottom: 32px;
        right: 4px;
        font-size: 12px;
    }
    .alertloginsu {
/*        background: #f95b5b;*/
/*        color: #fff;*/
/*        padding: 16px;*/
/*        border-left-style: solid;*/
/*        border-left-color: #ea2121;*/
/*        width: 460px;*/
        margin: 0 auto;
/*        margin-bottom: 20px;*/
/*        text-align: center;*/
/*        border-left-width: 4px;*/
        position: fixed;
        z-index: 200;
    }    
</style>

<!--<style src="../loginadmin.css" scoped></style>-->