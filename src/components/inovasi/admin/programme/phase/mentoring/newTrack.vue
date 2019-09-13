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
                <form>
                  <div class="form-group">
                    <label>Track</label>
                    <select v-model="obj.track_id" class="form-control">
                      <option disable value="">-Select Track-</option>
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
    props: ['programmeId', 'phaseId', 'mentoringId', 'edit'],
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
          track_id: ''
        }
      }
    },
    created: function () {
      this.getFormParticipant()
    },
    methods: {
      getFormParticipant: function () {
        auth.getData(this, '/track')
      },
      submit: function () {
        auth.postData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring/' + this.mentoringId + '/track_involvement', this.obj)
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../../../modal.css';
</style>