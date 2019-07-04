<template>
  <div>
    
    <loading v-show="loading"></loading>
    
    <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
         
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation'">Partisipasi Program</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation/'+ programmeparticipationId + '/mentoringsession/programme/'+programmeId+'/phase/'+ phaseId">Sesi Mentoring</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Daftar Sesi Mentoring</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
                
        <table class="table" v-if="data.total > 0">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tanggal Awal</th>
              <th>Tanggal Akhir</th>
              <th>Durasi</th>
              <th>Maksimal Sesi</th>
              <th>Maksimal Tim</th>
              <th colspan="1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in data.list">
              <td>{{data.name}}</td>
              <td>{{data.start_date | moment("dddd, MMMM Do YYYY")}}</td>
              <td>{{data.end_date | moment("dddd, MMMM Do YYYY")}}</td>
              <td>{{data.session_duration}} Minutes</td>
              <td>{{data.max_session}}</td>
              <td>{{data.max_team_session}}</td>
              <td>
                <template v-if="dateDiffStart[index] > 0">
                  <span class="statuse">Sesi Belum Dimulai </span>
                </template> 
                  <template v-else>
                    <template v-if="dateDiffEnd[index] > 0">
                      <router-link class="btn btn-default" v-bind:to="{name: 'Daftar Mentor', params: {teamId: teamId, programmeparticipationId:programmeparticipationId, programmeId: programmeId, phaseId: phaseId, sessionId: data.id}}"> <span class="fa fa-calendar-o"></span> Ajukan Mentoring</router-link>
                    </template>  
                    <template v-else>
                      <span class="statuscancelled">Berakhir Sesi</span>
                    </template>  
                </template>  
                
                
                </td>
            </tr>  
          </tbody>
        </table>
        
        
        <div v-else>
          No Mentoring Session List Available
        </div>  
        

                
        <!--{{data.total}} / {{page.size}} = {{pageTotal}}-->

        <div class="pagination" v-if="data.total > 5">
          <label>Data per page</label>
          <select v-model="page.size" @change="getData">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>  

        <!--        <div>
                  <span v-for="n in pageTotal">{{ n }} </span>
                </div>-->

        <nav aria-label="Pagination">
          <ul class="pagination" v-for="n in pageTotal">
            <li class="page-item disabled">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>

            <template v-if="n == page.page">           
              <li class="page-item active"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
            </template>  
            <template v-else>  
              <li class="page-item"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
            </template>  
            <!--            <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>-->
            <li class="page-item disabled">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>

      </div>  
    </div>      
    </section>


    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import Loading from '@/components/loading'
  import ErrorFlash from '../../../../../errorflash'
  import moment from 'moment'
      
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
        formId: '',
        loading : false,
        todayDate : '',
        page: {
          page: 1,
          size: 5
        }
      }
    },
    computed: {
      pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
      },
      dateDiffEnd: function () {
        return this.data.list.map(function(item) {
            var todayDate = new Date();
            var a = moment(todayDate)
            var b = moment(item.end_date)
            return b.diff(a, 'days')   // =1
        });
      },
      dateDiffStart: function () {
        return this.data.list.map(function(item) {
            var todayDate = new Date();
            var a = moment(todayDate)
            var b = moment(item.start_date)
            return b.diff(a, 'days')   // =1
        });
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading
      
    },
    created: function () {
      this.getData()
      this.todayDate = new Date();
    },
    methods: {
      getData: function () {
        this.loading = true
        auth.getData2(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring')
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
      detailMentoring: function (data) {
        this.showMentoring = true
        this.detail = data
      },
      detailTutor: function (data) {
        this.showTutor = true
        this.detail = data
      },
      reSchedule: function (mentoringId){
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
//        alert(page)
//        this.page.page = page
//        this.getData()
      },
      closeModalRefresh: function(){
        this.showPropose = false
        this.showReschedule = false
        this.getData()
      }
    }
  } 
</script>  
<style scoped>
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
</style>  