<template>
  <div>
<loading v-show="loading"></loading>
    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormProgramme()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Programme</a>

      <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->

      <div class="box" v-show="!error">

        <div class="box-body">
          <table class="table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Programme Curriculum</th>
                <th colspan="4"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.region.name}}</td>
                <td>{{data.programme_curriculum.name}}</td>
                <td><router-link class="btn btn-info btn-sm" :to="'/programme/'+data.id+'/phase'">Phase</router-link></td>
                <td><a class="btn btn-default btn-sm" @click="openTutor(data.id)">Tutor</a></td>
                <td><a class="btn btn-default btn-sm" @click="openCoordinator(data.id)">Coordinator</a></td>
                <td><a class="btn btn-danger btn-sm" @click="deleteProgramme(data.id)"><i class="fa fa-close"></i> Cancel</a></td>
              </tr>
            </tbody>
          </table>
        </div> 
        
        <div v-show="showPersonnelSection">
        <h2>{{nameStatus}}</h2>
        <a v-if="nameStatus === 'Tutor'" class="btn btn-default" @click="showAddPersonnel('tutor')"><span class="glyphicon glyphicon-plus-sign"></span> Assign Tutor</a>
        <a v-if="nameStatus === 'Coordinator'" class="btn btn-default" @click="showAddPersonnel('coordinator')"><span class="glyphicon glyphicon-plus-sign"></span> Assign Coordinator</a>
        <div class="box-body" v-if="dataPersonnel.list.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>email</th>
                <th>Assign Time</th>
                <th colspan="2"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataPersonnel.list">
                <td>{{data.personnel.name}}</td>
                <td>{{data.personnel.email}}</td>
                <td>{{data.assign_time}}</td>
                <td v-if="nameStatus === 'Coordinator'"><a class="btn btn-warning" @click="deletePersonnel(data.id, 'coordinator')">delete</a></td>
                <td v-if="nameStatus === 'Tutor'"><router-link :to="'/programme/'+programmeId+'/tutor/'+ data.id + '/trackassignment'">Track Assign</router-link></td>
                <td v-if="nameStatus === 'Tutor'"><a class="btn btn-warning" @click="deletePersonnel(data.id, 'tutor')">delete</a></td>
              </tr>
            </tbody>
          </table>
        </div> 
        <div class="box-body" v-else>
          No Data
        </div>  
        </div>  
        
      </div>      

      <form-programme v-bind:edit="edit" v-bind:programmeId="programmeId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
      </form-programme>
      
      <form-personnel v-bind:edit="edit" v-bind:nameStatus="nameStatus" v-bind:programmeId="programmeId" v-bind:skillId="skillId" v-if="showFormPersonnel" @close="showFormPersonnel = false" @closeModalRefresh="closeModalRefreshPersonnel()">
      </form-personnel>

    </section>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import ProgrammeForm from './newProgramme'
  import PersonnelForm from './newPersonnel'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        dataPersonnel: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormPersonnel: false,
        edit: false,
        programmeId: '',
        skillReferenceId: '',
        showPersonnelSection: false,
        nameStatus: ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-programme': ProgrammeForm,
      'form-personnel': PersonnelForm,
      'loading': Loading   
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/programme')
      },
      showFormProgramme: function () {
        this.showForm = true
        this.edit = false
      },
      showAddPersonnel: function () {
        this.showFormPersonnel = true
        this.edit = false
      },
      updateProgramme: function (id) {
        this.showForm = true
        this.edit = true
        this.programmeId = id
      },
      updateSkill: function (id) {
        this.showFormPersonnel = true
        this.edit = true
        this.skillId = id
      },
      deleteProgramme: function (id) {
        auth.deleteData(this, '/programme/' + id)
      },
      deletePersonnel: function (id, type) {
        auth.deleteData(this, '/programme/' + this.programmeId + '/' + type + '/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      },
      closeModalRefreshPersonnel: function () {
        this.showFormPersonnel = false 
        this.openCoordinator(this.programmeId)
      },
      openCoordinator: function (programmeId) {
        this.showPersonnelSection = true
        this.programmeId = programmeId
        this.dataPersonnel = {total:0, list: []}
        this.nameStatus = 'Coordinator'
        this.$http.get(CONFIG.APIENDPOINT + '/programme/' + programmeId + '/coordinator', {headers: auth.getAuthHeader()})
                .then(response => {
                    return response.json()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataPersonnel = data.data
                })
      },
      openTutor: function (programmeId) {
        this.showPersonnelSection = true
        this.programmeId = programmeId
        this.dataPersonnel = {total :0, list : []}
        this.nameStatus = 'Tutor'
        this.$http.get(CONFIG.APIENDPOINT + '/programme/' + programmeId + '/tutor', {headers: auth.getAuthHeader()})
                .then(response => {
                  return response.json()  
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataPersonnel = data.data
                })
      }
    }
  } 
</script>  