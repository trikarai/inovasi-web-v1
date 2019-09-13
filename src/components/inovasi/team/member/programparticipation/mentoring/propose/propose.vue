<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">

              <div class="alert alert-danger" v-show="error" v-for="msg in err_msg.error_details">
                <strong>{{err_msg.code}}</strong> {{ msg }}
              </div>

            </slot>
          </div>
          <div class="modal-body">

            <div class="ui form">                
              <div class="field">  
                <div>
                  <form>
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label>Mentoring</label>
                      </div>
                      <div class="col-md-6">
                        <select  class="form-control" v-model="propose.mentoring_id" v-if="data.total > 0">
                          <option disabled value="">-Pilih Sesi Mentoring-</option>
                          <option v-for="mentoring in data.list" :value="mentoring.id">{{mentoring.name}}</option>
                        </select>
                        <div v-else>
                          No Mentoring Session Yet
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label>Tutor</label>
                      </div>
                      <div class="col-md-6">
                        <select class="form-control" v-model="propose.tutor_id" v-if="dataTutor.total > 0">
                          <option disabled value="">-Pilih Tutor-</option>
                          <option v-for="tutor in dataTutor.list" :value="tutor.id">{{tutor.personnel.name}}</option>
                        </select>
                        <div v-else>
                          No Available Tutor Yet
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label>Start Time</label>
                      </div>
                      <div class="col-md-6">
                        <datetime format="YYYY-MM-DD HH:MM:SS" width="245px" v-model="propose.start_time"></datetime>
                      </div>
                    </div>
                   
                  </form>
                  <hr>
                </div>
              </div>
              <div v-show="!onSubmit">
                <button class="btn btn-default" @click.prevent="submit" v-if="dataTutor.total != 0">Submit</button>
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
    props: ['teamId', 'programmeparticipationId', 'programmeId', 'phaseId'],
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
        propose: {
          programme_id: this.programmeId,
          phase_id: this.phaseId,
          mentoring_id: '',
          tutor_id: '',
          start_time: ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getMentoring()
    },
    methods: {
      getMentoring: function () {
        this.onSubmit = true
        this.$http.get(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring', {headers: auth.getAuthHeader()})
                .then(response => {
                  console.log(response)
                  if(response.status === 204){
                    this.data = {total : 0,list : []}
                    this.onSubmit = false
                  }else{
                    return response.json()
                    this.onSubmit = false
                  }
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.data = data.data
                  this.onSubmit = false
                  this.getTutor()
                })
      },
      getTutor: function () {
        this.onSubmit = true
        this.$http.get(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId + '/tutor', {headers: auth.getAuthHeader()})
                .then(response => {
                  console.log(response)
                  if(response.status === 204){
                    this.dataTutor = {total : 0,list : []}
                    this.onSubmit = false
                  }else{
                    return response.json()
                    this.onSubmit = false
                  }
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataTutor = data.data
                  this.onSubmit = false
                })
      },
      submit: function (){
        this.onSubmit = true
        auth.postData2(this, '/team/'+ this.teamId +'/programme_participation/'+ this.programmeparticipationId +'/mentoring_session', this.propose)
                .then(res=>{
                  console.log(res)
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';
</style>