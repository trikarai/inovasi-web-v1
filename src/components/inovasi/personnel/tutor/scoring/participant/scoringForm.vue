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
            <h2>Scoring Form</h2>
            <div class="garis"></div>
            <div class="ui form">                
              <div class="field">  

                <!--<h3><b>{{data.name}}</b></h3>-->
                
                   <div id="dynamicform">
                    <div>
                      <form :name="1">  
                      <div v-for="field, index in data.fields">
                          <fields-comp v-bind:fields="field"></fields-comp>
                         
                        </div>
                      </form>
                      
                    </div>
                  </div>            
                
                <!--tutuor : {{tutorid}} <br>-->

                </div>
              </div>
              <hr>
              <div v-show="!onSubmit">
                <button class="btn btn-default" @click.prevent="submitData">Submit</button>
                <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
              </div>
              <onsub v-show="onSubmit"></onsub>
            </div> 
          
          <!--{{obj}}-->

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
  import ErrorFlash from '../../../../errorflash'
  import datetime from 'vuejs-datetimepicker'
  import onSubmit from '@/components/onsubmit'
  import fieldscomp from '@/components/field/fields'

  export default {
    props: ['templateid', 'programmeid', 'phaseid', 'participantid', 'tutorid', 'scoringid'],
    components: {
      'error-flash': ErrorFlash,
      'datetime' : datetime,
      'fields-comp': fieldscomp,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        data: '',
        show: false,
        err_msg: '',
        error: false,
        success: false,
        propose: {
          start_time: ''
        },
        onSubmit : false,
        obj: {
          programme_id : this.programmeid,
          phase_id : this.phaseid,
          scoring_id : this.scoringid,
          participant_id : this.participantid,
          data: []
        }
      }
    },
    created: function () {
      this.getForm()
    },
    methods: {
      getForm: function () {
        auth.getData(this, '/team/form_template/' + this.templateid)
      },
      submitData: function () {
        for (var x = 0; x < this.data.fields.length; x++) {
          this.getFormValues(x)
        }
      this.sendPostData()
      },      
      getFormValues: function (index) {
        var values = $('form[name="' + index + '"]').serializeArray()
        console.log(values)
        for (var y = 0; y < values.length; y++) {
          var data = values[y]
          var element = new Object()
          element.field_template_id = data.name
          element.value = data.value
          this.obj.data.push(element)
        }
      },
      sendPostData: function () {
       this.onSubmit = true
        auth.postData2(this, '/tutor/'+ this.tutorid +'/score' , this.obj)
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
</script>  
<style lang="css">
@import '../../../../team/member/idea/modal.css';
.garis {
  display: block;
  width: 45px;
  height: 5px;
  background: #8bc751;
  margin-bottom: 20px;
}
</style>