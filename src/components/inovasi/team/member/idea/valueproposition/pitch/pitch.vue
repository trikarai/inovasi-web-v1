<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">
      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg" />
      <div class="box">
        <div class="box-body" id="tebelvipi">
          <!--start breadcrumb-->
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/talent/dashboard'">Beranda</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/talent/team/membership'">Tim</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/team/'+teamId+'/idea/'">Ide</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId"
                >Tipe Pengguna</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/'"
                >Segmen Pelanggan</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId"
                >Empathy Map</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'"
                >Value Proposition</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Data Bisnis</li>
            </ol>
          </nav>
          <nav class="remahroti" aria-label="breadcrumb" v-else>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/personnel/dashboard'">Beranda</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'">Idea</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'"
                >Tipe Pengguna</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/'"
                >Segmen Pelanggan</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId"
                >Empathy Map</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'"
                >Value Proposition</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Data Bisnis</li>
            </ol>
          </nav>
          <!--end breadcrumb-->

          <ul class="nav nav-tabs">
            <li>
              <a @click="getBdata()" data-toggle="tab" href="#bdata">Business Data</a>
            </li>
            <li>
              <a @click="getPitchDeck()" data-toggle="tab" href="#pitch">Pitch Deck</a>
            </li>
          </ul>
          <div class="tab-content" style="width: fit-content;min-width: 100%;">
            <div id="bdata" class="tab-pane fade active" style="padding:10px;">
              <div class="box-body">
                <onsub v-if="onLoadValueCurve"></onsub>
                <dev-bus
                  v-bind:bsformid="bsformid"
                  v-bind:bsname="bsname"
                  v-bind:data="dataBdev"
                  v-bind:dataTemplate="dataTemplate"
                  v-bind:role="role"
                  v-show="!onLoadValueCurve"
                  @closeModalRefresh="closeModalRefreshValuecurve()"
                  @getData="getBdata()"
                ></dev-bus>
              </div>
            </div>
            <div id="pitch" class="tab-pane fade" style="padding:10px;">
              <div class="box-body">
                <onsub v-if="onLoadPitchdeck"></onsub>
                <dev-bus
                  v-bind:bsformid="bsformid"
                  v-bind:bsname="bsname"
                  v-bind:data="dataPitch"
                  v-bind:dataTemplate="dataTemplate"
                  v-bind:role="role"
                  v-show="!onLoadPitchdeck"
                  @closeModalRefresh="closeModalRefreshPitchDeck()"
                  @getData="getPitchDeck()"
                ></dev-bus>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <form-exp
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:templateId="templateId"
      v-bind:template="template"
      v-if="showForm"
      @close="showForm = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-exp>
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
  </div>
</template>
<script>
import auth from "@/httpcontrol";
import Loading from "@/components/loading";
import * as CONFIG from "@/app.config.js";
import alertControl from "@/alertcontrol";
import ErrorFlash from "../../../../../errorflash";
import onSubmit from "@/components/onsubmit";
import OnDelete from "@/components/ondelete";

import FormExp from "../metric/newExp";
import DevBusiness from "../development/components/DevBusiness";

