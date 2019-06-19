<template>
  <div>
    
    <loading v-show="loading"></loading>
    
    <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
    <!--<a class="btn btn-default" @click="proposeMentoring()"><span class="glyphicon glyphicon-plus-sign"></span> Propose Mentoring Old</a>-->
    <router-link class="btn btn-default" v-bind:to="{name: 'Daftar Sesi Mentoring', params: {teamId: teamId, programmeparticipationId:programmeparticipationId, programmeId: programmeId, phaseId: phaseId}}"> <span class="fa fa-calendar-o"></span> Ajukan Mentoring</router-link>

     
    <!--<router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->
    
    <!-- {{phaseId}} -->
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation'">Partisipasi Program</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Sesi Mentoring</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
        
        <table class="table table-hover" v-if="data.total > 0">
          <thead>
            <tr>
              <th>Nama</th>
<!--              <th></th>-->
              <th style="width: 157px">Tutor</th>
              <th style="width: 157px">Jadwal</th>
<!--              <th>End</th>-->
              <th>Media</th>
              <th>Penilaian</th>
              <th>Status</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in reOrderArray(data.list)">
              <td><a style="cursor: pointer" @click="detailMentoring(data.mentoring)" >{{data.mentoring.name}}</a></td>
<!--
              <td>
                <template v-if="data.status == 'approved'">
                  <template v-if="data.participant_summary.length == 0">
                    <a class="btn btn-sm btn-default" @click="showSummaryForm(data.mentoring.participant_summary_form.id, data.id)"><i class="fa fa-plus"></i>  Add Summary</a>
                  </template>
                  <template v-else>
                    <a class="btn btn-sm btn-default" @click="viewSummaryForm(data.participant_summary, data.rating_from_participant, data.rating_from_mentor)"><i class="fa fa-eye"></i> View Summary</a>
                  </template>
                </template>
              </td>
-->
              <!--<td><a style="cursor: pointer" @click="detailTutor(data.tutor.personnel)" >{{data.tutor.personnel.name}}</a></td>-->
              <td>{{data.tutor.personnel.name}} <i class="fa fa-search" style="cursor: pointer" @click="viewMentorDetail(data.tutor.personnel.id)"></i></td>
              <td><span style="color: #8bc751;font-weight: 600"><i class="fa fa-calendar"></i> {{data.start_time | moment("dddd")}}</span><br>
                <span style="color: #adadad">{{data.start_time | moment("Do MMM YYYY")}}<br>
                    <b>{{data.start_time | moment("h:mm a")}} - {{data.end_time | moment("h:mm a")}}</b></span></td>
<!--
              <td><span style="color: #8bc751;font-weight: 600">{{data.end_time | moment("dddd")}}</span></br>
                <span style="color: #adadad">{{data.end_time | moment("Do MMM YYYY, h:mm:ss a")}}</span></td>
-->
              
              <td>
