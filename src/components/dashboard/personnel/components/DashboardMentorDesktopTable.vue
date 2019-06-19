<template>
  <div>
    <!--div table start-->

    <div>
      <table class="table table-hover" v-if="data.total > 0 ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Idea Name</th>
            <th>Participant</th>
            <th style="min-width: 149px;">Schedule</th>
            <th>Media</th>
            <th>Rating</th>
            <th>Status</th>
            <th colspan="4"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in reOrderArray(data.list)">
            <td>{{data.mentoring.name}}</td>
            <td>
              <router-link style="margin-bottom: 0px !important" class="btn btn-sm btn-info" v-bind:to="'/tutor/'+tutorId+'/participant/'+ data.participant.team.id + '/idea'">
                     <i class="fa fa-lightbulb-o"></i> Idea
              </router-link>
            </td>
            <td><router-link :to="'/participant/team/' + data.participant.team.id" class="btn btn-default btn-sm">{{data.participant.team.name}}</router-link></td>
            <td>
              <span style="color: #8bc751;font-weight: 600">{{data.start_time | moment("dddd")}}</span>
              <br>
              <span style="color: #adadad">{{data.start_time | moment("Do MMM YYYY")}}</span>
              <br>
              <span style="color: #adadad">
                <b>{{data.start_time | moment("h:mm a")}} - {{data.end_time | moment("h:mm a")}}</b>
              </span>
            </td>
            <td>
              <b>{{extractMedia[index]}}</b>
              <br>
              <div class="schedulem">{{extractMedia2[index]}}</div>
            </td>
            <td>
              <b>{{data.rating_from_participant}}</b>
              <img class="setar" v-if="data.rating_from_participant != null" src="/img/star_on.png">
            </td>
            <td>
              <template v-if="data.participant.status != 'graduated'">
                <span class="statustpm" v-show="data.status == 'approved'">{{data.status}}</span>
                <span class="statusproposed" v-show="data.status == 'proposed'">{{data.status}}</span>
                <span class="statusproposed" v-show="data.status == 'offered'">{{data.status}}</span>
                <span class="statuscanceled" v-show="data.status == 'cancelled'">{{data.status}}</span>
                <span class="statuscanceled" v-show="data.status == 'rejected'">{{data.status}}</span>
                <span v-show="data.status == 'rejected'">
                  <br>
                  {{data.note}}
                </span>
              </template>
              <template v-else>
                <span class="statusgraduated">{{data.participant.status}}</span>
              </template>
            </td>
            <template v-if="data.participant.status != 'graduated'">
              <template v-if="data.status == 'approved'">
                <td>
                  <template v-if="data.tutor_summary.length > 0">
                    <a @click="viewSummary(data.tutor_summary)" class="btn btn-default btn-sm">
                      <i class="fa fa-tasks"></i> View Summary
                    </a>
                  </template>
                  <template v-else>
                    <a
                      @click="addSummary(data.mentoring.tutor_summary_form.id, data.id)"
                      class="btn btn-default btn-sm"
                    >
                      <i class="fa fa-plus"></i> Add Summary
                    </a>
                  </template>
                </td>
              </template>
              <template v-if="data.status == 'proposed'">
                <td v-if="checkPast[index]">
                  <a @click="approve(data.id)" class="btn btn-primary btn-sm">
                    <i class="fa fa-check"></i>
                    Approve
                  </a>
                </td>
                <td >
                  <a @click="reject(data.id)" class="btn btn-danger btn-sm">
                    <i class="fa fa-close"></i> Reject
                  </a>
                </td>
                <td>
                  <a
                    @click="offer(data.id, data.start_time, extractMedia[index], extractMedia2[index])"
                    class="btn btn-warning btn-sm"
                  >
                    <i class="fa fa-handshake-o"></i> Offer
                  </a>
                </td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
      <div style="padding:30px;" v-else>No Mentoring Session</div>
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
  props: ["data","tutorId", "keyId"],
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
            this.$emit('closeModalRefresh')
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