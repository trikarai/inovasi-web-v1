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
                        <label>Personnel Name</label>
                        <select v-model="data.personnel_id">
                          <option disabled value="">-Select Personnel-</option>
                          <option v-for="personnel in dataPersonnel.list" :value="personnel.id">{{personnel.name}}</option>
                        </select>
                        
                      </form>
                      <hr>
                    </div>
                  </div>
                  
                  <button v-if="nameStatus === 'Tutor'" class="btn btn-default" @click.prevent="submitTutor()">Assign as Tutor</button>
                  <button v-if="nameStatus === 'Coordinator'" class="btn btn-default" @click.prevent="submitCoordinator()">Assign as Coordinator</button>
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
  import ErrorFlash from '../../errorflash'
  
  export default {
    props: ['programmeId', 'nameStatus' ,'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        dataPersonnel: {total: 0, list: []},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          personnel_id:''
        }
      }
    },
    created: function () {
        this.getPersonnel()
    },
    methods: {
      getPersonnel: function () {
        this.$http.get(CONFIG.APIENDPOINT + '/personnel', {headers: auth.getAuthHeader()})
            .then(response => {
              return response.json()
            }, error => {
             alertControl.showError(this, error.body.meta)
            }).then(data => {
             this.dataPersonnel = data.data
            })
      },
      submitTutor: function () {
        auth.postData(this, '/programme/'+ this.programmeId + '/tutor', this.data)
      },
      submitCoordinator: function () {
        auth.postData(this, '/programme/'+ this.programmeId + '/coordinator', this.data)
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';
</style>