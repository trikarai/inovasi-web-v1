<template>
  <div>

    <section class="content">

      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormMentoring()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Mentoring</a>

      <div class="box">
        <div class="box-body">
          <table class="table" v-if="data.list.length > 0">
            <thead>
              <tr>
                <th>Name</th>
                <th>start_date</th>
                <th>end_date</th>   
<!--                <th>session_duration</th>   
                <th>max_session</th>   
                <th>max_team_session</th>   -->
                <th>participant_summary_form</th>   
                <th>tutor_summary_form</th>
                <th colspan="3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.name}}</td>
                <td>{{data.start_date}}</td>
                <td>{{data.end_date}}</td>
<!--                <td>{{data.session_duration}}</td>
                <td>{{data.max_session}}</td>
                <td>{{data.max_team_session}}</td>-->
                <td>participant summary</td>
                <td>tutor summary</td>
                <td><a class="btn btn-default" @click="trackInvolvement(data.id)">Track Involvement</a></td>
                <td><a class="btn btn-default" @click="changeName(data)">change name</a></td>
                <td><a class="btn btn-warning" @click="deleteMentoring(data.id)">remove</a></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            No Mentoring...
          </div>
        </div>         
      </div>      
      
      <!-- track section-->
      <div class="box" v-show="showTrackSection"> 
        <a class="btn btn-danger btn-sm" @click="showTrackSection = false"><i class="fa fa-close"> Close</i></a>
          <div class="box-body">
            <a class="btn btn-default" @click="addNewTrack">Add Track</a>
            <table class="table" v-if="dataTrack.total > 0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th colspan="1"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataTrack.list">
                  <td>{{data.track.name}}</td>
                  <td>{{data.track.description}}</td>
                  <td><a class="btn btn-warning" @click="deleteTrack(data.id)">Remove</a></td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              No Track Involvement...
            </div>
            
          </div>  
        </div>  
      <!-- track section end-->
    </section>
    
    <mentoring-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:edit="edit" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()"></mentoring-form>
    
    <mentoring-form-edit v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:mentoring="mentoring" v-bind:edit="edit" v-if="showFormName" @close="showFormName = false" @closeModalRefresh="closeModalRefresh()"></mentoring-form-edit>
    
    <track-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:mentoringId="mentoringId" v-bind:edit="edit" v-if="showFormTrack" @close="showFormTrack = false" @closeModalRefresh="closeModalRefreshTrack()"></track-form>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import MentoringForm from './newMentoring'
  import MentoringFormEdit from './changeName'
  import TrackForm from './newTrack'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        dataTrack: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormName: false,
        showFormTrack: false,
        edit: false,
        programmeId: this.$route.params.programmeId,
        phaseId: this.$route.params.phaseId,
        mentoring: '',
        mentoringId: '',
        showTrackSection: false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'track-form': TrackForm,
      'mentoring-form': MentoringForm,
      'mentoring-form-edit': MentoringFormEdit
    },
    created: function () {
      this.getData(this.programmeId, this.phaseId)
    },
    methods: {
      getData: function (programmeId, phaseId) {
        auth.getData(this, '/programme/'+ programmeId +'/phase/'+ phaseId +'/mentoring')
      },
      showFormMentoring: function () {
        this.showForm = true
        this.edit = false
      },
      changeName: function (data) {
        this.edit = true
        this.showFormName = true
        this.mentoring = data
      },
      deleteMentoring: function (id) {
        auth.deleteData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData(this.programmeId, this.phaseId)
      },
      trackInvolvement: function (id) {
        this.dataTrack = []
        this.showTrackSection = true
        this.mentoringId = id
        auth.getData2(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring/' + id + '/track_involvement')
                .then(response => {
                  if(response.status === 204){
                    this.dataTrack = {total:0, list:[]}
                  }else{
                    return response.json()
                  }
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataTrack = data.data
                })
      },
      addNewTrack: function () {
        this.showFormTrack = true
      },
      deleteTrack: function (id){
        this.$http.delete(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/mentoring/' + this.mentoringId + '/track_involvement/' + id, {headers: auth.getAuthHeader()})
                .then(response => {
                  console.log(response)
                  this.closeModalRefreshTrack()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      closeModalRefreshTrack: function () {
        this.showFormTrack = false
        this.trackInvolvement(this.mentoringId)
      }
    }
  } 
</script>  