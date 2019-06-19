<template>
<transition name="mloading">
    <div class="mloading-mask">
      <div class="mloading-wrapper">
        <div class="mloading-container">

          <img src="/img/Interwind-1s-200px.svg">

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
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
<style scoped>
  .mloading-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.mloading-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.mloading-container {
  width: 250px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 2px;
  /*box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
  transition: all .3s ease;
}

.mloading-header h3 {
  margin-top: 0;
  color: #42b983;
}

.mloading-body {
  margin: 20px 0;
}

.mloading-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="mloading" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the mloading transition by editing
 * these styles.
 */

.mloading-enter {
  opacity: 0;
}

.mloading-leave-active {
  opacity: 0;
}

.mloading-enter .mloading-container,
.mloading-leave-active .mloading-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
  