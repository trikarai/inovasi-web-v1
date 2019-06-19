<template>
  <div>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormTrack()"><span class="glyphicon glyphicon-plus-sign"></span> Assign New Track</a>


      <div class="box" v-show="!error">

        <div class="box-body">
          <table class="table">
            <thead>
              <tr>
                <th>Track Name</th>
                <th>Description</th>
                <th colspan="1"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.track.name}}</td>
                <td>{{data.track.description}}</td>
                <td><a class="btn btn-warning" @click="deleteTrack(data.id)">Remove</a></td>
              </tr>
            </tbody>
          </table>
        </div> 

      </div>  

  <form-track v-bind:edit="edit" v-bind:tutorId="tutorId" v-bind:programmeId="programmeId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
  </form-track>

</section>

</div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import TrackForm from './newTrack'
  
  export default {
    data: function () {
      return {
        data: {total:0,list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        programmeId: this.$route.params.programmeId,
        tutorId: this.$route.params.tutorId,
        trackId: ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-track': TrackForm
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/programme/' + this.programmeId + '/tutor/' + this.tutorId + '/track_assignment')
      },
      showFormTrack: function () {
        this.showForm = true
        this.edit = false
      },
      deleteTrack: function (id) {
        auth.deleteData(this, '/programme/' + this.programmeId + '/tutor/' + this.tutorId + '/track_assignment/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      }
    }
  } 
</script>  