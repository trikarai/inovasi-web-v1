<template>
  <div>

    <loading v-show="loading"></loading>

    <section class="content">

      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

      <div class="box" v-show="!error">
        <div class="box-body">
          <!--{{data}}-->
          <table class="table" v-if="data.total != 0">
            <thead>
              <tr>
                <th>Idea Name</th>
                <th style="width:25%">Idea Initiator</th>
                <th>Elevator Pitch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="width: 25%"><router-link v-bind:to="'/tutor/'+ tutorId +'/participant/'+ teamId + '/idea/'+ data.id + '/cs'">
                  <span  class="dttmnm hvr-ripple-out" >{{data.name}}</span></router-link>
                </td>
                  <td><router-link :to="'/participant/team/talent/' + data.initator.talent.id" class="btn btn-default" style="width: 100%">{{data.initator.talent.name}}</router-link></td>
                <td><span style="color:#6f6f6f">{{data.description}}</span></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            This Team has no Main Idea
          </div>  
                  
          
        </div>  
      </div>  


    </section>

  </div>
</template>  

<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        dataCustomerSegment: [],
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        teamId: '',
        tutorId: this.$route.params.tutorId,
        ideaId: '',
        ideaData: '',
        loading : false,
        page: {
          page: 1,
          size: 5
        }
      }
    },
    watch: {
    '$route': 'getData'
    },
    computed: {
       pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
       }
      },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        this.loading = true
        this.teamId = this.$route.params.teamId
        auth.getData2(this, '/tutor/'+ this.tutorId +'/team/' + this.$route.params.teamId + '/idea/main_idea')
                .then(res=>{
                    return res.json()
                },error=>{
                  console.log(error)
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                })
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
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
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
  color: #777;
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