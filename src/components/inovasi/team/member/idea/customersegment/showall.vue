<template>
  <div>
    <loading v-show="loading"></loading>
    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>


      <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->

      <!--    <div class="box" v-show="!error">
            <div class="box-body">
              
              <table class="table" v-if="data != ''">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Persona</th>
                    <th>Description</th>
                    <th>Created Time</th>
                    <th colspan="2"></th>   
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in data">
                    <td>{{data.name}}</td>
                    <td><router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + data.id + '/persona'"> <span class="glyphicon glyphicon-play-circle"></span>Persona</router-link></td>
                    <td>{{data.description}}</td>
                    <td>{{data.created_time}}</td>
                    <td><a class="btn btn-default" @click="updateCS(data.id)">update</a></td>
                    <td><a class="btn btn-warning" @click="deleteCS(data.id)">delete</a></td>
                  </tr>
                </tbody>
              </table>
              <div v-if="data == ''">
                No Content 
              </div> 
              
            </div>  
          </div>      -->

      <div class="box" v-show="!error">
        <div class="box-body">
          
          <!--start breadcrumb-->    
          <nav class="remahroti" aria-label="breadcrumb" v-if="role == 'Talent'">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/dashboard'">Beranda</router-link></li>
              <li class="breadcrumb-item"><router-link v-bind:to="'/talent/team/membership'">Tim</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Ide</li>
            </ol>
          </nav>
          <!--end breadcrumb-->
          <nav class="remahroti" aria-label="breadcrumb" v-else>
              <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link v-bind:to="'/personnel/dashboard'">Beranda</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Ide</li>
                </ol>
          </nav>          
          
          <main class="pagebody">
            <div style="padding-bottom: 30px;"class="col-md-6" >
              <div class="row">
                  <h2 class="brdleft" style="margin-top: 10px">
                    <div class="row">        
                        <div class="col-md-10">{{parentData.name}}</div>
                        <div class="col-md-2"><a v-if="role === 'Talent'" style="float:right" class="btn btn-default" @click="updateParent(parentData.id)"><i class="fa fa-pencil-square"></i> </a></div>
                    </div>
                  </h2>
              </div>
              <label>Elevator Pitch</label>
              <div style="white-space: pre-line" class="linkli__url">{{parentData.description}}</div>
<!--              <label>Target Customer</label>
              <div class="linkli__url">{{parentData.target_customer}}</div>
              <label>Problem Confront</label>
              <div class="linkli__url">{{parentData.problem_confront}}</div>
              <label>Value Proposed</label>
              <div class="linkli__url">{{parentData.value_proposed}}</div>
              <label>Revenue Model</label>
              <div class="linkli__url">{{parentData.revenue_model}}</div>-->
              
            </div>

            <div class="col-md-6">
              <h4 class="tabcs">Daftar Tipe Pengguna</h4>
              <section class="rightsection" v-if="data.list.length > 0">  
                <ul style="-webkit-padding-start: 0px !important;">
                  <li v-for="data in data.list" style="line-height: 16px" class="linkli">
                    <a class="flexleft">
                      <p class="linkli__title">{{ data.name }}</p>
                      <p style="white-space: pre-line" class="linkli__url">{{ data.description }}</p>
                    </a>
                  <template v-if="role === 'Talent'">  
                    <router-link class="btn btn-default tambahan" v-bind:to="'/team/'+ teamId + '/idea/'+ ideaId + '/cs/' + data.id + '/persona'"> 
                        <i class="fa fa-search"></i></router-link>
<!--                    <a class="btn btn-default tambahan" @click="updateCS(data.id)"><i class="fa fa-pencil-square"></i></a>-->
                    <a class="btn btn-danger tambahan" @click="confirm('Delete', data.id)"><i class="fa fa-trash"></i></a>
                    <!--<a class="btn btn-warning tambahan" @click="deleteCS(data.id)"><i class="fa fa-trash"></i></a>-->
                  </template>
                  <template v-else>
                    <router-link class="btn btn-default tambahan" v-bind:to="'/tutor/'+tutorId+'/participant/'+ teamId + '/idea/'+ ideaId + '/cs/' + data.id + '/persona'"> <i class="fa fa-search"></i> View</router-link>
                  </template>
                  </li>
                </ul>
              </section>
              <section class="rightsection" v-else>
                <h5 class="nodata">No Data, Please create new </h5>
              </section>
              <a v-if="role === 'Talent'" class="btn btn-primary" @click="showFormCS()"><span class="glyphicon glyphicon-plus-sign"></span> Buat Tipe Pengguna Baru</a>

            </div>      

          </main>        
        </div>  
      </div>

    </section>


    <form-idea v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-if="showFormIdea" @close="showFormIdea = false" @closeModalRefresh="closeModalRefresh()">
    </form-idea>

    <form-cs v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-bind:customersegmentId="customersegmentId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-cs>
    
    <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import FormCS from './newCS'
  import FormIdea from '../newIdea'
  import OnDelete from '@/components/ondelete'

  export default {
    props: [],  
    data: function () {
      return {
        data: {
          total :0,
          list : []
        },
        parentData: '',
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormIdea: false,
        edit: false,
        tutorId: this.$route.params.tutorId,
        teamId: this.$route.params.teamId,
        ideaId: this.$route.params.ideaId,
        customersegmentId: '',
        loading : true,
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
      'form-cs': FormCS,
      'form-idea': FormIdea,
      'ondelete': OnDelete
    },
    created: function () {
//      this.getData()
        this.role = localStorage.getItem('role')
        if(this.role !== 'Talent'){
          this.url = '/tutor/' + this.tutorId
        }
        this.getParent(this.teamId, this.ideaId)
    },
    methods: {
      getParent: function (teamId, ideaId) {
        this.loading = true
        this.$http.get(CONFIG.APIENDPOINT + this.url + '/team/' + teamId + '/idea/' + ideaId, {headers: auth.getAuthHeader()})
                .then(response => {
                  return response.json()
                }, error =>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                }).then(data => {
                  this.parentData = data.data
                  this.getData()
                  this.loading = false
                })
      },
      getData: function () {
        auth.getData(this, this.url + '/team/' + this.teamId + '/idea/' + this.ideaId + '/customer_segment')
      },
      showFormCS: function () {
        this.showForm = true
        this.edit = false
      },
      updateParent: function () {
        this.showFormIdea = true
        this.edit = true
      },
      updateCS: function (id) {
        this.showForm = true
        this.edit = true
        this.customersegmentId = id
      },
      deleteCS: function (id) {
        auth.deleteData(this, '/team/' + this.$route.params.teamId + '/idea/' + this.$route.params.ideaId + '/customer_segment/'+ id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.showFormIdea = false 
        this.getParent(this.teamId, this.ideaId)
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.deleteCS(this.confirmId) 
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
</style>