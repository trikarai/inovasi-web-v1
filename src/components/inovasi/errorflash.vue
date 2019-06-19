<template>
  <div id="error">
    
    <div class="alert alert-success alert-dismissible" v-show="success">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Success!</strong> {{ err_msg }}
    </div>
    <div class="alert alert-danger alert-dismissible" v-show="error" v-for="msg in err_msg.error_details">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>{{err_msg.code}}</strong> {{ msg }}
    </div>
    
  </div>
</template>

<script>
  export default {
    props: ['err_msg', 'error', 'success'],
  }
</script>