<template>
  <div>
    
    <loading v-show="loading"></loading>
    
    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <!-- srart profile-->
<!--      <div class="box">
       <div class="box-body">
          
          <div class="tab-pane" id="settings">
                        <div class="row">
                                <div style="background: #8bc751;color: #fff;padding: 23px;border-left: #7dff00;border-left-style: solid;line-height: 24px;">
                                    <span style="font-size:28px;">
                                        {{data.name}}
                                    </span>
                                    <span style="float: right;position: relative;top: 3px;">
                                        <a style="color:#fff;cursor: pointer;font-size: 10px;background: #fff;padding: 7px;color: #848484;" @click="changeProfile()" class="ui button hidden-xs"><span class="glyphicon glyphicon-pencil"></span> Change Profile</a>  
                                        <a style="color:#fff;cursor: pointer" @click="changePassword()" class="ui button"><span class="glyphicon glyphicon-lock"></span> Change Password</a>
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
                            <label class="col-sm-2 control-label">Phone</label>

                            <div class="col-sm-8">
                                <div>{{data.phone}}</div>
                            </div>
                        </div>
                                                                        <div class="row">
                            <label class="col-sm-2 control-label">Birth Date</label>

                            <div class="col-sm-8">
                                <div>{{data.birth_date}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">City of Origin</label>
                            <div class="col-sm-8">
                                <div>{{data.city_of_origin}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">Gender</label>
                            <div class="col-sm-8">
                                <div>{{data.gender}}</div>
                            </div>
                        </div>
                            
                        <div class="visible-xs" style="margin-top:20px;margin-bottom: 20px; float:right">
                            <a style="color: rgb(255, 255, 255);cursor: pointer;font-size: 10px;background: rgb(125, 125, 125);padding: 7px;" @click="changeProfile()" class="ui button"><span class="glyphicon glyphicon-pencil"></span> Change Profile</a>
                            <br/>
                            <a @click="changePassword()" class="ui button"><span class="glyphicon glyphicon-lock"></span> Change Password</a>
                        </div>
                            
                        </div>
                        
                    </div>

          

        </div>
      </div>-->
      <!-- end profile-->
      
      <!--start cv 2-->
      
      <!-- education -->
      <!--<a v-show="!load" @click="loadprofile()" class="btn btn-warning"><span class="glyphicon glyphicon-briefcase"></span> Load Profile</a>-->

      <div class="box">
      <div class="content">
       <a class="btn btn-default" @click="openAll"><i class="fa fa-plus-square"></i> Open All</a> 
       <a class="btn btn-default" @click="closeAll"><i class="fa fa-minus-square"></i> Close All</a>
        <div class="box-body" style="text-transform: capitalize">
        
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" href="#Education"><i class="fa fa-graduation-cap"></i> <b>Education</b></a>
                </h4>
              </div>
              <div id="Education" class="panel-collapse collapse in">
                <div class="panel-body">
                  
                  <table class="table table-hover" v-if="dataEducation.list.length > 0">
                    <thead>
                      <tr>
                        <th>phase</th>
                        <th>institution</th>
                        <th>major</th>
                        <th>start year</th>
                        <th>end year</th>
                        <th>note</th>
                        <!--<th colspan="2"></th>-->
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
<!--                        <td><a class="btn btn-warning" @click="editEdu(data)">Edit</a></td>
                        <td><a class="btn btn-danger" @click="deleteEdu(data.id)">Delete</a></td>-->
                      </tr>
                    </tbody>
                  </table>
                  <div v-else>
                    No Education Added
                  </div>
                </div>
                <!--<div class="panel-footer"><a @click="showEducationForm" class="btn btn-warning">Add</a></div>-->
              </div>
            </div>
          </div>
          <!-- end education -->
          
          <!-- enterpreneur -->
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" href="#Entrepreneurship"><i class="fa fa-lightbulb-o"></i> <b>Entrepreneurship</b></a>
                    </h4>
                  </div>
                  <div id="Entrepreneurship" class="panel-collapse collapse in">
                    <div class="panel-body">
                      <table class="table table-hover" v-if="dataEntrepreneurship.list.length > 0">
                        <thead>
                          <tr>
                            <th>name</th>
                            <th>business field</th>
                            <th>business category</th>
                            <th>position</th>
                            <th>start year</th>
                            <th>end year</th>
                            <!--<th colspan="2"></th>-->
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
<!--                            <td><a class="btn btn-warning" @click="editEnt(data)">Edit</a></td>
                            <td><a class="btn btn-danger" @click="deleteEnt(data.id)">Delete</a></td>-->
                          </tr>
                        </tbody>
                      </table>
                      <div v-else>
                        No Entrepreneurship Added
                      </div>
                    </div>
                    <!--<div class="panel-footer"><a @click="showEntrepreneurshipForm" class="btn btn-warning">Add</a></div>-->
                  </div>
                </div>
              </div>
              <!-- end enterpreneur -->
              
              <!-- organization -->
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" href="#Organization"><i class="fa fa-sitemap"></i> <b>Organization</b></a>
                    </h4>
                  </div>
                  <div id="Organization" class="panel-collapse collapse in">
                    <div class="panel-body">
                      
                      <table class="table table-hover" v-if="dataOrganization.list.length > 0">
                        <thead>
                          <tr>
                            <th>name</th>
                            <th>position</th>
                            <th>start year</th>
                            <th>end year</th>
                            <th colspan="2"></th>
                          </tr>  
                        </thead>
                        <tbody>
                          <tr v-for="data in dataOrganization.list">
                            <td>{{data.name }}</td>
                            <td>{{data.position}}</td>
                            <td>{{data.start_year}}</td>
                            <td>{{data.end_year}}</td>
<!--                            <td><a class="btn btn-warning" @click="editOrg(data)">Edit</a></td>
                            <td><a class="btn btn-danger" @click="deleteOrg(data.id)">Delete</a></td>-->
                          </tr>
                        </tbody>
                      </table>
                      <div v-else>
                        No Organization Added
                      </div>
                      
                    </div>
                    <!--<div class="panel-footer"><a @click="showOrganizationForm" class="btn btn-warning">Add</a></div>-->
                  </div>
                </div>
              </div>
              <!-- end organization -->
              
              <!-- Training -->
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" href="#Training"><i class="fa fa-language"></i> <b>Training</b></a>
                    </h4>
                  </div>
                  <div id="Training" class="panel-collapse collapse in">
                    <div class="panel-body">
                      
                      <table class="table table-hover" v-if="dataTraining.list.length > 0">
                        <thead>
                          <tr>
                            <th>name</th>
                            <th>organizer</th>
                            <th>year</th>
                            <!--<th colspan="2"></th>-->
                          </tr>  
                        </thead>
                        <tbody>
                          <tr v-for="data in dataTraining.list">
                            <td>{{data.name }}</td>
                            <td>{{data.organizer}}</td>
                            <td>{{data.year}}</td>
<!--                            <td><a class="btn btn-warning" @click="editTra(data)">Edit</a></td>
                            <td><a class="btn btn-danger" @click="deleteTra(data.id)">Delete</a></td>-->
                          </tr>
                        </tbody>
                      </table>
                      <div v-else>
                        No Training Added
                      </div>
                      
                    </div>
                    <!--<div class="panel-footer"><a @click="showTrainingForm" class="btn btn-warning">Add</a></div>-->
                  </div>
                </div>
              </div>
              <!-- end dataTraining -->
              
              <!-- Working -->
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" href="#Working"><i class="fa fa-universal-access"></i> <b>Working</b></a>
                    </h4>
                  </div>
                  <div id="Working" class="panel-collapse collapse in">
                    <div class="panel-body">
                      
                      <table class="table table-hover" v-if="dataWorking.list.length > 0">
                        <thead>
                          <tr>
                            <th>company name</th>
                            <th>position</th>
                            <th>role</th>
                            <th>start year</th>
                            <th>end year</th>
                            <!--<th colspan="2"></th>-->
                          </tr>  
                        </thead>
                        <tbody>
                          <tr v-for="data in dataWorking.list">
                            <td>{{data.company_name }}</td>
                            <td>{{data.position}}</td>
                            <td>{{data.role}}</td>
                            <td>{{data.start_year}}</td>
                            <td>{{data.end_year}}</td>
<!--                            <td><a class="btn btn-warning" @click="editWork(data)">Edit</a></td>
                            <td><a class="btn btn-danger" @click="deleteWork(data.id)">Delete</a></td>-->
                          </tr>
                        </tbody>
                      </table>
                      <div v-else>
                        No Working Added
                      </div>
                      
                    </div>
                    <!--<div class="panel-footer"><a @click="showWorkingForm" class="btn btn-warning">Add</a></div>-->
                  </div>
                </div>
              </div>
              <!-- end dataWorking -->
        
              <!-- Skill -->
              <div class="panel-group">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" href="#Skill"><i class="fa fa-wrench"></i> <b>Skill</b></a>
                    </h4>
                  </div>
                  
                  <div id="Skill" class="panel-collapse collapse in">
                    <div class="panel-body">

                      <div class="box-group" id="accordion" v-if="dataSkill.list.length > 0">
                        <!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->
                        <div class="box" style="background: #fbfbfb;" v-for="data in dataSkill.list">
                          <div class="box-header with-border">
                            <h4 class="">
                              <a class="col-md-6" data-parent="#accordion" data-toggle="collapse" :href="'#'+data.id" style="font-size:16px;" @click="getCertificate(data.id)">{{data.skill_reference.name}}<br>
                              </a>
                                <div>
                                    <img v-for="i in data.score" src="/img/star_on.png" alt="" height="30" width="30" />
                                 </div> 
                              <!--<a href="" class="btn tomboladd col-md-2"><i class="fa fa-plus"></i> Add Certificate</a>-->
                              <div class="col-md-4" style="margin-top:20px">
                                <!--<a @click="editSkill(data)" class="btn btn-warning">Edit</a>-->
                                <!--<a @click="deleteSkill(data.id)" class="btn btn-danger">Remove</a>-->
                              </div>
                            </h4>
                          </div>
                          <div :id="data.id" class="panel-collapse-cer collapse">
                            <!--<a style="margin: 5px" class="btn btn-default" @click="showCertificateForm">Add Certificate</a>-->

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
                                    <th>certificate name</th>
                                    <th>organizer</th>
                                    <th>issued date</th>
                                    <th>valid until</th>
                                    <!--<th colspan="2"></th>-->
                                  </tr>  
                                </thead>
                                <tbody>
                                  <tr v-for="data in dataCertificate.list">
                                    <td>{{data.name}}</td>
                                    <td>{{data.organizer}}</td>
                                    <td>{{data.issued_date}}</td>
                                    <td>{{data.valid_until}}</td>
<!--                                    <td><a class="btn btn-warning" @click="editWork(data)">Edit</a></td>
                                    <td><a class="btn btn-danger" @click="deleteWork(data.id)">Delete</a></td>-->
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
                    <!--<div class="panel-footer"><a @click="showSkillForm" class="btn btn-warning">Add</a></div>-->
                  </div>
                </div>
              </div>
              <!-- end dataSkill -->
              
       </div> 
       </div> 
        </div>
      <!--end cv 2 -->
      
      
     
            

      
    </section>

    
  </div>
</template>
<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '@/components/inovasi/errorflash'
  import Loading from '@/components/loading'

  export default {
    data: function () {
      return {
        data: null,
        dataEducation: {
          total : 0,
          list : []
        },
        dataEntrepreneurship: {
          total : 0,
          list : []
        },
        dataOrganization: {
          total : 0,
          list : []
        },
        dataTraining: {
          total : 0,
          list : []
        },
        dataWorking: {
          total : 0,
          list : []
        },
        dataSkill: {
          total : 0,
          list : []
        },
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
        talentId : this.$route.params.talentId
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading
    },
    created: function () {
//      this.getData()
      this.loadprofile()
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
//        this.load = true
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
      closeModalRefresh: function () {
        this.showModal = false
        this.edit = false
        this.editProfile = false
        this.editPassword = false
        this.getDataAgain()
      },
      getEducation: function (){
        this.loading = true
        auth.getData2(this, '/as_coordinator/talent/'+ this.talentId +'/education')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.getEntrepreneurship()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                  this.loading = false
                }).then(data => {
                  this.getEntrepreneurship()
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
        auth.getData2(this, '/as_coordinator/talent/'+ this.talentId +'/entrepreneurship')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.getOrganization()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataEntrepreneurship = data.data
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
        auth.getData2(this, '/as_coordinator/talent/'+ this.talentId +'/organization')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.getTraining()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataOrganization = data.data
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
        auth.getData2(this, '/talent/training_experience')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.getWorking()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataTraining = data.data
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
        auth.getData2(this, '/as_coordinator/talent/'+ this.talentId +'/working_experience')
                .then(res => {
                  console.log(res)
                  if(res.status === 204){
                    this.getSkill()
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataWorking = data.data
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
        auth.getData2(this, '/as_coordinator/talent/'+ this.talentId +'/skill')
                .then(res => {
                  if(res.status === 204){
                    this.dataSkill = this.dataReset
                    this.loading = false
                  }else{
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                  this.loading = false
                }).then(data => {
                  this.dataSkill = data.data
                  this.loading = false
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
        auth.getData2(this, '/as_coordinator/talent/skill/'+skillId+'/certificate')
                .then(res => {
                  return res.json()
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataCertificate = data.data
                  this.loading = false
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
    }
  }
</script>

<style scoped>
    .panel {
        overflow: auto;
        display: grid
    }
</style>
