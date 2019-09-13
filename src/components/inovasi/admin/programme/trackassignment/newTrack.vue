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
                        <label>Track Name</label>
                        <select v-model="data.track_id">
                          <option disabled value="">-Select Track-</option>
                          <option v-for="track in dataTrack.list" :value="track.id">{{track.name}}</option>
                        </select>
                        
                      </form>
                      <hr>
                    </div>
                  </div>
                  
                  <button class="btn btn-default" @click.prevent="submit()">Assign as Tutor</button>
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
  import ErrorFlash from '../../../errorflash'
  
  export default {
    props: ['programmeId','tutorId', 'trackId' ,'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        dataTrack: {total:0,list:[]},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          track_id:''
        }
      }
    },
    created: function () {
        this.getTrack()
    },
    methods: {
      getTrack: function () {
        this.$http.get(CONFIG.APIENDPOINT + '/track', {headers: auth.getAuthHeader()})
            .then(response => {
              return response.json()
            }, error => {
             alertControl.showError(this, error.body.meta)
            }).then(data => {
             this.dataTrack = data.data
            })
      },
      submit: function () {
        auth.postData(this, '/programme/'+ this.programmeId + '/tutor/' + this.tutorId + '/track_assignment', this.data)
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../../modal.css';
</style>