<template>
  <!--root-->
  <div>
    <div class="row" style="display:none">
      <div class="col-md-4">
        <label style="padding: 6px">{{field.field_template.name}}</label>
      </div>
      <div class="col-md-6">
        <textarea
          style="width: 100%;height: 100px;"
          class="kotak"
          type="text"
          :name="field.field_template.id"
          :value="content"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <label style="padding: 6px">{{field.field_template.name}}</label>
      </div>
      <div class="col-md-6">
        <tinymce class="kotak"  @editorInit="e => e.setContent(field.value)" v-model="content" :id="field.field_template.id" toolbar1="'formatselect | bold italic strikethrough forecolor backcolor | link | numlist bullist outdent indent | removeformat'"></tinymce>
      </div>
    </div>
  </div>
  <!--root-->
</template>
<script>
import tinymce from 'vue-tinymce-editor'

export default {
  props: ["field"],
  components: {
    'tinymce' : tinymce
  },
  data: function(){
    return{
      content: ''
    }
  },
  created: function(){
    this.content = this.field.value
  }
};
</script>

<style scoped>
.kotak {
  border: 2px solid #eaeaea;
}
</style>
