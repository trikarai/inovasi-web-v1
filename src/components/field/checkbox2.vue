<template>
  <div class="row">
    <div class="col-md-4">
        <label>{{field.name}}</label>
    </div>
    <div class="col-md-6">
      <template v-for="option in field.options">
      <input class="kotak" style="width: 226px;" type="checkbox" :name="field.id" :value="option.id">{{ option.name }}<br>
      </template>
      
<!--        <select :name="field.id + '[]'" multiple>
          <option v-for="option in field.options" :value="option.id"> {{ option.name }} </option>
        </select>-->
    </div>
    <br>
  </div>
</template>
<script>
  export default {
    props: ['field'],
    data: function (){
      return {
      }
    }
  }
</script>

<style>
.kotak {
    padding: 6px;
    margin-bottom: 10px;
    border-color: #eaeaea;
    border-style: solid;

}

</style>