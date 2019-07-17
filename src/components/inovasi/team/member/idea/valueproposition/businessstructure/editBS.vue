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
                  <h2>Ubah {{template.business_structure_template.name}}</h2>
                  
                  <div class="garis"></div>
                <div>                    

                  <div id="dynamicform">
                    <div>
                      <form id="dynamic-form" :name="1">  
                      <div v-for="field, index in template.fields">
                        <fields-comp v-bind:fields="field"></fields-comp>
                      </div>
                      </form>
                    </div>
                  </div>
                  <div v-show="!onSubmit" style="margin-top: 20px">
                    <button v-if="!edit" class="btn btn-default" @click.prevent="submitData()">Submit</button>
                    <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                    <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  </div>
                  <onsub v-show="onSubmit"></onsub>
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
  import fieldscomp from '@/components/fieldedit/fields'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['template', 'teamId', 'ideaId', 'customersegmentId', 'personaId', 'valuepropositionId', 'templateId' ,'edit'],
    components: {
      'error-flash': ErrorFlash,
      'fields-comp': fieldscomp,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          data: []
        },
        onSubmit : false
      }
    },
    created: function () {
    },
    methods: {
      update: function () {
        var form = document.getElementById("dynamic-form");
        const data = auth.formToJSON(form.elements);
        this.obj.data = data
        this.sendPutData(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId, this.template.id)
      },
      sendPutData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId, id ) {
        this.onSubmit = true
        auth.putData2(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/business_structure/' + id, this.obj)
                .then(res=>{
                  console.log(res)
                  this.$emit("closeModalRefresh")
                  this.onSubmit = false
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.onSubmit = false
                })
      }
     }
  }
</script>  
<style lang="css">
@import '../../modal.css';

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

.editr {
  min-width: 204px;
}
</style>