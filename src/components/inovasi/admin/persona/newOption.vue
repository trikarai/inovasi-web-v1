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
                        <label>Name</label>
                          <input type="text" v-model="data.name">
                        <label>Position</label>
                          <input type="number" v-model="data.position">
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
  import ErrorFlash from '../../errorflash'
  
  export default {
    props: ['personaId', 'optionId', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          name:'',
          position: ''
        }
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit option data')
          this.getOption(this.personaId, this.optionId)
        } else {
          console.log('new option data')
        }
      },
      getOption: function (personaId, optionId) {
        auth.getData(this, '/persona_aspect/' + personaId + '/option/' + optionId)
      },
      submit: function () {
        auth.postData(this, '/persona_aspect/'+ this.personaId + '/option', this.data)
      },
      update: function () {
        auth.putData(this, '/persona_aspect/'+ this.personaId + '/option/' + this.optionId, this.data)
      }
    }
  }
</script>  
<style lang="css">
@import '../modal.css';
</style>