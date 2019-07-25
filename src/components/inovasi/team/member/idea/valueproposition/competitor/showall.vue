<template>
  <div>
        <loading v-show="loading"></loading>

    <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
    <a v-if="role === 'Talent'" class="btn btn-default" @click="showFormCompetitor()"><span class="glyphicon glyphicon-plus-sign"></span> Create New Competitor</a>
     
    <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Team</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs'">Ide</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'">Tipe Pengguna</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'">Segmen Pelanggan</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Competitor</li>
            </ol>
          </nav>
          <nav class="remahroti" aria-label="breadcrumb" v-else>
              <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/personnel/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'">Ide</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'">Tipe Pengguna</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'">Segmen Pelanggan</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Competitor</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
        <h3>Competitor <button class="btn btn-info" @click="learningC" style="border-radius: 5px; padding: 2px 8px;"><i class="fa fa-question"></i></button></h3>
        <table style="white-space: pre-line" class="table table-hover" v-if="data.total > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value Proposed</th>
              <th>Comparative Advantage</th>
              <th>Differential Advantage</th>
              <th>Focus</th>
              <th>Asset</th>
              <th>Unfair Advantage</th>
              <th colspan="2"></th>   
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.name}}</td>
              <td><span v-html="data.value_proposed"></span></td>
              <td><span v-html="data.comparative_advantage"></span></td>
              <td><span v-html="data.differential_advantage"></span></td>
              <td><span v-html="data.focus"></span></td>
              <td><span v-html="data.asset"></span></td>
              <td><span v-html="data.unfair_advantage"></span></td>
              <td><a v-if="role === 'Talent'" class="btn btn-default" @click="updateCompetitor(data.id)"><i class="fa fa-pencil"></i></a></td>
              <td><a v-if="role === 'Talent'" class="btn btn-warning" @click="confirm('Delete', data.id)"><i class="fa fa-trash"></i></a></td>
            </tr>
          </tbody>
        </table>
        <div style="padding:10px" v-if="data.total === 0">
          No Competitor Data Yet, please create new...
        </div> 
      </div>  
    </div>      
   
    <!--{{data}}-->
    
    </section>
    
    
    <form-competitor v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-bind:personaId="personaId" v-bind:valuepropositionId="valuepropositionId" v-bind:competitorId="competitorId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-competitor>
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol'
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../../errorflash'
  import FormCompetitor from './newCompetitor'
  import OnDelete from '@/components/ondelete'

  export default {
    data: function () {
      return {
        data: {total:0,list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        tutorId: this.$route.params.tutorId,
        teamId: this.$route.params.teamId,
        ideaId: this.$route.params.ideaId,
        customersegmentId: this.$route.params.customersegmentId,
        personaId: this.$route.params.personaId,
        valuepropositionId: this.$route.params.valuepropositionId,
        loading : true,
        competitorId: '',
        role: '',
        url : '',
        toconfirm : false,
        confirmId : '',
        act : ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'form-competitor': FormCompetitor,
      'ondelete': OnDelete
    },
    created: function () {
      this.role = localStorage.getItem('role')
      if(this.role !== 'Talent'){
          this.url = '/tutor/' + this.tutorId
      }
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData2(this, this.url + '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.$route.params.valuepropositionId + '/competitor')
                .then(res=>{
                  if(res.status === 204){
                    this.data = {total:0, list:[]}
                  }else if(res.status === 404){
                    alertControl.showError(this, ["404 not found"])
                  }else {
                    return res.json()
                  }
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                })
      },
      showFormCompetitor: function () {
        this.showForm = true
        this.edit = false
      },
      updateCompetitor: function (id) {
        this.showForm = true
        this.edit = true
        this.competitorId = id
      },
      deleteCompetitor: function (id) {
        this.loading = true
        auth.deleteData2(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.$route.params.valuepropositionId + '/competitor/' + id)
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.closeModalRefresh()
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      },
      closeModalRefresh: function () {
        this.showForm = false
        this.getData()
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.deleteCompetitor(this.confirmId) 
      },
      learningC: function () {
          let routeData = this.$router.resolve({path: '/learning', query: {type: "Competitor"}});
          window.open(routeData.href, '_blank');
      }
    }
  } 
</script>  