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
                      <label>Description</label>
                      <input class="form-control" type="text" v-model="data.description">
                    </div>
                    <div class="form-group">
                      <label>Type</label>
                      <select class="form-control" v-model="data.type">
                        <option disabled value>-Please Select-</option>
                        <option value="business_structure">business structure</option>
                        <option value="mentoring_summary">mentoring summary</option>
                        <option value="scoring">scoring</option>
                        <option value="experiment">experiment</option>
                      </select>
                    </div>
                  </form>
                  <hr>
                </div>

                <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
              </div>
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
import ErrorFlash from "../../errorflash";

export default {
  props: ["templateId", "edit"],
  components: {
    "error-flash": ErrorFlash
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
        type: ""
      }
    };
  },
  created: function() {
    this.getData(this.edit);
  },
  methods: {
    getData: function(edit) {
      if (edit) {
        console.log("edit track data");
        this.getTrack(this.templateId);
      } else {
        console.log("new track data");
      }
    },
    getTrack: function(templateId) {
      auth.getData(this, "/form_template/" + templateId);
    },
    submit: function() {
      auth.postData(this, "/form_template/" + this.templateId, this.data);
    },
    update: function() {
      auth.putData(this, "/form_template/" + this.templateId, this.data);
    }
  }
};
</script>  
<style lang="css">
@import "../modal.css";
</style>