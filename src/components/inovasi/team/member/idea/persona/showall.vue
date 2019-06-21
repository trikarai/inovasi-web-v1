<template>
  <div>
   
    <section class="content">
      
      <loading v-show="loading"></loading>

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>


      <div class="box">
        <div class="box-body">
          
          <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Beranda</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/team/'+teamId+'/idea/'+ideaId+'/cs'">Ide</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Tipe Pengguna</li>
            </ol>
          </nav>
        <nav class="remahroti" aria-label="breadcrumb" v-else>
              <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/personnel/dashboard'">Beranda</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/tutor/'+tutorId+'/participant/'+teamId+'/idea/'+ideaId+'/cs'">Ide</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Tipe Pengguna</li>
            </ol>
          </nav> 
          <!--end breadcrumb-->
          
          <main class="pagebody">
            <div style="padding-bottom: 30px;" class="col-md-6" >
              <h2 class="brdleft" style="margin-top: 10px;">{{parentData.name}}
                    <a v-if="role === 'Talent'" style="float:right" class="btn btn-default" @click="updateParent(parentData.id)"><i class="fa fa-pencil-square"></i> </a>
              </h2>
              <label>Description</label>
              <div style="white-space: pre-line" class="linkli__url">{{parentData.description}}</div>
<!--
              <label>Created Time</label>
              <div class="linkli__url">{{parentData.created_time}}</div>
-->

              <!--<a class="btn btn-default" @click="updateIdea(parentData.id)">update</a>-->

            </div>

            <div class="col-md-6" style="white-space: pre-line">
              <h4 class="tabcs">Daftar Segmen Pelanggan</h4>
              <section class="rightsection" v-if="data.list.length > 0">  
                <ul style="-webkit-padding-start: 0px !important;">
                  <li v-for="data in data.list" class="linkli">
                    <a class="flexleft">
                      <p class="linkli__title"><a @click="personaDetail(data.aspect)">{{ data.name }}</a></p>
                      <p style="white-space: pre-line" class="linkli__url">{{ data.description }}</p>
                        <template v-if="data.is_main_persona == true">
                          <span class="statusp">Utama</span>
                        </template>
                        <template v-else>
                          <a v-if="role === 'Talent'" class="btn btn-default midea" @click="assignPersona(data.id)"><i class="fa fa-check"></i> Ubah jadi Utama</a>
                        </template>
                    </a>

<!--
                    <template v-if="data.is_main_persona == true">
                      Main Idea
                    </template>
                    <template v-else>
                      <a class="btn btn-default tambahan" @click="assignPersona(data.id)">Assign as Main Idea</a>
                    </template> 
-->
                  <template v-if="role === 'Talent'">
                    <router-link class="btn btn-default tambahan" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + data.id"><i class="fa fa-search"></i></router-link>
