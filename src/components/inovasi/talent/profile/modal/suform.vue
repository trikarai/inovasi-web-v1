<template>

  <transition name="modal">
    

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">
              
             <notifications group="passsignup" position="top center" />

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

            </slot>
          </div>
          <div class="modal-body">

            <div class="ui form">                
              <div class="field">  
                  <h2 v-if="!editPassword">Edit Profile</h2>
                  <h2 v-else>Edit Password</h2>
                  <div class="garis"></div>
                <div v-if="!editPassword">
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                          <label style="padding: 6px;">Username</label>
                      </div>
                      <div class="col-md-6">
                        <div style="padding: 6px;">{{data.username}}</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px;">Name</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.name">
                      </div>
                    </div>
                    <template v-if="!editProfile">
                      <div class="col-md-4">
                        <label style="padding: 6px;">Password</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="password" v-model="data.password">
                      </div>
                    </template>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px;">Phone</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.phone">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px;">Email</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.email">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4"> 
                        <label style="padding: 6px;">Birthdate</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="date" v-model="data.birth_date">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4"> 
                        <label style="padding: 6px;">Gender</label>
                      </div>
                      <div class="col-md-6"> 
                        <select class="kotak" v-model="data.gender">
                          <option disabled value="">Please Select</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px;">City of Origin</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.city_of_origin">
                      </div>
                    </div>
                  </form>
                  
                </div>

                <div v-if="!editProfile">
                  <div class="row">
                    <div class="col-md-4">
                      <label style="padding: 6px;">Old Password</label>
                    </div>
                    <div class="col-md-6">
                      <input class="kotak" type="password" v-model="dataPassword.previous_password">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <label style="padding: 6px;">New Password</label>
                    </div>
                    <div class="col-md-6">
                      <input class="kotak" type="password" v-model="dataPassword.new_password">
                    </div>
                  </div>
                  
                </div>
                

                <div style="margin-top: 20px;" v-show="!onSubmit">
                  <button class="btn btn-default" @click.prevent="editProfileAct('Profile')" v-if="editProfile">Update</button>
                  <button class="btn btn-default" @click.prevent="editPasswordAct('Password')" v-if="editPassword">Update Password </button>
                  <button class="btn btn-danger" @click="$emit('close')">
                    Cancel
                  </button>
<!--                  <button class="btn btn-danger" @click="test('podol apu')">
                    Test
                  </button>-->
                </div>
                <onsub v-show="onSubmit"></onsub>
                

              </div>      
            </div>               
          </div>
          <!--
                  <div class="modal-footer">
                    <slot name="footer">
                    </slot>
                  </div>
          -->
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '../../../errorflash'
  import alertControl from '@/alertcontrol'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['edit', 'editProfile', 'editPassword'],
    components: {
      'error-flash': ErrorFlash,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          name: '',
          email: '',
          phone: '',
          city_of_origin : '',
          birth_date : '',
          gender : ''
        },
        dataPassword: {
          previous_password : '',
          new_password : ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
          this.getSU(this.editProfile, this.editPassword)
      },
      getSU: function (profile, password) {
        if (profile) {
          this.data.username = auth.getAuthData().username
          this.data.name = auth.getAuthData().name
          this.data.email = auth.getAuthData().email
          this.data.phone = auth.getAuthData().phone
          this.data.gender = auth.getAuthData().gender
          this.data.birth_date = auth.getAuthData().birth_date
          this.data.city_of_origin = auth.getAuthData().city_of_origin
        }
      },
      editProfileAct: function (act) {
        this.onSubmit = true
        auth.putData2(this, '/talent/update_profile', this.data)
                .then(res => {
                  console.log(res)
                  localStorage.setItem('access_data', JSON.stringify(this.data))
                  this.onSubmit = false
                  this.$emit('closeModalRefresh', act)
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      editPasswordAct: function (act) {
        if(this.dataPassword.previous_password === '') {
                      this.$notify({
                          group: 'passsignup',
                          title: 'Password Empty',
                          text: 'Previous Password must not empty',
                          type: 'warn'
                        });
        }else if(this.dataPassword.new_password === ''){
                      this.$notify({
                          group: 'passsignup',
                          title: 'Password Empty',
                          text: 'New Password must not empty',
                          type: 'warn'
                        });
        }else if(this.dataPassword.new_password.length < 8) {
              this.$notify({
                  group: 'passsignup',
                  title: 'Password length',
                  text: 'New Password must be 8 character at least',
                  type: 'warn'
                });
         }else if(this.dataPassword.new_password.search(/[a-zA-Z]/) === -1 || this.dataPassword.new_password.search(/\d/) === -1) {
              this.$notify({
                  group: 'passsignup',
                  title: 'Password',
                  text: 'Password must be alphanumeric, with 1 alphabet and 1 numerical',
                  type: 'warn'
                });
         }else{
            auth.putData2(this, '/talent/change_password', this.dataPassword)
                    .then(res => {
                      console.log(res)
                      this.onSubmit = false
                      this.$emit('closeModalRefresh', act)
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
        }
      },
      test: function (act){
        this.$emit('closeModalRefresh', act)
      }
    }
  }
</script>  
<style lang="css" scoped>
    .garis {
        display: block;
        width: 45px;
        height: 5px;
        background: #8bc751;
        margin-bottom: 20px;
    }
@import './modal.css';
</style>