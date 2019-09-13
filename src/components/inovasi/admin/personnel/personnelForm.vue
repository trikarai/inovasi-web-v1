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
                  
                    <div>
                      <form>
                        <label>Name</label>
                        <input class="form-control" type="text" v-model="data.name">
                        <label>Username</label>
                          <input class="form-control" type="text" v-model="data.username">
                        <label>Password</label>
                          <input class="form-control" type="text" v-model="data.password">
<!--                        <label>Confirm Password</label>
                          <input type="text" v-model="data.cpassword">-->
                        <label>Email</label>
                          <input class="form-control" type="text" v-model="data.email">
                          
                          <div class="input-contain">
                            <label style="line-height: 5px;"><i style="color:#96cc62" class="fa fa-globe"></i> Region</label>
                            <select style="margin-top: 30px;width: 100%;padding: 8px;border-color: #e0e0e0;" v-model="data.region_id"> 
                              <option disabled value="">Select Region</option>
                              <option v-for="region in region.list" :value="region.id">{{region.name}}</option>
                            </select>  
                          </div>  

                        <label>Short Bio</label>
                        <textarea class="form-control" type="text" v-model="data.short_bio"></textarea>
                        <label>Communication Channel</label>
                        <textarea class="form-control" type="text" v-model="data.communication_channel" placeholder="separate with comma"></textarea>
                        <label>LinkedIn URL</label>
                        <input class="form-control" type="text" v-model="data.linkedIn_url" placeholder="https://www.linkedin.com/in/soeharto-700287181/">
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
    props: ['personnelId', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        show: false,
        region : {total:0, list:[]},
        err_msg: '',
        error: false,
        success: false,
        data: {
          name:'',
          username:'',
          password: '',
          email:'',
          short_bio: '',
          linkedIn_url:'',
          communication_channel:'',
          region_id:''
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
          this.getAdmin(this.personnelId)
        } else {
          console.log('new admin data')
          this.getRegion()
        }
      },
      getAdmin: function (personnelId) {
        auth.getData(this, '/personnel/' + personnelId)
      },
      submit: function () {
        auth.postData(this, '/personnel', this.data)
      },
      update: function () {
        auth.putData(this, '/personnel'+ this.data)
      },
      getRegion(){
        auth.getData2(this, '/region')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
        }).then(data => {
          this.region = data.data
        })
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';
</style>