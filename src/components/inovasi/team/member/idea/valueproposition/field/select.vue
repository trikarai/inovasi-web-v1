<template>
  <div>
    <label>{{field.field_template.name}}</label>
    <select :name="field.field_template.id">
      <option v-for="option in field.field_template.options" :value="option.id"> {{ option.name }} </option>
    </select>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>