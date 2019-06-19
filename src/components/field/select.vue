<template>
  <div class="row">
    <!-- {{field}} -->
    <div class="col-md-4">
      <label>{{field.name}}</label>
    </div>
    <div class="col-md-6">
      <!-- multiple select-->
      <select class="form-control" :name="field.id" multiple v-if="field.min_size != 1">
        <option v-for="option in field.options" :value="option.id">{{ option.name }}</option>
      </select>
      <!-- single select (radio)-->
      <div
        class="form-check"
        v-for="option in field.options"
        v-if="field.min_size == 1"
      >
        <input
          class="form-check-input"
          type="radio"
          :id="field.id"
          :name="field.id"
          :value="option.id"
          :checked="option.is_selected"
        >
        <label class="form-check-label" for="field.id">{{option.name}}</label>
      </div>


    </div>
    <br>
  </div>
</template>
<script>
export default {
  props: ["field"],
  data: function() {
    return {};
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
</style>