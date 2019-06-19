<template>
  <div>
    <label>{{field.field_template.name}}</label>
    <input class="kotak" type="text" :name="field.field_template.id"/>
    <!--<textarea rows="2" cols="50" :name="field.id">-->
    </textarea>
  </div>
</template>
<script>
  export default {
    props: ['field']
  }
</script>
