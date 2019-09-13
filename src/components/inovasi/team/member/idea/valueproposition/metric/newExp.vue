<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

          <div class="modal-body">
            <div class="ui form">
              <div class="field">
                <h2>
                  <template v-if="edit">Ubah {{template.experiment_template.name}}</template>
                  <template v-else>Tambah {{data.name}}</template>
                </h2>
                <div class="garis"></div>
                <div>
                  <div id="dynamicform" v-if="!edit">
                    <div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Nama Percobaan</label>
                        </div>
                        <div class="col-md-6">
                          <input class="kotak" type="text" v-model="obj.name">
                        </div>
                      </div>
                      <div class="row" style="margin-bottom: 10px;">
                        <div class="col-md-4">
                          <label>Tanggal</label>
                        </div>
                        <div class="col-md-6">
                          <!--<input type="date" v-model="obj.date">-->
                          <VueCtkDateTimePicker
                            v-model="obj.date"
                            only-date="true"
                            label
                            format="YYYY-MM-DD"
                            formatted="Do, MMM YYYY"
                          />
                          <!--<datetime format="YYYY-MM-DD" width="245px" v-model="obj.date"></datetime>-->
                        </div>
                      </div>
                      
                      <form id="dynamic-form" :name="1">
                        <input type="hidden" value="hidden">
                        <div v-for="field, index in reOrderField(data.fields)">
                          <fields-comp v-bind:fields="field"></fields-comp>
                        
                        </div>
                      </form>
                      
                    </div>
                  </div>

                  <div id="dynamicform" v-if="edit">
                    <div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Nama Percobaan</label>
                        </div>
                        <div class="col-md-6">
                          <input class="kotak" type="text" v-model="obj.name">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Tanggal</label>
                        </div>
                        <div class="col-md-6">
                          <VueCtkDateTimePicker
                            v-model="obj.date"
                            only-date="true"
                            label
                            format="YYYY-MM-DD"
                            formatted="Do, MMM YYYY"
                          />
                        </div>
                      </div>
                      
                      <form id="dynamic-form" :name="1">
                        <div v-for="field, index in reOrderField(template.fields)">
                          <fields-compe v-bind:fields="field"></fields-compe>
                          
                        </div>
                      </form>
                      
                    </div>
                  </div>

                  <div v-show="!onSubmit">
                    <button
                      v-if="!edit"
                      class="btn btn-default"
                      @click.prevent="submitData()"
                    >Submit</button>
                    <button v-if="edit" class="btn btn-default" @click.prevent="updateData()">Update</button>
                    <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  </div>
                  <onsub v-show="onSubmit"></onsub>
                  <!-- {{obj}} -->
                  <!--{{data2}}-->
                </div>
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
import ErrorFlash from "../../../../../errorflash";
import fieldscomp from "@/components/field/fields";
import fieldscompe from "@/components/fieldedit/fields";
import onSubmit from "@/components/onsubmit";
import datetime from "vuejs-datetimepicker";

export default {
  props: [
    "teamId",
    "ideaId",
    "customersegmentId",
    "personaId",
    "valuepropositionId",
    "experimentId",
    "templateId",
    "edit",
    "template"
  ],
  components: {
    "error-flash": ErrorFlash,
    "fields-comp": fieldscomp,
    "fields-compe": fieldscompe,
    datetime: datetime,
    onsub: onSubmit
  },
  data: function() {
    return {
      data: "",
      show: false,
      err_msg: "",
      error: false,
      success: false,
      obj: {
        name: this.template.name,
        date: this.template.date,
        experiment_template_id: this.templateId,
        data: []
      },
      onSubmit: false
    };
  },
  mounted: function() {},
  created: function() {
    if (!this.edit) {
      this.getForm();
    }else{
      for(var i in this.template.fields){
         this.template.fields[i]['position'] = this.template.fields[i].field_template.position
      }
    }
  },
  methods: {
    reOrderField: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    getForm: function() {
      auth.getData(this, "/team/form_template/" + this.templateId);
    },
    submitData: function() {
      var form = document.getElementById("dynamic-form");
      const data = auth.formToJSON(form.elements);
      this.obj.data = data;
      this.sendPostData(
        this.teamId,
        this.ideaId,
        this.customersegmentId,
        this.personaId,
        this.valuepropositionId
      );
    },
    updateData: function() {
      var form = document.getElementById("dynamic-form");
      const data = auth.formToJSON(form.elements);
      this.obj.data = data;
      this.sendPutData(
        this.teamId,
        this.ideaId,
        this.customersegmentId,
        this.personaId,
        this.valuepropositionId,
        this.template.id
      );
    },
    sendPostData: function(
      teamId,
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId
    ) {
      auth.postData(
        this,
        "/team/" +
          teamId +
          "/idea/" +
          ideaId +
          "/customer_segment/" +
          customersegmentId +
          "/persona/" +
          personaId +
          "/value_proposition/" +
          valuepropositionId +
          "/experiment",
        this.obj
      );
    },
    sendPutData: function(
      teamId,
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId,
      id
    ) {
      auth.putData(
        this,
        "/team/" +
          teamId +
          "/idea/" +
          ideaId +
          "/customer_segment/" +
          customersegmentId +
          "/persona/" +
          personaId +
          "/value_proposition/" +
          valuepropositionId +
          "/experiment/" +
          id,
        this.obj
      );
    }
  }
};
</script>  
<style lang="css" scoped>
@import "../../modal.css";
</style>