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
                        <label>Desc</label>
                          <input type="text" v-model="data.description">
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
    props: ['programmecurriculumId', 'edit'],
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
          description: ''
        }
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit programme curriculum data')
          this.getTrack(this.programmecurriculumId)
        } else {
          console.log('new programme curriculum data')
        }
      },
      getTrack: function (programmecurriculumId) {
        auth.getData(this, '/programme_curriculum/' + programmecurriculumId)
      },
      submit: function () {
        auth.postData(this, '/programme_curriculum/'+ this.programmecurriculumId, this.data)
      },
      update: function () {
        auth.putData(this, '/programme_curriculum/'+ this.programmecurriculumId, this.data)
      }
    }
  }
</script>  
<style lang="css">
@import '../modal.css';
</style>