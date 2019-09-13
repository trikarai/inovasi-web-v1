<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
            </slot>
          </div>
          <div class="modal-body">
            <div class="ui form">
              <div class="field">
                <div>
                  <form>
                    <div class="form-group">
                      <label>Name</label>
                      <input class="form-control" type="text" v-model="data.name">
                    </div>
                    <div class="form-group">
                      <label>Desc</label>
                      <input class="form-control" type="text" v-model="data.description">
                    </div>
                    <div class="form-group">
                      <label>Type</label>
                      <select class="form-control" v-model="data.field_type" @change="changeType">
                        <option disabled value>-Please Select-</option>
                        <option value="string">String</option>
                        <option value="integer">Integer</option>
                        <option value="select">Select</option>
                        <option value="attachment">Attachment</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Position</label>
                      <input class="form-control" type="number" v-model="data.position">
                    </div>
                    <template v-if="data.field_type == 'integer'">
                      <label>Min Value</label>
                      <input type="number" v-model="data.min_value">
                      <label>Max value</label>
                      <input type="number" v-model="data.max_value">
                    </template>
                    <template v-if="data.field_type == 'select'">
                      <div class="form-group">
                        <div class="row">
                          <div class="col-md-2">
                            <label for="one">Multiple</label>
                          </div>
                          <div class="col-md-4">
                            <input type="radio" id="one" value="1" v-model="data.min_value">
                            <label for="one">No</label>
                            <br>
                            <input type="radio" id="two" value="0" v-model="data.min_value">
                            <label for="two">Yes</label>
                          </div>
                        </div>
                      </div>
                    </template>
                  </form>
                  <hr>
                </div>
              </div>
              <div v-show="!onSubmit">
                <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
              </div>
              <onsub v-show="onSubmit"></onsub>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import auth from "@/httpcontrol";
import ErrorFlash from "../../../errorflash";
import onSubmit from "@/components/onsubmit";

export default {
  props: ["templateId", "fieldId", "edit"],
  components: {
    "error-flash": ErrorFlash,
    onsub: onSubmit
  },
  data: function() {
    return {
      show: false,
      err_msg: "",
      error: false,
      success: false,
      data: {
        name: "",
        description: "",
        position: "",
        min_value: null,
        max_value: null,
        field_type: ""
      },
      onSubmit: false
    };
  },
  created: function() {
    this.getData(this.edit);
  },
  methods: {
    getData: function(edit) {
      if (edit) {
        console.log("edit field data");
        this.getField(this.templateId, this.fieldId);
      } else {
        console.log("new field data");
      }
    },
    getField: function(templateId, fieldId) {
      auth.getData(
        this,
        "/form_template/" + templateId + "/field_template/" + fieldId
      );
    },
    submit: function() {
      auth.postData(
        this,
        "/form_template/" + this.templateId + "/field_template",
        this.data
      );
    },
    update: function() {
      auth.putData(
        this,
        "/form_template/" + this.templateId + "/field_template/" + this.fieldId,
        this.data
      );
    },
    changeType: function() {
      this.data.min_value = null;
      this.data.max_value = null;
    }
  }
};
</script>  
<style lang="css" scoped>
@import "../../modal.css";
</style>