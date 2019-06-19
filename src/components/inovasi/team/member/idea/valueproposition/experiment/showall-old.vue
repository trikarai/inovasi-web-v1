<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>


      <div class="box">
        <div class="box-body">
          
          <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Team</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs'">Idea</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona'">Customer Segment</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'">Persona</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Experiment</li>
            </ol>
          </nav>
            <nav class="remahroti" aria-label="breadcrumb" v-else>
              <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/personnel/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs'">Idea</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona'">Customer Segment</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona/'+personaId+'/vp'">Persona</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Experiment</li>
            </ol>
          </nav> 
          <!--end breadcrumb-->

          <ul class="nav nav-tabs">
            <!--<li class="active"><a data-toggle="tab" href="#main">Main</a></li>-->
            <li v-for="(data, index) in dataTemplate.list"><a data-toggle="tab" :href="'#'+index" @click="getExpData(data.id)">{{data.name}}</a></li>
            <!--<li :class="{ 'active': index === 0 }" v-for="(data, index) in dataTemplate.list"><a data-toggle="tab" :href="'#'+index" @click="getExpData(data.id)">{{data.name}}</a></li>-->
          </ul>

          <div class="tab-content">
            <div id="main" class="tab-pane fade in active">
              <div class="box-body">
                Please Select Experiment tab to show data
              </div>
            </div>
            <div v-for="(data, index) in dataTemplate.list" :id="index" class="tab-pane fade in" >
              <!--<div v-for="(data, index) in dataTemplate.list" :id="index" :class="{'tab-pane fade in' : true,'active': index === 0}" >-->
              <!--{{dataExp}}-->
 <button v-if="index != null" class="btn btn-info" @click="learning(data.name)" style="border-radius: 5px; padding: 2px 8px;"><i class="fa fa-info-circle"></i> Click here if u want to learn more about {{data.name}}</button>
              <a v-if="role === 'Talent'" style="margin: 10px" class="btn btn-default btn-sm" @click="addExp(data.id)"><i class="fa fa-plus"></i> Add</a>

              <div v-show="!onSubmit">
                <div v-if="dataExp.total > 0">

                  <table style="white-space: pre-line" class="table table-hover">
                    <thead>
                      <tr>
                        <th>Experiment Name</th>
                        <th>Date</th>
                        <th colspan="3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="data in dataExp.list">
                        <td>{{data.name}}</td>
                        <td>{{data.date | moment("dddd, D MMMM YY")}}</td>
                        <!--<td><a class="btn btn-info btn-sm" @click="expDetail(data)"><i class="fa fa-asterisk"></i> Detail</a></td>-->
                        <td>
                          <router-link v-if="role === 'Talent'" v-bind:to="{path:'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + valuepropositionId + '/experiment/' + data.id, query: {aspect: data}}" class="btn btn-info btn-sm"><i class="fa fa-asterisk"></i> Detail</router-link>
                          <router-link v-if="role === 'Personnel'" v-bind:to="{path:'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + valuepropositionId + '/experiment/' + data.id, query: {aspect: data}}" class="btn btn-info btn-sm"><i class="fa fa-asterisk"></i> Detail</router-link>
                        </td>
                        <td><a v-if="role === 'Talent'" class="btn btn-warning btn-sm" @click="editExp(data)"><i class="fa fa-pencil"></i> Edit</a></td>
                        <td>
                          <a v-if="role === 'Talent'" class="btn btn-danger btn-sm" @click="confirm('Delete',data.id)"><i class="fa fa-trash"></i> Delete</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                <div class="box-body" style="padding: 10px" v-else>
                  No {{data.name}} Data
                </div>
              </div>              
              <onsub v-show="onSubmit"></onsub>

            </div>
          </div>

        </div>
      </div>
      
      <!--{{data}}-->

      <!--<a v-show="!showTemplate" class="btn btn-warning" @click="showTemplateExp()"><span class="glyphicon glyphicon-plus-sign"></span> Create New Experiment</a>-->

