<template>
  <div class="container-fluid" style="position: relative;right: 30px;margin-top: 25px;">
    <div
      v-if="invitationCount != '0'"
      class="alert alert-info"
      @click="$router.replace('/talent/team/membership')"
    >
      <strong>Info!</strong> You got
      <b>{{invitationCount}}</b> team invitation.
    </div>
    <!--row card start-->

    <div class="row">
      <!--card idea start-->
      <div class="col-lg-3 col-sm-6">
        <div class="col-md-12">
          <div class="carddb" v-if="teamId != ''">
            <div class="content-carddb">
              <div class="row">
                <div class="col-xs-5">
                  <div class="icon-big icon-bekup text-center">
                    <div>
                      <i class="fa fa-lightbulb-o"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-7">
                  <div class="numbers">
                    <p>Idea</p>Ide
                  </div>
                </div>
              </div>
              <div class="footer">
                <hr>
                <div class="stats">
                  <i class="fa fa-search"></i>
                  <router-link :to="'/team/'+teamId+'/idea'" class="info-a link link--kumya">
                    <span style="font-size:9px" data-letters="Lihat Ide">Lihat Ide</span>
                  </router-link>
                  <!-- <div v-if='!mainIdea.total == 0'>
                          <i class="fa fa-plus-circle" style="margin-left: 20px;"></i>
                            <div @click="addIdea()" class="info-a link link--kumya">
                            <span style="font-size:9px;cursor: pointer" data-letters="Add Idea">Add Idea</span>
                            </div>
                      </div>
                      <div v-else>
                          <i class="fa fa-plus-circle" style="margin-left: 20px;"></i>
                            <div @click="addIdea()" class="info-a link link--kumya">
                            <span style="font-size:9px;cursor: pointer" data-letters="Add Idea">Add Idea</span>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--card idea end-->
      <!--card feedback start-->
      <div class="col-lg-3 col-sm-6">
        <div class="col-md-12">
          <div class="carddb" v-if="teamId != ''">
            <div class="content-carddb">
              <div class="row">
                <div class="col-xs-5">
                  <div class="icon-big icon-bekup text-center">
                    <div>
                      <i class="fa fa-comment"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-7">
                  <div class="numbers">
                    <p>Feedback</p>Masukan
                  </div>
                </div>
              </div>
              <div class="footer">
                <hr>
                <div class="stats">
                  <i class="fa fa-search"></i>
                  <router-link :to="'/team/'+teamId+'/comments'" class="info-a link link--kumya">
                    <span style="font-size:9px" data-letters="Lihat Masukan">Lihat Masukan</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--card feedback end-->
      <!--card mentoring start-->
      <div class="col-lg-3 col-sm-6">
        <div class="col-md-12">
          <div class="carddb" v-if="teamId != ''">
            <div class="content-carddb">
              <div class="row">
                <div class="col-xs-5">
                  <div class="icon-big icon-bekup text-center">
                    <div>
                      <i class="fa fa-comments"></i>
                    </div>
                  </div>
                </div>
                <div class="col-xs-7">
                  <div class="numbers">
                    <p>Mentoring</p>Mentoring
                  </div>
                </div>
              </div>
              <div class="footer">
                <hr>
                <div class="stats">
                  <i class="fa fa-calendar-o" style="margin-left: 20px;"></i>
                  <a href="#" @click="$emit('propose')" class="info-a link link--kumya">
                    <span style="font-size:9px" data-letters="Ajukan Mentoring">Ajukan Mentoring</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--card mentoring end-->
    </div>
    <!-- row card end-->

    <!--load dashboard start-->
    <onsub style="margin-left:30px" v-show="loadCS"></onsub>
    <!-- {{mainDashboard}} -->
    <div v-show="!loadCS" v-if="teamId != ''">
      <!-- dash start-->
      <div class="ideutm" style="padding: 16px;" v-if="mainDashboard.total == 0">
        No
        <b>Main Idea</b> Found from this Team, please choose another team or
        <div
          class="btn btn-info"
          @click="addIdea()"
          style="font-size:9px;cursor: pointer"
          data-letters="Add Idea"
        >
          <i class="fa fa-plus"></i> Add Idea
        </div>
      </div>
      <!----------------->
      <div v-else>
        <div class="container-fluid">
          <div class="carddb" style="padding: 30px;">
            <div style="margin-bottom: 20px">
              <h3>Daftar Segmen Pelanggan</h3>
              <div class="garis"></div>
              <div class="row">
                <div class="col-md-4" style="width: 150px;">
                  <b>Nama Ide</b>
                </div>
                <div class="col-md-8">{{mainDashboard.name}}</div>
              </div>
              <div class="row">
                <div class="col-md-4" style="width: 150px;">
                  <b>Elevator Pitch</b>
                </div>
                <div class="col-md-8" style="text-align: justify;">{{mainDashboard.description}}</div>
              </div>
            </div>
            <!--            <hr>-->
            <template v-if="mainDashboard.hasOwnProperty('customer_segments')">
              <div v-if="mainDashboard.customer_segments.length > 0">
                <template v-for="(cs,index) in mainDashboard.customer_segments">
                  <div class="panel putama">
                    <div class="pgreen">
                      <router-link
                        class="btn btn-vp tambahan"
                        v-bind:to="'/team/'+ teamId + '/idea/'+ mainDashboard.id + '/cs/' + cs.id + '/persona/'"
                      >
                        <i class="fa fa-user-circle"></i>
                        {{cs.name}}
                      </router-link>
                    </div>
                    <div class="panel-body pscale">
                      <p style="margin-bottom: 25px;">
                        <b>Deskripsi :</b>
                        <br>
                        <span style="color: #6f6f6f">{{cs.description}}</span>
                      </p>

                      <template v-if="cs.hasOwnProperty('main_persona')">
                        <div class="row row-eq-height col-md-12">
                          <div
                            id="persona"
                            class="col-md-3 carddb"
                            style="background: #efefef;padding: 20px;margin-right: 10px"
                          >
                            <router-link
                              v-bind:to="'/team/'+ teamId + '/idea/'+ mainDashboard.id + '/cs/' + cs.id + '/persona/' + cs.main_persona.id + '/vp'"
                            >
                              <h3 style="text-align: center;color:black;">
                                Tipe Pengguna
                                <span
                                  class="fa fa-search btn btn-sm btn-default"
                                  style="font-size: 15px;"
                                ></span>
                              </h3>
                            </router-link>
                            <div class="garist" style="text-align: center"></div>
                            <div class>
                              <div
                                class="text-concat"
                                style="padding-left: 15px;padding-right: 15px; color: #6f6f6f;margin-bottom:10px;"
                              >{{cs.main_persona.name}} - {{cs.main_persona.description}}</div>
                            </div>
                            <div class="panel-group" :id="'accordion'+index">
                              <div
                                class="panel panel-default"
                                v-for="aspect in cs.main_persona.aspect.slice(0,4)"
                              >
                                <div class="panel-heading">
                                  <h4 class="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      :data-parent="'#accordion'+index"
                                      :href="'#'+aspect.id"
                                    >{{aspect.field_template.name}}</a>
                                  </h4>
                                </div>
                                <div :id="aspect.id" class="panel-collapse collapse out">
                                  <div class="panel-body bisaenter"><span v-html="aspect.value"></span></div>
                                </div>
                              </div>
                            </div>

                            <div style="margin-top:45px;">
                              <div id="button-group" class="pbuttonk">
                                <a
                                  class="btn btn-default tambahan"
                                  @click="updatePersona(mainDashboard.id, cs.id, cs.main_persona)"
                                >
                                  <i class="fa fa-pencil-square"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div
                            id="paingain"
                            class="col-md-3 carddb"
                            style="background: #efefef;padding: 20px;margin-right: 10px"
                          >
                            <h3 style="text-align: center;color:black;">Pain & Gain</h3>
                            <div class="garist" style="text-align: center"></div>
                            <div
                              class="row text-concat"
                              style="padding-left: 15px;padding-right: 15px; color: #6f6f6f;margin-bottom:10px;"
                            >Goal - <span v-html="cs.main_persona.aspect[4].value"></span></div>
                            <div class="panel-group" :id="'accordion2'+index">
                              <div
                                class="panel panel-default"
                                v-for="aspect in cs.main_persona.aspect.slice(5,10)"
                              >
                                <div class="panel-heading">
                                  <h4 class="panel-title">
                                    <a
                                      data-toggle="collapse"
                                      :data-parent="'#accordion2'+index"
                                      :href="'#'+aspect.id"
                                    >{{aspect.field_template.name}}</a>
                                  </h4>
                                </div>
                                <div :id="aspect.id" class="panel-collapse collapse out">
                                  <div class="panel-body bisaenter"><span v-html="aspect.value"></span></div>
                                </div>
                              </div>
                            </div>
                            <div style="background: transparent;height: 18px;"></div>
                            <div id="button-group" class="pbuttonk">
                              <a
                                v-if="cs.main_persona.hasOwnProperty('active_value_proposition')"
                                class="btn btn-danger"
                                @click="validateMe('Interview', mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id)"
                              >
                                <i class="fa fa-check"></i> Validasi
                              </a>
                              <a
                                class="btn btn-default tambahan"
                                @click="updatePersona(mainDashboard.id, cs.id, cs.main_persona)"
                              >
                                <i class="fa fa-pencil-square"></i>
                              </a>
                            </div>
                          </div>
                          <!-- Value Proposition check-->
                          <template
                            v-if="cs.main_persona.hasOwnProperty('active_value_proposition')"
                          >
                            <div
                              id="valueproposition"
                              class="col-md-3 carddb"
                              style="background: #efefef;padding: 20px;margin-right: 10px"
                            >
                              <h3 style="text-align: center;color:black;">Value Proposition</h3>
                              <div class="garist" style="text-align: center"></div>
                              <div
                                class="row"
                                style="padding-left: 15px;padding-right: 15px;color: #6f6f6f;margin-bottom:10px;word-break: break-all"
                              >{{cs.main_persona.active_value_proposition.description}}</div>
                              <!--tombol bisnis analisis     -->
                              <div style="margin-bottom: 40px">
                                <router-link
                                  class="btn btn-vp btn-sm"
                                  v-bind:to="'/team/'+ teamId + '/idea/'+ mainDashboard.id + '/cs/' + cs.id + '/persona/' + cs.main_persona.id + '/vp/' + cs.main_persona.active_value_proposition.id + '/businessstructure#vp'"
                                >
                                  <i class="fa fa-sitemap"></i> Analisa Bisnis
                                </router-link>
                                <br>
                                <!-- <router-link
                                  style="margin-top:5px;"
                                  class="btn btn-vp btn-sm"
                                  v-bind:to="'/team/'+ teamId + '/idea/'+ mainDashboard.id + '/cs/' + cs.id + '/persona/' + cs.main_persona.id + '/vp/' + cs.main_persona.active_value_proposition.id + '/competitor'"
                                >
                                  <i class="fa fa-trophy"></i> Competitor
                                </router-link>
                                <br> -->
                                <router-link
                                  style="margin-top:5px;"
                                  class="btn btn-vp btn-sm"
                                  v-bind:to="'/team/'+ teamId + '/idea/'+ mainDashboard.id + '/cs/' + cs.id + '/persona/' + cs.main_persona.id + '/vp/' + cs.main_persona.active_value_proposition.id + '/experiment'"
                                >
                                  <i class="fa fa-thermometer-2"></i> Percobaan Bisnis
                                </router-link>
                              </div>

                              <div id="button-group" class="pbuttonk">
                                <a
                                  class="btn btn-danger"
                                  @click="validateMe('Pitch', mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id)"
                                >
                                  <i class="fa fa-check"></i> Validasi
                                </a>
                                <a
                                  class="btn btn-default tambahan"
                                  @click="updateVP(mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id)"
                                >
                                  <i class="fa fa-pencil-square"></i>
                                </a>
                                <a
                                  class="btn btn-warning tambahan"
                                  @click="confirmVP('Delete', mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id)"
                                >
                                  <i class="fa fa-trash"></i>
                                </a>
                              </div>
                            </div>

                            <div
                              id="solution"
                              class="col-md-3 carddb"
                              style="background: #efefef;padding: 20px"
                              v-if="cs.main_persona.active_value_proposition.hasOwnProperty('business_structure')"
                            >
                              <h3 style="text-align: center;color:black;;margin-right: 10px">
                                <div
                                  class="row"
                                >{{cs.main_persona.active_value_proposition.business_structure.business_structure_template.name}}</div>
                              </h3>

                              <div class="garist"></div>

                              <div
                                class="row text-concat"
                                style="padding-left: 15px;padding-right: 15px; color: #6f6f6f;margin-bottom:10px;"
                              >{{cs.main_persona.active_value_proposition.business_structure.fields[0].field_template.name}} - <span v-html="cs.main_persona.active_value_proposition.business_structure.fields[0].value"></span></div>
                              <div class="panel-group" :id="'accordion3'+index">
                                <div
                                  class="panel panel-default"
                                  v-for="data in cs.main_persona.active_value_proposition.business_structure.fields.slice(1,3)"
                                >
                                  <div class="panel-heading">
                                    <h4 class="panel-title">
                                      <a
                                        data-toggle="collapse"
                                        :data-parent="'#accordion3'+index"
                                        :href="'#'+data.id"
                                      >{{data.field_template.name}}</a>
                                    </h4>
                                  </div>
                                  <div :id="data.id" class="panel-collapse collapse out">
                                    <div class="panel-body bisaenter"><span v-html="data.value"></span></div>
                                  </div>
                                </div>
                              </div>

                              <div id="button-group" class="pbuttonk">
                                <a
                                  class="btn btn-danger"
                                  @click="validateMe('Concierge', mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id)"
                                >
                                  <i class="fa fa-check"></i> Validasi
                                </a>
                                <a
                                  class="btn btn-default tambahan"
                                  @click="updateBS(mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id, cs.main_persona.active_value_proposition.business_structure)"
                                >
                                  <i class="fa fa-pencil-square"></i>
                                </a>
                                <a
                                  class="btn btn-warning tambahan"
                                  @click="confirmBS('Delete', mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id, cs.main_persona.active_value_proposition.business_structure.id)"
                                >
                                  <i class="fa fa-trash"></i>
                                </a>
                              </div>
                            </div>
                            <div id="solution" class="col-md-3" v-else>
                              <h4>
                                If u have
                                <b>solution</b>,
                                <br>please click button below
                              </h4>
                              <hr>
                              <!--{{solutionTemplate}}-->
                              <div id="button-group" v-if="solutionTemplate.total != 0">
                                <a
                                  class="btn btn-default tambahan"
                                  @click="showFormBS(mainDashboard.id, cs.id, cs.main_persona.id, cs.main_persona.active_value_proposition.id, solutionTemplate.id)"
                                >
                                  <i class="fa fa-plus"></i>
                                </a>
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div id="valueproposition" class="col-md-3">
                              <h4>
                                No
                                <b>Value Proposition</b>,
                                <br>please click button below
                              </h4>
                              <hr>
                              <div id="button-group pbuttonk">
                                <a
                                  class="btn btn-default tambahan"
                                  @click="showFormVP(mainDashboard.id, cs.id, cs.main_persona.id)"
                                >
                                  <i class="fa fa-plus"></i>
                                </a>
                              </div>
                            </div>
                          </template>
                          <!-- Value Proposition check end-->
                        </div>
                      </template>
                      <!--main persona-->

                      <template v-else>
                        <div class="row row-eq-height">
                          <div id="persona" class="col-md-3">
                            <h4>
                              No
                              <b>Persona(Tipe Pengguna)</b> Found,
                              <br>please create first
                            </h4>
                            <hr>
                            <div id="button-group pbuttonk">
                              <a
                                class="btn btn-info tambahan"
                                @click="showFormPersona(mainDashboard.id, cs.id)"
                              >
                                <i class="fa fa-plus"></i> Buat Tipe Pengguna Baru
                              </a>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </template>
                <a class="btn btn-info" @click="showFormCS(mainDashboard.id)">
                  <i class="fa fa-plus"></i> Buat Segmen Pelanggan Baru
                </a>
              </div>
              <div v-else>No Customer Segment found from this idea</div>
            </template>
            <template v-else>
              <h4>No Customer Segment found from this idea.</h4>
              <router-link
                class="btn btn-sm btn-info"
                :to="'/team/'+teamId+'/idea/' + mainDashboard.id + '/cs'"
              >
                <i class="fa fa-plus"></i> Buat Segmen Pelanggan Baru
              </router-link>
            </template>
          </div>
        </div>
      </div>
      <!--dash end-->
    </div>
    <!--load dashboard end -->

    <!-- modal component start-->

    <form-idea
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-if="showFormIdea"
      @close="showFormIdea = false"
      @closeModalRefresh="closemodalrefresh()"
    ></form-idea>

    <form-cs
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-if="shownewFormCS"
      @close="shownewFormCS = false"
      @closeModalRefresh="closemodalrefresh()"
    ></form-cs>

    <form-persona
      v-bind:template="template"
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-if="shownewFormPersona"
      @close="shownewFormPersona = false"
      @closeModalRefresh="closemodalrefresh()"
    ></form-persona>
    <form-vp
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-if="shownewFormVP"
      @close="shownewFormVP = false"
      @closeModalRefresh="closemodalrefresh"
    ></form-vp>

    <form-bs
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:templateId="templateId"
      v-if="showFormNewBS"
      @close="showFormNewBS = false"
      @closeModalRefresh="closemodalrefresh"
    ></form-bs>

    <form-ebs
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:template="template"
      v-if="showFormEditBS"
      @close="showFormEditBS = false"
      @closeModalRefresh="closemodalrefresh"
    ></form-ebs>

    <form-exp
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:templateName="templateName"
      v-if="showFormValidate"
      @close="showFormValidate = false"
      @closeModalRefresh="closemodalrefresh"
    ></form-exp>

    <!-- modal component end-->

    <!-- modal delete start-->
    <ondelete
      v-if="toconfirmpersona"
      @close="toconfirmpersona = false"
      v-bind:act="act"
      @confirmed="confirmedPersona"
    ></ondelete>
    <ondelete
      v-if="toconfirmvp"
      @close="toconfirmvp = false"
      v-bind:act="act"
      @confirmed="confirmedVP"
    ></ondelete>
    <ondelete
      v-if="toconfirmbs"
      @close="toconfirmbs = false"
      v-bind:act="act"
      @confirmed="confirmedBS"
    ></ondelete>
    <!-- modal delete end-->
  </div>
