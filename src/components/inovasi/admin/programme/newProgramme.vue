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
                        <label>Region</label>
                        <select v-model="data.region_id">
                          <option disabled value="">-Select Region-</option>
                          <option v-for="region in dataRegion.list" :value="region.id">{{region.name}}</option>
                        </select>
                        <label>Programme Curriculum</label>
                        <select v-model="data.programme_curriculum_id">
                          <option disabled value="">-Select Programme Curriculum-</option>
                          <option v-for="program in dataProgrammeCurriculum.list" :value="program.id">{{program.name}}</option>
                        </select>
                        
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
  import ErrorFlash from '../../errorflash'
  
  export default {
    props: ['programmeId', 'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        dataRegion: [],
        dataProgrammeCurriculum: [],
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          region_id:'',
          programme_curriculum_id: ''
        }
      }
    },
    created: function () {
//      this.getData(this.edit)
        this.getRegion()
//        this.getProgrammeCurriculum()
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit programme data')
          this.getProgramme(this.programmeId)
        } else {
          console.log('new programme data')
        }
      },
      getRegion: function () {
        this.$http.get(CONFIG.APIENDPOINT + '/region', {headers: auth.getAuthHeader()})
            .then(response => {
              return response.json()
            }, error => {
             alertControl.showError(this, error.body.meta)
            }).then(data => {
             this.dataRegion = data.data
                           this.getProgrammeCurriculum()

            })
      },
      getProgrammeCurriculum: function () {
        this.$http.get(CONFIG.APIENDPOINT + '/programme_curriculum', {headers: auth.getAuthHeader()})
            .then(response => {
              return response.json()
            }, error => {
             alertControl.showError(this, error.body.meta)
            }).then(data => {
             this.dataProgrammeCurriculum = data.data
            })
      },
//      getProgramme: function (programmeId) {
//        auth.getData(this, '/programme/' + programmeId)
//      },
      submit: function () {
        auth.postData(this, '/programme/'+ this.programmeId, this.data)
      },
      update: function () {
        auth.putData(this, '/programme/'+ this.programmeId, this.data)
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';
</style>