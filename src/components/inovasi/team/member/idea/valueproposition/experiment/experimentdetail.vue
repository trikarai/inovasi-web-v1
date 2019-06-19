<template>
  <div>
    <loading v-show="loading"></loading>
    <section class="content">
      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
      <div class="box">
        <div class="box-body">

          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody style="border-top-style: hidden;">
              <tr v-for="data in reOrderArray(dataExp.fields)">
                <td width="25%">
                  <b>{{data.field_template.name}}</b>
                </td>
                <template v-if="data.attachment">
                    <div v-for="attachment in data.attachment">
                      <img :src="'/inovasi/public/uploads' + attachment.file_meta.file_path">
                      <!-- <img :src="'http://start.mikti.id/inovasi/public/uploads' + attachment.file_meta.file_path"> -->
                    </div>
                </template>  
                <template v-if="data.value != null">
                  <td><span v-html="data.value"></span></td>
                </template>
                <template v-else>
                  <td v-for="option in data.selected_options">{{option.option.name}}</td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="box">
        <div class="box-body">
          <comment></comment>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import auth from "@/httpcontrol";
import Loading from "@/components/loading";
import * as CONFIG from "@/app.config.js";
import alertControl from "@/alertcontrol";
import ErrorFlash from "../../../../../errorflash";
import onSubmit from "@/components/onsubmit";
import Comment from "@/components/inovasi/comment/commentExperiment";

export default {
  props: [],
  data: function() {
    return {
      //        data: {total:0,list:[]},
      aspect: this.$route.query.aspect,
      dataExp: { total: 0, list: [] },
      dataTemplate: { total: 0, list: [] },
      showTemplate: false,
      err_msg: "",
      success: false,
      error: false,
      showForm: false,
      edit: false,
      tutorId: this.$route.params.tutorId,
      teamId: this.$route.params.teamId,
      ideaId: this.$route.params.ideaId,
      customersegmentId: this.$route.params.customersegmentId,
      personaId: this.$route.params.personaId,
      valuepropositionId: this.$route.params.valuepropositionId,
      experimentId: this.$route.params.experimentId,
      templateId: "",
      loading: false,
      template: "",
      onSubmit: false,
      showDetail: false,
      url: "",
      sialan: []
    };
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    comment: Comment,
    onsub: onSubmit
  },
  created: function() {
    this.role = localStorage.getItem("role");
    if (this.role !== "Talent") {
      this.url = "/tutor/" + this.tutorId;
    }
    this.getExperiment();
  },
  computed: {
    
  },
  methods: {
    reOrderArray: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    getExperiment: function() {
      this.loading = true
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition/" +
            this.valuepropositionId +
            "/experiment/" +
            this.experimentId
        )
        .then(
          response => {
            if (response.status === 204) {
              this.dataExp = { total: 0, list: [] };
            } else {
              return response.json();
            }
          },
          error => {
            alertControl.showError(this, error.body.meta);
            this.onSubmit = false;
          }
        )
        .then(data => {
          this.dataExp = data.data
          this.anjingAsu(data.data)
          this.loading = false
        });
    },
    anjingAsu: function(data){
      for(var i in data.fields){
         this.dataExp.fields[i]['position'] = data.fields[i].field_template.position
      }
    }
  }
};
</script>