<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">
      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
      <!--start Persona-->
      <div class="row">
        <div class="col-md-8">
          <div class="box">
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">Feedback Persona</h3>
            </div>
            <div class="box-body chat" id="chat-box">
              <div v-show="!loadPs">
                <div v-if="psComments.total > 0">
                  <!-- chat item -->
                  <div class="item" v-for="data in psComments.list">
                    <!--                <img src="dist/img/user4-128x128.jpg" alt="user image" class="online">-->
                    <i class="fa fa-user" style="font-size: 25px;padding: 12px;"></i>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right">
                          <i class="fa fa-clock-o"></i>
                          {{data.submitTime | moment("DD MMM YY - hh:mm a")}} |
                          <router-link
                            style="font-size: 9px"
                            class="btn btn-info btn-sm"
                            :to="'/tutor/'+ tutorId +'/participant/'+ data.persona.customer_segment.idea.team_id + '/idea/'+ data.persona.customer_segment.idea.id + '/cs/' + data.persona.customer_segment.id + '/persona/' + data.persona.id + '/vp'"
                          >
                            <i class="fa fa-asterisk"></i> Detail
                          </router-link>
                        </small>
                        <template
                          v-if="data.writer.hasOwnProperty('personnel')"
                        >{{data.writer.personnel.name}}</template>
                        <template v-else>{{data.writer.talent.name}}</template>
                      </a>
                      <span style="font-size: 11px;color: #929292;">
                        <b>Idea :</b>
                        {{data.persona.customer_segment.idea.name}}
                        <br>
                        <b>Customer segment :</b>
                        {{data.persona.customer_segment.name}} |
                        <b>Persona Name :</b>
                        {{data.persona.name}}
                      </span>
                      <br>
                      <span style="top: 0px;position: relative;">
                        <template v-if="data.hasOwnProperty('parent')">
                          <i
                            class="direct-chat-text"
                            style="margin: 3px 0px 0px 0px !important;display: inline-block"
                          >{{data.parent.content}}</i>
                        </template>
                        <template style="display: none !important" v-else></template>
                        <br>
                        <span>{{data.content}}</span>
                      </span>
                    </p>
                  </div>
                </div>
                <div v-else>No Comments for Persona</div>
              </div>
              <onsub v-show="loadPs"></onsub>
            </div>
          </div>
        </div>
      </div>
      <!--end Persona-->

      <!-- Chat box -->
      <div class="row">
        <div class="col-md-8">
          <div class="box">
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">Feedback Business Structure</h3>
            </div>

            <div class="box-body chat" id="chat-box2">
              <div v-show="!loadBs">
                <div v-if="bsComments.total > 0">
                  <!-- chat item -->
                  <div class="item" v-for="data in bsComments.list">
                    <!--                <img src="dist/img/user4-128x128.jpg" alt="user image" class="online">-->
                    <i class="fa fa-user" style="font-size: 25px;padding: 12px;"></i>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right">
                          <i class="fa fa-clock-o"></i>
                          {{data.submitTime | moment("DD MMM YY - hh:mm a")}} |
                          <router-link
                            style="font-size: 9px"
                            class="btn btn-info btn-sm"
                            :to="'/tutor/'+tutorId+'/participant/'+ data.business_structure.value_proposition.persona.customer_segment.idea.team_id + '/idea/'+ data.business_structure.value_proposition.persona.customer_segment.idea.id + '/cs/' + data.business_structure.value_proposition.persona.customer_segment.id + '/persona/'+ data.business_structure.value_proposition.persona.id  +'/vp/'+ data.business_structure.value_proposition.id  +'/businessstructure'"
                          >
                            <i class="fa fa-asterisk"></i> Detail
                          </router-link>
                        </small>
                        <template
                          v-if="data.writer.hasOwnProperty('personnel')"
                        >{{data.writer.personnel.name}}</template>
                        <template v-else>{{data.writer.talent.name}}</template>
                      </a>
                      <span style="font-size: 11px;color: #929292;">
                        <b>Idea :</b>
                        {{data.business_structure.value_proposition.persona.customer_segment.idea.name}}
                        <br>
                        <b>Customer segment :</b>
                        {{data.business_structure.value_proposition.persona.customer_segment.name}} |
                        <b>Persona Name :</b>
                        {{data.business_structure.value_proposition.persona.name}}
                        <br>
                        <b>Business Structure :</b>
                        {{data.business_structure.business_structure_template.name}}
                      </span>
                      <br>
                      <span style="top: 0px;position: relative;">
                        <template v-if="data.hasOwnProperty('parent')">
                          <i
                            class="direct-chat-text"
                            style="margin: 3px 0px 0px 0px !important;display: inline-block"
                          >{{data.parent.content}}</i>
                        </template>
                        <template style="display: none !important" v-else></template>
                        <br>
                        <span>{{data.content}}</span>
                      </span>
                    </p>
                    <!--
                <div class="attachment">
                  <h4>Attachments:</h4>

                  <p class="filename">
                    Theme-thumbnail-image.jpg
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
                  </div>
                </div>
                    -->
                    <!-- /.attachment -->
                  </div>
                </div>
                <div v-else>No Comments for Business Structure</div>
              </div>
              <onsub v-show="loadBs"></onsub>
            </div>
            <!-- /.chat -->
            <div class="box-footer"></div>
          </div>
        </div>
      </div>
      <!-- /.box (chat box) -->

      <!-- Chat box -->
      <div class="row">
        <div class="col-md-8">
          <div class="box">
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">Feedback Experiment</h3>
            </div>

            <div class="box-body chat" id="chat-box3">
              <div v-show="!loadExp">
                <div v-if="expComments.total > 0">
                  <!-- chat item -->
                  <div class="item" v-for="data in expComments.list">
                    <!--                <img src="dist/img/user4-128x128.jpg" alt="user image" class="online">-->
                    <i class="fa fa-user" style="font-size: 25px;padding: 12px;"></i>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right">
                          <i class="fa fa-clock-o"></i>
                          {{data.submitTime | moment("DD MMM YY - hh:mm a")}} |
                          <router-link
                            style="font-size: 9px"
                            class="btn btn-info btn-sm"
                            :to="'/tutor/'+tutorId+'/participant/'+ data.experiment.value_proposition.persona.customer_segment.idea.team_id + '/idea/'+ data.experiment.value_proposition.persona.customer_segment.idea.id + '/cs/' + data.experiment.value_proposition.persona.customer_segment.id + '/persona/'+ data.experiment.value_proposition.persona.id  +'/vp/'+ data.experiment.value_proposition.id  +'/experiment/' + data.experiment.id"
                          >
                            <i class="fa fa-asterisk"></i> Detail
                          </router-link>
                        </small>
                        <template
                          v-if="data.writer.hasOwnProperty('personnel')"
                        >{{data.writer.personnel.name}}</template>
                        <template v-else>{{data.writer.talent.name}}</template>
                      </a>
                      <span style="font-size: 11px;color: #929292;">
                        <b>Idea :</b>
                        {{data.experiment.value_proposition.persona.customer_segment.idea.name}}
                        <br>
                        <b>Customer segment :</b>
                        {{data.experiment.value_proposition.persona.customer_segment.name}} |
                        <b>Persona Name :</b>
                        {{data.experiment.value_proposition.persona.name}}
                        <br>
                        <b>Experiment :</b>
                        {{data.experiment.name}}
                      </span>
                      <br>
                      <span style="top: 0px;position: relative;">
                        <template v-if="data.hasOwnProperty('parent')">
                          <i
                            class="direct-chat-text"
                            style="margin: 3px 0px 0px 0px !important;display: inline-block"
                          >{{data.parent.content}}</i>
                        </template>
                        <template style="display: none !important" v-else></template>
                        <br>
                        <span>{{data.content}}</span>
                      </span>
                    </p>
                    <!--
                <div class="attachment">
                  <h4>Attachments:</h4>

                  <p class="filename">
                    Theme-thumbnail-image.jpg
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
                  </div>
                </div>
                    -->
                    <!-- /.attachment -->
                  </div>
                </div>
                <div v-else>No Comments for Experiment</div>
              </div>
              <onsub v-show="loadExp"></onsub>
            </div>
            <!-- /.chat -->
            <div class="box-footer"></div>
          </div>
        </div>
      </div>
      <!-- /.box (chat box) -->
    </section>
  </div>
