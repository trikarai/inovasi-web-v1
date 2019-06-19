<template>
  <div>
    <loading v-show="loading"></loading>
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
    <!-- desktop start-->
    <!-- {{dataMentoringSession.total}} -->

    <!-- <button style="margin: 5px" @click="closeModalRefresh" class="btn btn-danger">Test</button> -->

    <div class="row hidden-xs">
      <!---->
      <onsub v-if="rebuilding"></onsub>
      <div class="box" v-if="!rebuilding">
        <div class="box-body">
          <div class="box-header">
            <div class="row">
              <div class="col-md-2">
                <b>Mentoring Request</b>
              </div>
              <div class="col-md-6">
                <router-link :to="'/tutor/'+ this.tutorId +'/mentoring'">
                  <i class="fa fa-list-alt"></i>
                </router-link>
              </div>
            </div>
          </div>
          <ul class="nav nav-tabs">
            <li class="active">
              <a data-toggle="tab" href="#home">Need Approval</a>
            </li>
            <li>
              <a data-toggle="tab" href="#menu1">Waiting for Confirmation</a>
            </li>
            <li>
              <a data-toggle="tab" href="#menu2">Rejected</a>
            </li>
          </ul>

          <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
              <!-- {{dataMSProposed.total}}  -->
              <desktop-table
                v-bind:tutorId="tutorId"
                v-bind:data="dataMSProposed"
                @closeModalRefresh="closeModalRefresh"
              ></desktop-table>
            </div>
            <div id="menu1" class="tab-pane fade">
              <!-- {{dataMSReschedule.total}} -->
              <desktop-table
                v-bind:tutorId="tutorId"
                v-bind:data="dataMSReschedule"
                @closeModalRefresh="closeModalRefresh"
              ></desktop-table>
            </div>
            <div id="menu2" class="tab-pane fade">
              <!-- {{dataMSRejected.total}} | {{keyId}} -->
              <desktop-table
                v-bind:keyId="keyId"
                v-bind:tutorId="tutorId"
                v-bind:data="dataMSRejected"
                @closeModalRefresh="closeModalRefresh"
              ></desktop-table>
            </div>
          </div>
        </div>
      </div>
      <!---->
      <!-- schedule-->
      <div class="box" v-if="!rebuilding">
        <div class="box-body">
          <div class="box-header">
            <div class="row">
              <div class="col-md-2">
                <b>Mentoring Schedule</b>
              </div>
              <div class="col-md-6">
                <router-link :to="'/tutor/'+ this.tutorId +'/mentoring'">
                  <i class="fa fa-list-alt"></i>
                </router-link>
              </div>
            </div>
          </div>
          <!-- {{dataMSApproved}} -->
          <ul class="nav nav-tabs">
            <li class="active">
              <a data-toggle="tab" href="#upcoming">Upcoming</a>
            </li>
            <li>
              <a data-toggle="tab" href="#past">Past</a>
            </li>
          </ul>

          <div class="tab-content">
            <div id="upcoming" class="tab-pane fade in active">
              <!-- {{dataMSApprovedUpcoming.total}} -->
              <desktop-table
                v-bind:tutorId="tutorId"
                v-bind:data="dataMSApprovedUpcoming"
                @closeModalRefresh="closeModalRefresh"
              ></desktop-table>
            </div>
            <div id="past" class="tab-pane fade">
              <!-- {{dataMSApprovedPast.total}} -->
              <desktop-table
                v-bind:tutorId="tutorId"
                v-bind:data="dataMSApprovedPast"
                @closeModalRefresh="closeModalRefresh"
              ></desktop-table>
            </div>
          </div>
        </div>
      </div>
      <!-- schedule-->
    </div>
    <!--desktop end-->

    <!--mobile xs start-->
    <div class="row hidden-lg">
      <onsub v-if="rebuilding"></onsub>
      <div v-if="!rebuilding">
        <div class="row">
          <div class="col-xs-6">
            <b>Mentoring Schedule</b>
          </div>
          <div class="col-xs-2">
            <router-link :to="'/tutor/'+ this.tutorId +'/mentoring'">
              <i class="fa fa-list-alt"></i>
            </router-link>
          </div>
        </div>

        <div v-if="dataMSApproved.total != 0">
          <mobile-table
            v-bind:tutorId="tutorId"
            v-bind:urutan="1"
            v-bind:bgcolor="bggreen"
            v-bind:data="dataMSApproved"
            @closeModalRefresh="closeModalRefresh"
          ></mobile-table>
        </div>
        <div v-else>
          <div style="padding: 10px;">No Mentoring Schedule</div>
        </div>

        <!-- {{dataMSApproved}} -->
        <hr>
        <div class="row">
          <div class="col-xs-6">
            <b>Mentoring Request</b>
          </div>
          <div class="col-xs-2">
            <router-link :to="'/tutor/'+ this.tutorId +'/mentoring'">
              <i class="fa fa-list-alt"></i>
            </router-link>
          </div>
        </div>
        <h4 class="ndappevl">Need Approval</h4>
        <div v-if="dataMSProposed.total != 0">
          <mobile-table
            v-bind:tutorId="tutorId"
            v-bind:urutan="2"
            v-bind:bgcolor="bgblue"
            v-bind:data="dataMSProposed"
            @closeModalRefresh="closeModalRefresh"
          ></mobile-table>
        </div>
        <div style="padding:10px" v-else>No Mentoring Request</div>
        <hr>
        <h4 class="wgcn">Waiting Confirmation</h4>
        <div v-if="dataMSReschedule.total != 0">
          <mobile-table
            v-bind:tutorId="tutorId"
            v-bind:urutan="3"
            v-bind:bgcolor="bgyellow"
            v-bind:data="dataMSReschedule"
            @closeModalRefresh="closeModalRefresh"
          ></mobile-table>
        </div>
        <div style="padding:10px" v-else>No Mentoring Request</div>
        <hr>
        <h4 class="rjcted">Rejected</h4>
        <div v-if="dataMSRejected.total != 0">
          <mobile-table
            v-bind:tutorId="tutorId"
            v-bind:urutan="4"
            v-bind:bgcolor="bgred"
            v-bind:data="dataMSRejected"
            @closeModalRefresh="closeModalRefresh"
          ></mobile-table>
        </div>
        <div style="padding:10px" v-else>No Mentoring Request</div>
      </div>
      <!--rebuilding-->
    </div>
    <!--mobile xs end-->
  </div>
