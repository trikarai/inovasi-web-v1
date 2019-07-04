<template>
  <div>

    <loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormIdea()"><span class="glyphicon glyphicon-plus-sign"></span> Tambahkan Ide</a>

      <div class="box" v-show="!error">
        <div class="box-body">

          <table class="table table-hover" v-if="data.list.length > 0 ">
            <thead>
              <tr>
                <th style="width: 25%">Nama Ide</th>
                <th>Elevator Pitch</th>
                <th></th>
                <th colspan="2"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td style="font-family: monospace;vertical-align: top !important">
<!--
                    <router-link v-bind:to="'/team/'+ teamId + '/idea/'+ data.id + '/cs'">
                        <span class="dttmnm hvr-ripple-out" >{{data.name}}</span>
                    </router-link>       
-->
                    <span style="position: relative;top: 5px;">{{data.name}}</span>
                </td>
                <td>
                     <span style="color:#6f6f6f">{{data.description}}</span>
                </td>
                <td><template v-if="data.is_main_idea === true">
                      <img src="/img/star_on.png">
                    </template>
                    <template v-else>
                        <a class="btn btn-default btn-sm" @click="assignIdea(data.id)"><i class="fa fa-check"></i> Jadikan Ide Utama</a>
                    </template> 
                     
                </td>

            <!--            <td><a class="btn btn-default" @click="updateIdea(data.id)">update</a></td>-->
            <!--<td><a class="btn btn-warning" @click="deleteIdea(data.id)">delete</a></td>-->
            <td><router-link class="btn btn-info btn-sm" v-bind:to="'/team/'+ teamId + '/idea/'+ data.id + '/cs'">
                  <i class="fa fa-search"></i></router-link>       
                </td>
            <td><a class="btn btn-danger btn-sm" @click="confirm('Delete', data.id)"><i class="fa fa-trash"></i></a></td>
            </tr>
            </tbody>
          </table>
          <div v-else>
            No Idea Yet, please create new...
          </div>
          
          <!-- Pagination -->
<!--          <div class="pagination" v-if="data.total > 5">
            <label>Data per page</label>
            <select v-model="page.size" @change="getData">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>  
          
          <nav aria-label="Pagination">
            <ul class="pagination" v-for="n in pageTotal">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>

              <template v-if="n == page.page">           
                <li class="page-item active"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
              </template>  
              <template v-else>  
                <li class="page-item"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
              </template>  
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>-->
          <!-- End Pagination -->
          
          
          
        </div>  
      </div>  

      <form-idea v-bind:edit="edit" v-bind:teamId="teamId" v-bind:ideaId="ideaId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
      </form-idea>
      
      <ondelete v-if="toconfirm" @close="toconfirm = false" v-bind:act="act" @confirmed="confirmed"></ondelete>

    </section>

  </div>
</template>  

<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import FormIdea from './newIdea'
  import OnDelete from '@/components/ondelete'

  export default {
    data: function () {
      return {
        data: {
          total : 0,
          list : []
        },
        dataCustomerSegment: [],
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        teamId: '',
        ideaId: '',
        ideaData: '',
        showCS : false,
        categories: [],
        selectedCategory: '',
        loading : false,
        page: {
          page: 1,
          size: 5
        },
        toconfirm : false,
        confirmId : '',
        act : ''
      }
    },
    watch: {
    // call again the method if the route changes
    '$route': 'getData'
    },
    computed: {
       pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
       }
      },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'form-idea': FormIdea,
      'ondelete': OnDelete
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        this.loading = true
        this.teamId = this.$route.params.teamId
        auth.getData2(this, '/team/' + this.$route.params.teamId + '/idea')
                .then(res=>{
                  if(res.status === 204){
                    this.data = {total : 0,list : []}
                    this.loading = false
                  }else{
                    return res.json()
                  }
                },error=>{
                  console.log(error)
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                }, error=>{
                  console.log(error)
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      showFormIdea: function () {
        this.showForm = true
        this.edit = false
      },
      updateIdea: function (id) {
        this.showForm = true
        this.edit = true
        this.ideaId = id
      },
      deleteIdea: function (id) {
        auth.deleteData(this, '/team/' + this.$route.params.teamId + '/idea/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      },
      assignIdea: function (id){
        this.loading = true
        auth.putData2(this, '/team/' + this.$route.params.teamId + '/idea/' + id + '/assign_as_main_idea')
                .then(res => {
                  console.log(res)
                  this.getData()
                }, error =>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
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
        this.deleteIdea(this.confirmId) 
      }
    }
  } 
</script>  

<style scoped>
@import './hover.css';
    
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
  font-style: italic;
  font-size: 0.8em;
  color: #565656;
}
.flexleft {
  color: #333300;
  width: 100%;
}
.deletebutton {
  align-self: center;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
ul.sidenav__tabs {
    -webkit-padding-start: 0px !important;
}

.dttmnm {
        background: #8bc751;
        color: #fff;
        padding: 12px;
    }
</style>