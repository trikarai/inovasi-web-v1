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
                  <!--{{scoringdata}}-->
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Start Date</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="date" v-model="obj.start_date">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>End Date</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="date" v-model="obj.end_date">
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
          <!--{{scoringdata}}-->
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
  
  export default {
    props: ['scoringdata', 'phaseid', 'programmeid'],
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
        obj: {
          start_date : '',
          end_date : ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.obj.start_date = this.scoringdata.start_date
      this.obj.end_date = this.scoringdata.end_date 
    },
    methods: {
      submit: function () {
        this.onSubmit = true
        auth.putData2(this, '/programme/'+ this.programmeid +'/phase/'+ this.phaseid +'/scoring/' + this.scoringdata.id + '/update_period', this.obj)
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
<style lang="css">
@import '../../../../team/member/idea/modal.css';
</style>