<template>
  <!--root-->
  <div>
    <div class="row" style="display:none">
      <div class="col-md-4">
        <label style="padding: 6px">{{field.field_template.name}}</label>
      </div>
      <div class="col-md-8">
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
      <div class="col-md-8">
        <wysiwyg class="kotak" v-model="content" />
      </div>
    </div>
  </div>
  <!--root-->
</template>
<script>

export default {
  props: ["field"],
  components: {
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
  width: 100% ;
}
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
