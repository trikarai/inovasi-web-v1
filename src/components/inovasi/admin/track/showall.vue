<template>
  <div>
  <loading v-show="loading"></loading>
    <section class="content">

      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormTrack()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Track</a>

      <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->

      <div class="box" v-show="!error">

        <div class="box-body">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th colspan="3"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td><a class="btn btn-info btn-sm" @click="openSkill(data.id)">Skill Reference</a></td>
                <td><a class="btn btn-default btn-sm" @click="updateTrack(data.id)"><i class="fa fa-pencil-square-o"></i> update</a></td>
                <td><a class="btn btn-danger btn-sm" @click="deleteTrack(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
              </tr>
            </tbody>
          </table>
        </div> 
        
        <div v-show="showSkillSection">
        <a class="btn btn-default" @click="showAddFormSkill()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Skill</a>
        <onsub v-if="onSub"></onsub>  
        <div v-show="!onSub">
        <div class="box-body" v-if="dataSkill.list.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Description</th>
                <th colspan="2"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataSkill.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td><a class="btn btn-default btn-sm" @click="updateSkill(data.id)"><i class="fa fa-pencil-square-o"></i> update</a></td>
                <td><a class="btn btn-danger btn-sm" @click="deleteSkill(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
              </tr>
            </tbody>
          </table>
        </div> 
        <div class="box-body" v-else>
          No Skill Referense
        </div>  
        </div>  
        </div>  
        
      </div>      

      <form-track v-bind:edit="edit" v-bind:trackId="trackId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
      </form-track>
      
      <form-skill v-bind:edit="edit" v-bind:trackId="trackId" v-bind:skillId="skillId" v-if="showFormSkill" @close="showFormSkill = false" @closeModalRefresh="closeModalRefreshSkill()">
      </form-skill>

    </section>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import TrackForm from './newTrack'
  import SkillForm from './newSkill'
  import Loading from '@/components/loading'
  import OnSub from '@/components/onsubmit'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        dataSkill: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormSkill: false,
        edit: false,
        onSub: true,
        trackId: '',
        skillReferenceId: '',
        showSkillSection: false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-track': TrackForm,
      'form-skill': SkillForm,
      'loading': Loading,   
      'onsub': OnSub   
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/track')
      },
      showFormTrack: function () {
        this.showForm = true
        this.edit = false
      },
      showAddFormSkill: function () {
        this.showFormSkill = true
        this.edit = false
      },
      updateTrack: function (id) {
        this.showForm = true
        this.edit = true
        this.trackId = id
      },
      updateSkill: function (id) {
        this.showFormSkill = true
        this.edit = true
        this.skillId = id
      },
      deleteTrack: function (id) {
        auth.deleteData(this, '/track/' + id)
      },
      deleteSkill: function (id) {
        auth.deleteData(this, '/track/' + this.trackId + '/skill_reference/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      },
      closeModalRefreshSkill: function () {
        this.showFormSkill = false 
        this.openSkill(this.trackId)
      },
      openSkill: function (trackId) {
        this.onSub = true
        this.showSkillSection = true
        this.trackId = trackId
        this.dataSkill = {total:0, list:[]}
        this.$http.get(CONFIG.APIENDPOINT + '/track/' + trackId + '/skill_reference', {headers: auth.getAuthHeader()})
                .then(response => {
                  return response.json()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.onSub = false
                }).then(data => {
                  this.dataSkill = data.data
                  this.onSub = false
                })
      }
    }
  } 
</script>  