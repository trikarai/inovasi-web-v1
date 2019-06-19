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
              <p>Confirm Booking for <strong>{{data.name}}</strong></p>
<!--              Team : {{teamId}} <br>
              PP : {{programmeparticipationId}}<br>
              Programme : {{programmeId}}<br>
              Phase : {{phaseId}}<br>
              -->
              <div v-show="!onSubmit">
		 <button class="btn btn-danger btn-sm" @click="$emit('close')">Cancel</button>
		 <button class="btn btn-info btn-sm" @click="onConfirm">Confirm</button>
              </div>
              <onsub v-show="onSubmit"></onsub>
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
  import alertControl from '@/alertcontrol'
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
    },
    methods: {
      onConfirm: function(){
        this.onSubmit = true
        auth.postData2(this, '/team/'+ this.teamId +'/programme_participation/'+this.programmeparticipationId+'/workshop_reservation', this.bookingData)
                .then(res=>{
                  console.log(res)
                  this.$emit('confirm')
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.onSubmit = false
                })
      }
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