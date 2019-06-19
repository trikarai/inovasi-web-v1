<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <!-- workshop content-->
      <div class="box">
        <div class="box-body">
          
          <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation'">Partisipasi Program</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Sesi Workshop</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
          
          <table class="table" v-if="data.list.length > 0">
            <thead>
              <tr>
                <th> Nama </th>
                <th> Deskripsi</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td><a class="btn btn-info btn-sm" @click="showPublication(data)"><i class="fa fa-asterisk"></i>  Detail</a></td>
                <!--<td><a class="btn btn-warning" @click="deleteWorkshop(data.id)"><i class="fa fa-trash"></i>  remove</a></td>-->
              </tr>
            </tbody>
          </table>
          <div v-else>
            No Workshop...
          </div>
        </div>         
      </div>   
      <!-- workshop content end-->
      
      
      <!-- publication content-->
      <div class="box" v-if="showPublicationSection">
        <div class="box-body">
          
          <div>
            <a class="btn btn-danger btn-sm" @click="showPublicationSection = false"> <i class="fa fa-close"></i>Close </a>
            <!--<router-link class="btn btn-default" :to="'/programme/' + programmeId + '/phase/' + phaseId + '/workshop/' + publicationData.id">Edit Workshop</router-link>-->
          </div>
          <hr>
          <div>
          <p>Name : {{publicationData.name}}</p>
          <p>Description : {{publicationData.description}}</p>
          <p>Registration Start Time : {{publicationData.registration_start_time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
          <p>Registration End Time : {{publicationData.registration_end_time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
          <p>Start Time : {{publicationData.start_time | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
          <p>End Time : {{publicationData.end_time | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
          <p>Cancel Hour : {{publicationData.cancel_hour_window}}</p>
          <p>Max Seat : {{publicationData.max_seat}}</p>
          <p>Max Participant Seat : {{publicationData.max_participant_seat}}</p>
          </div>
          <hr>
          
          <a class="btn btn-info" @click="confirmBooking"><i class="fa fa-calendar"></i> Booking</a>
          
          <div id="editor">
            <h3>Publication</h3> 
              <div v-html="compiledMarkdown(publicationData.publication)"></div>
          </div>
         
   
          <hr>
          
        </div>
      </div>      
      <!-- publication content end-->
      
    </section>
    
      <confirmation-modal v-if="confirmModal" :teamId="teamId" :programmeparticipationId="programmeparticipationId" :programmeId="programmeId" :phaseId="phaseId" :data="publicationData"  @confirm="onConfirm" @close="confirmModal = false"></confirmation-modal>
      <confirmed-modal v-if="confirmed" :teamId="teamId" :programmeparticipationId="programmeparticipationId" :programmeId="programmeId" :phaseId="phaseId" :data="publicationData" @close="confirmModal = false"></confirmed-modal>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import Loading from '@/components/loading'
  import confirmationModal from './confirmationModal'
  import confirmedModal from './confirmedModal'

  export default {
    props: [],
    data: function () {
      return {
        data: {total:0, list:[]},
        publicationData: '',
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showPublicationSection: false,
        edit: false,
        teamId : this.$route.params.teamId,
        programmeparticipationId : this.$route.params.programmeparticipationId,
        programmeId : this.$route.params.programmeId,
        phaseId : this.$route.params.phaseId,
        loading : false,
        confirmModal : false,
        confirmed : false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'confirmation-modal': confirmationModal,
      'confirmed-modal': confirmedModal
    },
    computed: {
    },
    created: function () {
      this.getData(this.programmeId, this.phaseId)
    },
    methods: {
      getData: function (programmeId, phaseId) {
        this.loading = true
        auth.getData2(this, '/programme/'+ programmeId +'/phase/'+ phaseId +'/workshop')
          .then(response => {
                if(response.status === 204){
                  this.data = {total:0, list:[]}
                  this.loading = false
                }else{
                  return response.json()
                }
              }, error => {
               alertControl.showError(this, error.body.meta)
               this.loading = false
              }).then(data => {
               this.data = data.data
               this.loading = false
              })
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData(this.programmeId, this.phaseId)
      },
      showPublication: function (data){
        this.showPublicationSection = true
        this.publicationData = data
        this.compiledMarkdown(data.publication)
      },
      compiledMarkdown: function (data) {
        return marked(data, { sanitize: true })
      },
      confirmBooking: function (){
        this.confirmModal = true
      },
      onConfirm() {
        this.confirmModal = false
        this.confirmed = true
      }
    }
  } 
</script>  
