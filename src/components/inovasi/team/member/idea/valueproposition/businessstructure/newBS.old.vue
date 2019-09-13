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

                  <div id="dynamicform" v-if="!edit">
                    <div>
                      <form :name="1">  
                      <div v-for="field, index in data.fields">
                          <fields-comp v-bind:fields="field"></fields-comp>
                          <hr>
                        </div>
                      </form>
                      <hr>
                    </div>
                  </div>

                  <button v-if="!edit" class="btn btn-default" @click.prevent="submitData()">Submit</button>
                  <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                  <button class="btn btn-danger" @click="$emit('close')">Cancel</button>

                </div> 
              </div> 

            </div>
          </div>               
        </div>
        
        {{obj}}
        
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
  import ErrorFlash from '../../../../../errorflash'
  import fieldscomp from '@/components/field/fields'
  
  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'personaId', 'valuepropositionId', 'templateId' ,'edit'],
    components: {
      'error-flash': ErrorFlash,
      'fields-comp': fieldscomp
    },
    data: function () {
      return {
        data: '',
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          business_structure_template_id : this.templateId,
          data: []
        }
      }
    },
    created: function () {
      this.getForm()    
    },
    methods: {
      getForm: function () {
        auth.getData(this, '/team/form_template/' + this.templateId)
      },
      submitData: function () {
        for (var x = 0; x < this.data.fields.length; x++) {
          this.getFormValues(x)
      }
      this.sendPostData(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId)
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
      sendPostData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId ) {
//        auth.postData(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/business_structure', this.obj)
      },
      sendPutData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId, id ) {
//        auth.putData(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/business_structure/' + id, this.obj)
      }
     }
  }
</script>  
<style lang="css" scoped>
@import '../../modal.css';
</style>