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
                      <form>
                         <div class="form-group">
                          <label>Scoring</label>
                          <select v-model="obj.scoring_id" class="form-control">
                            <option disable value="">-Select Scoring-</option>
                            <option v-for="scoring in scoringData.list" :value="scoring.id">{{scoring.name}}</option>
                          </select>  
                            
                        </div>
                        <div class="form-group">
                          <label>Form Template</label>
                          <select v-model="obj.form_template_id" class="form-control" @change="getFieldTemplate">
                            <option disable value="">-Select Form Template-</option>
                            <option v-for="template in formtemplateData.list" :value="template.id">{{template.name}}</option>
                          </select>  
                        </div>
                        <div class="form-group" v-if="showField">
                          <label>Field Template</label>
                          <select v-model="obj.field_template_id" class="form-control">
                            <option disable value="">-Select Field Template-</option>
                            <option v-for="field in data.list" :value="field.id">{{field.name}}</option>
                          </select>  
                        </div>
                        
                         <div class="form-group">
                          <label>Weigth</label>
                          <input type="number" v-model="obj.weight" class="form-control">
                        </div>
                          
                      </form>
                      <hr>
                    </div>
                  </div>
                  
                  <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                  <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                  <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  
                </div> 
            
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
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  
  export default {
    props: ['programmeId', 'phaseId', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        data: '',
        scoringData: '',
        formtemplateData: '',
        show: false,
        showField: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          weight: '',
          scoring_id: '',
          form_template_id: '',
          field_template_id: ''
        }
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData(){
        this.getScoring()
      },
      getScoring: function (){
        this.$http.get(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring', {header: auth.getAuthHeader()})
                .then(response => {
                  return response.json()
                }, error => {
                  console.log(error)
                }).then(data =>{
                  this.scoringData = data.data
                  this.getFormTemplate()
                })
      },
      getFormTemplate: function () {
        this.$http.get(CONFIG.APIENDPOINT + '/form_template?type[]=scoring', {header: auth.getAuthHeader()})
                .then(response => {
                  return response.json()
                }, error => {
                  console.log(error)
                }).then(data =>{
                  this.formtemplateData = data.data
                })
      },
      getFieldTemplate: function () {
        this.showField = true
        auth.getData(this, '/form_template/' + this.obj.form_template_id + '/field_template' )
      },
      submit: function () {
        auth.postData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/score_recap', this.obj)
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../../../modal.css';
</style>