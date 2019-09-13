<template>
    
  <transition name="modal">
 

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
              <notifications group="passsignup" position="top center" />
            </slot>
          </div>
          <div class="modal-body">

            <div class="ui form">                
              <div class="field">  

                <div v-if="!editPassword">
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                          <label>Username</label>
                      </div>
                      <div class="col-md-6">
                        <p>{{data.username}}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Name</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.name">
                      </div>
                    </div>
                    <template v-if="!editProfile">
                      <div class="col-md-4">
                        <label>Password</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="password" v-model="data.password">
                      </div>
                    </template>
          
                    <div class="row">
                      <div class="col-md-4">
                        <label>Email</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.email">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Short Bio</label>
                      </div>
                      <div class="col-md-6">
                        <textarea style="border: 2px solid #eaeaea;" class="form-control" type="text" v-model="data.short_bio"></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Communication Channel</label>
                      </div>
                      <div style="margin-top: 5px;" class="col-md-6">
                        <textarea style="border: 2px solid #eaeaea;" class="form-control" type="text" v-model="data.communication_channel" placeholder="separate with comma"></textarea>
                      </div>
                    </div>
                    <div style="margin-top: 5px;" class="row">
                      <div class="col-md-4">
                        <label>LinkedIn URL</label>
                      </div>
                      <div class="col-md-6">
                        <input style="border: 2px solid #eaeaea;" class="form-control" type="text" v-model="data.linkedIn_url" placeholder="https://www.linkedin.com/in/soeharto-700287181/">
                      </div>
                    </div>

                  </form>
                  
                </div>

                <div v-if="!editProfile">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Old Password</label>
                    </div>
                    <div class="col-md-6">
                      <input class="kotak" type="password" v-model="dataPassword.previous_password">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <label>New Password</label>
                    </div>
                    <div class="col-md-6">
                      <input class="kotak" type="password" v-model="dataPassword.new_password">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <label>Retype New Password</label>
                    </div>
                    <div class="col-md-6">
                      <input class="kotak" type="password" v-model="rnew_password">
                    </div>
                  </div>
                 
                </div>
                

                <div style="margin-top: 30px" v-show="!onSubmit">
                  <button class="btn btn-default" @click.prevent="editProfileAct" v-if="editProfile">Update Profile</button>
                  <button class="btn btn-default" @click.prevent="editPasswordAct" v-if="editPassword">Update Password </button>
                  <button class="btn btn-danger" @click="$emit('close')">
                    Cancel
                  </button>
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
          communication_channel: '',
          short_bio: '',
          linkedIn_url: ''
        },
        dataPassword: {
          previous_password : '',
          new_password : ''
        },
        onSubmit : false,
        rnew_password : ''
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
          this.data.short_bio = auth.getAuthData().short_bio
          this.data.communication_channel = auth.getAuthData().communication_channel
          this.data.linkedIn_url = auth.getAuthData().linkedIn_url
        }
      },
      editProfileAct: function () {
        this.onSubmit = true
        auth.putData2(this, '/personnel/update_profile', this.data)
                .then(res => {
                  console.log(res)
                  localStorage.setItem('access_data', JSON.stringify(this.data))
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      editPasswordAct: function () {
          if(this.dataPassword.previous_password === '') {
              this.$notify({
                  group: 'passsignup',
                  title: 'Empty Password',
                  text: 'Password empty',
                  type: 'warn'
                });
            } else if(this.dataPassword.new_password === '') {
              this.$notify({
                  group: 'passsignup',
                  title: 'Empty Password',
                  text: 'Password empty',
                  type: 'warn'
                });
            }else if(this.dataPassword.new_password.length < 8) {
                  this.$notify({
                      group: 'passsignup',
                      title: 'Password length',
                      text: 'Passwords must be at least 8 characters long',
                      type: 'warn'
                    });
             }else if(this.dataPassword.new_password !== this.rnew_password) {
                  this.$notify({
                      group: 'passsignup',
                      title: 'Password ',
                      text: 'password did not match',
                      type: 'warn'
                    });
             }else if(this.dataPassword.new_password.search(/[a-zA-Z]/) === -1 || this.dataPassword.new_password.search(/\d/) === -1) {
                  this.$notify({
                      group: 'passsignup',
                      title: 'Password',
                      text: 'password must be alphanumeric, minimal 1 alphabet dan 1 numeric',
                      type: 'warn'
                    });
             }else {
          auth.putData2(this, '/personnel/change_password', this.dataPassword).then(res => {
                  console.log(res)
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
        }
      }
    }
  }
</script>  
<style lang="css" scoped>
@import './modal.css';
</style>