</template>  



<script>
import auth from "@/httpcontrol";
import * as CONFIG from "@/app.config.js";
import alertControl from "@/alertcontrol";
import ErrorFlash from "../../../errorflash";
import Loading from "@/components/loading";
import onSubmit from "@/components/onsubmit";

export default {
  data: function() {
    return {
      data: { total: 0, list: [] },
      psComments: { total: 0, list: [] },
      loadPs: false,
      bsComments: { total: 0, list: [] },
      loadBs: false,
      expComments: { total: 0, list: [] },
      loadExp: false,
      err_msg: "",
      success: false,
      error: false,
      tutorId: this.$route.params.tutorId,
      page: {
        page: 1,
        size: 5
      },
      status: "",
      loading: false
    };
  },
  computed: {
    pageTotal: function() {
      //return Math.ceil(this.data.total / this.page.size)
    }
  },
  watch: {
    // call again the method if the route changes
    $route: "getData"
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    onsub: onSubmit
  },
  created: function() {
    this.getData();
  },
  updated: function() {
    // $("#chat-box").bind("mousewheel DOMMouseScroll", function(e) {
    //   var scrollTo = null;

    //   if (e.type == "mousewheel") {
    //     scrollTo = e.originalEvent.wheelDelta * -1;
    //   } else if (e.type == "DOMMouseScroll") {
    //     scrollTo = 40 * e.originalEvent.detail;
    //   }

    //   if (scrollTo) {
    //     e.preventDefault();
    //     $(this).scrollTop(scrollTo + $(this).scrollTop());
    //   }
    // });

    // //SLIMSCROLL FOR CHAT WIDGET
    // $("#chat-box").slimScroll({
    //   height: "250px"
    // });
    // $("#chat-box2").bind("mousewheel DOMMouseScroll", function(e) {
    //   var scrollTo = null;

    //   if (e.type == "mousewheel") {
    //     scrollTo = e.originalEvent.wheelDelta * -1;
    //   } else if (e.type == "DOMMouseScroll") {
    //     scrollTo = 40 * e.originalEvent.detail;
    //   }

    //   if (scrollTo) {
    //     e.preventDefault();
    //     $(this).scrollTop(scrollTo + $(this).scrollTop());
    //   }
    // });

    // //SLIMSCROLL FOR CHAT WIDGET
    // $("#chat-box2").slimScroll({
    //   height: "250px"
    // });

    // $("#chat-box3").bind("mousewheel DOMMouseScroll", function(e) {
    //   var scrollTo = null;

    //   if (e.type == "mousewheel") {
    //     scrollTo = e.originalEvent.wheelDelta * -1;
    //   } else if (e.type == "DOMMouseScroll") {
    //     scrollTo = 40 * e.originalEvent.detail;
    //   }

    //   if (scrollTo) {
    //     e.preventDefault();
    //     $(this).scrollTop(scrollTo + $(this).scrollTop());
    //   }
    // });

    // //SLIMSCROLL FOR CHAT WIDGET
    // $("#chat-box3").slimScroll({
    //   height: "250px"
    // });
  },
  methods: {
    getData: function() {
      this.getPersonaComment();
      this.getBusinessComment();
      this.getExperimentComment();
    },
    getPersonaComment: function() {
      this.loadPs = true;
      auth
        .getData2(
          this,
          "/tutor/" + this.$route.params.tutorId + "/comment-dashboard/persona"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.psComments = data.data;
          this.loadPs = false;
        });
    },
    getBusinessComment: function() {
      this.loadBs = true;
      auth
        .getData2(
          this,
          "/tutor/" +
            this.$route.params.tutorId +
            "/comment-dashboard/business-structure"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.bsComments = data.data;
          this.loadBs = false;
        });
    },
    getExperimentComment: function() {
      this.loadExp = true;
      auth
        .getData2(
          this,
          "/tutor/" +
            this.$route.params.tutorId +
            "/comment-dashboard/experiment"
        )
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            alertControl.showError(this, error.body.meta);
          }
        )
        .then(data => {
          this.expComments = data.data;
          this.loadExp = false;
        });
    }
  }
};
</script>  