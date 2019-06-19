<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
          <div class="modal-body">
               <h2>Mentor Detail</h2>
                  <div class="garis"></div>
            <div> 
              <table class="table">
                <thead>
                <tr>
                  <th>Name </th>
                  <th>email </th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{detail.name}} </td>
                    <td>{{detail.email}} </td>
                  </tr> 
                </tbody>
              </table>  
            </div>
            <div>
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
  import ErrorFlash from '../../../../../errorflash'
  
  export default {
    props: ['detail'],
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
          name: '',
          description: ''
        }
      }
    },
    created: function () {
    },
    methods: {  
    }
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';
</style>