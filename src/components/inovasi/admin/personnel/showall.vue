<template>
  <div>
    <loading v-show="loading"></loading>
    <section class="content">
      
    <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>
        
    <a class="btn btn-default" @click="showFormAdmin()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Admin</a>
     
    <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->
    
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th colspan="2"></th>   
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.name}}</td>
              <td>{{data.username}}</td>
              <td>{{data.email}}</td>
              <td>{{data.added_date}}</td>
              <!--<td><a class="btn btn-default" @click="updateAdmin(data.id)">update</a></td>-->
              <td><a class="btn btn-danger btn-sm" @click="deleteAdmin(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
            </tr>
          </tbody>
        </table>
      </div>  
    </div>      
    
    <form-admin v-bind:edit="edit" v-bind:personnelId="personnelId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
    </form-admin>
    
    </section>
    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import AdminForm from './personnelForm'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {
          total : 0,
          list : []
        },
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        personnelId : ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-admin': AdminForm,
      'loading': Loading   
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/personnel')
      },
      showFormAdmin: function () {
        this.showForm = true
        this.edit = false
      },
      updateAdmin: function (id) {
        this.showForm = true
        this.edit = true
      },
      deleteAdmin: function (id) {
        auth.deleteData(this, '/personnel/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      }
    }
  } 
</script>  