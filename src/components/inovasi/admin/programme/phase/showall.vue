<template>
  <div>
<loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <!--<a class="btn btn-default" @click="showFormTrack()"><span class="glyphicon glyphicon-plus-sign"></span> Assign New Track</a>-->


      <div class="box" v-show="!error">

        <div class="box-body">
          <table class="table">
            <thead>
              <tr>
                <th>Phase Plan Name</th>
                <th>Phase Name</th>
                <th>Start Period</th>
                <th>End Period</th>
                <th>Team Viewable</th>
                <th>Profile Viewable</th>
                <th colspan="4"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.phase_plan.name}}</td>
                <td>{{data.name}}</td>
                <td>{{data.start_period | moment("MMMM Do YYYY")}}</td>
                <td>{{data.end_period | moment("MMMM Do YYYY")}}</td>
                <td>{{data.is_team_profile_viewable}}</td>
                <td>{{data.is_member_profile_viewable}}</td>
                <td><router-link class="btn btn-default btn-sm" :to="'/programme/' + programmeId + '/phase/' + data.id + '/workshop'">Workshop</router-link></td>
                <td><router-link class="btn btn-default btn-sm" :to="'/programme/' + programmeId + '/phase/' + data.id + '/scoring'">Scoring</router-link></td>
                <td><router-link class="btn btn-default btn-sm" :to="'/programme/' + programmeId + '/phase/' + data.id + '/mentoring'">Mentoring</router-link></td>
                <td><router-link class="btn btn-default btn-sm" :to="'/programme/' + programmeId + '/phase/' + data.id + '/scorerecap'">Score Recap</router-link></td>
              </tr>
            </tbody>
          </table>
        </div> 

      </div>  

<!--  <form-track v-bind:edit="edit" v-bind:tutorId="tutorId" v-bind:programmeId="programmeId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
  </form-track>-->

</section>

</div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
//  import TrackForm from './newTrack'
    import Loading from '@/components/loading'

  export default {
    data: function () {
      return {
        data: '',
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        programmeId: this.$route.params.programmeId,
        trackId: ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading   
//      'form-track': TrackForm
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/programme/' + this.programmeId + '/phase')
      },
      showFormTrack: function () {
        this.showForm = true
        this.edit = false
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      }
    }
  } 
</script>  