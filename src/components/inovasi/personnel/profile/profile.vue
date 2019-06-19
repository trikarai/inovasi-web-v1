<template>
  <div>
    
    <loading v-show="loading"></loading>
    
    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <!-- srart profile-->
      <div class="box">
       <div class="box-body">
          
          <div class="tab-pane" id="settings">
                        <div class="row">
                                <div style="background: #8bc751;color: #fff;padding: 20px;border-left: #7dff00;border-left-style: solid;">
                                    <span style="font-size:25px;">
                                        {{data.name}}
                                    </span>
                                    <span style="float: right;position: relative;top: 8px;">
                                        <a style="color:#fff;cursor: pointer" @click="changeProfile()" class="ui button"><span class="glyphicon glyphicon-pencil"></span> Edit Profile</a> | 
                                        <a style="color:#fff;cursor: pointer" @click="changePassword()" class="ui button"><span class="glyphicon glyphicon-lock"></span> Change Password</a>
                                    </span>
                                </div>
                                
                        </div>
                        <div style="padding:20px;padding-top:35px;">
                        <div class="row">
                            <label class="col-sm-4 control-label">Username</label>

                            <div class="col-sm-8">
                                <div>{{data.username}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-4 control-label">Email</label>

                            <div class="col-sm-8">
                                <div>{{data.email}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-4 control-label">Short Bio</label>

                            <div class="col-sm-8">
                                <div>{{data.short_bio}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-4 control-label">Media Communication</label>

                            <div class="col-sm-8">
                                <div>{{data.communication_channel}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-4 control-label">Linkedln</label>

                            <div class="col-sm-8">
                                <div>{{data.linkedIn_url}}</div>
                            </div>
                        </div>
                      </div>
                    </div>

          <div class="visible-xs">
            <a @click="changeProfile()" class="ui button"><span class="glyphicon glyphicon-pencil"></span> Change Profile</a>
            <br/>
            <a @click="changePassword()" class="ui button"><span class="glyphicon glyphicon-lock"></span> Change Password</a>
          </div>

        </div>
      </div>
      <!-- end profile-->
            
    </section>

    <su-form v-bind:editProfile="editProfile" v-bind:editPassword="editPassword" v-if="showModal" @close="showModal = false" @closeModalRefresh="closeModalRefresh()">
    </su-form>
    

  </div>
</template>
<script>
  import auth from '@/httpcontrol'
  import Loading from '@/components/loading'
  import ErrorFlash from '../../errorflash'
  import SUForm from './modal/suform'

  export default {
    data: function () {
      return {
        data: null,
        err_msg: '',
        success: false,
        error: false,
        edit: false,
        editProfile: false,
        editPassword: false,
        showModal: false,
        loading : false,
        load : false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'su-form': SUForm
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        this.data = auth.getAuthData()
        if(this.data != null){
          this.loadprofile()
        }else{
          this.loadprofile()
        }
      },
      getDataAgain: function () {
        this.data = auth.getAuthData()
      },
      changeProfile: function () {
        this.edit = true
        this.showModal = true
        this.editProfile = true
        this.editPassword = false
      },
      changePassword: function () {
        this.edit = true
        this.showModal = true
        this.editProfile = false
        this.editPassword = true
      },
      closeModalRefresh: function () {
        this.showModal = false
        this.edit = false
        this.editProfile = false
        this.editPassword = false
        this.getDataAgain()
      }
    }
  }
</script>