<!--      <div class="box" v-if="showTemplate">
        <a class="btn btn-warning" @click="showTemplate = false"><i class="fa fa-times"></i> Close</a>
        <div class="box-body">

          <h4 v-show="dataTemplate.total > 0">Choose Experiment Template</h4>

          <table class="table" v-if="dataTemplate.total > 0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th colspan="1"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataTemplate.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td><a class="btn btn-default" @click="addExp(data.id)">Add</a></td>
              </tr>
            </tbody>
          </table>
          <div style="padding:20px" v-if="dataTemplate.total == ''">
            No experiment template yet, please be patient...
          </div>
        </div>
      </div>    -->

    </section>

    <form-exp v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-bind:personaId="personaId" v-bind:valuepropositionId="valuepropositionId" v-bind:templateId="templateId" v-bind:template="template" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-exp>

    <detail-persona v-bind:aspect="template"  v-if="showDetail" @close="showDetail = false" @closeModalRefresh="closeModalRefresh()">
    </detail-persona>

    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
    
  </div>
</template>


<script>
  import auth from '@/httpcontrol'
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../../errorflash'
  import FormExp from './newExp'
  import onSubmit from '@/components/onsubmit'
  import DetailPersona from './detailExp'
  import OnDelete from '@/components/ondelete'

  export default {
    data: function () {
      return {
        data: {total:0,list:[]},
        dataExp : {total:0,list:[]},
        dataTemplate: {total:0,list:[]},
        showTemplate: false,
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
        templateId: '',
        loading : true,
        template: '',
        onSubmit : false,
        showDetail : false,
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
      'form-exp': FormExp,
      'detail-persona': DetailPersona,
      'onsub' : onSubmit,
      'ondelete': OnDelete
    },
    created: function () {
//      this.getData()
      this.role = localStorage.getItem('role')
      if(this.role !== 'Talent'){
          this.url = '/tutor/' + this.tutorId
      }
      this.showTemplateExp()
    },
    methods: {
      getData: function () {
        auth.getData(this, this.url + '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.$route.params.valuepropositionId + '/experiment')
      },
      getExpData: function (id){
        this.onSubmit = true
        this.templateId = id
        auth.getData2(this, this.url + '/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/experiment?experiment_template_id[]='+ id)
                .then(response => {
                  if(response.status === 204){
                    this.dataExp = {total:0, list:[]}
                    this.onSubmit = false
                  }else{
                    return response.json()
                  }
                }, error => {
                 alertControl.showError(this, error.body.meta)
                 this.onSubmit = false
                }).then(data => {
                 this.dataExp = data.data
                 this.onSubmit = false
                })

      },
      editExp: function (data) {
        this.showForm = true
        this.edit = true
        this.template = data
      },
      deleteBS: function (id) {
        auth.deleteData(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.$route.params.valuepropositionId + '/experiment/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false
//        this.getData()
        this.getExpData(this.templateId)
      },
      showTemplateExp: function () {
        this.showTemplate = true
        this.$http.get(CONFIG.APIENDPOINT + '/team/form_template/experiment', {headers: auth.getAuthHeader()})
            .then(response => {
              return response.json()
            }, error => {
             alertControl.showError(this, error.body.meta)
            }).then(data => {
             this.dataTemplate = data.data
             this.loading = false
            })
      },
      addExp: function (id){
        this.showForm = true
        this.edit = false
        this.templateId = id
        this.template = ''
      },
      deleteExp: function (id) {
        this.loading = true
        auth.deleteData2(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + this.$route.params.valuepropositionId + '/experiment/' + id )
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
      expDetail: function (data) {
        this.template = data
        this.showDetail = true
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.deleteExp(this.confirmId) 
      },
      learning: function (name){
          let routeData2 = this.$router.resolve({path: '/learning', query: {type: name}});
          window.open(routeData2.href, '_blank');
      }
    }
  }
</script>