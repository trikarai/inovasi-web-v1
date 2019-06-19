<template>
  <div>

    <loading v-show="loading"></loading>

    <section class="content">
    <div  class="container-fluid">
      <notifications group="passsignup" position="top center" />

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <!-- srart profile-->
      <div class="box" style="padding-left: 17px;padding-right: 17px">
        <div class="box-body">

          <div class="tab-pane" id="settings">
            <div class="row">
              <div style="background: #8bc751;color: #fff;padding: 23px;border-left: #7dff00;border-left-style: solid;line-height: 24px;">
                <span style="font-size:28px;">
                  {{data.name}}
                </span>
                <span style="float: right;position: relative;top: 3px;">
                  <a style="color:#fff;cursor: pointer;font-size: 10px;background: #fff;padding: 7px;color: #848484;" @click="changeProfile()" class="ui button hidden-xs"><span class="glyphicon glyphicon-edit"></span> Edit Profil</a>  
                  <a style="color:#fff;cursor: pointer;font-size: 10px;background: #fff;padding: 7px;color: #848484;" @click="changePassword()" class="ui button hidden-xs"><span class="glyphicon glyphicon-lock"></span> Ubah Password</a>  
                </span>
              </div>

            </div>
            <div style="padding:20px;padding-top:35px;">
              <div class="row">
                <label class="col-sm-2 control-label">Username</label>

                <div class="col-sm-8">
                  <div>{{data.username}}</div>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 control-label">Email</label>

                <div class="col-sm-8">
                  <div>{{data.email}}</div>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 control-label">Telepon</label>

                <div class="col-sm-8">
                  <div>{{data.phone}}</div>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 control-label">Tanggal Lahir</label>

                <div class="col-sm-8">
                  <div>{{data.birth_date}}</div>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 control-label">Kota Asal</label>
                <div class="col-sm-8">
                  <div>{{data.city_of_origin}}</div>
                </div>
              </div>
              <div class="row">
                <label class="col-sm-2 control-label">Jenis Kelamin</label>
                <div class="col-sm-8">
                  <div>{{data.gender}}</div>
                </div>
              </div>

              <div class="visible-xs" style="margin-top:20px;margin-bottom: 20px; float:right">
                <a style="color: rgb(255, 255, 255);cursor: pointer;font-size: 10px;background: rgb(125, 125, 125);padding: 7px;" @click="changeProfile()" class="ui button"><span class="glyphicon glyphicon-pencil"></span> Change Profile</a>
                <br/>
                <!--            <a @click="changePassword()" class="ui button"><span class="glyphicon glyphicon-lock"></span> Change Password</a>-->
              </div>

            </div>

          </div>



        </div>
      </div>
      <!-- end profile-->

      <!--start cv 2-->

      <!-- education -->
      <a v-show="!load" @click="loadprofile()" class="btn btn-warning"><span class="glyphicon glyphicon-briefcase"></span> Load Profile</a>

      <div class="box" v-show="load">
        
        <div class="content">
          
          <div class="box-body" style="text-transform: capitalize">
              
            <h2>Pengalaman</h2>
              <a class="btn btn-sm btn-default" @click="openAll"><i class="fa fa-plus-square"></i> Open All</a> 
              <a class="btn btn-sm btn-default" @click="closeAll"><i class="fa fa-minus-square"></i> Close All</a>

            <div class="panel-group" style="margin-top: 30px">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#Education"><i class="fa fa-graduation-cap"></i> <b>Latar Belakang Pendidikan</b></a>
                  </h4>
                </div>
                
                <div id="Education" class="panel-collapse collapse in" v-show="!onEdu">
                  <div class="panel-body">
                    
                    <table class="table table-hover" v-if="dataEducation.list.length > 0">
                      <thead>
                        <tr>
                          <th>Fase</th>
                          <th>Institusi</th>
                          <th>Jurusan</th>
                          <th>Tahun Masuk</th>
                          <th>Tahun Lulus</th>
                          <th>Catatan</th>
                          <th colspan="2"></th>
                        </tr>  
                      </thead>
                      <tbody>
                        <tr v-for="data in dataEducation.list">
                          <td>{{data.phase}}</td>
                          <td>{{data.institution}}</td>
                          <td>{{data.major}}</td>
                          <td>{{data.start_year}}</td>
                          <td>{{data.end_year}}</td>
                          <td>{{data.note}}</td>
                          <td><a class="btn btn-sm btn-warning" @click="editEdu(data)">Edit</a></td>
                          <td><a class="btn btn-sm btn-danger" @click="confirm('Delete', 'Education' , data.id)">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else>
                      No Education Added
                    </div>
                  </div>
                  <div class="panel-footer"><a @click="showEducationForm" class="btn btn-warning"><i class="fa fa-plus"></i> Add Education</a></div>
                </div>                
              </div>
              <onsub v-show="onEdu"></onsub>
            </div>
            <!-- end education -->

            <!-- enterpreneur -->
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#Entrepreneurship"><i class="fa fa-lightbulb-o"></i> <b>Kewirausahaan</b></a>
                  </h4>
                </div>
                <div id="Entrepreneurship" class="panel-collapse collapse in" v-show="!onEnt">
                  <div class="panel-body">
                    <table class="table table-hover" v-if="dataEntrepreneurship.list.length > 0">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Bidang Bisnis</th>
                          <th>Kategori Bisnis</th>
                          <th>Posisi</th>
                          <th>Tahun Mulai</th>
                          <th>Tahun Selesai</th>
                          <th colspan="2"></th>
                        </tr>  
                      </thead>
                      <tbody>
                        <tr v-for="data in dataEntrepreneurship.list">
                          <td>{{data.name }}</td>
                          <td>{{data.business_field}}</td>
                          <td>{{data.business_category}}</td>
                          <td>{{data.position}}</td>
                          <td>{{data.start_year}}</td>
                          <td>{{data.end_year}}</td>
                          <td><a class="btn btn-sm btn-warning" @click="editEnt(data)">Edit</a></td>
                          <td><a class="btn btn-sm btn-danger" @click="confirm('Delete', 'Entrepreneurship', data.id)">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else>
                      No Entrepreneurship Added
                    </div>
                  </div>
                  <div class="panel-footer"><a @click="showEntrepreneurshipForm" class="btn btn-warning"><i class="fa fa-plus"></i> Add Entrepreneurship</a></div>
                </div>
              </div>
              <onsub v-show="onEnt"></onsub>
            </div>
            <!-- end enterpreneur -->

            <!-- organization -->
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#Organization"><i class="fa fa-sitemap"></i> <b>Pengalaman Organisasi</b></a>
                  </h4>
                </div>
                <div id="Organization" class="panel-collapse collapse in" v-show="!onOrg">
                  <div class="panel-body">

                    <table class="table table-hover" v-if="dataOrganization.list.length > 0">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Posisi</th>
                          <th>Tahun Mulai</th>
                          <th>Tahun Keluar</th>
                          <th colspan="2"></th>
                        </tr>  
                      </thead>
                      <tbody>
                        <tr v-for="data in dataOrganization.list">
                          <td>{{data.name }}</td>
                          <td>{{data.position}}</td>
                          <td>{{data.start_year}}</td>
                          <td>{{data.end_year}}</td>
                          <td><a class="btn btn-sm btn-warning" @click="editOrg(data)">Edit</a></td>
                          <td><a class="btn btn-sm btn-danger" @click="confirm('Delete', 'Organization' ,data.id)">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else>
                      No Organization Added
                    </div>

                  </div>
                  <div class="panel-footer"><a @click="showOrganizationForm" class="btn btn-warning"><i class="fa fa-plus"></i> Add Organization</a></div>
                </div>
              </div>
              <onsub v-show="onOrg"></onsub>
            </div>
            <!-- end organization -->

            <!-- Training -->
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#Training"><i class="fa fa-language"></i> <b>Pelatihan</b></a>
                  </h4>
                </div>
                <div id="Training" class="panel-collapse collapse in" v-show="!onTra">
                  <div class="panel-body">

                    <table class="table table-hover" v-if="dataTraining.list.length > 0">
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Penyelenggara</th>
                          <th>Tahun</th>
                          <th colspan="2"></th>
                        </tr>  
                      </thead>
                      <tbody>
                        <tr v-for="data in dataTraining.list">
                          <td>{{data.name }}</td>
                          <td>{{data.organizer}}</td>
                          <td>{{data.year}}</td>
                          <td><a class="btn btn-sm btn-warning" @click="editTra(data)">Edit</a></td>
                          <td><a class="btn btn-sm btn-danger" @click="confirm('Delete', 'Training' ,data.id)">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else>
                      No Training Added
                    </div>

                  </div>
                  <div class="panel-footer"><a @click="showTrainingForm" class="btn btn-warning"><i class="fa fa-plus"></i> Add Training</a></div>
                </div>
              </div>
              <onsub v-show="onTra"></onsub>
            </div>
            <!-- end dataTraining -->

            <!-- Working -->
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#Working"><i class="fa fa-universal-access"></i> <b>Pengalaman Bekerja</b></a>
                  </h4>
                </div>
                <div id="Working" class="panel-collapse collapse in" v-show="!onWork">
                  <div class="panel-body">

                    <table class="table table-hover" v-if="dataWorking.list.length > 0">
                      <thead>
                        <tr>
                          <th>Nama Perusahaan</th>
                          <th>Jabatan</th>
                          <th>Bidang</th>
                          <th>Tahun Masuk</th>
                          <th>Tahun Keluar</th>
                          <th colspan="2"></th>
                        </tr>  
                      </thead>
                      <tbody>
                        <tr v-for="data in dataWorking.list">
                          <td>{{data.company_name }}</td>
                          <td>{{data.position}}</td>
                          <td>{{data.role}}</td>
                          <td>{{data.start_year}}</td>
                          <td>{{data.end_year}}</td>
                          <td><a class="btn btn-sm btn-warning" @click="editWork(data)">Edit</a></td>
                          <td><a class="btn btn-sm btn-danger" @click="confirm('Delete', 'Working' ,data.id)">Delete</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <div v-else>
                      No Work Experience Added
                    </div>

                  </div>
                  <div class="panel-footer"><a @click="showWorkingForm" class="btn btn-warning"><i class="fa fa-plus"></i> Add Work Experience</a></div>
                </div>
              </div>
              <onsub v-show="onWork"></onsub>
            </div>
            <!-- end dataWorking -->

            <!-- Skill -->
            <div class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" href="#Skill"><i class="fa fa-wrench"></i> <b>Keahlian</b></a>
                  </h4>
                </div>

                <div id="Skill" class="panel-collapse collapse in" v-show="!onSkill">
                  <div class="panel-body">

                    <div class="box-group" id="accordion" v-if="dataSkill.list.length > 0">
                      <!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->
                      <div class="panel box box-success" v-for="data in dataSkill.list">
                        <div class="box-header with-border">
                          <h4 class="">
                            <a class="col-md-6" data-parent="#accordion" data-toggle="collapse" :href="'#'+data.id" style="font-size:16px;" @click="getCertificate(data.id)">{{data.skill_reference.name}}<br>
                            </a>
                            <div>
                              <img v-for="i in data.score" src="/img/star_on.png" alt="" height="30" width="30" />
                            </div> 
                            <!--<a href="" class="btn tomboladd col-md-2"><i class="fa fa-plus"></i> Add Certificate</a>-->
                            <div class="col-md-4" style="margin-top:20px">
                              <a @click="editSkill(data)" class="btn btn-sm btn-warning">Edit</a>
                              <a @click="confirm('Delete', 'Skill' ,data.id)" class="btn btn-sm btn-danger">Remove</a>
                            </div>
                          </h4>
                        </div>
                        <div :id="data.id" class="panel-collapse-cer collapse">
                          <a style="margin: 5px" class="btn btn-default" @click="showCertificateForm">Add Certificate</a>

                          <!--
                                                      <div class="box-body"  v-if="dataCertificate.list.length > 0">
                          
                                                        <div class="row" style="margin-top:10px;" v-for="data in dataCertificate.list">
                                                          <div class="col-md-6">{{data.name}} - {{data.organizer}} - {{data.issued_date}} - {{data.valid_until}}</div>
                                                          <div class="col-md-2">
                                                            <a @click="editCertificate(data)" class="btn tomboledit">Edit</a>
                                                            <a @click="deleteCertificate(data.id)" class="btn tombolremove">Remove</a>
                                                          </div>
                                                          <div class="col-md-4"></div>
                                                        </div>
                                                      </div>
                          -->
                          <table class="table table-hover" v-if="dataCertificate.list.length > 0">
                            <thead>
                              <tr>
                                <th>Nama Sertifikat</th>
                                <th>Penyelenggara</th>
                                <th>Tanggal Dikeluarkan</th>
                                <th>Masa Berlaku</th>
                                <th colspan="2"></th>
                              </tr>  
                            </thead>
                            <tbody>
                              <tr v-for="data in dataCertificate.list">
                                <td>{{data.name}}</td>
                                <td>{{data.organizer}}</td>
                                <td>{{data.issued_date}}</td>
                                <td>{{data.valid_until}}</td>
                                <td><a class="btn btn-sm btn-warning" @click="editCertificate(data)">Edit</a></td>
                                <td><a class="btn btn-sm btn-danger" @click="confirm('Delete', 'Certificate' ,data.id)">Delete</a></td>
                              </tr>
                            </tbody>
                          </table> 

                          <div class="row" style="margin:10px;" v-else>
                            <div class="col-md-6"> No Certificate</div>
                          </div>
                        </div>

                      </div>

                    </div>
                    <div v-else>
                      No Skill Added 
                    </div>


                  </div>
                  <div class="panel-footer"><a @click="showSkillForm" class="btn btn-warning"><i class="fa fa-plus"></i> Add Skill</a></div>
                </div>
              </div>
              <onsub v-show="onSkill"></onsub>
            </div>
            <!-- end dataSkill -->

          </div> 
        </div> 
      </div>
      <!--end cv 2 -->


    </div>
    </section>

    <su-form v-bind:editProfile="editProfile" v-bind:editPassword="editPassword" v-if="showModal" @close="showModal = false" @closeModalRefresh="closeModalRefresh">
    </su-form>

    <edu-form v-bind:data="passing"  v-bind:edit="edit" v-if="showEducation" @close="showEducation = false" @closeModalRefresh="refreshEdu()">
    </edu-form>

    <ent-form v-bind:data="passing"  v-bind:edit="edit" v-if="showEntrepreneurship" @close="showEntrepreneurship = false" @closeModalRefresh="refreshEnt()">
    </ent-form>

    <org-form v-bind:data="passing"  v-bind:edit="edit" v-if="showOrganization" @close="showOrganization = false" @closeModalRefresh="refreshOrg()">
    </org-form>

    <tra-form v-bind:data="passing"  v-bind:edit="edit" v-if="showTraining" @close="showTraining = false" @closeModalRefresh="refreshTra()">
    </tra-form>

    <work-form v-bind:data="passing"  v-bind:edit="edit" v-if="showWorking" @close="showWorking = false" @closeModalRefresh="refreshWork()">
    </work-form>

    <skill-form v-bind:data="passing"  v-bind:edit="edit" v-if="showSkill" @close="showSkill = false" @closeModalRefresh="refreshSkill()">
    </skill-form>

    <cer-form v-bind:skillId="referenceSkill" v-bind:data="passing"  v-bind:edit="edit" v-if="showCertificate" @close="showCertificate = false" @closeModalRefresh="refreshCertificate()">
    </cer-form>
    
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>


  </div>
