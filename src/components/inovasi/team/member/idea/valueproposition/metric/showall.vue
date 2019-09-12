<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">
      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg" />

      <div class="box">
        <div class="box-body" style="width: fit-content;min-width: 100%;">
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
              <li class="breadcrumb-item active" aria-current="page">Metric</li>
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
              <li class="breadcrumb-item active" aria-current="page">Metric</li>
            </ol>
          </nav>
          <!--end breadcrumb-->

          <!-- {{javelin}} | {{exptype}} -->

          <!-- {{integrityCheck}} -->

          <ul class="nav nav-tabs">
            <!-- <li class="active">
              <a data-toggle="tab" href="#main">Main</a>
            </li>-->
            <li class="active">
              <a data-toggle="tab" href="#javelinboard">Matrick Summary</a>
            </li>

            <!-- <li v-for="(data, index) in dataTemplate.list">
              <a data-toggle="tab" :href="'#'+index" @click="getExpData(data.id)">{{data.name}}</a>
            </li>-->

            <li v-if="dataTemplate.total != 0">
              <!--Metric-->
              <a
                data-toggle="tab"
                href="#4"
                @click="getExpData(dataTemplate.list[4].id)"
              >{{dataTemplate.list[4].name}}</a>
            </li>

            <!--<li :class="{ 'active': index === 0 }" v-for="(data, index) in dataTemplate.list"><a data-toggle="tab" :href="'#'+index" @click="getExpData(data.id)">{{data.name}}</a></li>-->
          </ul>
          <div class="tab-content" style="width: fit-content;min-width: 100%;">
            <div id="main" class="tab-pane fade in" style="padding:10px;">
              <div class="box-body">Please Select Experiment Tab</div>
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

                      <!-- <tr v-if="reOrderField(dataJavelin.list[0].fields)[4]">
                        <th class="jbth" height="40px">Ratio</th>
                        <td
                          width="200px"
                          v-for="javelin in reOrderDate(dataJavelin.list)"
                        >
                      {{ratio(reOrderField(javelin.fields)[5].value, gcd(reOrderField(javelin.fields)[5].value, reOrderField(javelin.fields)[4].value))}} : {{ratio(reOrderField(javelin.fields)[4].value, gcd(reOrderField(javelin.fields)[5].value, reOrderField(javelin.fields)[4].value))}}-->
                      <!-- GCD : {{gcd(reOrderField(javelin.fields)[5].value, reOrderField(javelin.fields)[4].value)}} -->
                      <!-- <br>
                        </td>
                      </tr>-->

                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[6]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[6].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[6].value)"
                          ></span>
                        </td>
                      </tr>
                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[7]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[7].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[7].value)"
                          ></span>
                        </td>
                      </tr>

                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[8]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[8].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[8].value)"
                          ></span>
                        </td>
                      </tr>
                      <tr v-if="reOrderField(dataJavelin.list[0].fields)[9]">
                        <th
                          style="padding-left:20px;padding-right:20px;"
                          class="jbth"
                          height="70px"
                        >{{reOrderField(dataJavelin.list[0].fields)[9].field_template.name}}</th>
                        <td width="200px" v-for="javelin in reOrderDate(dataJavelin.list)">
                          <span
                            v-html="$options.filters.readMore(reOrderField(javelin.fields)[9].value)"
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
                    Tidak ada data experimen
                  </div>
                </div>
                <div style="margin-top:20px;" v-else>
                  <i class="fa fa-exclamation-triangle"></i>
                  Data Summary tidak terpanggil
                </div>
              </div>
              <!-- {{dataJavelin}} -->
            </div>
            <!--end summary-->

            <!-- <div v-if="dataTemplate.total != 0"> -->
            <div
              v-for="(data, index) in dataTemplate.list"
              :id="index"
              class="tab-pane fade in"
              style="padding:10px;"
            >
              <!--<div v-for="(data, index) in dataTemplate.list" :id="index" :class="{'tab-pane fade in' : true,'active': index === 0}" >-->
              <!--{{dataExp}}-->
              <button
                v-if="index != null"
                class="btn btn-info"
                @click="learning(data.name)"
                style="border-radius: 5px; padding: 2px 8px;"
              >
                <i class="fa fa-info-circle"></i>
                Klik disini apabila kamu ingin mempelajari tentang {{data.name}}
              </button>
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
                          {{data.date | moment("D MMMM YYYY")}}
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
                <div class="box-body" style="padding: 30px" v-else>No {{data.name}} Data</div>
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

    <detail-persona
      v-bind:aspect="template"
      v-if="showDetail"
      @close="showDetail = false"
      @closeModalRefresh="closeModalRefresh()"
    ></detail-persona>

    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
  </div>
