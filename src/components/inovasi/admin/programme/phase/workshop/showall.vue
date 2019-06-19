<template>
  <div>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <router-link class="btn btn-default" :to="'/programme/' + programmeId + '/phase/' + phaseId + '/workshop/new'">Add New Workshop</router-link>

      <!-- workshop content-->
      <div class="box">
        <div class="box-body">
          <table class="table" v-if="data.list.length > 0">
            <thead>
              <tr>
                <th> Name</th>
                <th> Description</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td><a class="btn btn-info" @click="showPublication(data)"><i class="fa fa-asterisk"></i>  Detail</a></td>
                <td><a class="btn btn-warning" @click="deleteWorkshop(data.id)"><i class="fa fa-trash"></i>  remove</a></td>
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
            <a class="btn btn-danger" @click="showPublicationSection = false"> Close </a>
            <router-link class="btn btn-default" :to="'/programme/' + programmeId + '/phase/' + phaseId + '/workshop/' + publicationData.id">Edit Workshop</router-link>
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
          
          
          <div id="editor">
            <h3>Publication</h3> 
              <div v-html="compiledMarkdown(publicationData.publication)"></div>
          </div>
         
   
          <hr>
          
        </div>
      </div>      
      <!-- publication content end-->
      
    </section>
    
 <!--<workshop-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:edit="edit" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()"></workshop-form>-->
    
    

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
//  import ScoreRecapForm from './newScoreRecap'

  
  export default {
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
        programmeId: this.$route.params.programmeId,
        phaseId: this.$route.params.phaseId,
      }
    },
    components: {
      'error-flash': ErrorFlash
//      'workshop-form': ScoreRecapForm
    },
    computed: {
    },
    created: function () {
      this.getData(this.programmeId, this.phaseId)
    },
    methods: {
      getData: function (programmeId, phaseId) {
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
      showFormRecap: function () {
        this.showForm = true
        this.edit = false
      },
      deleteWorkshop: function (id) {
        auth.deleteData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/workshop/' + id)
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
      }
    }
  } 
</script>  