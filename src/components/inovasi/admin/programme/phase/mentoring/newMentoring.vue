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
                        <div class="form-group">
                          <label>Session Duration (minutes)</label>
                          <input type="number" v-model="obj.session_duration" class="form-control">
                        </div>
                        <div class="form-group">
                          <label>Max Session</label>
                          <input type="number" v-model="obj.max_session" class="form-control">
                        </div>
                        <div class="form-group">
                          <label>Max Team Session</label>
                          <input type="number" v-model="obj.max_team_session" class="form-control">
                        </div>
                        <div class="form-group">
                          <label>participant summary</label>
                          <select v-model="obj.participant_summary_form_id" class="form-control">
                            <option disable value="">-Select Participant Summary Form-</option>
                            <option v-for="option in data.list" :value="option.id">{{option.name}}</option>
                          </select>  
                            
                        </div>
                        <div class="form-group">
                          <label>tutor summary</label>
                          <select v-model="obj.tutor_summary_form_id" class="form-control">
                            <option disable value="">-Select Tutor Summary Form-</option>
                            <option v-for="option in data.list" :value="option.id">{{option.name}}</option>
                          </select>  
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
    props: ['programmeId', 'phaseId', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        data: {total:0, list:[]},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          name: '',
          session_duration: '',
          max_session: '',
          max_team_session: '',
          participant_summary_form_id: '',
          tutor_summary_form_id: ''
        }
      }
    },
    created: function () {
      this.getFormParticipant()
    },
    methods: {
      getFormParticipant: function () {
        auth.getData(this, '/form_template')
      },
      submit: function () {
        auth.postData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring', this.obj)
      }
    }
  }
</script>  
<style lang="css">
@import '../../../modal.css';
</style>