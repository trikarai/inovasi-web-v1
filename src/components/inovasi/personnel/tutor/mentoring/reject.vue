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
                <h2>Reject</h2>
                <div class="garis"></div>
                <form>
                  
                    <div class="row">
                      <div class="col-md-4">
                        <label>Reason</label>
                      </div>
                      <div class="col-md-6">
                        <textarea maxlength="350" style="width: 100%;height: 100px;" class="kotak" v-model="data.note" placeholder="please write your reason"/>
                      </div>
                    </div>
                </form>
              </div>
            </div>
            <div>
            
            </div>
            
              <div v-show="!onSubmit" style="margin-top: 20px">
                <button class="btn btn-default" @click="postReschedule()">Reject</button>
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
  import * as CONFIG from '@/app.config.js'
  import auth from '@/httpcontrol'
  import alertControl from '@/alertcontrol'
  import onSubmit from '@/components/onsubmit'
  import ErrorFlash from '../../../errorflash'

  export default {
    props: ['tutorid', 'sessionid'],
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
        data: {
          note: ''
        },
        onSubmit : false
      }
    },
    created: function () {
    },
    methods: {
      postReschedule: function () {
        if(this.data.note == ''){
          this.$notify({
                  group: 'notif',
                  title: 'Empty',
                  text: 'reason cannot be empty',
                  type: 'warn'
                });
        }else{
          this.onSubmit = true
          auth.putData2(this, '/tutor/'+ this.tutorid +'/mentoring_session/' + this.sessionid + '/reject', this.data)
                .then(res=>{
                  console.log(res)
                  this.$emit('closemodal')
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
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