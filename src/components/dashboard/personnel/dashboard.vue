<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">
      <div class>
        <div class="row">
          <!-- <div class="col-lg-3 col-sm-6">
            <div class="col-md-12">
              <div class="carddb">
                <div class="content-carddb">
                  <div class="row">
                    <div class="col-xs-5">
                      <div class="icon-big icon-bekup text-center">
                        <div>
                          <i class="fa fa-user"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="numbers">
                        <p>Profil</p>Profile
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <hr>
                    <div class="stats">
                      <i class="fa fa-search"></i>
                      <router-link to="/personnel/profile" class="info-a link link--kumya">
                        <span style="font-size:9px" data-letters="View Profile">View Profile</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->

          <!-- <div class="col-lg-3 col-sm-6">
            <div class="col-md-12">
              <div class="carddb">
                <div class="content-carddb">
                  <div class="row">
                    <div class="col-xs-5">
                      <div class="icon-big icon-bekup text-center">
                        <i class="fa fa-user-secret" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="numbers">
                        <p>Koordinator</p>
                        <span style="position: relative;right: 19px;">Coordinator</span>
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <hr>
                    <div class="stats">
                      <i class="fa fa-search"></i>
                      <router-link to="/coordinator/programme" class="info-a link link--kumya">
                        <span
                          style="font-size:9px"
                          data-letters="View Assigned Program"
                        >View Assigned Program</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->

          <!-- <div class="col-lg-3 col-sm-6">
            <div class="col-md-12">
              <div class="carddb">
                <div class="content-carddb">
                  <div class="row">
                    <div class="col-xs-5">
                      <div class="icon-big icon-bekup text-center">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="numbers">
                        <p>Mentor</p>
                        <span>Mentor</span>
                      </div>
                    </div>
                  </div>
                  <div class="footer">
                    <hr>
                    <div class="stats">
                      <i class="fa fa-search"></i>
                      <router-link to="/tutor/programme" class="info-a link link--kumya">
                        <span
                          style="font-size:9px"
                          data-letters="View Assigned Program"
                        >View Assigned Program</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </div>
        <!-- row-->

        <!-- program select -->
        <div class="row" style="margin-top:30px">
          <div class="col-md-6">
            <div class="col-md-4 cteamd">Choose Program</div>
            <div class="col-md-8" style="padding: 0px 0px 20px 0px;" v-if="dataProgram.total != 0">
              <select v-model="programIndex" class="form-control">
                <option
                  v-for="(program, index) in dataProgram.list"
                  :value="index"
                >{{program.programme.programme_curriculum.name}}</option>
              </select>
            </div>
            <div v-else>
              <div style="padding:8px;">
                <span style="margin-left: 15px;">No Program Assigned to your account</span>
              </div>
            </div>
          </div>
        </div>
        <!-- program select -->

        <!--participant-->
        <div class="box">
          <div class="box-body">
            <div class="row container-fluid" v-if="dataProgram.total != 0">
              <router-link
                class="btn btn-primary"
                :to="'/tutor/'+ dataProgram.list[programIndex].id +'/programme/'+dataProgram.list[programIndex].programme.id+'/participant'"
              >
                <i class="fa fa-user-o"></i> Participant
              </router-link>
            </div>
          </div>
        </div>
        <!--participant-->

        <div class="container-fluid" v-if="dataProgram.total != 0">
          <dashboard-mentor1 v-bind:programId="programId" v-bind:tutorId="tutorId"></dashboard-mentor1>
        </div>
      </div>
      <!-- container-fluid-->
    </section>
  </div>
</template>

<style>
.cteamd {
  background: #e4e4e4;
  display: inline-block;
  text-align: center;
  border-left-width: thick;
  border-left-color: #8bc751;
  border-left-style: solid;
  padding: 8px;
}
</style>

<script>
import auth from "@/httpcontrol";
import Loading from "@/components/loading";
import onSubmit from "@/components/onsubmit";

import DashboardMentorDesktop from "./components/DashboardMentorDesktop";

export default {
  name: "dashboard",
  data: function() {
    return {
      dataProgram: { total: 0, list: [] },
      programId: "",
      tutorId: "",
      programIndex: 0,
      teamId: "",
      loading: false
    };
  },
  components: {
    onsub: onSubmit,
    loading: Loading,
    "dashboard-mentor1": DashboardMentorDesktop
  },
  created: function() {
    this.getProgram();
  },
  methods: {
    getProgram: function() {
      this.loading = true;
      auth
        .getData2(this, "/tutor")
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(data => {
          if (data.data.total != 0) {
            this.programId = data.data.list[0].programme.id;
            this.tutorId = data.data.list[0].id;
            this.programIndex = 0;
          }
          this.dataProgram = data.data;
          if (sessionStorage.programId) {
            this.programId = sessionStorage.programId;
          }
          this.loading = false;
        });
    }
  }
};
</script>