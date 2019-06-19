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
                        <div class="row">
                          <div class="col-md-4">
                            <label>Name</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" type="text" v-model="data.name">
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-md-4">
                            <label>Description</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" type="text" v-model="data.description">
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-md-4">
                            <label>Type</label>
                          </div>
                          <div class="col-md-6">
                            <select v-model="data.field_type">
                              <option disabled="" value="">-Please Select Type-</option>
                              <option value="string">String</option>
                              <option value="integer">Integer</option>
                              <!--<option value="select">Select</option>-->
                              <!--<option value="attachment">Attachment</option>-->
                          </select>
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-md-4">
                            <label>Position</label>
                          </div>
                          <div class="col-md-6">
                            <input class="kotak" type="text" v-model="data.position">
                          </div>
                        </div>
                       
                        <template v-if="data.type === 'integer'">
                          <div class="row">
                            <div class="col-md-4">
                              <label>Min Value</label>
                            </div>
                            <div class="col-md-6">
                              <input class="kotak" type="text" v-model="data.min_value">
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-4">
                              <label>Max Value</label>
                            </div>
                            <div class="col-md-6">
                              <input class="kotak" type="text" v-model="data.max_value">
                            </div>
                          </div>
                        </template>
                        
                      </form>
                      <hr>
                    </div>
                  </div>
                  <div v-show="!onSubmit">
                    <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                    <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                    <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  </div>
                  <onsub v-show="onSubmit"></onsub>
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
  import ErrorFlash from '../../errorflash'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['personaId', 'edit'],
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
          name:'',
          description: '',
          position: '',
	  min_value: null,
	  max_value: null,
          field_type : ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit persona_aspect data')
          this.getTrack(this.personaId)
        } else {
          console.log('new persona_aspect data')
        }
      },
      getTrack: function (personaId) {
        auth.getData(this, '/persona_aspect/' + personaId)
      },
      submit: function () {
        this.onSubmit = true
        auth.postData2(this, '/persona_aspect/'+ this.personaId, this.data)
                .then(res => {
                  console.log(res)
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error=> {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      update: function () {
        auth.putData(this, '/persona_aspect/'+ this.personaId, this.data)
      }
    }
  }
</script>  
<style lang="css">
@import '../modal.css';
</style>