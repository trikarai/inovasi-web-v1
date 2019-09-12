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
              <li class="breadcrumb-item active" aria-current="page">Rencana Pengembangan</li>
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
              <li class="breadcrumb-item active" aria-current="page">Rencana Pengembangan</li>
            </ol>
          </nav>
          <!--end breadcrumb-->

          <ul class="nav nav-tabs">
            <li class="active">
              <a data-toggle="tab" href="#javelinboard">Development Summary</a>
            </li>
            <li v-if="dataTemplate.total != 0">
              <!--Metric-->
              <a
                data-toggle="tab"
                href="#5"
                @click="getExpData(dataTemplate.list[5].id)"
              >{{dataTemplate.list[5].name}}</a>
            </li>
            <li>
              <a @click="getBdev()" data-toggle="tab" href="#bdev">Business Development</a>
            </li>
          </ul>
          <div class="tab-content" style="width: fit-content;min-width: 100%;">
            <div id="bdev" class="tab-pane fade" style="padding:10px;">
              <div class="box-body">
                <onsub v-if="onLoadValueCurve"></onsub>
                <dev-bus
                  v-bind:data="dataBdev"
                  v-bind:bsformid="bsformid"
                  v-bind:bsname="bsname"
                  v-bind:dataTemplate="dataTemplate"
                  v-bind:role="role"
                  v-show="!onLoadValueCurve"
                  @closeModalRefresh="closeModalRefreshValuecurve()"
                  @getData="getBdev()"
                ></dev-bus>
              </div>
            </div>
            <div id="javelinboard" class="tab-pane fade in active" style="padding:10px;">
              <div class="box-body">
                <button
                  style="margin: 20px;margin-bottom: 20px;"
                  class="btn btn-default btn-sm"
                  @click="loadSummary()"
                >
                  <i class="fa fa-refresh"></i>
                  Klik untuk
                  <template v-if="dataJavelin.total == 0">memanggil</template>
                  <template v-else>memuat ulang</template>
                  Data Matric Summary
                </button>
                <div v-if="onSubmit">
                  <onsub></onsub>Harap Menunggu, membutuhkan waktu untuk memanggil data
                </div>
                <div v-if="summary" class>
                  <div class="row" v-if="!integrityCheck" style="margin-bottom:20px;">
                    <div
                      class="alert alert-danger"
                      role="alert"
                    >Data Integrity Failure : Please Update/Delete Experiment</div>
                  </div>
                  <br />
                  <table
                    id="javeboard"
                    class="table-striped table-hover tabel-bordered"
                    v-if="dataJavelin.total != 0"
                  >
                    <tbody>
                      <tr>
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          height="70px"
                          width="200px"
                        ></th>
                        <th
                          style="background:#0085a4;text-align:center;padding-left:20px;padding-right:20px;"
                          width="200px"
                          v-for="javelin in reOrderDate(dataJavelin.list)"
                        >
                          <router-link
                            v-if="role === 'Talent'"
                            v-bind:to="{path:'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + valuepropositionId + '/experiment/' + javelin.id, query: {aspect: javelin}}"
                            class="btn btn-info"
                            data-toggle="tooltip"
                            data-placement="top"
                            :title="javelin.name"
                          >
                            <i class="fa fa-search"></i>
                            {{javelin.name | readMoreTh}}
                          </router-link>
                          <router-link
                            v-if="role !== 'Talent'"
                            v-bind:to="{path:'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + valuepropositionId + '/experiment/' + javelin.id, query: {aspect: javelin}}"
                            class="btn btn-info"
                            data-toggle="tooltip"
                            data-placement="top"
                            :title="javelin.name"
                          >
                            <i class="fa fa-search"></i>
                            {{javelin.name | readMoreTh}}
                          </router-link>
                        </th>
                      </tr>
                      <tr>
                        <th class="jbth">Tanggal</th>
                        <td height="70px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            style="color:#0085a4;font-weight:900;"
                          >{{javelin.date | moment("dddd")}}</span>
                          <br />
                          {{javelin.date | moment("MMMM")}}
                          <br />
                          {{javelin.date | moment("Do YYYY")}}
                        </td>
                      </tr>
                      <tr>
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[0].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[0].value)"
                          ></span>
                        </td>
                      </tr>
                      <tr>
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[1].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[1].value)"
                          ></span>
                        </td>
                      </tr>

                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[2]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[2].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[2].value)"
                          ></span>
                        </td>
                      </tr>
                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[3]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[3].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[3].value)"
                          ></span>
                        </td>
                      </tr>

                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[4]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[4].field_template.name}}</th>
                        <template>
                          <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                            <span
                              v-html="$options.filters.readMore(reOrderField(javelin.fields)[4].value)"
                            ></span>
                          </td>
                        </template>
                      </tr>
                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[5]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[5].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[5].value)"
                          ></span>
                        </td>
                      </tr>
                      <!-- edit buttom row-->
                      <tr v-if="role === 'Talent'">
                        <th></th>
                        <td
                          style="text-align:center;"
                          width="200px"
                          v-for="javelin in reOrderDate(dataJavelin.list)"
                        >
                          <button class="btn btn-warning btn-sm" @click="editExp(javelin)">
                            <i class="fa fa-pencil"></i> Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="takadadata" v-else>
                    <i class="fa fa-exclamation-triangle"></i>
                    Tidak ada data development
                  </div>
                </div>
                <div style="margin-top:20px;" v-else>
                  <i class="fa fa-exclamation-triangle"></i>
                  Data Summary tidak terpanggil
                </div>
              </div>
            </div>
            <div
              v-for="(data, index) in dataTemplate.list"
              :id="index"
              class="tab-pane fade in"
              style="padding:10px;"
            >
              <!-- <button
                v-if="index != null"
                class="btn btn-info"
                @click="learning(data.name)"
                style="border-radius: 5px; padding: 2px 8px;"
              >
                <i class="fa fa-info-circle"></i>
                Klik disini apabila kamu ingin mempelajari tentang {{data.name}}
              </button>-->
              <a
                v-if="role === 'Talent'"
                style="margin: 10px"
                class="btn btn-default btn-sm"
                @click="addExp(data.id)"
              >
                <i class="fa fa-plus"></i>
                Tambah {{data.name}} Baru
              </a>

              <div v-show="!onSubmit">
                <div v-if="dataExp.total > 0">
                  <table style="white-space: pre-line" class="table table-hover">
                    <thead>
                      <tr>
                        <th>Nama Eksperimen</th>
                        <th style="width:150px">Tanggal</th>
                        <th colspan="3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in dataExp.list">
                        <td>{{data.name}}</td>
                        <td>
                          <span
                            style="color:#0085a4;font-weight:900;"
                          >{{data.date | moment("dddd")}}</span>
                          <br />
                          {{data.date | moment("D MMMM YY")}}
                        </td>
                        <!--<td><a class="btn btn-info btn-sm" @click="expDetail(data)"><i class="fa fa-asterisk"></i> Detail</a></td>-->
                        <td>
                          <router-link
                            v-if="role === 'Talent'"
                            v-bind:to="{path:'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + valuepropositionId + '/experiment/' + data.id, query: {aspect: data}}"
                            class="btn btn-info btn-sm"
                          >
                            <i class="fa fa-asterisk"></i> Detail
                          </router-link>
                          <router-link
                            v-if="role === 'Personnel'"
                            v-bind:to="{path:'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + valuepropositionId + '/experiment/' + data.id, query: {aspect: data}}"
                            class="btn btn-info btn-sm"
                          >
                            <i class="fa fa-asterisk"></i> Detail
                          </router-link>
                        </td>
                        <td>
                          <a
                            v-if="role === 'Talent'"
                            class="btn btn-warning btn-sm"
                            @click="editExp(data)"
                          >
                            <i class="fa fa-pencil"></i> Ubah
                          </a>
                        </td>
                        <td>
                          <a
                            v-if="role === 'Talent'"
                            class="btn btn-danger btn-sm"
                            @click="confirm('Delete',data.id)"
                          >
                            <i class="fa fa-trash"></i> Hapus
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="box-body" style="padding: 10px" v-else>No {{data.name}} Data</div>
              </div>
              <onsub v-show="onSubmit"></onsub>
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
import DevBusiness from "./components/DevBusiness";

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
      dataBdev: false,
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
    getBdev: function() {
       this.bsformid = "7a9974d1-2b01-4d09-82e0-0015fa69ee42";
      this.onLoadValueCurve = true;
      this.loading = true;
      var bmc = "Business Development";
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
    closeModalRefreshValuecurve: function() {
      this.onLoadValueCurve = false;
      this.getBdev();
    }
  }
};
</script>