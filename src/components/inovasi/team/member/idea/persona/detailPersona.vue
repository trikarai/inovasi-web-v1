<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
          <div class="modal-body">
            
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>  
              </thead>
              <tbody  style="border-top-style: hidden;">
                <tr v-for="data in aspect">
                  <td><b>{{data.field_template.name}}</b></td>
                  <template v-if="data.value != null">
                    <td>{{data.value}}</td>
                  </template>
                  <template v-else>
                    <td v-for="option in data.selected_options">
                      {{option.option.name}}
                    </td>
                  </template>
              
                </tr>  
              </tbody>
            </table>             
            
            <br>
            <button class="btn btn-danger" @click="$emit('close')">Close</button>
            
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
    props: ['aspect'],
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
          description:''
        }
      }
    },
    created: function () {
//      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit CS data')
          this.getCS(this.teamId, this.ideaId, this.customersegmentId)
        } else {
          console.log('new CS data')
        }
      },
      getCS: function (teamId, ideaId, customersegmentId) {
        auth.getData(this, '/team/'+ teamId +'/idea/' + ideaId + '/customer_segment/' + customersegmentId)
      },
      submit: function () {
        auth.postData(this, '/team/'+ this.teamId +'/idea', this.data)
      },
      update: function () {
        auth.putData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId, this.data)
      }
    }
  }
</script>  
<style lang="css">
@import '../modal.css';
</style>