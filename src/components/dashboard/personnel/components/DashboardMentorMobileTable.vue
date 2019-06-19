<template>
  <div>
    <!--div table start-->
    <div :id="'carousel-example-generic'+urutan" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
      <ol style="top: 175px;" class="carousel-indicators" v-if="data.total > 1">
        <!-- <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li> -->
        <li
          v-for="(data, index) in data.list"
          :data-target="'#carousel-example-generic'+urutan"
          :data-slide-to="index"
          :class="{active : index == 0}"
        ></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <!-- <div class="item active">
          <img src="https://unsplash.it/1400/600?image=114">
        </div>-->
        <div class="item" v-bind:class="{ active: index == 0}" v-for="(data, index) in reOrderArray(data.list)">
          <!--mentoring widget start-->
          <div class="box box-widget widget-user-2">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            <!-- <div class="widget-user-header bg-green"> -->
              
            <div class="widget-user-header" v-bind:style="{'background-color': bgcolor, 'color': 'white'}">
              <div class="widget-user-image" >
                <i
                  style="width: 65px;height: auto;float: left;font-size: 51px;"
                  class="fa fa-comments"
                ></i>
              </div>
              <!-- /.widget-user-image -->
              <h3 class="widget-user-username" style="color: #fff !important;">{{data.mentoring.name}}</h3>
              <h4 style="color: #fff !important;"
                class="widget-user-desc"
              >{{data.start_time | moment("dddd")}} {{data.start_time | moment("Do MMM YYYY")}}</h4>
              <h5 style="color: #fff !important;"
                class="widget-user-desc"
              >{{data.start_time | moment("h:mm a")}} - {{data.end_time | moment("h:mm a")}}</h5>
              <router-link
                :to="'/participant/team/' + data.participant.team.id"
                class="btn btn-default btn-sm"
              >{{data.participant.team.name}}</router-link>
              <router-link style="margin-bottom: 0px !important" class="btn btn-sm btn-info" v-bind:to="'/tutor/'+tutorId+'/participant/'+ data.participant.team.id + '/idea'">
                     <i class="fa fa-lightbulb-o"></i> Idea
                 </router-link>
            </div>
            <div class="box-footer no-padding">
              <ul class="nav nav-stacked">
                <li v-if="data.status == 'approved'">
                  <a>
                    Rating
                    <span class="pull-right badge bg-blue">
                      {{data.rating_from_participant}}
                      <img
                        class="setar"
                        v-if="data.rating_from_participant != null"
                        src="/img/star_on.png"
                      >
                    </span>
                  </a>
                </li>
                <li>
                  <a>
                    Status
                    <!--status start-->
                    <template v-if="data.participant.status != 'graduated'">
                      <span
                        class="pull-right badge bg-green"
                        v-show="data.status == 'approved'"
                      >{{data.status}}</span>
                      <span
                        class="pull-right badge bg-blue"
                        v-show="data.status == 'proposed'"
                      >{{data.status}}</span>
                      <span
                        class="pull-right badge bg-yellow"
                        v-show="data.status == 'offered'"
                      >{{data.status}}</span>
                      <span
                        class="pull-right badge bg-red"
                        v-show="data.status == 'cancelled'"
                      >{{data.status}}</span>
                      <span
                        class="pull-right badge bg-red"
                        v-show="data.status == 'rejected'"
                      >{{data.status}}</span>
                      <span v-show="data.status == 'rejected'">
                        <br>
                        <span style="color:#8e8e8e;">*  {{data.note}}</span>
                      </span>
                    </template>
                    <template v-else>
                      <span class="statusgraduated">{{data.participant.status}}</span>
                    </template>
                    <!--status end-->
                  </a>
                </li>
                <li>
                  <a style="padding-bottom:1px;">
                    Media
                    <span class="pull-right badge bg-green">{{extractMedia[index]}}</span>
                  </a>
                  <br>
                  <p style="padding-left:17px;color: #8e8e8e;">{{extractMedia2[index]}}</p>
                </li>
                <li>
                  <div style="display: inline-flex;padding-top: 20px;width:100%">
                    <!-- action button start-->
                    <template v-if="data.participant.status != 'graduated'">
                      <!-- approved action button start-->
                      <template v-if="data.status == 'approved'">
                        <template v-if="data.tutor_summary.length > 0">
                          <p style="margin-left: 5%;margin-right: 2%">
                            <a
                              @click="viewSummary(data.tutor_summary)"
                              class="btn btn-default btn-sm"
                            >
                              <i class="fa fa-search"></i> View Summary
                            </a>
                          </p>
                        </template>
                        <template v-else>
                          <p style="margin-left: 5%;margin-right: 2%">
                            <a
                              @click="addSummary(data.mentoring.tutor_summary_form.id, data.id)"
                              class="btn btn-default btn-sm"
                            >
                              <i class="fa fa-plus"></i> Add Summary
                            </a>
                          </p>
                        </template>
                      </template>
                      <!-- approved action button end-->
                      <!-- proposed action button start-->
                      <template v-if="data.status == 'proposed'">
                        <p v-if="checkPast[index]" style="margin-left: 5%;margin-right: 2%">
                          <a @click="approve(data.id)" class="btn btn-default btn-sm">
                            <i class="fa fa-check" style="color: #00a65a;"></i> Approve
                          </a>
                        </p>
                        <p style="margin-left: 5%;margin-right: 2%">
                          <a @click="reject(data.id)" class="btn btn-default btn-sm">
                            <i class="fa fa-close" style="color: #dd4b39;"></i> Reject
                          </a>
                        </p>
                        <p style="margin-left: 5%;margin-right: 2%">
                          <a
                            @click="offer(data.id, data.start_time, extractMedia[index], extractMedia2[index])"
                            class="btn btn-default btn-sm"
                          >
                            <i class="fa fa-handshake-o" style="color: #0073b7;"></i> Offer
                          </a>
                        </p>
                      </template>
                      <!-- proposed action button end-->
                    </template>
                    <!-- action button end-->
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--mentoring widget end-->
        </div>
      </div>

      <!-- Controls -->
      <template v-if="data.total > 1">
          <a
            class="left carousel-control"
            :href="'#carousel-example-generic'+urutan"
            role="button"
            data-slide="prev"
          >
            <span style="top: 72px;position: relative !important;left: 0px;" class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="right carousel-control"
            :href="'#carousel-example-generic'+urutan"
            role="button"
            data-slide="next"
          >
            <span style="top: 72px;position: relative !important;right: 0px;" class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
      </template>
    </div>
    <!--div table end-->

    <!--modal form-->
    <div>
    <offer
      :time="time"
      :datatype="type"
      :datafreetext="freetext"
      v-bind:tutorid="tutorId"
      v-bind:sessionid="sessionId"
      v-if="showForm"
      @close="showForm = false"
      @closemodal="closeModalRefresh"
    ></offer>
    <reject
      v-bind:tutorid="tutorId"
      v-bind:sessionid="sessionId"
      v-if="showRejectForm"
      @close="showRejectForm = false"
      @closemodal="closeModalRefresh"
    ></reject>

    <summaryd
      v-bind:summary="summary"
      v-bind:tutorid="tutorId"
      v-bind:sessionid="sessionId"
      v-if="showSummary"
      @close="showSummary = false"
      @closeModalRefresh="closeModalRefresh"
    ></summaryd>
    <summaryf
      v-bind:formid="formId"
      v-bind:tutorid="tutorId"
      v-bind:sessionid="sessionId"
      v-if="showSummaryForm"
      @close="showSummaryForm = false"
      @closeModalRefresh="closeModalRefresh"
    ></summaryf>
    </div>
    <!--modal form-->
  </div>
