<template>
  <div>
    <div class="row" style="display:none">
      <div class="col-md-4">
        <label style="padding: 6px">{{field.name}}</label>
      </div>
      <div class="col-md-6">
        <!--<input type="text" :name="field.id">-->
        <textarea
          style="width: 100%;height: 100px;"
          class="kotak"
          type="text"
          v-model="content"
          :name="field.id"
          :placeholder="field.description"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <label style="padding: 6px">{{field.name}}</label>
      </div>
      <div class="col-md-6">
        <wysiwyg class="kotak" v-model="content" />
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  props: ["field"],
  components: {},
  data: function() {
    return {
      content: ""
    };
  },
  created: function() {
    this.content = this.field.value;
  }
};
</script>

<style>
.kotak {
  padding: 6px;
  margin-bottom: 10px;
  border-color: #eaeaea;
  border-style: solid;
}
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
