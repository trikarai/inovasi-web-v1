<template>
  <div>
    <label>{{field.field_template.name}}</label>
    <input type="text" :name="field.field_template.id" :value="field.value"/>
    <!--<textarea rows="2" cols="50" :name="field.id">-->
    </textarea>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>
