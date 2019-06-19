<template>
  <div>
    
    <loading v-show="loading"></loading>
    
    <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
<!--    {{sessionId}}-->
         
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation'">Partisipasi Program</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation/'+ programmeparticipationId + '/mentoringsession/programme/'+programmeId+'/phase/'+ phaseId">Sesi Mentoring</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation/'+ programmeparticipationId + '/mentoringsession/programme/'+programmeId+'/phase/'+ phaseId + '/session'">Daftar Sesi Mentoring</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Daftar Mentor</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
                
        <table class="table" v-if="data.total > 0">
          <thead>
            <tr>
              <th>Nama</th>
              <th colspan="1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list" v-show="data.personnel.name != 'Tutor1'">
              <td><span style="width: 200px;display: inline-block">{{data.personnel.name}}</span> <i class="fa fa-search" style="cursor: pointer" @click="viewMentorDetail(data.personnel.id)"></i></td>
              <td><button class="btn btn-default" @click="proposeTime(data.id)"><i class="fa fa-calendar-o"></i> Ajukan Mentoring</button></td>
              
            </tr>  
          </tbody>
        </table>
        <div v-else>
          No Mentor List Available
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

    <propose v-bind:teamId="teamId" v-bind:programmeparticipationId="programmeparticipationId" v-bind:tutorId="tutorId" v-bind:sessionId="sessionId" v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-if="showPropose" @closeModalRefresh="closeModalRefresh" @close="showPropose = false"></propose>
    <detail v-bind:tutorId="tutorId" v-if="showMentorDetail" @close="showMentorDetail = false"></detail>
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import Loading from '@/components/loading'
  import ErrorFlash from '../../../../../errorflash'
  import ProposeTime from '../propose/proposeTime'
  import Detail from './detail'
  
  export default {
    props: ['phaseId', 'programmeId', 'sessionId'],  
    data: function () {
      return {
        data: {total : 0,list : []},
        err_msg: '',
        success: false,
        error: false,
        teamId: this.$route.params.teamId,
        programmeparticipationId : this.$route.params.programmeparticipationId,
        mentoringId: '',
        tutorId : '',
        showPropose: false,
        showSummary: false,
        showTutor: false,
        showMentoring: false,
        showReschedule: false,
        showMentorDetail: false,
        formId: '',
        loading : false,
        page: {
          page: 1,
          size: 5
        }
      }
    },
    computed: {
      pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'propose' : ProposeTime,
      'detail' : Detail
      
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        this.loading = true
        auth.getData2(this, '/programme/'+ this.programmeId +'/tutor')
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
      proposeTime: function (tutorId) {
        this.showPropose = true
        this.tutorId = tutorId
      },
      viewMentorDetail: function(tutorId){
        this.showMentorDetail = true
        this.tutorId = tutorId
      },
      detailMentoring: function (data) {
        this.showMentoring = true
        this.detail = data
      },
      detailTutor: function (data) {
        this.showTutor = true
        this.detail = data
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