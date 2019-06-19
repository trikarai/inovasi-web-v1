<template>  
  <div>
    
  <loading v-show="loading"></loading>

  <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
        
    <!--<a class="button"><span class="glyphicon glyphicon-plus-sign"></span> Register New Program</a>-->
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <table class="table" v-if="data.list.length > 0 ">
          <thead>
            <tr>
              <th>Region</th>
              <th>Name</th>
              <th colspan="4"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.programme.region.name}}</td>
              <td>{{data.programme.programme_curriculum.name}}</td>
              <td><router-link class="btn btn-primary" :to="'/tutor/'+data.id+'/programme/'+data.programme.id+'/participant'"><i class="fa fa-user-o  "></i> Participant</router-link></td>
              <td><router-link class="btn btn-primary" :to="'/tutor/'+data.id+'/mentoring'"><i class="fa fa-comments"></i> Mentoring Session</router-link></td>
              <td><router-link class="btn btn-primary" :to="'/tutor/'+data.id+'/programme/' + data.programme.id + '/phase'"><i class="fa fa-exchange"></i> Phase</router-link></td>
              <td><router-link class="btn btn-primary" :to="'/tutor/'+data.id+'/comment/'"><i class="fa fa-comment"></i> Feedback</router-link></td>
            </tr>
          </tbody>
        </table>
        <div v-else>
            No involved programme found...
        </div>
        
        
      </div>  
    </div>      
    
    </section>
    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        loading : true
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
        auth.getData(this, '/tutor')
      }
    }
  } 
</script>  