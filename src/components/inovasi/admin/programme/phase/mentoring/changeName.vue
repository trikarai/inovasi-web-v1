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
                          <label>Name</label>
                          <input type="text" v-model="obj.name" class="form-control" >
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
  import ErrorFlash from '../../../../errorflash'
  
  export default {
    props: ['programeeId', 'phaseId', 'mentoringId', 'mentoring', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        data: '',
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          name: this.mentoring.name
        }
      }
    },
    created: function () {
//      this.getFormParticipant()
    },
    methods: {
      update: function () {
        auth.putData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring/' + this.mentoring.id, this.obj)
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../../../modal.css';
</style>