export default {
  data: function() {
    return {
      err_msg: "",
      success: false,
      error: false,
      tutorId: this.$route.params.tutorId,
      teamId: this.$route.params.teamId,
      ideaId: this.$route.params.ideaId,
      customersegmentId: this.$route.params.customersegmentId,
      personaId: this.$route.params.personaId,
      valuepropositionId: this.$route.params.valuepropositionId,
      loading: false,
      role: "",
      url: "",
      url2: "/",
      toconfirm: false,
      confirmId: "",
      act: "",
      dataJavelin: { total: 0, list: [] },
      summary: false,
      dataExp: { total: 0, list: [] },
      dataWoZ: { total: 0, list: [] },
      dataTemplate: { total: 0, list: [] },
      showTemplate: false,
      edit: false,
      templateId: "",
      template: "",
      showForm: false,
      onLoadValueCurve: false,
      onLoadPitchdeck: false,
      dataBdev: false,
      dataPitch: false,
      bsname: "",
      bsformid: ""
    };
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    onsub: onSubmit,
    ondelete: OnDelete,
    "form-exp": FormExp,
    "dev-bus": DevBusiness
  },
  computed: {
    integrityCheck: function() {
      if (this.dataJavelin.total != 0) {
        for (var i = 0; i < this.dataJavelin.list.length; i++) {
          if (this.dataJavelin.list[i].fields.length < 6) {
            return false;
            break;
          }
        }
      }
      return true;
    }
  },
  created: function() {
    this.role = localStorage.getItem("role");
    if (this.role !== "Talent") {
      this.url = "/tutor/" + this.tutorId;
      this.url2 = "?value=";
    }
    this.showTemplateExp();
    // this.getData();
  },
  methods: {
    reOrderField: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    reOrderDate: function(params) {
      return _.orderBy(params, "date", "desc");
    },
    loadSummary: function() {
      this.javelin = true;
      this.summary = false;
      this.dataJavelin = { total: 0, list: [] };
      this.getMetricData();
    },
    closeModalRefresh: function() {
      if (this.javelin) {
        this.showForm = false;
        this.loadSummary();
      } else {
        this.showForm = false;
        this.getExpData(this.templateId);
      }
    },
    showTemplateExp: function() {
      this.showTemplate = true;
      this.$http
        .get(CONFIG.APIENDPOINT + "/team/form_template/experiment", {
          headers: auth.getAuthHeader()
        })
        .then(
          response => {
            return response.json();
          },
          error => {
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.dataTemplate = data.data;
          this.loading = false;
        });
    },
    addExp: function(id) {
      this.showForm = true;
      this.edit = false;
      this.templateId = id;
      this.template = "";
    },
    deleteExp: function(id) {
      this.loading = true;
      auth
        .deleteData2(
          this,
          "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId +
            "/value_proposition/" +
            this.$route.params.valuepropositionId +
            "/experiment/" +
            id
        )
        .then(
          res => {
            console.log(res);
            this.loading = false;
            this.closeModalRefresh();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
            this.loading = false;
          }
        );
    },
    expDetail: function(data) {
      this.template = data;
      this.showDetail = true;
    },
    confirm: function(act, id) {
      this.toconfirm = true;
      this.act = act;
      this.confirmId = id;
    },
    confirmed: function() {
      this.toconfirm = false;
      this.deleteExp(this.confirmId);
    },
    getExpData: function(id) {
      this.javelin = false;
      this.onSubmit = true;
      this.templateId = id;
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
            "/experiment?experiment_template_id[]=" +
            id
        )
        .then(
          response => {
            if (response.status === 204) {
              this.dataExp = { total: 0, list: [] };
              this.onSubmit = false;
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
          this.dataExp = data.data;
          this.onSubmit = false;
        });
    },
    editExp: function(data) {
      this.showForm = true;
      this.edit = true;
      this.template = data;
    },
    getMetricData: function() {
      this.onSubmit = true;
      this.templateId = "71ad288e-1c42-4319-b29f-3e26c4152ae6";
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
            "/experiment?experiment_template_id[]=" +
            this.templateId
        )
        .then(
          response => {
            return response.json();
          },
          error => {
            alertControl.showError(this, error.body.meta);
            this.onSubmit = false;
          }
        )
        .then(data => {
          if (data.data.total != 0) {
            this.dataWoZ = data.data;
            this.addToJavelin(data.data);
            this.onSubmit = false;
            this.summary = true;
          } else {
            this.onSubmit = false;
            this.summary = true;
          }
        });
    },
    addToJavelin: function(data) {
      for (var i in data.list) {
        for (var k in data.list[i].fields) {
          data.list[i].fields[k]["position"] =
            data.list[i].fields[k].field_template.position;
        }
        this.dataJavelin.list.push(data.list[i]);
        this.dataJavelin.total += 1;
      }
    },
    getBdata: function() {
      this.bsformid = "6bafadd0-9d5b-4fc4-94ed-3beb3dfc1575";
      this.onLoadValueCurve = true;
      this.loading = true;
      var bmc = "Business Data";
      this.bsname = bmc;
      this.dataBdev = false;
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
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //alertControl.showError(error.body.meta)
            this.dataBdev = false;
            this.onLoadValueCurve = false;
            this.loading = false;
          }
        )
        .then(data => {
          this.dataBdev = data.data;
          this.onLoadValueCurve = false;
          this.loading = false;
        });
    },
    getPitchDeck: function() {
      this.bsformid = "7d6738e0-c699-4896-abe9-2a23e1fd6b92";
      this.onLoadPitchdeck = true;
      this.loading = true;
      var bmc = "Pitch Deck";
      this.bsname = bmc;
      this.dataBdev = false;
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
            "/business_structure/template_name" +
            this.url2 +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //alertControl.showError(error.body.meta)
            this.dataPitch = false;
            this.onLoadPitchdeck = false;
            this.loading = false;
          }
        )
        .then(data => {
          this.dataPitch = data.data;
          this.onLoadPitchdeck = false;
          this.loading = false;
        });
    },
    closeModalRefreshValuecurve: function() {
      this.onLoadValueCurve = false;
      this.getBdata();
    },
    closeModalRefreshPitchDeck: function() {
      this.onLoadPitchdeck = false;
      this.getPitchDeck();
    }
  }
};
</script>