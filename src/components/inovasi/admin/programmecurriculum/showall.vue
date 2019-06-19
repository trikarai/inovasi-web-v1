<template>
  <div>
<loading v-show="loading"></loading>
    <section class="content">

      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormProgramme()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Curriculum</a>


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
                <td><a class="btn btn-info btn-sm" @click="openPhase(data.id)">Phase</a></td>
                <td><a class="btn btn-default btn-sm" @click="updatePC(data.id)"><i class="fa fa-pencil-square-o"></i> update</a></td>
                <td><a class="btn btn-danger btn-sm" @click="deletePC(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
              </tr>
            </tbody>
          </table>
        </div> 
        
        <div v-show="showPhaseSection">
        <a class="btn btn-warning" @click="showPhaseSection = false">Close</a>  
        <a class="btn btn-default" @click="showAddFormPhase()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Phase</a>
        <div class="box-body">
          <table class="table" v-if="dataPhase.list.length > 0">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Order</th>
                <th colspan="2"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataPhase.list">
                <td>{{data.name}}</td>
                <td>{{data.order}}</td>
                <td><a class="btn btn-default btn-sm" @click="updatePhase(data.id)"><i class="fa fa-pencil-square-o"></i> update</a></td>
                <td><a class="btn btn-danger btn-sm" @click="deletePhase(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
              </tr>
            </tbody>
          </table>
              <div v-else>
              No Phase 
            </div> 
        </div> 
         
        </div>  
        
      </div>      

      <form-pc v-bind:edit="edit" v-bind:programmecurriculumId="programmecurriculumId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
      </form-pc>
      
      <form-phase v-bind:edit="edit" v-bind:programmecurriculumId="programmecurriculumId" v-bind:phaseId="phaseId" v-if="showFormPhase" @close="showFormPhase = false" @closeModalRefresh="closeModalRefreshPhase()">
      </form-phase>

    </section>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import PCForm from './newProgramme'
  import PhaseForm from './newPhase'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {
          total : 0,
          list : []
        },
        dataPhase: {
          total : 0,
          list : []
        },
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormPhase: false,
        edit: false,
        programmecurriculumId: '',
        phaseId: '',
        showPhaseSection: false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-pc': PCForm,
      'form-phase': PhaseForm,
      'loading': Loading   
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/programme_curriculum')
      },
      showFormProgramme: function () {
        this.showForm = true
        this.edit = false
      },
      showAddFormPhase: function () {
        this.showFormPhase = true
        this.edit = false
      },
      updatePC: function (id) {
        this.showForm = true
        this.edit = true
        this.programmecurriculumId = id
      },
      updatePhase: function (id) {
        this.showFormPhase = true
        this.edit = true
        this.phaseId = id
      },
      deletePC: function (id) {
        auth.deleteData(this, '/programme_curriculum/' + id)
      },
      deletePhase: function (id) {
        auth.deleteData(this, '/programme_curriculum/' + this.programmecurriculumId + '/phase_plan/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      },
      closeModalRefreshPhase: function () {
        this.showFormPhase = false 
        this.openPhase(this.programmecurriculumId)
      },
      openPhase: function (programmecurriculumId) {
        this.showPhaseSection = false
        this.programmecurriculumId = programmecurriculumId
        this.dataPhase = []
        this.$http.get(CONFIG.APIENDPOINT + '/programme_curriculum/' + programmecurriculumId + '/phase_plan', {headers: auth.getAuthHeader()})
                .then(response => {
                  if(response.status === 204){
                    console.log(response)
                    this.dataPhase = {total : 0, list : []}
                    this.showPhaseSection = true
                  }else{
                    return response.json()
                  }        
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataPhase = data.data
                  this.showPhaseSection = true
                })
      }
    }
  } 
</script>  