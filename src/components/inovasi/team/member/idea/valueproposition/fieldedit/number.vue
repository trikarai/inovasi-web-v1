<template>
  <div>
    <label>{{field.field_template.name}}</label>
    <input type="number" :name="field.field_template.id" :value="field.value"/>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>