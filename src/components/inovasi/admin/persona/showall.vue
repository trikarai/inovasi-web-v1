<template>
  <div>
    <loading v-show="loading"></loading>
    <section class="content">
      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormPersona()">
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
                <td>{{data.type}}</td>
                <td>
                  <a
                    v-if="data.type === 'select'"
                    class="btn btn-default"
                    @click="openOption(data.id)"
                  >Option</a>
                </td>
                <td>
                  <a class="btn btn-default btn-sm" @click="updateField(data.id)">
                    <i class="fa fa-pencil-square-o"></i> update
                  </a>
                </td>
                <td>
                  <a class="btn btn-danger btn-sm" @click="deleteField(data.id)">
                    <i class="fa fa-trash-o"></i> delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-show="showOptionSection">
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
          <div class="box-body" v-else>No Option Referense {{dataOptions}}</div>
        </div>
      </div>

      <form-persona
        v-bind:edit="edit"
        v-bind:personaId="personaId"
        v-if="showForm"
        @close="showForm = false"
        @closeModalRefresh="closeModalRefresh()"
      ></form-persona>

      <form-option
        v-bind:edit="edit"
        v-bind:personaId="personaId"
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
import ErrorFlash from "../../errorflash";
import PersonaForm from "./newPersona";
import OptionForm from "./newOption";
import Loading from "@/components/loading";

export default {
  data: function() {
    return {
      data: {
        total: 0,
        list: []
      },
      dataOptions: {
        total: 0,
        list: []
      },
      err_msg: "",
      success: false,
      error: false,
      showForm: false,
      showFormOption: false,
      edit: false,
      personaId: "",
      optionId: "",
      showOptionSection: false
    };
  },
  components: {
    "error-flash": ErrorFlash,
    "form-persona": PersonaForm,
    "form-option": OptionForm,
    loading: Loading
  },
  created: function() {
    this.getData();
  },
  methods: {
    reOrderArray: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    getData: function() {
      this.data = { total: 0, list: [] };
      auth.getData(this, "/persona_aspect");
    },
    showFormPersona: function() {
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
      this.personaId = id;
    },
    updateOption: function(id) {
      this.showFormOption = true;
      this.edit = true;
      this.optionId = id;
    },
    deleteField: function(id) {
      auth.deleteData2(this, "/persona_aspect/" + id).then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    },
    deleteOption: function(id) {
      auth.deleteData(
        this,
        "/persona_aspect/" + this.personaId + "/skill_reference/" + id
      );
    },
    closeModalRefresh: function() {
      this.showForm = false;
      this.getData();
    },
    closeModalRefreshOption: function() {
      this.showFormOption = false;
      this.openOption(this.personaId);
    },
    openOption: function(personaId) {
      this.showOptionSection = true;
      this.personaId = personaId;
      this.dataOptions = [];
      auth
        .getData2(this, "/persona_aspect/" + personaId + "/option")
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