</template>

<style>
.ndappevl {
  text-align: center;
  background: #afafaf;
  display: inline-block;
  margin-left: 28%;
  padding: 6px;
  color: #fff;
}
.wgcn {
  text-align: center;
  background: #afafaf;
  display: inline-block;
  margin-left: 21%;
  padding: 6px;
  color: #fff;
}
.rjcted {
  text-align: center;
  background: #afafaf;
  display: inline-block;
  margin-left: 36%;
  padding: 6px;
  color: #fff;
}
</style>


<script>
import auth from "@/httpcontrol";
import alertControl from "@/alertcontrol";
import Loading from "@/components/loading";
import ErrorFlash from "@/components/inovasi/errorflash";
import onSubmit from "@/components/onsubmit";

import DesktopTable from "./DashboardMentorDesktopTable";
import MobileTable from "./DashboardMentorMobileTable";

export default {
  props: ["tutorId", "programId"],
  data: function() {
    return {
      dataMentoringSession: { total: 0, list: [] },
      dataMSApproved: { total: 0, list: [] },
      dataMSApprovedUpcoming: { total: 0, list: [] },
      dataMSApprovedPast: { total: 0, list: [] },
      dataMSProposed: { total: 0, list: [] },
      dataMSReschedule: { total: 0, list: [] },
      dataMSRejected: { total: 0, list: [] },
      dataReset: { total: 0, list: [] },
      urutan: "",
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
      freetext: "",
      rebuilding: false,
      bgred: "#dd4b39",
      bgyellow: "#f39c12",
      bggreen: "#00a65a",
      bgblue: "#0073b7",
      keyId: 0
    };
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    onsub: onSubmit,
    "desktop-table": DesktopTable,
    "mobile-table": MobileTable
  },
  created: function() {
    this.getMentoringList();
  },
  methods: {
    getMentoringList: function() {
      this.dataMentoringSession = { total: 0, list: [] };
      this.dataMSProposed = { total: 0, list: [] };
      this.dataMSRejected = { total: 0, list: [] };
      this.dataMSApproved = { total: 0, list: [] };
      this.dataMSApprovedUpcoming = { total: 0, list: [] };
      this.dataMSApprovedPast = { total: 0, list: [] };
      this.dataMSReschedule = { total: 0, list: [] };
      this.rebuilding = true;
      auth
        .getData2(this, "/tutor/" + this.tutorId + "/mentoring_session")
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(data => {
          this.dataMentoringSession = data.data;
          if (data.data.total != 0) {
            this.rebuildDataMentoring();
          }
          this.rebuilding = false;
        });
    },
    rebuildDataMentoring: function() {
      for (var i = 0; i < this.dataMentoringSession.total; i++) {
        var inputDate = new Date(this.dataMentoringSession.list[i].start_time);
        // console.log(inputDate)
        var todaysDate = new Date();
        // console.log(todaysDate)
        var dateStatus =
          inputDate.setHours(0, 0, 0, 0) > todaysDate.setHours(0, 0, 0, 0);
        // console.log(dateStatus)
        var summaryStatus =
          this.dataMentoringSession.list[i].tutor_summary.length == 0;
        // console.log(summaryStatus)

        //&& this.dataMentoringSession.list[i].tutor_summary.length == 0
        if (
          this.dataMentoringSession.list[i].status == "approved" &&
          dateStatus == true &&
          summaryStatus == true
        ) {
          this.dataMSApprovedUpcoming.list.push(
            this.dataMentoringSession.list[i]
          );
          this.dataMSApprovedUpcoming.total += 1;
        } else if (
          this.dataMentoringSession.list[i].status == "approved" &&
          dateStatus == false &&
          summaryStatus == true
        ) {
          this.dataMSApprovedUpcoming.list.push(
            this.dataMentoringSession.list[i]
          );
          this.dataMSApprovedUpcoming.total += 1;
        } else if (
          this.dataMentoringSession.list[i].status == "approved" &&
          dateStatus == false &&
          summaryStatus == false
        ) {
          this.dataMSApprovedPast.list.push(this.dataMentoringSession.list[i]);
          this.dataMSApprovedPast.total += 1;
        } else if (this.dataMentoringSession.list[i].status == "proposed") {
          this.dataMSProposed.list.push(this.dataMentoringSession.list[i]);
          this.dataMSProposed.total += 1;
        } else if (this.dataMentoringSession.list[i].status == "offered") {
          this.dataMSReschedule.list.push(this.dataMentoringSession.list[i]);
          this.dataMSReschedule.total += 1;
        } else if (this.dataMentoringSession.list[i].status == "rejected") {
          this.dataMSRejected.list.push(this.dataMentoringSession.list[i]);
          this.dataMSRejected.total += 1;
        }
      }
      this.rebuilding = false;
    },
    closeModalRefresh: function() {
      this.keyId += 1;
      this.resetData();
      this.rebuilding = true;
      this.getMentoringList();
    },
    resetData: function() {
      this.dataMSProposed = this.dataReset;
      this.dataMSReschedule = this.dataReset;
      this.dataMSRejected = this.dataReset;
      this.dataMSApprovedUpcoming = this.dataReset;
      this.dataMSApprovedPast = this.dataReset;
    }
  }
};
</script>
