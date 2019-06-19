<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">
      <div class="row container-fluid">
        <div v-if="teamId != ''">
          <div class="row">
            <div class="col-md-6">
              <div class="col-md-4 cteamd">Pilih Tim</div>
              <div class="col-md-8" style="padding: 0px 0px 20px 0px;">
                <select v-model="teamId" class="form-control" @change="changeTeam">
                  <option
                    v-for="(data,index) in data2.data.list"
                    :value="data.team.id"
                    v-bind:selected="index === 0"
                  >{{data.team.name}}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="col-md-4 cteamd">Mode Dashboard</div>
              <div class="col-md-8" style="padding: 0px 0px 20px 0px;">
                <select class="form-control" v-model="mode">
                  <option :value="false">Mode 1</option>
                  <option :value="true">Mode 2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Mode 1 Component Start-->
      <mode-one
        v-show="!mode"
        v-bind:teamId="teamId"
        v-bind:invitationCount="data.invitation_count"
        @propose="propose()"
      ></mode-one>
      <!--Mode 1 Component End-->

      <!--Mode 2 Component Start-->
      <mode-two
        v-show="mode"
        v-bind:teamId="teamId"
        v-bind:invitationCount="data.invitation_count"
        @propose="propose()"
      ></mode-two>
      <!--Mode 2 Component End-->
    </section>

    <!-- <form-idea
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-if="showFormIdea"
      @close="showFormIdea = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-idea> -->

    <form-propose v-bind:teamId="teamId" v-if="showPropose" @close="showPropose = false"></form-propose>
  </div>
</template>

<script>
import auth from "@/httpcontrol";
import Loading from "@/components/loading";
import onSubmit from "@/components/onsubmit";

import Propose from "./proposeMentoring";

import BaseMode1 from "./components/BaseMode1";
import BaseMode2 from "./components/BaseMode2";

export default {
  name: "dashboardadmin",
  data: function() {
    return {
      data: { total: 0, list: [] },
      dataProgram: { total: 0, list: [] },
      teamId: "",
      loadCS: false,
      loading: false,
      user: "",
      mode: false,
      csId: "",
      firstload: false,
      activeProgram: false,
      loadingProgram: false,
      showPropose : false
    };
  },
  components: {
    onsub: onSubmit,
    loading: Loading,
    "form-propose": Propose,
    "mode-one": BaseMode1,
    "mode-two": BaseMode2
  },
  created: function() {
    this.getInvitation();
    this.getTeam();
    this.user = auth.getAuthData();
  },
  updated: function() {
    //Step 1
    $("#popover1")
      .popover({
        html: true,
        content: $("#popper-content1")
      })
      .on("show.bs.popover", function() {
        $("#popper-content1").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content1").addClass("hide");
      });

    //Step 2
    $("#popover2")
      .popover({
        html: true,
        content: $("#popper-content2")
      })
      .on("show.bs.popover", function() {
        $("#popper-content2").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content2").addClass("hide");
      });

    //Step 3
    $("#popover3")
      .popover({
        html: true,
        content: $("#popper-content3")
      })
      .on("show.bs.popover", function() {
        $("#popper-content3").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content3").addClass("hide");
      });

    //Step 4
    $("#popover4")
      .popover({
        html: true,
        content: $("#popper-content4")
      })
      .on("show.bs.popover", function() {
        $("#popper-content4").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content4").addClass("hide");
      });

    //Step 5
    $("#popover5")
      .popover({
        html: true,
        content: $("#popper-content5")
      })
      .on("show.bs.popover", function() {
        $("#popper-content5").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content5").addClass("hide");
      });

    //Step 6
    $("#popover6")
      .popover({
        html: true,
        content: $("#popper-content6")
      })
      .on("show.bs.popover", function() {
        $("#popper-content6").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content6").addClass("hide");
      });

    //Step 7
    $("#popover7")
      .popover({
        html: true,
        content: $("#popper-content7")
      })
      .on("show.bs.popover", function() {
        $("#popper-content7").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content7").addClass("hide");
      });

    //Step 8
    $("#popover8")
      .popover({
        html: true,
        content: $("#popper-content8")
      })
      .on("show.bs.popover", function() {
        $("#popper-content8").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content8").addClass("hide");
      });

    //Step 9
    $("#popover9")
      .popover({
        html: true,
        content: $("#popper-content9")
      })
      .on("show.bs.popover", function() {
        $("#popper-content9").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content9").addClass("hide");
      });

    //Step 10
    $("#popover10")
      .popover({
        html: true,
        content: $("#popper-content10")
      })
      .on("show.bs.popover", function() {
        $("#popper-content10").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content10").addClass("hide");
      });

    //Step 11
    $("#popover11")
      .popover({
        html: true,
        content: $("#popper-content11")
      })
      .on("show.bs.popover", function() {
        $("#popper-content11").addClass("show");
      })
      .on("hide.bs.popover", function() {
        $("#popper-content11").addClass("hide");
      });
  },
  methods: {
    getInvitation: function() {
      this.loading = true;
      auth
        .getData2(this, "/talent/team/membership/invitation_count")
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            this.loading = false;
          }
        )
        .then(data => {
          this.data = data.data;
          this.loading = false;
        });
    },
    changeTeam: function() {
      this.removeSessionStorageId();
      sessionStorage.teamId = this.teamId;
    },
    getTeam: function() {
      this.loading = true;
      auth
        .getData2(this, "/talent/team/membership?status[]=active")
        .then(
          res => {
            return res.json();
          },
          error => {
            console.log(error);
            this.loading = false;
          }
        )
        .then(data => {
          this.teamId = data.data.list[0].team.id;
          this.data2 = data;
          if (sessionStorage.teamId) {
            this.teamId = sessionStorage.teamId;
          }
          this.loading = false;
        });
    },
    removeSessionStorageId: function() {
      sessionStorage.clear();
    },
    propose: function() {
      this.showPropose = true;
    }
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
    .cteamd{
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
        background-color:#efefef;
/*        border-color: #8bc751;*/
        border-color:#efefef;
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
</style>  