<template>  
  <div>
    
  <loading v-show="loading"></loading>
  <notifications group="registerp" position="top center" /> 

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
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.region.name}}</td>
              <td>{{data.programme_curriculum.name}}</td>
              <td>{{data.description}}</td>
              <td><a class="btn btn-primary" @click="registerProgramme(data.id)"><i class="fa fa-pencil"></i> Register</a></td>
            </tr>
          </tbody>
        </table>
        <div v-else>
            No programme found...
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
  import ErrorFlash from '../../../errorflash'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        teamName: this.$route.params.teamName,
        programme: {
          programme_id: ''
        },
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
        auth.getData(this, '/programme')
      },
      registerProgramme: function (programme_id) {
        this.loading = true
        this.programme.programme_id = programme_id
        this.$http.post(CONFIG.APIENDPOINT + '/team/' + this.$route.params.teamId + '/programme_participation', this.programme, {headers: auth.getAuthHeader()})
                .then(response => {
                  console.log(response)
                  this.loading = false
                  this.$notify({
                    group: 'registerp',
                    title: 'Notifikasi',
                    text:  this.teamName + ' : Registrasi Program Berhasil',
                    type: 'success'
                  })
                  alertControl.showSuccess(this, this.teamName + ' : Registrasi Program Berhasil')
                  this.$route.go(-1)
                }, error => {
                  console.log(error)
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      }
    }
  } 
</script>  