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
            <h3>{{data.name}}</h3>
            </hr>
            
            
            
          </div>
          <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
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
  import ErrorFlash from '../../../errorflash'
  import onSubmit from '@/components/onsubmit'
  import alertControl from '@/alertcontrol'
  
  export default {
    props: ['data'],
    components: {
      'error-flash': ErrorFlash,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        onSubmit : false
      }
    },
    created: function () {
    },
    methods: {
      submit: function () {
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../../member/idea/modal.css';
</style>