</template>
<script>
  import auth from '@/httpcontrol'
  import Loading from '@/components/loading'
  import ErrorFlash from '../../errorflash'
  import SUForm from './modal/suform'
  import Education from './modal/education'
  import Entrepreneurship from './modal/entrepreneurship'
  import Organization from './modal/organization'
  import Training from './modal/training'
  import Working from './modal/working'
  import Skill from './modal/skill'
  import Certificate from './modal/certificate'
  import onSubmit from '@/components/onsubmit'
  import OnDelete from '@/components/ondelete'

  export default {
    data: function () {
      return {
        data: null,
        dataEducation: {
          total : 0,
          list : []
        },
        onEdu : false,
        dataEntrepreneurship: {
          total : 0,
          list : []
        },
        onEnt : false,
        dataOrganization: {
          total : 0,
          list : []
        },
        onOrg : false,
        dataTraining: {
          total : 0,
          list : []
        },
        onTra : false,
        dataWorking: {
          total : 0,
          list : []
        },
        onWork : false,
        dataSkill: {
          total : 0,
          list : []
        },
        onSkill : false,
        dataCertificate: {
          total: 0,
          list: []
        },
        dataReset : {
          total : 0,
          list : []
        },
        err_msg: '',
        success: false,
        error: false,
        edit: false,
        editProfile: false,
        editPassword: false,
        showModal: false,
        showEducation: false,
        showEntrepreneurship: false,
        showOrganization: false,
        showTraining: false,
        showWorking : false,
        showSkill : false,
        showCertificate : false,
        referenceSkill : '',
        passing: '',
        loading : false,
        load : false,
        toconfirm : false,
        confirmId : '',
        act : '',
        type: ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'su-form': SUForm,
      'edu-form': Education,
      'ent-form': Entrepreneurship,
      'org-form': Organization,
      'tra-form': Training,
      'work-form': Working,
      'skill-form': Skill,
      'cer-form': Certificate,
      'onsub' : onSubmit,
      'ondelete': OnDelete
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        this.data = auth.getAuthData()
        if(this.data != null){
          this.loadprofile()
        }else{
          this.loadprofile()
        }
      },
      getDataAgain: function () {
        this.data = auth.getAuthData()
      },
      loadprofile: function () {
        this.load = true
        this.getEducation()
      },
      changeProfile: function () {
        this.edit = true
        this.showModal = true
        this.editProfile = true
        this.editPassword = false
      },
      changePassword: function () {
        this.edit = true
        this.showModal = true
        this.editProfile = false
        this.editPassword = true
      },
      closeModalRefresh: function (act) {
        this.showModal = false
        this.edit = false
        this.editProfile = false
        this.editPassword = false
        this.$notify({
                  group: 'passsignup',
                  title: 'Success',
                  text: 'Edit '+ act +' Success',
                  type: 'success'
                });
//        this.getDataAgain()
        console.log(act)
      },
      getEducation: function (){
        this.onEdu = true
        auth.getData2(this, '/talent/education')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.onEdu = false
                    this.getEntrepreneurship()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.getEntrepreneurship()
                  this.onEdu = false
                  this.dataEducation = data.data
                })
      },
      showEducationForm: function (){
        this.showEducation = true
        this.edit = false
      },
      editEdu: function (data){
        this.showEducation = true
        this.edit = true
        this.passing = data
      },
      refreshEdu: function (){
        this.showEducation = false
        auth.getData2(this, '/talent/education')
                .then(res => {
                  if(res.status === 204){
                    this.dataEducation = this.dataReset
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataEducation = data.data
                })
      },
      deleteEdu: function (id){
        this.showEducation = false
        auth.deleteData2(this, '/talent/education/' + id)
                .then(res => {
                  console.log(res)
                  this.refreshEdu()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      getEntrepreneurship: function (){
        this.onEnt = true
        auth.getData2(this, '/talent/entrepreneurship')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.onEnt = false
                    this.getOrganization()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataEntrepreneurship = data.data
                  this.onEnt = false
                  this.getOrganization()
                })
      },
      showEntrepreneurshipForm: function (){
        this.showEntrepreneurship = true
        this.edit = false
      },
      editEnt: function (data){
        this.showEntrepreneurship = true
        this.edit = true
        this.passing = data
      },
      refreshEnt: function (){
        this.showEntrepreneurship = false
        auth.getData2(this, '/talent/entrepreneurship')
                .then(res => {
                  if(res.status === 204){
                    this.dataEntrepreneurship = this.dataReset
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataEntrepreneurship = data.data
                })                
      },
      deleteEnt: function (id){
        this.showEntrepreneurship = false
        auth.deleteData2(this, '/talent/entrepreneurship/' + id)
                .then(res => {
                  console.log(res)
                  this.refreshEnt()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      getOrganization: function (){
        this.onOrg = true
        auth.getData2(this, '/talent/organization')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.onOrg = false
                    this.getTraining()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataOrganization = data.data
                  this.onOrg = false
                  this.getTraining()
                })
      },
      showOrganizationForm: function (){
        this.showOrganization = true
        this.edit = false
      },
      editOrg: function (data){
        this.showOrganization = true
        this.edit = true
        this.passing = data
      },
      refreshOrg: function (){
        this.showOrganization = false
        auth.getData2(this, '/talent/organization')
                .then(res => {
                  if(res.status === 204){
                    this.dataOrganization = this.dataReset
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataOrganization = data.data
                })
      },
      deleteOrg: function (id){
        this.showOrganization = false
        auth.deleteData2(this, '/talent/organization/' + id)
                .then(res => {
                  console.log(res)
                  this.refreshOrg()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      getTraining: function (){
        this.onTra = true
        auth.getData2(this, '/talent/training_experience')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.onTra = false
                    this.getWorking()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataTraining = data.data
                  this.onTra = false
                  this.getWorking()
                })
      },
      showTrainingForm: function (){
        this.showTraining = true
        this.edit = false
      },
      editTra: function (data){
        this.showTraining = true
        this.edit = true
        this.passing = data
      },
      refreshTra: function (){
        this.showTraining = false
        auth.getData2(this, '/talent/training_experience')
                .then(res => {
                  if(res.status === 204){
                    this.dataTraining = this.dataReset
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataTraining = data.data
                })
      },
      deleteTra: function (id){
        this.showTraining = false
        auth.deleteData2(this, '/talent/training_experience/' + id)
                .then(res => {
                  console.log(res)
                  this.refreshTra()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      getWorking: function (){
        this.onWork = true
        auth.getData2(this, '/talent/working_experience')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.onWork = false
                    this.getSkill()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataWorking = data.data
                  this.onWork = false
                  this.getSkill()
                })      
      },
      showWorkingForm: function (){
        this.showWorking = true
        this.edit = false
      },
      editWork: function (data){
        this.showWorking = true
        this.edit = true
        this.passing = data
      },
      refreshWork: function (){
        this.showWorking = false
        auth.getData2(this, '/talent/working_experience')
                .then(res => {
                  if(res.status === 204){
                    this.dataWorking = this.dataReset
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataWorking = data.data
                })
      },
      deleteWork: function (id){
        this.showWorking = false
        auth.deleteData2(this, '/talent/working_experience/' + id)
                .then(res => {
                  console.log(res)
                  this.refreshWork()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      getSkill: function (){
        this.onSkill = true
        auth.getData2(this, '/talent/skill')
                .then(res => {
                  return res.json()
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataSkill = data.data
                  this.onSkill = false
                })      
      },
      showSkillForm: function (){
        this.showSkill = true
        this.edit = false
      },
      editSkill: function (data){
        this.showSkill = true
        this.edit = true
        this.passing = data
      },
      refreshSkill: function (){
        this.showSkill = false
        auth.getData2(this, '/talent/skill')
                .then(res => {
                  if(res.status === 204){
                    this.dataSkill = this.dataReset
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataSkill = data.data
                })
      },
      deleteSkill: function (id){
        this.showSkill = false
        auth.deleteData2(this, '/talent/skill/' + id)
                .then(res => {
                  console.log(res)
                  this.refreshSkill()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      getCertificate: function (skillId){
        this.referenceSkill = skillId
        this.dataCertificate = {total: 0, list:[]}
        auth.getData2(this, '/talent/skill/'+skillId+'/certificate')
                .then(res => {
                  return res.json()
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataCertificate = data.data
                })
      },
      showCertificateForm: function (){
        this.showCertificate = true
        this.edit = false
      },
      editCertificate: function (data){
        this.showCertificate = true
        this.edit = true
        this.passing = data
      },
      deleteCertificate: function (id){
        this.showCertificate = false
        auth.deleteData2(this, '/talent/skill/' + this.referenceSkill + '/certificate/'  + id)
                .then(res => {
                  console.log(res)
                  this.getCertificate(this.referenceSkill)
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      refreshCertificate: function (){
        this.showCertificate = false
        this.dataCertificate = []
        auth.getData2(this, '/talent/skill/'+ this.referenceSkill +'/certificate')
                .then(res => {
                  if(res.status === 204){
                    this.dataCertificate = []
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataCertificate = data.data
                })
      },
      openAll: function(){
        $('.panel-collapse:not(".in")')
        .collapse('show');
      },
      closeAll: function(){
        $('.panel-collapse.in')
        .collapse('hide');
      },
      confirm: function(act, type, id){
        this.toconfirm = true
        this.act = act
        this.type = type
        this.confirmId = id
        
      },
      confirmed: function (){
        this.toconfirm = false
        switch(this.type){
          case 'Education': 
            this.deleteEdu(this.confirmId) 
            break;
          case 'Entrepreneurship': 
            this.deleteEnt(this.confirmId) 
            break;
          case 'Organization': 
            this.deleteOrg(this.confirmId) 
            break;
          case 'Training': 
            this.deleteTra(this.confirmId) 
            break;
          case 'Working': 
            this.deleteWork(this.confirmId) 
            break;
          case 'Skill': 
            this.deleteSkill(this.confirmId) 
            break;
          case 'Certificate': 
            this.deleteCertificate(this.confirmId) 
            break;
          default:
            alert('Portal to the Multiverse is Opened..!!')
        }
      }
    }
  }
</script>

<style scoped>
    .panel {
        overflow: auto;
        display: grid
    }
</style>
