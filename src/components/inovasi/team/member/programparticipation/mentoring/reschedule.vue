<template>

  <transition name="modal">


    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
          <notifications group="notif" position="top center" />

          <div class="modal-body">
            <div class="ui form">                
              <div class="field">
                <h2>Jadwal Ulang</h2>
                <div class="garis"></div>
                <form>
                  <div class="row">
                      <div class="col-md-4">
                        <label>Waktu Mulai</label>
                      </div>
                      <div class="col-md-6">
                        <VueCtkDateTimePicker v-model="data.start_time" label="" minute-interval="30" format="YYYY-MM-DD HH:mm" formatted="Do MMMM YYYY , HH:mm a"/>
                      </div>
                    </div>
                  
                  <br>
                   <div class="row">
                      <div class="col-md-4">
                        <label>Tipe</label>
                      </div>
                      <div class="col-md-6">
                        <select class="form-control" v-model="type">
                          <option value="" disabled>- Mohon untuk memilih tipe -</option>
                          <option disabled value="offline">Offline</option>
                          <option disabled value="online">Online</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label>Media</label>
                      </div>
                      <div class="col-md-6">
                        <textarea disabled maxlength="350" v-if="type == 'online'" style="width: 100%;height: 100px;" class="kotak" v-model="freetext" placeholder="please write your online id (wa,skype, etc)"/>
                        <textarea disabled maxlength="350" v-if="type == 'offline'" style="width: 100%;height: 100px;" class="kotak" v-model="freetext" placeholder="please write place and address"/>
<!--                        <p style="white-space: pre-line;">{{ data.media }}</p>-->
                      </div>
                    </div>
                </form>
              </div>
            </div>
            <div>
              <!--PP : {{programmeparticipationId}}-->
            
            </div>
            
              <div v-show="!onSubmit" style="margin-top: 20px">
                <button class="btn btn-default" @click="postReschedule()">Propose</button>
                <button class="btn btn-danger" @click="$emit('close')">Close</button>
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
  import ErrorFlash from '../../../../errorflash'
  import datetime from 'vuejs-datetimepicker';
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['teamId', 'programmeId', 'programmeparticipationId', 'mentoringId', 'datatype', 'datafreetext'],
    components: {
      'error-flash': ErrorFlash,
      'datetime' : datetime,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        type: '',
        freetext: '',
        data: {
          start_time: '',
          media: ''
        },
        onSubmit : false
      }
    },
    created: function () {
        this.type = this.datatype
        this.freetext = this.datafreetext
    },
    methods: {
      postReschedule: function () {
        if(this.data.start_time == ''){
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
          this.data.media = this.type + ' ' + this.freetext
          auth.putData(this, '/team/'+ this.teamId +'/programme_participation/'+ this.programmeparticipationId +'/mentoring_session/'+ this.mentoringId +'/reschedule', this.data)
        }
      }
    }
  }
</script>  
<style lang="css">
@import './modal.css';
</style>