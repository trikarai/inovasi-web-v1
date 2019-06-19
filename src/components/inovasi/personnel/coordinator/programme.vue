<template>  
  <div>
    
  <loading v-show="loading"></loading>
  <notifications group="registerp" position="top center" /> 

  <section class="content">
      
    <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>
        
    <!--<a class="button"><span class="glyphicon glyphicon-plus-sign"></span> Register New Program</a>-->
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <table class="table" v-if="data.list.length > 0 ">
          <thead>
            <tr>
              <th>Region</th>
              <th>Name</th>
              <!--<th>Description</th>-->
              <th colspan="3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.programme.region.name}}</td>
              <td>{{data.programme.programme_curriculum.name}}</td>
              <!--<td>{{data.description}}</td>-->
              <td><router-link class="btn btn-primary btn-sm" :to="'/coordinator/programme/'+data.programme.id+'/participant'"><i class="fa fa-user-o  "></i> Participant</router-link></td>
              <td><router-link class="btn btn-primary btn-sm" :to="'/coordinator/programme/'+data.programme.id+'/registration'"><i class="fa fa-calendar"></i> Registration</router-link></td>
              <td><router-link class="btn btn-primary btn-sm" :to="'/coordinator/programme/'+data.programme.id+'/phase'"><i class="fa fa-exchange"></i> Phase</router-link></td>
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
        loading : false
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
        auth.getData2(this, '/coordinator')
                .then(res=>{
                  console.log(res)
                  if(res.status === 204){
                    this.data = {total:0, list:[]}
                    this.loading = false
                  }else{
                    return res.json()
                    this.loading = false
                  }
                  this.loading = false
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                }).then(data=>{
                  this.data = data.data
                  this.loading = false
                })
      }
    }
  } 
</script>  