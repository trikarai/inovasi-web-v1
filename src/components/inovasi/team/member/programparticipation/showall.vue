<template>
  <div>
    <loading v-show="loading"></loading>
    <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
    <!--<a class="button"><span class="glyphicon glyphicon-plus-sign"></span> Register New Program</a>-->
     
    <!--<router-link class="btn btn-default" :to="'/team/'+ teamId + '/programmeparticipation/register'">--> 
    <router-link class="btn btn-info btn-sm" v-bind:to="{name: 'Daftar Program', params: {teamId: teamId, teamName: teamName}}">
        <i class="fa fa-pencil"></i> Daftar Program Baru</router-link>
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Partisipasi Program</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
        
        <table class="table table-hover" v-if="data.list.length > 0 ">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Wilayah</th>
              <th>Fase</th>
              <th>Status</th>
              <th colspan="3"></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.programme.programme_curriculum.name}}</td>
              <td>{{data.programme.programme_curriculum.description}}</td>
              <td>{{data.programme.region.name}}</td>
              <td>
                <template v-if="data.current_phase == null">-</template>
                <template v-else><b style="color: #777777;">{{data.current_phase.name}}</b></template>
              </td>
              <td>
                <span class="statusp" v-show="data.status == 'active'">{{data.status}}</span>
                <span class="statuse" v-show="data.status == 'cancelled'">{{data.status}}</span>
                <span class="statuse" v-show="data.status == 'failed'">{{data.status}}</span>
                <span class="statuse" v-show="data.status == 'resigned'">{{data.status}}</span>
                <span class="statuse" v-show="data.status == 'rejected'">{{data.status}}</span>  
                <span class="statusr" v-show="data.status == 'registered'">{{data.status}}</span>
                <span class="statusproposed" v-show="data.status == 'graduated'">{{data.status}}</span>
              </td>
                <template v-if="data.status == 'active'">
                  <td>
                  <!--<router-link v-bind:to="'/team/'+ teamId + '/programmeparticipation/' + data.id + '/mentoringsession'"> <span class="glyphicon glyphicon-play-circle"></span> Sesi Mentoring {{data.current_phase.id}}</router-link>-->
                  <router-link class="btn btn-default btn-sm" v-bind:to="{name: 'Sesi Mentoring', params: {teamId: teamId, programmeId: data.programme.id, programmeparticipationId: data.id, phaseId: data.current_phase.id}}"> <span class="glyphicon glyphicon-education"></span> Sesi Mentoring</router-link>
                  </td>
                  <td>
                  <router-link class="btn btn-default btn-sm" v-bind:to="{name: 'Sesi Workshop', params: {teamId: teamId, programmeId: data.programme.id, programmeparticipationId: data.id, phaseId: data.current_phase.id}}"> <span class="glyphicon glyphicon-blackboard"></span> Sesi Workshop</router-link>
                  </td>
                </template>
              
                <template v-if="data.status == 'registered'">
                  <td>
                    <a class="btn btn-warning" @click="confirm2('Cancel Program Registration', data.id)"><i class="fa fa-sign-out"></i> Cancel</a>
                  </td>
                </template>
                <template v-else>
                </template>
          
                <template v-if="data.status == 'active'">
                  <td>
                    <a class="btn btn-sm btn-warning" @click="confirm('Resign Program',data.id)">Resign</a>
                  </td>
                </template>
                <template v-else>
                </template>
       
            </tr>
          </tbody>
        </table>
        <div v-else>
            No programme registered, please register a programme ...
        </div>
        
        
      </div>  
    </div>      
    
    </section>
    
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>
    <ondelete v-if="toconfirm2" @close="toconfirm2 = false" v-bind:act="act" @confirmed="confirmed2"></ondelete>
    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import OnDelete from '@/components/ondelete'

  export default {
    props: [''],
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        teamId: this.$route.params.teamId,
        teamName: this.$route.query.teamName,
        loading : false,
        toconfirm : false,
        toconfirm2 : false,
        confirmId : '',
        act : ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'ondelete': OnDelete
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getData'
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        this.loading = true
        auth.getData2(this, '/team/' + this.$route.params.teamId + '/programme_participation')
                .then(res=>{
                  console.log(res)
                  if(res.status === 204){
                    this.data = {total:0, list:[]}
                    this.loading = false
                  }else{
                    return res.json()
                    this.loading = false
                  }
                },error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                  this.loading = false
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                })
      },
      cancel: function (id) {
        this.loading = true
        auth.putData2(this, '/team/' + this.$route.params.teamId + '/programme_participation/' + id + '/cancel_registration')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getData()
                },error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                  this.loading = false
                })
      },
      resign: function (id) {
        this.loading = true
        auth.putData2(this, '/team/' + this.$route.params.teamId + '/programme_participation/' + id + '/resign')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getData()
                },error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                  this.loading = false
                })
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.resign(this.confirmId) 
      },
      confirm2: function (act, id){
        this.toconfirm2 = true
        this.act = act
        this.confirmId = id
      },
      confirmed2: function (){
        this.toconfirm2 = false
        this.cancel(this.confirmId) 
      }
    }
  } 
</script>

<style scoped>
    .statusp {
        background: #8bc751;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statuse {
        background: #ff8300 !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statuscancelled {
        background: #ff5252 !important;;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statusproposed {
        background: #009fff !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
</style>