</template>
<script>
import auth from "@/httpcontrol";
import Offer from "@/components/inovasi/personnel/tutor/mentoring/offer";
import Reject from "@/components/inovasi/personnel/tutor/mentoring/reject";
import SummaryDetail from "@/components/inovasi/personnel/tutor/mentoring/summaryDetail";
import SummaryForm from "@/components/inovasi/personnel/tutor/mentoring/summaryForm";

export default {
  props: ["data","urutan","tutorId", "bgcolor"],
  data: function() {
    return {
      showForm: false,
      success: false,
      error: false,
      err_msg: "",
      loading: false,
      onSubmit: false,
      showForm: false,
      sessionId: "",
      summary: "",
      showSummary: false,
      showSummaryForm: false,
      showRejectForm: false,
      formId: "",
      time: "",
      type: "",
      freetext: ""
    };
  },
  computed: {
    extractMedia: function() {
      return this.data.list.map(function(item) {
        return item.media.substr(0, item.media.indexOf(" ")).trim();
      });
    },
    extractMedia2: function() {
      return this.data.list.map(function(item) {
        return item.media.substr(item.media.indexOf(" ") + 1);
      });
    },
    checkPast: function () {
      var date = new Date();
      var yesterday = new Date(date.getTime() - 24*60*60*1000);
        return this.reOrderArray(this.data.list).map(function(item) {
          if(yesterday < new Date(item.start_time)){
            return true;
          }else{
            return false;
          };
        });
      } 
  },
  components: {
    summaryd: SummaryDetail,
    summaryf: SummaryForm,
    offer: Offer,
    reject: Reject
  },
  updated: function() {
    //dependencies:
    //cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js
    //maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js

    $(".carousel").swipe({
      swipe: function(
        event,
        direction,
        distance,
        duration,
        fingerCount,
        fingerData
      ) {
        if (direction == "left") $(this).carousel("next");
        if (direction == "right") $(this).carousel("prev");
      },
      allowPageScroll: "vertical"
    });
  },
  methods: {
    reOrderArray: function(params) {
        return _.orderBy(params, "start_time", "desc");
    },
    approve: function(sessionId) {
      this.loading = true;
      auth
        .putData2(
          this,
          "/tutor/" +
            this.tutorId +
            "/mentoring_session/" +
            sessionId +
            "/approve"
        )
        .then(
          res => {
            console.log(res);
            this.loading = false;
            // this.getMentoring();
            this.$emit("closeModalRefresh");
          },
          error => {
            console.log(error);
            alertControl.showError(error.body.meta);
            this.loading = false;
          }
        );
    },
    reject: function(sessionId) {
      this.sessionId = sessionId;
      this.showRejectForm = true;
    },
    offer: function(sessionId, time, type, freetext) {
      this.sessionId = sessionId;
      this.showForm = true;
      this.time = time;
      this.type = type;
      this.freetext = freetext;
    },
    closeModalRefresh: function() {
      this.showForm = false;
      this.sessionid = false;
      this.showSummaryForm = false;
      this.showSummary = false;
      this.$emit('closeModalRefresh')
    },
    viewSummary: function(data) {
      this.summary = data;
      this.showSummary = true;
    },
    addSummary: function(id, sessionId) {
      this.formId = id;
      this.showSummaryForm = true;
      this.sessionId = sessionId;
    }
  }
};
</script>
<style scoped>
.statustpm {
  background: #8bc751;
  display: inline-block;
  padding: 3px;
  color: #fff;
  font-size: 11px;
  padding-left: 11px;
  padding-right: 11px;
  border-radius: 20px;
}
.statuscanceled {
  background: red !important;
  color: #fff;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 12px;
}
.statusproposed {
  background: blue !important;
  color: #fff;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 12px;
}
.statusgraduated {
  background: #525252 !important;
  color: #fff;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 12px;
}
.schedulem {
  white-space: pre-line;
  background: #f9f6f6;
  color: #4c4c4c;
  padding: 10px;
  border: 1px solid #c7c7c7;
  font-family: sans-serif;
}
.setar {
  width: 16px;
  position: relative;
  bottom: 1px;
}
</style>