<!--                <p style="white-space: pre-line; background-color: lightgray">{{extractMedia[index]}} <br> {{extractMedia2[index]}}</p>-->
                  <b>{{extractMedia[index]}}</b> <br>  
                  <div class="schedulem">{{extractMedia2[index]}}</div> 
              </td>
              <td>
                <b>{{data.rating_from_mentor}} </b> <img class="setar" v-if="data.rating_from_mentor != null" src="/img/star_on.png">
              </td>
              <td>
              
                <span class="statusp" v-show="data.status == 'approved'">{{data.status}}</span>
                <span class="statuse" v-show="data.status == 'offered'">{{data.status}}</span>
                <span class="statuscancelled" v-show="data.status == 'cancelled'">{{data.status}}</span>
                
                <span class="statuscancelled" v-show="data.status == 'rejected'">{{data.status}}</span>
                <span v-show="data.status == 'rejected'"><br><span style="font-size:12px"><b>Catatan:</b> {{data.note}}</span></span>
                
                <span class="statusproposed" v-show="data.status == 'proposed'">{{data.status}}</span>
                
              </td>
              <td>
                <template v-if="data.status != 'approved'">
                  <template v-if="data.status != 'rejected'">
                    <template v-if="data.status != 'proposed'">
                     <a v-if="data.status != 'cancelled'" @click="reSchedule(data.id,extractMedia[index],extractMedia2[index])" class="btn btn-warning btn-sm"><i class="fa fa-calendar"></i> Reschedule</a>
                  </template>
                  </template>
                </template>
                <template v-if="data.status == 'approved'">
                  <template v-if="data.participant_summary.length == 0">
                    <a class="btn btn-sm btn-default" @click="showSummaryForm(data.mentoring.participant_summary_form.id, data.id)"><i class="fa fa-plus"></i>  Add Summary</a>
                  </template>
                  <template v-else>
                    <a class="btn btn-sm btn-default" @click="viewSummaryForm(data.participant_summary, data.rating_from_participant, data.rating_from_mentor)"><i class="fa fa-eye"></i> View Summary</a>
                  </template>
                </template>
              </td>
              
              <template v-if="data.status == 'offered'">
                <td v-if="checkPast[index]"><a @click="approveSchedule(data.id)" class="btn btn-default btn-sm"><i class="fa fa-handshake-o"></i> Approve</a></td>
              </template>
              <template v-if="data.status == 'proposed'">
                <td><a class="btn btn-danger btn-sm" @click="cancelSchedule(data.id)"><i class="fa fa-calendar-minus-o"></i> Cancel</a></td>
              </template>
            </tr>
          </tbody>
        </table>
        <div v-else>
          No Mentoring data available
        </div>  
        
        <!--{{data.total}} / {{page.size}} = {{pageTotal}}-->
          <div class="pagination" v-if="data.total > 5">
          <label>Data per page</label>
          <select v-model="page.size" @change="getData">
            <!--<option value="5">5</option>-->
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>  
        
        <div style="margin-left: 20px">   
          <pagination v-model="page.page" :per-page="page.size" :records="data.total" @paginate="changePage(page.page)" :options="{edgeNavigation:true}"></pagination>
        </div>

