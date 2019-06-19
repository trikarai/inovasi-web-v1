<template>
  <div>
    <loading v-show="loading"></loading>
    <section class="content">
      
    <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>
        
    <a class="btn btn-default" @click="showFormRegion()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Region</a>
     
    <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
         
              <th colspan="2"></th>   
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.name}}</td>
             
              <td><a class="btn btn-default btn-sm" @click="updateRegion(data.id)"><i class="fa fa-pencil-square-o"></i> update</a></td>
              <td><a class="btn btn-danger btn-sm" @click="deleteRegion(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
            </tr>
          </tbody>
        </table>
      </div>  
    </div>      
    
    <form-region v-bind:edit="edit" v-bind:regionId="regionId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-region>
    
    </section>
    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import RegionForm from './newRegion'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        regionId: ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-region': RegionForm,
      'loading': Loading   
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/region')
      },
      showFormRegion: function () {
        this.showForm = true
        this.edit = false
      },
      updateRegion: function (id) {
        this.showForm = true
        this.edit = true
        this.regionId = id
      },
      deleteRegion: function (id) {
        auth.deleteData(this, '/region/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      }
    }
  } 
</script>  