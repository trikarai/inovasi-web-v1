<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">
            </slot>
          </div>
          <div class="modal-body">

            <h3>Please check your email for account activation before login.</h3>
            <br>
            <br>
          <button class="btn btn-danger" @click="$emit('close')">OK</button>

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
  export default {
    data: function () {
      return {
      }
    },
    created: function () {
    },
    methods: {
    }
  }
</script>  
<style lang="css" scoped>
@import '../../talent/profile/modal/modal.css';
</style>
