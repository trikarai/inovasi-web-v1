<template>

  <transition name="modal">


    <div id="style-2" class="modal-mask" style="width: 585px;margin-left: auto;">
      <div class="modal-wrapper">
        <div class="modal-container">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

          <div class="modal-body">
            <i class="fa fa-close clsbtnmdl" @click="$emit('close')"></i>
            <div class="ui form">                
              <div class="field"> 
                  <h2>Tambah {{data.name}}</h2>
                  
                  <div class="garis"></div>
                <div>                    

                  <div id="dynamicform" v-if="!edit">
                    <div>
                      <form id="dynamic-form" :name="1">  
                      <div v-for="field, index in data.fields">
                          <fields-comp v-bind:fields="field"></fields-comp>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div style="margin-top: 20px" v-if="!onSubmit">
                    <button v-if="!edit" class="btn btn-default" @click.prevent="submitData()">Submit</button>
                    <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                    <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  </div>
                  <div v-if="onSubmit">
                    <onsub></onsub>
                  </div>  
                </div> 
              </div> 

            </div>
          </div>               
        </div>
        
        <!--{{obj}}-->
        
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
  import OnSubmit from '@/components/onsubmit'
  
  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'personaId', 'valuepropositionId', 'templateId' ,'edit'],
    components: {
      'error-flash': ErrorFlash,
      'fields-comp': fieldscomp,
       onsub: OnSubmit
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
        },
        onSubmit: false
      }
    },
    created: function () {
      this.getForm()    
    },
    methods: {
      getForm: function () {
        this.onsub = true
        auth.getData(this, '/team/form_template/' + this.templateId)
      },
      submitData: function (){
        var form = document.getElementById("dynamic-form");
        const data = auth.formToJSON(form.elements);
        this.obj.data = data   
        this.sendPostData(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId)
      },      
      sendPostData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId ) {
        auth.postData(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/business_structure', this.obj)
      },
      sendPutData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId, id ) {
        auth.putData(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/business_structure/' + id, this.obj)
      }
     }
  }
</script>  
<style lang="css">
@import '../../modal.css';

.editr {
  min-width: 204px;
}

#style-2::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
.clsbtnmdl {
    float: right;
    cursor: pointer;
    background: #bdbdbd;
    padding: 4px;
    border-radius: 50%;
    padding-left: 6px;
    padding-right: 6px;
    color: #fff;
}
</style>