</template>

<script>
import auth from "@/httpcontrol";
import onSubmit from "@/components/onsubmit";
import OnDelete from "@/components/ondelete";
import Loading from "@/components/loading";

// form
import FormIdea from "../../../inovasi/team/member/idea/newIdea";
import FormCS from "../../../inovasi/team/member/idea/customersegment/newCS";
import FormPersona from "../../../inovasi/team/member/idea/persona/newPersona";
import FormVP from "../../../inovasi/team/member/idea/valueproposition/newVP";
import FormBS from "../../../inovasi/team/member/idea/valueproposition/businessstructure/newBS";
import FormExp from "../validate";
import EditBS from "../../../inovasi/team/member/idea/valueproposition/businessstructure/editBS";

export default {
  props: ["teamId", "invitationCount", "loadingProgram", "dataProgram"],
  data: function() {
    return {
      //state
      loading: false,
      loadCS: false,
      //dashboard
      csId: "",
      csIndex: "",
      mainDashboard: { total: 0, list: [] },
      solutionTemplate: { total: 0, list: [] },
      //id
      ideaId: "",
      customersegmentId: "",
      personaId: "",
      valuepropositionId: "",
      businessstructureId: "",
      edit: false,
      template: "",
      templateId: "",
      //modal state
      showFormIdea: false,
      shownewFormCS: false,
      shownewFormPersona: false,
      shownewFormVP: false,
      showFormNewBS: false,
      showFormEditBS: false,
      showFormValidate: false,
      //delete
      toconfirmpersona: false,
      toconfirmvp: false,
      toconfirmbs: false,
      confirmId: "",
      act: ""
    };
  },
  components: {
    onsub: onSubmit,
    loading: Loading,
    ondelete: OnDelete,
    "form-idea": FormIdea,
    "form-cs": FormCS,
    "form-persona": FormPersona,
    "form-vp": FormVP,
    "form-bs": FormBS,
    "form-ebs": EditBS,
    "form-exp": FormExp
  },
  watch: {
    teamId: function() {
      this.getDashboard();
    }
  },
  created: function() {
    this.getSolutionTemplate();
  },
  methods: {
    closemodalrefresh: function() {
    this.showForm = false;
    this.showFormIdea = false;
    this.showFormValidate = false;
    this.shownewFormCS = false;
    this.shownewFormPersona = false;
    this.shownewFormVP = false;
    this.showFormEditBS = false;
    this.showFormNewBS = false;
    this.toconfirmvp = false;
    this.toconfirmpersona = false;
    this.toconfirmbs = false;
    this.loading = true;
    this.getDashboard();
  },
    confirmedVP: function() {
      this.toconfirmvp = false;
      this.deleteVP();
    },
    showFormBS: function(
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId,
      templateId
    ) {
      this.showFormNewBS = true;
      this.edit = false;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.valuepropositionId = valuepropositionId;
      this.templateId = templateId;
    },
    getSolutionTemplate: function() {
      auth
        .getData2(this, "/team/form_template/business_structure/Solution")
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(data => {
          this.solutionTemplate = data.data;
        });
    },
    confirmBS: function(
      act,
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId,
      businessstructureId
    ) {
      this.toconfirmbs = true;
      this.act = act;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.valuepropositionId = valuepropositionId;
      this.businessstructureId = businessstructureId;
    },
    confirmVP: function(
      act,
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId
    ) {
      this.toconfirmvp = true;
      this.act = act;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.valuepropositionId = valuepropositionId;
    },
    validateMe: function(
      act,
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId
    ) {
      this.showFormValidate = true;
      this.templateName = act;
      this.edit = false;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.valuepropositionId = valuepropositionId;
    },
    updateBS: function(
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId,
      template
    ) {
      this.showFormEditBS = true;
      this.edit = true;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.valuepropositionId = valuepropositionId;
      this.template = template;
    },
    getDashboard: function() {
      this.csId = "";
      this.csIndex = 0;
      this.loadCS = true;
      auth
        .getData2(
          this,
          "/team/" + this.teamId + "/dashboard?template_name=Solution"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(data => {
          this.mainDashboard = data.data;
          this.loadCS = false;
          this.loading = false;
        });
    },
    addIdea: function() {
      this.showFormIdea = true;
      this.edit = false;
    },
    showFormCS: function(ideaId) {
      this.ideaId = ideaId;
      this.shownewFormCS = true;
      this.edit = false;
    },
    showFormPersona: function(ideaId, customersegmentId) {
      this.shownewFormPersona = true;
      this.edit = false;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.template = "";
    },
    updatePersona: function(ideaId, customersegmentId, data) {
      this.shownewFormPersona = true;
      this.edit = true;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.template = data;
    },
    showFormVP: function(ideaId, customersegmentId, personaId) {
      this.shownewFormVP = true;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.edit = false;
    },
    updateVP: function(
      ideaId,
      customersegmentId,
      personaId,
      valuepropositionId
    ) {
      this.shownewFormVP = true;
      this.edit = true;
      this.ideaId = ideaId;
      this.customersegmentId = customersegmentId;
      this.personaId = personaId;
      this.valuepropositionId = valuepropositionId;
    }
  },
  confirmPersona: function(act, ideaId, customersegmentId, personaId) {
    this.toconfirmpersona = true;
    this.act = act;
    this.ideaId = ideaId;
    this.customersegmentId = customersegmentId;
    this.personaId = personaId;
  },
  confirmedPersona: function() {
    this.toconfirmpersona = false;
    this.deletePersona();
  },

  confirmedBS: function() {
    this.toconfirmBS = false;
    this.deleteBS();
  },
  deletePersona: function() {
    this.loading = true;
    auth
      .deleteData2(
        this,
        "/team/" +
          this.teamId +
          "/idea/" +
          this.ideaId +
          "/customer_segment/" +
          this.customersegmentId +
          "/persona/" +
          this.personaId
      )
      .then(
        response => {
          console.log(response);
          this.closemodalrefresh();
        },
        error => {
          console.log(error);
          //   alertControl.showError(this, error.body.meta);
          this.loading = false;
        }
      );
  },
  deleteVP: function() {
    this.loading = true;
    auth
      .deleteData2(
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
          this.valuepropositionId
      )
      .then(
        res => {
          console.log(res);
          this.closemodalrefresh();
        },
        error => {
          console.log(error);
          //   alertControl.showError(this, error.body.meta);
          this.loading = false;
        }
      );
  },
  deleteBS: function(id) {
    this.loading = true;
    auth
      .deleteData2(
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
          "/business_structure/" +
          this.businessstructureId
      )
      .then(
        res => {
          console.log(res);
          this.closemodalrefresh();
        },
        error => {
          console.log(error);
          //   alertControl.showError(this, error.body.meta);
          this.loading = false;
        }
      );
  }
};
</script>
<style scoped>
.row.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.cteamd {
  background: #e4e4e4;
  /*        color: #fff;*/
  display: inline-block;
  padding: 13px;
  text-align: center;
  border-left-width: thick;
  border-left-color: #8bc751;
  border-left-style: solid;
}
.pgreen {
  color: #fff;
  /*        background-color: #8bc751;*/
  background-color: #efefef;
  /*        border-color: #8bc751;*/
  border-color: #efefef;
  padding: 6px;
}
.putama {
  border-color: #efefef;
}
.garis {
  display: block;
  width: 45px;
  height: 5px;
  background: #8bc751;
  margin-bottom: 10px;
}
.garist {
  width: 45px;
  height: 5px;
  background: #8bc751;
  margin-bottom: 20px !important;
  margin: 0 auto;
}
.text-concat {
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.5em;
  line-height: 1.2em;
  /*      text-align:justify;*/
}
.tex {
  position: relative;
}
.tex.ellipsis::after {
  content: "...";
  position: absolute;
  right: 168px;
  bottom: 5px;
}
.pbuttonk {
  float: right;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.pscale {
  padding: 20px;
  padding-right: 0px;
  padding-left: 31px;
}
.ideutm {
  background: #2891ab;
  margin-left: 14px;
  color: #fff;
  display: inline-block;
  border-radius: 3px;
}
.carddb {
  min-width: 213px;
}
.bisaenter {
  white-space: pre-line;
  color: #888888 !important;
}
.panel-group {
  margin-bottom: 40px;
}
.btn-vp {
  background-color: #888888;
  border-color: #656565;
  color: #fff;
}
.btn-vp:hover {
  background: #484848;
}
</style>
