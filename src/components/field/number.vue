<template>
  <div class="row">
    <div class="col-md-4">
        <label>{{field.name}}</label>
    </div>
    <div class="col-md-6">
        <input class="kotak" style="width: 226px;" type="number" :name="field.id"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>

<style>
.kotak {
    padding: 6px;
    margin-bottom: 10px;
    border-color: #eaeaea;
    border-style: solid;

}

</style>