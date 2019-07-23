<template>
  <div>
          <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
    <div style="margin-bottom: 4px;">
       <!-- <button class="btn btn-info" @click="learningC" style="    border-radius: 5px;padding: 2px 8px;margin-top: 20px;margin-left: 20px;">
        <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang Kompetitor
      </button> -->
        
      <!-- <a
        style="margin:20px 0px 0px 0px"
        v-if="role === 'Talent'"
        class="btn btn-default"
        @click="showFormCompetitor()"
      >
        <span class="glyphicon glyphicon-plus-sign"></span> Tambah Kompetitor Baru
      </a> -->
    </div>

    

    <!------------------------------>
    <div data-simplebar>
    <div class="row">
      <div v-if="data.total != 0" class="col-md-5" style="margin-top:0px;">
              <div class="list-group-item" style="text-align: center;border-radius: 0px;">
                <a data-toggle="collapse" href="#collapsekomp"><b>Pelajari Materi Competitor</b></a>
              </div>
              <div class="">
              <div id="collapsekomp" class="panel-collapse collapse">
                <div class="panel-body">
                  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTRnH5vYkIY8bmiH_Ru4x9rYWTybMHt753wA_oilipY-Sigbv39ijX71eaRSFlqMVAgb6swgAX0q6I6/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="315" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                </div>
              </div>
              </div>
        </div>
    </div>

    <div class="row" style="overflow-x:auto;">
    <div style="padding-left:15px;padding-right:15px">
    <table style="white-space: pre-line;margin-top:20px;" id="tebelkompe" class="table table-bordered" v-if="data.total > 0">
      <!-- <thead>
        <tr>
          <th>Name</th>
          <th>Value Proposed</th>
          <th>Comparative Advantage</th>
          <th>Differential Advantage</th>
          <th>Focus</th>
          <th>Asset</th>
          <th>Unfair Advantage</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in data.list">
          <td>{{data.name}}</td>
          <td>{{data.value_proposed}}</td>
          <td>{{data.comparative_advantage}}</td>
          <td>{{data.differential_advantage}}</td>
          <td>{{data.focus}}</td>
          <td>{{data.asset}}</td>
          <td>{{data.unfair_advantage}}</td>
          <td>
            <a v-if="role === 'Talent'" class="btn btn-default" @click="updateCompetitor(data.id)">
              <i class="fa fa-pencil"></i>
            </a>
          </td>
          <td>
            <a v-if="role === 'Talent'" class="btn btn-danger" @click="confirm('Delete', data.id)">
              <i class="fa fa-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>-->
      <tbody>
        <tr>
          <th class="header mscolor">Name</th>
          <td v-for="data in data.list">{{data.name}}</td>
        </tr>
        <tr>
          <th class="header mscolor">Value Proposed</th>
          <td v-for="data in data.list"><span v-html="data.value_proposed"></span></td>
        </tr>
        <tr>
          <th class="header mscolor">Comparative Advantage</th>
          <td v-for="data in data.list"><span v-html="data.comparative_advantage"></span></td>
        </tr>
        <tr>
          <th class="header mscolor">Differential Advantage</th>
          <td v-for="data in data.list"><span v-html="data.differential_advantage"></span></td>
        </tr>
        <tr>
          <th class="header mscolor">Focus</th>
          <td v-for="data in data.list"><span v-html="data.focus"></span></td>
        </tr>
        <tr>
          <th class="header mscolor">Asset</th>
          <td v-for="data in data.list"><span v-html="data.asset"></span></td>
        </tr>
        <tr>
          <th class="header mscolor">Unfair Advantage</th>
          <td v-for="data in data.list"><span v-html="data.unfair_advantage"></span></td>
        </tr>
        <tr style="border: none !important" v-if="role === 'Talent'">
          <th></th>
          <td v-for="data in data.list">
            <a class="btn btn-default" @click="updateCompetitor(data.id)">
              <i class="fa fa-pencil"></i>
            </a>
            <a class="btn btn-danger" @click="confirm('Delete', data.id)">
              <i class="fa fa-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="padding:10px;margin-top:30px;" v-else>
      <div class="col-md-5">
          <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRGGEzMHad24qkb3KZ6xOu4v2JzxC5qIy5f1u_DX4MpdJ40M9LFaK8AkLEXP6DfG6b5SVTFeXpSAXpu/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="329" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                
      <h4>Tidak ada data, Mohon untuk mengisi data Kompetitor</h4>
    <hr>
    
      </div>
    </div>
    </div>
   
    </div>
   
    </div>
 <a
        v-if="role === 'Talent'"
        class="btn btn-default"
        @click="showFormCompetitor()"
      >
        <span class="glyphicon glyphicon-plus-sign"></span> Tambah Competitor Baru
      </a>
    <!-- <div
            style="padding:10px"
            v-else
          >No Competitor Data Yet, please create new...</div>
    </div>-->

    <!-------------------->

    <form-competitor
      v-bind:edit="edit"
      v-bind:teamId="teamId"
      v-bind:ideaId="ideaId"
      v-bind:customersegmentId="customersegmentId"
      v-bind:personaId="personaId"
      v-bind:valuepropositionId="valuepropositionId"
      v-bind:competitorId="competitorId"
      v-if="showForm"
      @close="showForm = false"
      @closeModalRefresh="closeModalRefresh()"
    ></form-competitor>
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
  </div>
