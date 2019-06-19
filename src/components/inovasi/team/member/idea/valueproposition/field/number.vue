<template>
  <div>
    <label>{{field.field_template.name}}</label>
    <input type="number" :name="field.field_template.id"/>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>