<!--        <nav aria-label="Pagination">
        <ul class="pagination" >
          <li class="page-item disabled">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <template v-for="n in pageTotal">
          <template v-if="n == page.page">           
            <li class="page-item active"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
          </template>  
          <template v-else>  
            <li class="page-item"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
          </template>  
          </template>  
          
          <li class="page-item disabled">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>-->
 
        
      </div>  
    </div>      
    </section>
    
        
    <propose v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:teamId="teamId" v-bind:programmeparticipationId="programmeparticipationId" v-if="showPropose" @closeModalRefresh="closeModalRefresh" @close="showPropose = false">
    </propose>
    <summary-form v-bind:sessionId="sessionId" v-bind:formId="formId" v-if="showSummary" @close="showSummary = false" @closeModalRefresh="closeModalRefresh">
    </summary-form>
    <summary-view v-bind:ratingParticipant="ratingParticipant" v-bind:ratingMentor="ratingMentor" v-bind:dataSummary="dataSummary" v-if="viewSummary" @close="viewSummary = false">
    </summary-view>
    <tutor v-bind:detail="detail" v-if="showTutor" @close="showTutor = false">
    </tutor>
    <mentoring v-bind:detail="detail" v-if="showMentoring" @close="showMentoring = false">
    </mentoring>
    <reschedule v-bind:datatype="type" v-bind:datafreetext="freetext" v-bind:teamId="teamId" v-bind:programmeparticipationId="programmeparticipationId" v-bind:programmeId="programmeId" v-bind:mentoringId="mentoringId" v-if="showReschedule" @close="showReschedule = false" @closeModalRefresh="closeModalRefresh">
    </reschedule>
    
    <detail v-bind:tutorId="tutorId" v-if="showMentorDetail" @close="showMentorDetail = false"></detail>

    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import Loading from '@/components/loading'

  import Propose from './propose/propose'
  import SummaryForm from './summary/summaryform'
  import ViewSummary from './summary/viewsummary'
  import Tutor from './tutor/detail'
  import Mentoring from './detail/detail'
  import Reschedule from './reschedule'
  import ErrorFlash from '../../../../errorflash'
  import Detail from './mentoringlist/detail'

  export default {
    props: ['phaseId', 'programmeId'],  
    data: function () {
      return {
        data: {total : 0,list : []},
        err_msg: '',
        success: false,
        error: false,
        teamId: this.$route.params.teamId,
        programmeparticipationId : this.$route.params.programmeparticipationId,
        mentoringId: '',
        showPropose: false,
        showSummary: false,
        showTutor: false,
        showMentoring: false,
        showReschedule: false,
        showMentorDetail: false,
        formId: '',
        loading : false,
        viewSummary : false,
        dataSummary : [],
        ratingParticipant : '',
        ratingMentor : '',
        type : '',
        freetext : '',
        page: {
          page: 1,
          size: 20
        },
        todayDate: ''
      }
    },
    computed: {
      pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
      },
    extractMedia: function () {
        return this.data.list.map(function(item) {
          return item.media.substr(0, item.media.indexOf(" "));
        });
      },
    extractMedia2: function () {
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
      'error-flash': ErrorFlash,
      'propose': Propose,
      'tutor': Tutor,
      'loading': Loading,
      'mentoring': Mentoring,
      'reschedule': Reschedule,
      'summary-form': SummaryForm,
      'summary-view': ViewSummary,
      'detail' : Detail
    },
    created: function () {
      var date = new Date();
      var yesterday = new Date(date.getTime() - 24*60*60*1000);
      this.todayDate = yesterday
      this.getData()
    },
    methods: {
      reOrderArray: function(params) {
        return _.orderBy(params, "start_time", "desc");
      },
      getData: function () {
        this.loading = true
        auth.getData2(this, '/team/' + this.teamId + '/programme_participation/' + this.programmeparticipationId + '/mentoring_session?page='+ this.page.page +'&page_size='+ this.page.size)
                .then(res=>{
                  if(res.status === 204){
                    this.data = {total : 0,list : []}
                    this.loading = false
                  }else{
                    return res.json()
                  }
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                })
      },
      proposeMentoring: function () {
        this.showPropose = true
      },
      showSummaryForm: function (id, sessionId) {
        this.formId = id
        this.showSummary = true
        this.sessionId = sessionId
      },
      viewSummaryForm: function (data, ratingParticipant, ratingMentor) {
        this.viewSummary = true
        this.dataSummary = data
        this.ratingParticipant = ratingParticipant
        this.ratingMentor = ratingMentor
      },
      detailMentoring: function (data) {
        this.showMentoring = true
        this.detail = data
      },
      viewMentorDetail: function(tutorId){
        this.showMentorDetail = true
        this.tutorId = tutorId
      },
      detailTutor: function (data) {
        this.showTutor = true
        this.detail = data
      },
      reSchedule: function (mentoringId,type,freetext){
        this.type = type
        this.freetext = freetext
        this.mentoringId = mentoringId
        this.showReschedule = true
      },
      approveSchedule: function (mentoringId){
        auth.putData2(this, '/team/' + this.$route.params.teamId + '/programme_participation/' + this.$route.params.programmeparticipationId + '/mentoring_session/'+mentoringId+'/approve')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getData()
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      },
      cancelSchedule: function (mentoringId){
        auth.putData2(this, '/team/' + this.$route.params.teamId + '/programme_participation/' + this.$route.params.programmeparticipationId + '/mentoring_session/'+mentoringId+'/cancel_proposal')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getData()
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      },
      changePage: function (page) {
        this.page.page = page
        this.getData()
      },
      closeModalRefresh: function(){
        this.showPropose = false
        this.showReschedule = false
        this.showSummary = false
        this.getData()
      }
    }
  } 
</script>  
<style scoped>
  .statusp {
        background: #8bc751;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statuse {
        background: #ff8300 !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statuscancelled {
        background: #ff5252 !important;;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statusproposed {
        background: #009fff !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
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