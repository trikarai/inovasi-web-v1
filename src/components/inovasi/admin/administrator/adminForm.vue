<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
            </slot>
          </div>
          <div class="modal-body">
            <div class="ui form">                
                <div class="field">  
                  <h2 v-if="!edit">Add Admin</h2>
                  <h2 v-if="edit">Edit Admin</h2>
                  <div class="garis"></div>
                    <div>
                      <form>
                        <div class="row">
                          <div class="col-md-4">
                            <label style="padding: 6px">Name</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" style="width: 100%" type="text" v-model="data.name" maxlength="100">
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label style="padding: 6px">Username</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" style="width: 100%" type="text" v-model="data.username" maxlength="100">
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label style="padding: 6px">Password</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" style="width: 100%" type="password" v-model="data.password" maxlength="100">
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label style="padding: 6px">Email</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" style="width: 100%" type="password" v-model="data.email" maxlength="100">
                          </div>
                        </div>
                        
                      </form>
                      <hr>
                    </div>
                  </div>
                  
                  <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                  <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                  <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  
                </div> 
            
          </div>
           </div>               
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    
  </transition>
</template>

<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '../../errorflash'
  
  export default {
    props: ['adminId', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          name:'',
          username:'',
          password: '',
          email:''
          }
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit admin data')
          this.getAdmin(this.adminId)
        } else {
          console.log('new admin data')
        }
      },
      getAdmin: function (adminId) {
        auth.getData(this, '/administrator/' + adminId)
      },
      submit: function () {
        auth.postData(this, '/administrator', this.data)
      },
      update: function () {
        auth.putData(this, '/administrator/'+ this.adminId, this.data)
      }
    }
  }
</script>  
<style lang="css" scoped>
  .kotak {
        border: 2px solid lightsteelblue;
    }
@import '../modal.css';
</style>