<template>
  <div>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormScoring()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Scoring</a>

      <div class="box">
        <div class="box-body">
          <table class="table" v-if="data.total > 0">
            <thead>
              <tr>
                <th>Name</th>
                <th>start_date</th>
                <th>end_date</th>   
                <th>Scoring Template</th>   
                <th>team viewable</th>   
                <th>member viewable</th>
                <th colspan="3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.name}}</td>
                <td>{{data.start_date}}</td>
                <td>{{data.end_date}}</td>
                <td>{{data.scoring_template.name}}</td>
                <td>{{data.is_team_profile_viewable}}</td>
                <td>{{data.is_member_profile_viewable}}</td>
                <td><a class="btn btn-default btn-sm" @click="bsexpInvolvement(data.id)">BS/Exp Involvement</a></td>
                <td><a class="btn btn-default btn-sm" @click="trackInvolvement(data.id)">Track Involvement</a></td>
                <td><a class="btn btn-default btn-sm" @click="editScoring(data)"><i class="fa fa-pencil"></i> Edit</a></td>
                <td><a class="btn btn-warning btn-sm" @click="deleteScoring(data.id)"><i class="fa fa-close"></i> remove</a></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            No Scoring...
          </div>
        </div>         
      </div>      
      
      <!-- track section-->
      <div class="box" v-show="showTrackSection"> 
        <a @click="showTrackSection = false" class="btn btn-warning btn-sm"><i class="fa fa-close"> Close</i></a>
          <div class="box-body">
            <a class="btn btn-default" @click="addNewTrack"><i class="fa fa-plus"></i>  Add Track</a>
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
                  <td><a class="btn btn-warning btn-sm" @click="deleteTrack(data.id)"><i class="fa fa-trash"></i> Remove</a></td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              No Track Involvement...
            </div>
            
          </div>  
        </div>  
      <!-- track section end-->
      
      <!-- business section-->
      <div class="box" v-show="showBusinessSection"> 
        <a @click="showBusinessSection = false" class="btn btn-warning btn-sm"><i class="fa fa-close"> Close</i></a>
                
          <div class="box-body">
            <a class="btn btn-default" @click="addNewBSEXP"><i class="fa fa-plus"></i> Add Business / Experiment</a>
            <table class="table" v-if="dataBSEXP.total > 0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th colspan="1"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in dataBSEXP.list">
                  <td>{{data.form_template.name}}</td>
                  <td>{{data.form_template.description}}</td>
                  <td>{{data.form_template.type}}</td>
                  <td><a class="btn btn-warning btn-sm" @click="deleteBSEXP(data.id)"><i class="fa fa-trash"></i> Remove</a></td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              No Business / Experiment Involvement...
            </div>
            
          </div>  
        </div>  
      <!-- business section end-->
      
    </section>
    
    <scoring-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:edit="edit" v-bind:scoring="scoring" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()"></scoring-form>
       
    <track-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:scoringId="scoringId" v-bind:edit="edit" v-if="showFormTrack" @close="showFormTrack = false" @closeModalRefresh="closeModalRefreshTrack()"></track-form>
    
    <bsexp-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:scoringId="scoringId" v-bind:edit="edit" v-if="showFormBSEXP" @close="showFormBSEXP = false" @closeModalRefresh="closeModalRefreshBSEXP()"></bsexp-form>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import ScoringForm from './newScoring'
  import TrackForm from './newTrack'
  import BSEXPForm from './newBSEXP'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        dataTrack: {total:0, list:[]},
        dataBSEXP: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormName: false,
        showFormTrack: false,
        showFormBSEXP: false,
        edit: false,
        programmeId: this.$route.params.programmeId,
        phaseId: this.$route.params.phaseId,
        scoring: '',
        scoringId: '',
        scoretemplateId: '',
        showTrackSection: false,
        showBusinessSection: false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'track-form': TrackForm,
      'scoring-form': ScoringForm,
      'bsexp-form': BSEXPForm
    },
    created: function () {
      this.getData(this.programmeId, this.phaseId)
    },
    methods: {
      getData: function (programmeId, phaseId) {
        auth.getData(this, '/programme/'+ programmeId +'/phase/'+ phaseId +'/scoring')
      },
      showFormScoring: function () {
        this.showForm = true
        this.edit = false
      },
      editScoring: function (data) {
        this.showForm = true
        this.edit = true
        this.scoring = data
      },
      deleteScoring: function (id) {
        auth.deleteData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData(this.programmeId, this.phaseId)
      },
      trackInvolvement: function (id) {
        this.dataTrack = {total:0, list:[]}
        this.showTrackSection = true
        this.showBusinessSection = false
        this.scoringId = id
        this.$http.get(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring/' + id + '/track_involvement', {header: auth.getAuthHeader()})
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
        this.$http.delete(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring/' + this.scoringId + '/track_involvement/' + id, {header: auth.getAuthHeader()})
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
        this.trackInvolvement(this.scoringId)
      },
      bsexpInvolvement: function (id) {
        this.dataBSEXP = {total:0, list:[]}
        this.showBusinessSection = true
        this.showTrackSection = false
        this.scoringId = id
        this.$http.get(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring/' + id + '/business_structure_and_experiment_involvement?page=1&page_size=10', {header: auth.getAuthHeader()})
                .then(response => {
                  if(response.status === 204){
                    this.dataBSEXP = {total:0, list:[]}
                  }else{
                    return response.json()
                  }
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataBSEXP = data.data
                })
      },
      deleteBSEXP: function (id){
        this.$http.delete(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring/' + this.scoringId + '/track_involvement/' + id, {header: auth.getAuthHeader()})
                .then(response => {
                  console.log(response)
                  this.closeModalRefreshBSEXP()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      closeModalRefreshBSEXP: function () {
        this.showFormTrack = false
        this.bsexpInvolvement(this.scoringId)
      },
      addNewBSEXP: function () {
        this.showFormBSEXP = true
      },
    }
  } 
</script>  