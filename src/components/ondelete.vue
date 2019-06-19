<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="contain-modal">
<!--
          <div class="modal-header">
            <slot name="header">            
            </slot>
          </div>
-->     <div class="">
              <div class="col-md-3">
                  <i class="fa fa-warning tseru"></i>
              </div>  
              <div class="col-md-9">

                <h4>Confirm to <b>{{act}}</b></h4>
                  <!--<div v-show="!onSubmit">-->
                  
                  <button class="btn btn-danger btn-sm" @click="$emit('confirmed')">Confirm</button>
                  <button class="btn btn-default btn-sm" @click="$emit('close')" style="margin-left: 7px">Cancel</button>
                  <!--</div>-->
    <!--              <onsub v-show="onSubmit"></onsub>-->

              </div>
        </div>
           </div>               
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>

    
  </transition>
</template>
<script>
  export default {
    props: ['act'],
    data() {
      return {
        message:'Header'
      }
    },
    created: function (){
    },
    methods: {
    }
  }

</script>
<style lang="css">
    .tseru {
        font-size: 45px;
        position: relative;
        right: 15px;
        top: 8px;
        color: #ffce14;
    }
  .actions button {
     font-size: inherit;
     margin: 4px;
     border: none;
     padding: 6px 8px;
     cursor: pointer;
    }
    
    .actions .cancel {
     background: darkred;
     color: white;
    }
    
    .actions .confirm {
     background: darkcyan;
     color: white;
    }
    .modal-mask {
  position: fixed !important;
  z-index: 2000 !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  overflow-y: auto !important;
  webkit-transform: translate3d(0,0,0) !important;
  background-color: rgba(255, 255, 255, 0.8) !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  margin: auto !important;
  max-width: 560px !important;
  padding: 64px !important;
  width: 100% !important;
}
.contain-modal {
  width: 340px;
  background-color: #ffffff !important;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2) !important;
/*
  -webkit-flex: 1 !important;
  -ms-flex: 1 !important;
  flex: 1 !important;
*/
/*  width: 100% !important;*/
  /*margin: 100px auto;*/
  padding: 50px 50px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  margin: 0 auto;
  border-radius: 5px; 
}
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-default-button {
    float: right;
  }
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

.modal-enter, .modal-leave {
  opacity: 0;
}
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
  