<!--                    <a class="btn btn-default tambahan" @click="updatePersona(data)"><i class="fa fa-pencil-square"></i></a>-->
                    <a class="btn btn-danger tambahan" @click="confirm('Delete', data.id)"><i class="fa fa-trash"></i></a>
                  </template> 
                  <template v-else>
                    <router-link class="btn btn-default tambahan" v-bind:to="'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + customersegmentId + '/persona/' + data.id"><i class="fa fa-search"></i></router-link>
                  </template> 
                  </li>
                </ul>
              </section>
              <section class="rightsection" v-else>
                <h5 class="nodata">No Data, Please Create New</h5>
              </section>
              <a style="margin-top:10px" v-if="role === 'Talent'" class="btn btn-primary" @click="showFormPersona()"><span class="glyphicon glyphicon-plus-sign"></span> Buat Segmen Pelanggan Baru</a>

            </div>      

          </main>        
        </div>  
      </div>



    </section>


    <form-persona v-bind:template="template" v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-bind:personaId="personaId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-persona>

    <detail-persona v-bind:aspect="aspect"  v-if="showDetail" @close="showDetail = false" @closeModalRefresh="closeModalRefresh()">
    </detail-persona>
      
    <form-cs v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-if="showFormCs" @close="showFormCs = false" @closeModalRefresh="closeModalRefresh()">
    </form-cs>
    
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import FormPersona from './newPersona'
  import DetailPersona from './detailPersona'
  import FormCS from '../customersegment/newCS'
  import Loading from '@/components/loading'
  import OnDelete from '@/components/ondelete'


  export default {
    data: function () {
      return {
        data: {total:0, list: []},
        parentData: '',
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormCs: false,
        showDetail: false,
        aspect: '',
        edit: false,
        tutorId: this.$route.params.tutorId,        
        teamId: this.$route.params.teamId,
        ideaId: this.$route.params.ideaId,
        customersegmentId: this.$route.params.customersegmentId,
        personaId: '',
        loading: true,
        template: '',
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
      'form-persona': FormPersona,
      'detail-persona': DetailPersona,
      'form-cs': FormCS,
      'ondelete': OnDelete
    },
    created: function () {
//      this.getData()
      this.role = localStorage.getItem('role')
      if(this.role !== 'Talent'){
          this.url = '/tutor/' + this.tutorId
      }
      this.getParent(this.teamId, this.ideaId, this.customersegmentId)
    },
    methods: {
      getParent: function (teamId, ideaId, csId) {
        this.loading = true
        this.$http.get(CONFIG.APIENDPOINT + this.url + '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + csId, {headers: auth.getAuthHeader()})
                .then(response => {
                  return response.json()
                }, error =>{
                  console.log(error)
                  this.loading = false
                }).then(data => {
                  this.parentData = data.data
                  this.loading = false
                  this.getData()
                })
      },
      getData: function () {
        this.loading = true
        auth.getData2(this, this.url + '/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona')
                .then(res=>{
                  console.log(res)
                  if(res.status === 204){
                    this.data = {total:0, list:[]}
                    this.loading = false
                  }else{
                    return res.json()
                  }
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                })
      },
      showFormPersona: function () {
        this.showForm = true
        this.edit = false
        this.template = ''
      },
      updatePersona: function (data) {
        this.showForm = true
        this.edit = true
        this.template = data
      },
      deletePersona: function (id) {
        this.loading = true
        auth.deleteData2(this, '/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/'+ this.customersegmentId + '/persona/' + id)
                .then(response => {
                  console.log(response)
                  if(response.status === 204){
                    this.data = {total:0, list: []}
                  }else{
                    this.getParent(this.teamId, this.ideaId, this.customersegmentId)
                  }
                }, error =>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      },
      assignPersona: function (id) {
        this.loading = true
        auth.putData2(this, '/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment/'+ this.customersegmentId + '/persona/' + id + '/assign_as_main_persona')
                .then(response => {
                  console.log(response)
                  this.getParent(this.teamId, this.ideaId, this.customersegmentId)
                }, error =>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })        
//        this.closeModalRefresh()  
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.showFormCs = false
        this.getParent(this.teamId, this.ideaId, this.customersegmentId)
      },
      personaDetail: function (aspect) {
        this.aspect = aspect
        this.showDetail = true
      },
      updateParent: function () {
          this.showFormCs = true
          this.edit = true
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.deletePersona(this.confirmId) 
      }
    }
  } 
</script>  

<style scoped>
.pagebody {
/*  display: flex;*/
  padding: 2em 2em 2em 2em;
}
/* Sidenav */
.sidenav__tabs {
  text-align: center;
  background-color: $primary-color;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
.sidenav__tab {
  align-self: flex-start;
  width: 100%;
  list-style-type: none;
  /*   border-bottom: 1px solid #ccc; */
  padding: .6em .4em .6em .8em;
  color: #a5a5a5;
  font-size: 1.1em;
  letter-spacing: 0;
  transition: all 300ms;
}
.sidenav__tab:hover {
  background-color: darken($primary-color, 10%);
  cursor: pointer;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
}
.sidenav__tab__info {
  font-size: .65em;
  margin-top: 3px;
  color: #ccc;
  font-style: italic;
  letter-spacing: 0;
}
.active-tab {
  background-color: darken($primary-color, 10%);
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
  border-top-style: solid;
  border-top-color: #eaeaea;
  border-top-width: 1px;
  background: #464646;
  color: #fff;
}
/* End Sidenav */

.rightsection {
  width: 100%;
/*  margin-left: 10px;*/
  background-color: white;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  overflow: overlay;
}

/* Styles for Link box li */
.linkli__header {
  background-color: $primary-color;
  color: white;
/*  padding: .7em;*/
  text-align: center;
  font-style: italic;
}
.linkli {
  display: flex;
/*  border-top: 1px solid #ccc;*/
  // border-left: 1px solid #ccc;
  // border-right: 1px solid #ccc;
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
}
.flexleft {
  color: #333300;
  width: 100%;
  margin-right: 8px;
}
.deletebutton {
  align-self: center;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
ul.sidenav__tabs {
    -webkit-padding-start: 0px !important;
}
    .brdleft {
        background: #8bc751;
        color: #fff;
        padding: 10px;
        border-left-width: thick;
        border-left-style: solid;
        border-left-color: #68bd16;
    }
    label {
        margin-top:12px;
    }
    .tabcs {
        background: #f1f1f1;
        padding: 10px;
        display: -webkit-inline-box;
        margin-bottom: auto;
        padding-right: 13px;
        font-size: 14px;
        border-top-right-radius: 14px;
        color: #3d7c00;
    }
    .tambahan {
       line-height: 28px;
       margin-bottom:0px !important;
       height: 42px;
       margin-left: 5px;
    }
    .nodata {
        background: orange;
        color: #fff;
        text-align: center;
        padding: 5px;
    }
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
    a:hover {
        cursor:pointer;
    }
</style>