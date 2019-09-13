<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">

<!--              <div class="alert alert-danger" v-show="error" v-for="msg in err_msg.error_details">
                <strong>{{err_msg.code}}</strong> {{ msg }}
              </div>-->
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

               <notifications group="notif" position="top center" />


            </slot>
          </div>
          <div class="modal-body">

            <div class="ui form">                
              <div class="field">  
                <div>
                  <form>
                            
                    <div class="row">
                      <div class="col-md-4">
                        <label>Start Time</label>
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
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label>Media</label>
                      </div>
                      <div class="col-md-6">
                        <textarea v-if="type == 'online'" style="width: 100%;height: 100px;" class="kotak" v-model="freetext" placeholder="please write your online id (wa,skype, etc)"/>
                        <textarea v-if="type == 'offline'" style="width: 100%;height: 100px;" class="kotak" v-model="freetext" placeholder="please write place and address"/>
<!--                        <p style="white-space: pre-line;">{{ propose.media }}</p>-->
                      </div>
                    </div>
                    
                  </form>
                  
                </div>
              </div>
              <div v-show="!onSubmit">
                <button class="btn btn-default" @click.prevent="submit">Submit</button>
                <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                <!--<button class="btn btn-danger" @click="$emit('closemodal')">Test</button>-->
              </div>
              <onsub v-show="onSubmit"></onsub>
              <!--{{sessionid}}-->
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
  import ErrorFlash from '../../../errorflash'
  import datetime from 'vuejs-datetimepicker'
  import onSubmit from '@/components/onsubmit'
  
  export default {
    props: ['data', 'tutorid', 'sessionid', 'time', 'datatype', 'datafreetext'],
    components: {
      'error-flash': ErrorFlash,
      'datetime' : datetime,
      'onsub' : onSubmit
    },
    data: function () {
      return {
//        data: '',
        dataTutor: '',
        show: false,
        err_msg: '',
        error: false,
        success: false,
        type: '',
        freetext: '',
        propose: {
          start_time: '',
          media : ''
        },
        onSubmit : false,
        todayDate: ''
      }
    },
    created: function () {
      this.propose.start_time = this.time
      this.type = this.datatype
      this.freetext = this.datafreetext

      var date = new Date();
      var yesterday = new Date(date.getTime() - 24*60*60*1000);
      this.todayDate = yesterday

    },
    computed: {
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
          this.onSubmit = true
          this.propose.media = this.type + ' : \n' + this.freetext
          auth.putData2(this, '/tutor/'+ this.tutorid +'/mentoring_session/'+ this.sessionid +'/offer_different_time' , this.propose)
                  .then(res=>{
                    console.log(res)
                    this.$emit('closemodal')
                  }, error=>{
                    console.log(error)
                    alertControl.showError(this, error.body.meta)
                    this.onSubmit = false
                  })
        }
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../../../team/member/idea/modal.css';
</style>