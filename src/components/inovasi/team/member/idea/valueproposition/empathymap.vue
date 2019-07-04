<template>
  <div>
    <loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <!--<a v-if="role === 'Talent'" class="btn btn-default" @click="showFormVP()"><span class="glyphicon glyphicon-plus-sign"></span> Create Value Proposition</a>-->

      <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->

      <div class="box" v-show="!error">
        <div class="box-body">
          
          <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Beranda</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs'">Ide</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona'">Tipe Pengguna</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Empathy Map</li>
            </ol>
          </nav>
            <nav class="remahroti" aria-label="breadcrumb" v-else>
              <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/personnel/dashboard'">Beranda</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs'">Ide</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs/'+customersegmentId+'/persona'">Tipe Pengguna</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Empathy Map</li>
            </ol>
          </nav> 
          <!--end breadcrumb-->
          
          <main class="pagebody">
            <div style="padding-bottom: 30px;white-space: pre-line" class="col-md-12">
              <h3 class="tabcs"><b>Segmen Pelanggan</b>
                <button v-if="role === 'Talent'" @click="editPersona(dataParent)" class="btn btn-default btn-sm"><i class="fa fa-edit"></i></button>
                <router-link v-if="role === 'Talent'" class="tmblvpkanan" style="float: right;cursor: pointer;"  v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/'"><i class="fa fa-chevron-right pnhkanan"></i></router-link> 
                <router-link v-else class="tmblvpkanan" style="float: right;cursor: pointer;"  v-bind:to="'/tutor/' + tutorId + '/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/'"><i class="fa fa-chevron-right pnhkanan"></i></router-link> 
                <span class="tombvpnext">Empathy Map</span>              
              </h3>

              <div v-if="dataParent != 0">

                <div class="col-md-6">
                  <table class="table garistabel tabel-bordered table-striped tabelEM" style="border: 1px solid #e4e4e4;word-break: break-word;">
                    <tbody>
                      <tr style="font-weight: bold">
                        <td style="width:50%">Nama Persona</td>
                      </tr>
                      <tr>
                        <td>{{dataParent.name}}</td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td style="width:50%">Catatan</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.description">{{dataParent.description}}</td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[0].field_template.name}}</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.aspect[0].value" class="padkiriEV" v-html="dataParent.aspect[0].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[1].field_template.name}}</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.aspect[1].value" class="padkiriEV" v-html="dataParent.aspect[1].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[2].field_template.name}}</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.aspect[2].value" class="padkiriEV" v-html="dataParent.aspect[2].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[3].field_template.name}}</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.aspect[3].value" class="padkiriEV" v-html="dataParent.aspect[3].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                                  
                    </tbody>
                  </table>
                </div>
                       
                <div class="col-md-6">
                  <table class="table garistabel tabel-bordered table-striped tabelEM" style="border: 1px solid #e4e4e4;word-break: break-word;">
                    <tbody>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[4].field_template.name}}</td>
                      </tr>        
                      <tr>
                        <td v-if="dataParent.aspect[4].value" class="padkiriEV" v-html="dataParent.aspect[4].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[5].field_template.name}}</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.aspect[5].value" class="padkiriEV" v-html="dataParent.aspect[5].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold">
                        <td>{{dataParent.aspect[6].field_template.name}}</td>
                      </tr>
                      <tr>
                        <td v-if="dataParent.aspect[6].value" class="padkiriEV" v-html="dataParent.aspect[6].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                        <td>{{dataParent.aspect[7].field_template.name}}</td>
                      </tr>
                      <tr v-if="dataParent.aspect.length > 8">
                        <td v-if="dataParent.aspect[7].value" class="padkiriEV" v-html="dataParent.aspect[7].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                        <td>{{dataParent.aspect[8].field_template.name}}</td>
                      </tr>
                      <tr v-if="dataParent.aspect.length > 8">
                        <td v-if="dataParent.aspect[8].value" class="padkiriEV" v-html="dataParent.aspect[8].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                        <td>{{dataParent.aspect[9].field_template.name}}</td>
                      </tr>
                      <tr v-if="dataParent.aspect.length > 8">
                        <td v-if="dataParent.aspect[9].value" class="padkiriEV" v-html="dataParent.aspect[9].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                        <td>{{dataParent.aspect[10].field_template.name}}</td>
                      </tr>
                      <tr v-if="dataParent.aspect.length > 8">
                        <td v-if="dataParent.aspect[10].value" class="padkiriEV" v-html="dataParent.aspect[10].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                        <td>{{dataParent.aspect[11].field_template.name}}</td>
                      </tr>
                      <tr v-if="dataParent.aspect.length > 8">
                        <td v-if="dataParent.aspect[11].value" class="padkiriEV" v-html="dataParent.aspect[11].value"></td>
                        <td v-else><span class="takadadata">tidak ada data</span></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
             
              <!-- <table class="table garistabel tabel-bordered table-striped tabelEM" style="border: 1px solid #e4e4e4;word-break: break-word;">
                <tbody>
                  <tr style="font-weight: bold;width:100%">
                    <td style="width:50%">Nama Persona</td>
                    <td style="width:50%">Catatan</td>
                  </tr>
                  <tr>
                    <td>{{dataParent.name}}</td>
                    <td v-if="dataParent.description">{{dataParent.description}}</td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                  <tr style="font-weight: bold">
                    <td>{{dataParent.aspect[0].field_template.name}}</td>
                    <td>{{dataParent.aspect[2].field_template.name}}</td>
                  </tr>
                  <tr>
                    <td v-if="dataParent.aspect[0].value" class="padkiriEV" v-html="dataParent.aspect[0].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                    <td v-if="dataParent.aspect[2].value" class="padkiriEV" v-html="dataParent.aspect[2].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                  <tr style="font-weight: bold">
                    <td>{{dataParent.aspect[1].field_template.name}}</td>
                    <td>{{dataParent.aspect[3].field_template.name}}</td>
                  </tr>
                  <tr>
                    <td v-if="dataParent.aspect[1].value" class="padkiriEV" v-html="dataParent.aspect[1].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                    <td v-if="dataParent.aspect[3].value" class="padkiriEV" v-html="dataParent.aspect[3].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                  <tr style="text-align:center;font-weight:bold">
                    <td  colspan="2">{{dataParent.aspect[4].field_template.name}}</td>
                  </tr>
                  <tr>
                    <td v-if="dataParent.aspect[4].value" colspan="2" class="padkiriEV" v-html="dataParent.aspect[4].value"></td>
                    <td v-else colspan="2"><span class="takadadata">tidak ada data</span></td>
                  </tr>
                  <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                    <td>{{dataParent.aspect[7].field_template.name}}</td>
                    <td>{{dataParent.aspect[8].field_template.name}}</td>
                  </tr>
                   <tr v-if="dataParent.aspect.length > 8">
                    <td v-if="dataParent.aspect[7].value" class="padkiriEV" v-html="dataParent.aspect[7].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                    <td v-if="dataParent.aspect[8].value" class="padkiriEV" v-html="dataParent.aspect[8].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                  <tr style="font-weight: bold" v-if="dataParent.aspect.length > 8">
                    <td v-if="dataParent.aspect[9]">{{dataParent.aspect[9].field_template.name}}</td>
                    <td v-if="dataParent.aspect[10]">{{dataParent.aspect[10].field_template.name}}</td>
                  </tr>
                  <tr v-if="dataParent.aspect.length > 8"> 
                    <td v-if="dataParent.aspect[9].value" class="padkiriEV" v-html="dataParent.aspect[9].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                    <td v-if="dataParent.aspect[10].value" class="padkiriEV" v-html="dataParent.aspect[10].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                  <tr v-if="dataParent.aspect.length > 8">
                    <td v-if="dataParent.aspect[11]" colspan="2" style="text-align:center;font-weight:bold">{{dataParent.aspect[11].field_template.name}}</td>
                  </tr>
                  <tr v-if="dataParent.aspect.length > 8">
                    <td v-if="dataParent.aspect[11].value" colspan="2" class="padkiriEV" v-html="dataParent.aspect[11].value" ></td>
                    <td colspan="2" v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                 
                  <tr style="font-weight: bold">
                    <td>{{dataParent.aspect[5].field_template.name}}</td>
                    <td>{{dataParent.aspect[6].field_template.name}}</td>
                  </tr>
                  <tr>
                    <td v-if="dataParent.aspect[5].value" class="padkiriEV" v-html="dataParent.aspect[5].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                    <td v-if="dataParent.aspect[6].value" class="padkiriEV" v-html="dataParent.aspect[6].value"></td>
                    <td v-else><span class="takadadata">tidak ada data</span></td>
                  </tr>
                </tbody>
              </table> -->

              </div>

              <div v-else>Tidak ada data, Mohon untuk mengisi data <b>Segmen Pelanggan</b></div>

              <!-- <div class="list-group">    
                  <div class="list-group-item"> 
                    <label style="margin-top: 12px">Nama Persona</label>
                 
                    <div class="brdleft">{{dataParent.name}}
                     <a style="float:right" class="btn btn-default" @click=""><i class="fa fa-pencil-square"></i> </a>
                    </div>
                  </div>
                  <div class="list-group-item">
                      <label>Note</label>
                      <div class="linkli__url"> {{dataParent.description}}</div>
                  </div>
    
                  <label class="label label-primary">Created Time</label>
                  <div class="linkli__url"> {{dataParent.created_time}}</div>
   
    
                  <template v-for="aspect in dataParent.aspect">
                    <div class="list-group-item">
                        <label>{{aspect.field_template.name}}</label>
                        <div class="linkli__url"><span v-html="aspect.value"></span></div>
                    </div>
                  </template>
              </div> -->
            </div>


            <div style="display:none;" class="vpfloat col-md-6">
              <h3 class="tabcs"><b>Value Proposition</b></h3>
            <div class="rightsection" v-if="data.total > 0">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th style="min-width: 300px">Deskripsi</th>
                    <th colspan="3"></th>
                    <!--              <th>Created Time</th>-->
                    
