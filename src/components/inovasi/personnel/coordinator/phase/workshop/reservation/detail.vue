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
                  <h4><b>Reservation</b></h4>
                  <p>Status : {{data.status}}
                  <p>Booking Time : {{data.booking_time}}
                  <p>Check In Time : {{data.check_in_time}}
                  <p>Check Out Time : {{data.check_out_time}}
                  
                  <hr>
                  <h4><b>Participant</b></h4>
                  <p>Team : {{data.participant.team.name}}</p>
                  <p>Current Phase : {{data.participant.current_phase.name}}</p>
                  <p>Phase Plan : {{data.participant.current_phase.phase_plan.name}}</p>
                  <p>Phase Plan : {{data.participant.current_phase.phase_plan.name}}</p>
                  <p>Status : {{data.participant.status}}</p>
                  <hr>
                  
                  <!--<h4><b>Member</b></h4>-->
                  
                  
                  <hr>
                </div>
              </div>
                <button class="btn btn-danger" @click="$emit('close')"><i class="fa fa-close"></i> Close</button>
             
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
  import ErrorFlash from '../../../../../errorflash'
  import alertControl from '@/alertcontrol'

  export default {
    props: ['data'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false
      }
    },
    created: function () {},
    methods: {
    }
  }
</script>  
<style lang="css">
@import '../../../../../team/member/idea/modal.css';
</style>