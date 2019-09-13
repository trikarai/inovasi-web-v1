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
<!--                  {{workshopdata.start_time}}-->
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Registration Start Date</label>
                      </div>
                      <div class="col-md-6">
                        <!--<input class="kotak" type="date" v-model="obj.registration_start_time">-->
                        <datetime format="YYYY-MM-DD HH:MM:SS" width="245px" v-model="obj.registration_start_time"></datetime>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Registration End Date</label>
                      </div>
                      <div class="col-md-6">
                        <!--<input class="kotak" type="date" v-model="obj.registration_end_time">-->
                        <datetime format="YYYY-MM-DD HH:MM:SS" width="245px" v-model="obj.registration_end_time"></datetime>
                      </div>
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Start Date</label>
                      </div>
                      <div class="col-md-6">
                        <!--<input class="kotak" type="date" v-model="obj.start_time">-->
                        <datetime format="YYYY-MM-DD HH:MM:SS" width="245px" v-model="obj.start_time"></datetime>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>End Date</label>
                      </div>
                      <div class="col-md-6">
                        <!--<input class="kotak" type="date" v-model="obj.end_time">-->
                        <datetime format="YYYY-MM-DD HH:MM:SS" width="245px" v-model="obj.end_time"></datetime>
                      </div>
                    </div>
                  </form>
                  <hr>
                </div>
              </div>
              <div v-show="!onSubmit">
                <button class="btn btn-default" @click.prevent="submit()">Change</button>
                <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
              </div>
              <onsub v-show="onSubmit"></onsub>

            </div> 
          </div>
        </div>               
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <!--{{workshopdata}}-->
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
  import alertControl from '@/alertcontrol'
  import datetime from 'vuejs-datetimepicker'

  export default {
    props: ['workshopdata', 'phaseid', 'programmeid'],
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
        obj: {
          registration_start_time : '',
          registration_end_time : '',
          start_time : '',
          end_time : ''
          
        },
        onSubmit : false
      }
    },
    created: function () {
      this.obj.start_time = this.workshopdata.start_time
      this.obj.end_time = this.workshopdata.end_time
      this.obj.registration_start_time = this.workshopdata.registration_start_time 
      this.obj.registration_end_time = this.workshopdata.registration_end_time 
    },
    methods: {
      submit: function () {
        this.onSubmit = true
        auth.putData2(this, '/programme/'+ this.programmeid +'/phase/'+ this.phaseid +'/workshop/' + this.workshopdata.id + '/update_time', this.obj)
                .then(res => {
                  console.log(res)
                  this.onSubmit = false
                  this.$emit('closemodal')
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
@import '../../../../team/member/idea/modal.css';
</style>