<!--                    <th colspan="2"></th>   -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in data.list">
                    <td style="padding: 20px">
                        <div class="">
                            <div style="white-space: pre-line" class="linkli__url">{{data.description}}</div>
                        </div>
                        <div class="" style="margin-top: 20px">
                          <template v-if="data.is_active == true">
                            <div style="padding:6px;" class="col-md-6">
                                <span class="statusp">Utama</span>
                            </div>
                            <a v-if="role === 'Talent'" class="btn btn-default" @click="updateVP(data.id)"><i class="fa fa-pencil"></i></a>
                            <a v-if="role === 'Talent'" class="btn btn-warning" @click="confirm('Delete', data.id)"><i class="fa fa-trash"></i></a>
                          </template>
                          <template v-else>
                            <div style="padding:6px;" class="col-md-6">
                                <a v-if="role === 'Talent'" class="btn btn-default midea" @click="activateVP(data.id)"><i class="fa fa-check"></i> Ubah jadi Utama</a>
                            </div>
                            <a v-if="role === 'Talent'" class="btn btn-default" @click="updateVP(data.id)"><i class="fa fa-pencil"></i></a>
                            <a v-if="role === 'Talent'" class="btn btn-warning" @click="confirm('Delete', data.id)"><i class="fa fa-trash"></i></a>
                          </template>
                        </div>
                    </td>
                    <td>
                      <template v-if="role === 'Talent'">
                        <router-link class="btn btn-default btn-sm" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/businessstructure#vp'"><i class="fa fa-sitemap"></i> Analisa Bisnis</router-link><br>
                        <!-- <router-link style="margin-top:5px;" class="btn btn-default btn-sm" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/competitor'"><i class="fa fa-trophy"></i> Kompetitor</router-link><br> -->
                        <router-link style="margin-top:5px;" class="btn btn-default btn-sm" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/experiment'"><i class="fa fa-thermometer-2"></i> Percobaan Bisnis</router-link>
                      </template>  
                      <template v-else>
                        <router-link class="btn btn-default btn-sm" v-bind:to="'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/businessstructure'"><i class="fa fa-sitemap"></i> Business Analysis</router-link><br>
                        <!-- <router-link style="margin-top:5px;" class="btn btn-default btn-sm" v-bind:to="'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/competitor'"><i class="fa fa-trophy"></i> Competitor</router-link><br> -->
                        <router-link style="margin-top:5px;" class="btn btn-default btn-sm" v-bind:to="'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/experiment'"><i class="fa fa-thermometer-2"></i> Experiment</router-link>
                      </template>  
                    </td>
