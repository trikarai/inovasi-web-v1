<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
          <div class="modal-body">
            <h2>Mentoring Event Detail</h2>
                <div class="garis"></div>
            
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label col-sm-4">Name :</label> 
                <div class="col-sm-8">
                  <p class="form-control-static">{{detail.name}}</p>
                </div>  
              </div>
                <div class="form-group">
                  <label class="control-label col-sm-4">Start Date :</label> 
                  <div class="col-sm-8">
                    <p class="form-control-static"> {{detail.start_date | moment("dddd, MMMM Do YYYY")}}</p>
                  </div>  
                </div>
                  <div class="form-group">
                    <label class="control-label col-sm-4">End Date :</label> 
                    <div class="col-sm-8">
                      <p class="form-control-static"> {{detail.end_date | moment("dddd, MMMM Do YYYY")}}</p>
                    </div>  
                  </div>
                    <div class="form-group">
                      <label class="control-label col-sm-4">Session Duration :</label> 
                      <div class="col-sm-8">
                        <p class="form-control-static"> {{detail.session_duration}} Minutes</p>
                      </div>  
                    </div>
                      <div class="form-group">
                        <label class="control-label col-sm-4">Max Session :</label> 
                        <div class="col-sm-8">
                          <p class="form-control-static"> {{detail.max_session}}</p>
                        </div>  
                      </div>
                        <div class="form-group">
                          <label class="control-label col-sm-4">Max Team Session :</label> 
                          <div class="col-sm-8">
                            <p class="form-control-static"> {{detail.max_team_session}}</p>
                          </div>  
                        </div>
                      </form>

            <div>
              <button style="margin-top: 20px" class="btn btn-danger" @click="$emit('close')">Close</button>
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
  import ErrorFlash from '../../../../../errorflash'
  
  export default {
    props: ['detail'],
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
        }
      }
    },
    created: function () {
    },
    methods: {  
    }
  }
</script>  
<style lang="css">
@import '../modal.css';
</style>