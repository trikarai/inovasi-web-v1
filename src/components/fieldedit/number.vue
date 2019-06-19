<template>
  <div class="row">
    <div class="col-md-4">
        <label>{{field.field_template.name}}</label>
    </div>
    <div class="col-md-6">
      <input class="kotak" type="number" :name="field.field_template.id" :value="field.value"/>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>