<template>

  <transition name="modal">
   
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
              <p>Workshop Booking for <strong>{{data.name}}</strong> Confirmed</p>
		 <button class="btn btn-danger btn-sm" @click="$emit('close')"><i class="fa fa-close"></i> Close</button>
		 <router-link class="btn btn-info btn-sm" :to="'/talent/team/reservation'"><i class="fa fa-share"></i> Go to Reservation Page</router-link>
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
  import ErrorFlash from '../../../../errorflash'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['data', 'teamId', 'programmeparticipationId', 'programmeId', 'phaseId'],
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
        onSubmit : false,
        bookingData: {
          programme_id : this.programmeId,
          phase_id : this.phaseId,
          workshop_id : this.data.id
        }
      }
    },
    created: function () {
    }
  }
</script>  
<style lang="css">
.actions button {
     font-size: inherit;
     margin: 4px;
     border: none;
     padding: 6px 8px;
     cursor: pointer;
    }
    
    .actions .cancel {
     background: darkred;
     color: white;
    }
    
    .actions .confirm {
     background: darkcyan;
     color: white;
    }  
  
@import '../mentoring/modal.css';
</style>