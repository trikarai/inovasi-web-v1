<template>
  <div class="row">
    <!-- {{field}} -->
    <div class="col-md-4">
      <label>{{field.field_template.name}}</label>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <select
          class="form-control"
          :name="field.field_template.id"
          multiple
          v-if="field.field_template.min_size != 1"
        >
          <option
            :selected="option.is_selected"
            v-for="option in field.field_template.options"
            :value="option.id"
          >{{ option.name }}</option>
        </select>
      </div>

      <div
        class="form-check"
        v-for="option in field.field_template.options"
        v-if="field.field_template.min_size == 1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="field.id"
          :name="field.field_template.id"
          :value="option.id"
          :checked="option.is_selected"
        >
        <label class="form-check-label" for="field.id">{{option.name}}</label>
      </div>
      <!-- <template v-for="option in field.field_template.options">
        <input type="checkbox" :id="field.field_template.id" :name="field.field_template.id" :value="option.id">
        <label for="field.field_template.id">{{option.name}}</label>
      </template>-->
    </div>
  </div>
</template>
<script>
export default {
  props: ["field"],
  created: function() {
    this.rebuildField();
  },
  methods: {
    rebuildField: function() {
      for (var i in this.field.field_template.options) {
        for (var j in this.field.selected_options) {
          if (
            this.field.field_template.options[i].id ==
            this.field.selected_options[j].option.id
          ) {
            this.field.field_template.options[i]["is_selected"] = true;
          }
        }
      }
    }
  }
};
</script>