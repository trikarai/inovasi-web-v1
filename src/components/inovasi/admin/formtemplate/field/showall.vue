<template>
  <div>
    <section class="content">
      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormField()">
        <span class="glyphicon glyphicon-plus-sign"></span> Add New Field
      </a>

      <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->

      <div class="box" v-show="!error">
        <div class="box-body">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Position</th>
                <th>min Value</th>
                <th>max Value</th>
                <th>Type</th>
                <th colspan="3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in reOrderArray(data.list)">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td>{{data.position}}</td>
                <td>{{data.min_value}}</td>
                <td>{{data.max_value}}</td>
                <td>{{data.field_type}}</td>
                <td>
                  <a
                    v-if="data.field_type === 'select'"
                    class="btn btn-default"
                    @click="openOption(data.id)"
                  >Option</a>
                </td>
                <td>
                  <a class="btn btn-default" @click="updateField(data.id)">update</a>
                </td>
                <td>
                  <a class="btn btn-warning" @click="deleteField(data.id)">delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-show="showOptionSection" id="second">
          <a class="btn btn-default" @click="showOptionSection = false">Close</a>
          <a class="btn btn-default" @click="showOptionForm()">
            <span class="glyphicon glyphicon-plus-sign"></span> Add New Option
          </a>
          <div class="box-body" v-if="dataOptions.total > 0">
            <table class="table">
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Position</th>
                  <th colspan="2"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataOptions.list">
                  <td>{{data.name}}</td>
                  <td>{{data.position}}</td>
                  <td>
                    <a class="btn btn-default" @click="updateOption(data.id)">update</a>
                  </td>
                  <td>
                    <a class="btn btn-warning" @click="deleteOption(data.id)">delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="box-body" v-else>No Option Referense</div>
        </div>
      </div>

      <form-field
        v-bind:edit="edit"
        v-bind:templateId="templateId"
        v-bind:fieldId="fieldId"
        v-if="showForm"
        @close="showForm = false"
        @closeModalRefresh="closeModalRefresh()"
      ></form-field>

      <form-option
        v-bind:edit="edit"
        v-bind:templateId="templateId"
        v-bind:fieldId="fieldId"
        v-bind:optionId="optionId"
        v-if="showFormOption"
        @close="showFormOption = false"
        @closeModalRefresh="closeModalRefreshOption()"
      ></form-option>
    </section>
  </div>
</template>  


<script>
import auth from "@/httpcontrol";
import * as CONFIG from "@/app.config.js";
import alertControl from "@/alertcontrol";
import ErrorFlash from "../../../errorflash";
import FieldForm from "./newField";
import OptionForm from "./newOption";

export default {
  data: function() {
    return {
      data: { total: 0, list: [] },
      dataOptions: { total: 0, list: [] },
      err_msg: "",
      success: false,
      error: false,
      showForm: false,
      showFormOption: false,
      edit: false,
      templateId: this.$route.params.templateId,
      fieldId: "",
      optionId: "",
      showOptionSection: false
    };
  },
  components: {
    "error-flash": ErrorFlash,
    "form-option": OptionForm,
    "form-field": FieldForm
  },
  created: function() {
    this.getData();
  },
  computed: {
    reOrderArrayList: function() {
      return _.orderBy(this.data.list, "position", "asc");
    }
  },
  methods: {
    reOrderArray: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    getData: function() {
      auth.getData(
        this,
        "/form_template/" + this.templateId + "/field_template"
      );
    },
    showFormField: function() {
      this.showForm = true;
      this.edit = false;
    },
    showOptionForm: function() {
      this.showFormOption = true;
      this.edit = false;
    },
    updateField: function(id) {
      this.showForm = true;
      this.edit = true;
      this.fieldId = id;
    },
    updateOption: function(id) {
      this.showFormOption = true;
      this.edit = true;
      this.optionId = id;
    },
    deleteField: function(id) {
      auth.deleteData(
        this,
        "/form_template/" + this.templateId + "/field_template/" + id
      );
    },
    deleteOption: function(id) {
      auth.deleteData(
        this,
        "/form_template/" +
          this.templateId +
          "/field_template/" +
          this.fieldId +
          "/option/" +
          id
      );
    },
    closeModalRefresh: function() {
      this.showForm = false;
      this.getData();
    },
    closeModalRefreshOption: function() {
      this.showFormOption = false;
      this.openOption(this.fieldId);
    },
    openOption: function(fieldId) {
      this.showOptionSection = true;
      this.fieldId = fieldId;
      this.dataOptions = [];
      this.$http
        .get(
          CONFIG.APIENDPOINT +
            "/form_template/" +
            this.templateId +
            "/field_template/" +
            fieldId +
            "/option_template",
          { headers: auth.getAuthHeader() }
        )
        .then(
          response => {
            return response.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.dataOptions = data.data;
        });
    }
  }
};
</script>  