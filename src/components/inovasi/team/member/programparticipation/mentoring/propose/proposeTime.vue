<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          
<!--              <div class="alert alert-danger" v-show="error" v-for="msg in err_msg.error_details">
                <strong>{{err_msg.code}}</strong> {{ msg }}
              </div>-->
          <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
          <notifications group="notif" position="top center" />

          <div class="modal-body">
            <!-- session Id : {{sessionId}} -->

            <div class="ui form">                
              <div class="field">  
                <h2>Propose Mentoring Time</h2>
                <div class="garis"></div>
                <div>
                  <form>                      
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label>Propose Time</label>
                      </div>
                      <div class="col-md-6">
                        <VueCtkDateTimePicker :min-date="todayDate" v-model="propose.start_time" label="" minute-interval="30" format="YYYY-MM-DD HH:mm" formatted="Do MMMM YYYY , HH:mm a"/>
                      </div>
                    </div>
                    <br>
                   <div class="row">
                      <div class="col-md-4">
                        <label>Type</label>
                      </div>
                      <div class="col-md-6">
                        <select class="form-control" v-model="type">
                          <option value="" disabled>-Please Select Type-</option>
                          <option value="offline">Offline</option>
                          <option value="online">Online</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="row" style="margin-top: 20px">
                      <div class="col-md-4">
                        <label>Media</label>
                      </div>
                      <div class="col-md-6">
                        <textarea maxlength="350" v-if="type == 'online'" style="width: 100%;height: 100px; border-color: #d2d6de;" class="kotak" v-model="freetext" placeholder="Please write you Online ID (Example: Skype ID : startup, Whatsapp Number : 08123456789, Etc.)"/>
                        <textarea maxlength="350" v-if="type == 'offline'" style="width: 100%;height: 100px; border-color: #d2d6de;" class="kotak" v-model="freetext" placeholder="Please write place and address"/>
<!--                        <p style="white-space: pre-line;">{{ propose.media }}</p>-->
                      </div>
                    </div>
                   <!--{{propose}}-->
                  </form>
                </div>
              </div>
              <div v-show="!onSubmit" style="margin-top: 20px">
                <button style="margin: 5px" class="btn btn-default" @click.prevent="submit">Submit</button>
                <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
              </div>
              <onsub v-show="onSubmit"></onsub>
              
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
  import * as CONFIG from '@/app.config.js'
  import auth from '@/httpcontrol'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../../errorflash'
  import datetime from 'vuejs-datetimepicker'
  import onSubmit from '@/components/onsubmit'
  
  export default {
    props: ['teamId', 'tutorId', 'sessionId', 'programmeparticipationId', 'programmeId', 'phaseId'],
    components: {
      'error-flash': ErrorFlash,
      'datetime' : datetime,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        data: {total : 0,list : []},
        dataTutor: {total : 0,list : []},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        type: '',
        freetext: '',
        propose: {
          programme_id: this.programmeId,
          phase_id: this.phaseId,
          mentoring_id: this.sessionId,
          tutor_id: this.tutorId,
          start_time: '',
          media: '',
          todayDate: ''
        },
        onSubmit : false
      }
    },
    created: function () {
      var date = new Date();
      var yesterday = new Date(date.getTime() - 24*60*60*1000);
      this.todayDate = yesterday
      
    },
    methods: {
      submit: function (){
        if(this.propose.start_time == ''){
           this.$notify({
                  group: 'notif',
                  title: 'Empty',
                  text: 'Date cannot be empty',
                  type: 'warn'
                });
        }else if(this.type == ''){
          this.$notify({
                  group: 'notif',
                  title: 'Empty',
                  text: 'Type cannot be empty',
                  type: 'warn'
                });
        }else if(this.freetext == ''){
          this.$notify({
                  group: 'notif',
                  title: 'Empty',
                  text: 'Media cannot be empty',
                  type: 'warn'
                });
        }else{
          this.propose.media = this.type + ' ' + this.freetext
          this.onSubmit = true
            auth.postData2(this, '/team/'+ this.teamId +'/programme_participation/'+ this.programmeparticipationId +'/mentoring_session', this.propose)
                    .then(res=>{
                      console.log(res)
                      this.$router.push({name: 'Sesi Mentoring', params: {teamId: this.teamId, programmeparticipationId: this.programmeparticipationId, programmeId: this.programmeId, phaseId: this.phaseId}})
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
<style lang="css">
@import '../modal.css';
</style>