</template>


<script>
import auth from "@/httpcontrol";
import FormCompetitor from "../../competitor/newCompetitor";
import alertControl from "@/alertcontrol";
import OnDelete from "@/components/ondelete";

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  props: ["data", "role"],
  data: function() {
    return {
      competitorId: "",
      url: "",
      toconfirm: false,
      confirmId: "",
      act: "",
      showForm: false,
      edit: false,
      tutorId: this.$route.params.tutorId,
      teamId: this.$route.params.teamId,
      ideaId: this.$route.params.ideaId,
      customersegmentId: this.$route.params.customersegmentId,
      personaId: this.$route.params.personaId,
      valuepropositionId: this.$route.params.valuepropositionId,
      err_msg: "",
      success: false,
      error: false,
    };
  },
  components: {
    "form-competitor": FormCompetitor,
    ondelete: OnDelete,
    simplebar
  },
  created: function() {
    if (this.role !== "Talent") {
      this.url = "/tutor/" + this.tutorId;
    }
  },
  methods: {
    showFormCompetitor: function() {
      this.showForm = true;
      this.edit = false;
    },
    updateCompetitor: function(id) {
      this.showForm = true;
      this.edit = true;
      this.competitorId = id;
    },
    deleteCompetitor: function(id) {
      this.loading = true;
      auth.deleteData2(
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
            "/competitor/" +
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
    closeModalRefresh: function() {
      this.showForm = false;
      this.$emit('getData');
    },
    confirm: function(act, id) {
      this.toconfirm = true;
      this.act = act;
      this.confirmId = id;
    },
    confirmed: function() {
      this.toconfirm = false;
      this.deleteCompetitor(this.confirmId);
    },
    learningC: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "Competitor" }
      });
      window.open(routeData.href, "_blank");
    }
  },
  updated: function(){
    $(window).scroll(function(){
    $('.header').css({
        'left': $(this).scrollLeft() + 0 //Why this 15, because in the CSS, we have set left 15, so as we scroll, we would want this to remain at 15px left
    });
});
  }
};
</script>
<style scoped>
td{
  min-width: 200px;
  word-break: break-word; 
}
table th{
  min-width: 190px;
  word-break: break-word; 
  /* background-color: red; */
}
/* .header{
  position: absolute;
  left: 0px;
  z-index: 100;
} */
.mscolor {
  background: #efefef;
  color: #505050;
}
#tebelkompe td {
  background: #fff;
}
</style>