<!--
                <td>
                    <router-link class="btn btn-default btn-sm" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/competitor'"><i class="fa fa-trophy"></i> Competitor</router-link>
                </td>
                <td>
                    <router-link class="btn btn-default btn-sm" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + personaId + '/vp/' + data.id + '/experiment'"><i class="fa fa-thermometer-2"></i> Experiment
                    </router-link>
                </td>
-->
<!--
                <td>
                  <template v-if="data.is_active == true">
                    <span style="display:none" class="statusp">Activated</span>
                  </template>
                  <template v-else>
                    <a v-if="role === 'Talent'" class="btn btn-default midea" @click="activateVP(data.id)"><i class="fa fa-check"></i> Activate</a>
                  </template>      
                </td>
-->
<!--
                <td><a v-if="role === 'Talent'" class="btn btn-default" @click="updateVP(data.id)"><i class="fa fa-pencil"></i></a></td>
                <td><a v-if="role === 'Talent'" class="btn btn-warning" @click="deleteVP(data.id)"><i class="fa fa-trash"></i></a></td>
-->
                </tr>
                </tbody>
              </table>
            </div>
              <div v-if="data.total === 0">
                <h5 style="padding: 10px;background: #fff;display: inline-block">No Data, please create value proposition... </h5>
              </div>              
                <a v-if="role === 'Talent'" class="btn btn-primary" @click="showFormVP()"><span class="glyphicon glyphicon-plus-sign"></span> Buat Value Proposition Baru</a>
              
            </div>  
                        
          </main>   
        </div>  
      </div>      

      <!--{{data}}-->

      <!-- <div class="box">
        <div class="box-body">

          <comment-sec>
          </comment-sec>  

        </div>
      </div> -->

    </section>


    <form-vp v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-bind:personaId="personaId" v-bind:valuepropositionId="valuepropositionId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-vp>
    
    <form-persona v-bind:template="template" v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-bind:personaId="personaId" v-if="showFormPersona" @close="showFormPersona = false" @closeModalRefresh="closeModalRefresh()">
    </form-persona>
    
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import FormVP from './newVP'
  import FormPersona from '../persona/newPersona'
  import onSubmit from '@/components/onsubmit'
  import CommentTemplate from '@/components/inovasi/comment/commentPersona'
  import OnDelete from '@/components/ondelete'

  export default {
    data: function () {
      return {
        data: {total: 0, list : []},
        dataParent : '',
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
        valuepropositionId: '',
        loading : false,
        onComment : false,
        commentsPersona : {total:0, list:[]},
        komentar : {
          content : ''
        },
        balasan : {
          content : ''
        },
        showId : '',
        role: '',
        url : '',
        showFormPersona : false,
        template : '',
        toconfirm : false,
        confirmId : '',
        act : ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'onsub' : onSubmit,
      'comment-sec': CommentTemplate,
      'form-vp': FormVP,
      'form-persona': FormPersona,
      'ondelete': OnDelete
    },
    created: function () {
      this.role = localStorage.getItem('role')  
      if(this.role !== 'Talent'){
          this.url = '/tutor/' + this.tutorId
      }
      this.getPersona()
      this.getComments()
    },
    methods: {
      getPersona: function (){
        this.loading = true
        auth.getData2(this, this.url + '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId)
                .then(res=>{
                  console.log(res)
                  return res.json()
                }, error=>{
                  console.log(error)
                }).then(data=>{
                  this.dataParent = data.data
                  this.getData()
                })

      },
      getData: function () {
        auth.getData(this, this.url + '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition')
      },
      getComments: function () {
        auth.getData2(this, '/team_member/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/comment')
                .then(res=>{
                  if(res.status === 204){ 
                  }else{
                    return res.json()
                  }
                }, error=>{
                  console.log(error)
                }).then(data=>{
                  this.commentsPersona = data.data
                })
      },
      sendComment: function () {
        auth.postData2(this, '/team_member/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/comment', this.komentar)
                .then(res=>{
                  console.log(res)
                  this.komentar.content = ''
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      showFormVP: function () {
        this.showForm = true
        this.edit = false
      },
      updateVP: function (id) {
        this.showForm = true
        this.edit = true
        this.valuepropositionId = id
      },
      deleteVP: function (id) {
        this.loading = true
        auth.deleteData2(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/'+ this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/' + id)
                .then(res=>{
                  console.log(res)
                  this.closeModalRefresh()
                  this.loading = false
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      },
      activateVP: function (id) {
        auth.putData2(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/'+ this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/value_proposition/'+ id +'/activate')
                .then(res => {
                  console.log(res)
                  this.closeModalRefresh()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.showFormPersona = false 
        this.data = {total: 0, list : []}
//        this.getData()
        this.getPersona()
      },
      openReply: function (id){
        this.showId = id
        this.balasan.content = ''
      },
      closeReply: function (){
        this.showId = ''
      },
      sendReply: function (id){
        auth.postData2(this, '/team_member/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/' + this.$route.params.customersegmentId + '/persona/' + this.$route.params.personaId + '/comment/' + id, this.balasan)
                .then(res=>{
                  console.log(res)
                  this.closeReply()
                  this.getComments()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                })
      },
      editPersona: function (data){
        this.showFormPersona = true
        this.edit = true
        this.template = data
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.deleteVP(this.confirmId) 
      }
    }
  } 
</script>  

<style scoped>
.statusp {
        background: #8bc751;
        color: #fff;
        padding-left: 9px;
        padding-right: 9px;
        border-radius: 20px;
        font-size: 10px;
        padding-bottom: 2px;
        padding-top: 2px;
    }
    .midea {
        padding: 0px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 10px;
        background: #374850;
        color: #fff;
        line-height: 20px;
    }
    .label {
        line-height: 30px;
    }
    .rightsection {
      width: 100%;
    /*  margin-left: 10px;*/
      background-color: white;
      box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
      align-self: flex-start;
    }
    /* Styles for Link box li */
    .linkli__header {
      /* background-color: $primary-color; */
      color: white;
    /*  padding: .7em;*/
      text-align: center;
      font-style: italic;
    }
    .linkli {
      display: flex;
    /*  border-top: 1px solid #ccc;*/
     /* border-left: 1px solid #ccc; */
    /* border-right: 1px solid #ccc; */
      padding: 1em;
      background-color: white;
    }
    .linkli__title {
      font-size: 1.2em;
      margin-bottom: 8px;
    }
    .linkli__url {
    /*  font-style: italic;*/
      font-size: 0.8em;
      color: #565656;
      word-break: break-all;
    }
    .padkiriEV {
      /* padding-left: 25px !important; */
    }
    .garistabel td {
      border: 1px solid #e4e4e4 !important;
    }
    .vpfloat {
      position: fixed;
      z-index: 99;
      background-color: rgba(175, 175, 175, 0.5);
      right: 101px;
      top: 135px;
      border-radius: 5px;
      max-height: 433px;
      overflow: auto;
      padding-bottom: 23px;
    }
    .tabelEM td {
      padding-left: 28px;
    }
    .takadadata {
      background: #e4af4a;
      color: #fff;
      padding: 1px;
      padding-left: 5px;
      padding-right: 5px;
      font-size: 10px;
    }
    .tombvpnext {
      float: right;
      font-size: 11px;
      margin-right: 9px;
      background: #3c8dbc;
      color: #fff;
      padding: 6px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding-left: 11px;
      position: relative;
      left: 14px;
    }
    .pnhkanan {
      position: relative;
      left: 6px;
      top: 5px;
      background: white;
      padding: 7px;
      border-radius: 50%;
      padding-right: 8px;
      padding-left: 8px;
    }
    .tmblvpkanan{
      background: #3c8dbc;
      border-radius: 50%;
      font-size: 11px;
      width: 35px;
      height: 35px;
      position: relative;
      bottom: 5px;
      z-index: 20;
    }
</style>