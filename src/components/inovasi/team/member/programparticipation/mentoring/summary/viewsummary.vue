<template>

  <transition name="modal">

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

          <div class="modal-body">
            
                  <h2>My Summary</h2>
                  <div class="garis"></div>
            
            
            <form class="form-horizontal">
              <template v-for="data in dataSummary">
                <div class="form-group">
                  <label class="control-label col-sm-2"> {{data.field_template.name}}: </label>
                  <div class="col-sm-6">
                    <p class="form-control-static">{{data.value}}</p>
                  </div>
                </div>
              </template>
              
<!--              <template>
                <div class="form-group">
                  <label class="control-label col-sm-2">
                    Rating from Participant :</label> 
                  <div class="col-sm-6">
                    <p class="form-control-static">{{ratingParticipant}}</p>
                  </div>
                </div>
              </template>
              <br>

              <template><div class="form-group">
                  <label class="control-label col-sm-2">
                    Rating from Mentor :</label> 
                  <div class="col-sm-6">
                    <p class="form-control-static">{{ratingMentor}}</p>
                  </div>
                </div>
              </template>-->
                  
            </form>
          <button style="margin-top: 20px" class="btn btn-danger" @click="$emit('close')">Close</button>                 
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
    props: ['dataSummary', 'ratingParticipant', 'ratingMentor'],
    components: {
      'error-flash': ErrorFlash,
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: ''
      }
    },
    created: function () {
    },
    methods: {}
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';
</style>