</template>


<script>
import auth from "@/httpcontrol";
import Loading from "@/components/loading";
import * as CONFIG from "@/app.config.js";
import alertControl from "@/alertcontrol";
import ErrorFlash from "../../../../../errorflash";
import FormExp from "./newExp";
import onSubmit from "@/components/onsubmit";
import DetailPersona from "./detailExp";
import OnDelete from "@/components/ondelete";

export default {
  data: function() {
    return {
      data: { total: 0, list: [] },
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
      templateId: "",
      loading: false,
      template: "",
      onSubmit: false,
      showDetail: false,
      role: "",
      url: "",
      toconfirm: false,
      confirmId: "",
      act: "",
      summary: false,
      parentCS: "",
      dataLean: false,
      dataSolution: false,
      dataConcierge: { total: 0, list: [] },
      dataInterview: { total: 0, list: [] },
      dataWoZ: { total: 0, list: [] },
      dataJavelin: { total: 0, list: [] },
      exptype: "0",
      javelin: true,
      integrity: true
    };
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    "form-exp": FormExp,
    "detail-persona": DetailPersona,
    onsub: onSubmit,
    ondelete: OnDelete
  },
  created: function() {
    //      this.getData() not used on this function
    this.role = localStorage.getItem("role");
    if (this.role !== "Talent") {
      this.url = "/tutor/" + this.tutorId;
    }
    this.showTemplateExp();
    this.getCustomerSegmentParent();
    // this.getLeanCanvas();
    // this.getSolutionCanvas();
  },
  computed: {
    integrityCheck: function() {
      if (this.dataJavelin.total != 0) {
        for (var i = 0; i < this.dataJavelin.list.length; i++) {
          if (this.dataJavelin.list[i].fields.length < 9) {
            return false;
            break;
          }
        }
      }
      return true;
    }
  },
  watch: {
    exptype: function() {
      switch (this.exptype) {
        case "0":
          // code block
          this.summary = false;
          this.dataJavelin = { total: 0, list: [] };
          this.getConciergeData();
          this.getInterviewData();
          this.getWoZData();
          break;
        case "1":
          // code block
          this.summary = false;
          this.dataJavelin = { total: 0, list: [] };
          this.getConciergeData();
          break;
        case "2":
          // code block
          this.summary = false;
          this.dataJavelin = { total: 0, list: [] };
          this.getInterviewData();
          break;
        case "3":
          // code block
          this.summary = false;
          this.dataJavelin = { total: 0, list: [] };
          this.getWoZData();
          break;
        default:
          // code block
          break;
      }
    }
  },
  methods: {
    gcd: function(a, b) {
      return b == 0 ? a : this.gcd(b, a % b);
    },
    ratio: function(a, gcd) {
      return a / gcd;
    },
    getWholePercent: function(percentFor, percentOf) {
      return Math.floor((percentFor / percentOf) * 100);
    },
    reOrderField: function(params) {
      return _.orderBy(params, "position", "asc");
    },
    reOrderDate: function(params) {
      return _.orderBy(params, "date", "desc");
    },
    getData: function() {
      auth.getData(
        this,
        this.url +
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
          "/experiment"
      );
    },
    loadSummary: function() {
      this.javelin = true;
      this.summary = false;
      this.dataJavelin = { total: 0, list: [] };
      this.getMetricData();
      // switch (this.exptype) {
      //   case "0":
      //     // code block
      //     this.summary = false;
      //     this.dataJavelin = { total: 0, list: [] };
      //     this.getConciergeData();
      //     this.getInterviewData();
      //     this.getWoZData();
      //     break;
      //   case "1":
      //     // code block
      //     this.summary = false;
      //     this.dataJavelin = { total: 0, list: [] };
      //     this.getConciergeData();
      //     break;
      //   case "2":
      //     // code block
      //     this.summary = false;
      //     this.dataJavelin = { total: 0, list: [] };
      //     this.getInterviewData();
      //     break;
      //   case "3":
      //     // code block
      //     this.summary = false;
      //     this.dataJavelin = { total: 0, list: [] };
      //     this.getWoZData();
      //     break;
      //   default:
      //     // code block
      //     break;
      // }
    },
    getCustomerSegmentParent: function() {
      auth
        .getData2(
          this,
          this.url +
            "/team/" +
            this.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(error.body.meta);
          }
        )
        .then(data => {
          this.parentCS = data.data;
          this.loading = false;
          this.summary = true;
        });
    },
    getLeanCanvas: function() {
      this.loading = true;
      var bmc = "Lean Canvas";
      this.dataLean = false;
      auth
        .getData2(
          this,
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
            "/business_structure/template_name/" +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataLean = false;
          }
        )
        .then(data => {
          this.dataLean = data.data;
          this.loading = false;
          this.summary = true;
        });
    },
    getSolutionCanvas: function() {
      this.loading = true;
      var bmc = "Solution";
      this.dataSolution = false;
      auth
        .getData2(
          this,
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
            "/business_structure/template_name/" +
            encodeURI(bmc)
        )
        .then(
          res => {
            console.log(res);
            return res.json();
          },
          error => {
            console.log(error);
            //                  alertControl.showError(error.body.meta)
            this.dataSolution = false;
          }
        )
        .then(data => {
          this.dataSolution = data.data;
          this.loading = false;
          this.summary = true;
        });
    },
    getConciergeData: function() {
      this.onSubmit = true;
      this.templateId = "5e42614e-52aa-4219-94a3-31e3840b4ac9";
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
            this.dataConcierge = data.data;
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
    getInterviewData: function() {
      this.onSubmit = true;
      this.templateId = "d7dd37e2-d6fd-4eb9-ae00-7dd6d178fbe3";
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
            this.dataInterview = data.data;
            this.addToJavelin(data.data);
            this.onSubmit = false;
            this.summary = true;
          } else {
            this.onSubmit = false;
            this.summary = true;
          }
        });
    },
    getMetricData: function() {
      this.onSubmit = true;
      this.templateId = "2caadcad-1481-4485-8e31-6be566dd0a8a";
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
    deleteBS: function(id) {
      auth.deleteData(
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
      );
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
    learning: function(name) {
      let routeData2 = this.$router.resolve({
        path: "/learning",
        query: { type: name }
      });
      window.open(routeData2.href, "_blank");
    }
  }
};
</script>
<style scoped>
/* tab custom */
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:focus,
.nav-tabs > li.active > a:hover {
  border: 3px solid #ddd !important;
  position: relative !important;
  top: 2px !important;
  border-bottom-color: transparent !important;
  background: #f9f9f9;
  z-index: 99;
}
.nav-tabs > li > a {
  position: relative;
  top: 3px;
}
.nav-tabs {
  border-bottom: 3px solid #ddd !important;
  z-index: 999;
  position: relative;
  top: 3px;
}
.tab-content {
  background: #f9f9f9;
  border: 3px solid #ddd;
  border-top-color: transparent;
}
/* tab custom */
#javeboard td {
  background: #fff !important;
  padding: 10px;
}
#javeboard tr {
  border-bottom: 2px solid #e4e4e4;
}
#javeboard .jbth {
  text-align: center;
  background: #efefef;
}
.takadadata {
  background: #e4af4a;
  color: #fff;
  padding: 3px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  display: inline-block;
}
.textless {
  overflow: hidden;
  text-overflow: ellipsis;
  /* display: -webkit-box;               */
  /* The number of lines to be displayed */
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
