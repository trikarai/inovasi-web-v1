<template>
  <div>
<loading v-show="loading"></loading>
    <section class="content">

      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormTemplate()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Form Template</a>

      <!--<router-link class="btn btn-default" v-bind:to="'/team/'+ teamId + '/programmeparticipation/register'"> <span class="glyphicon glyphicon-play-circle"></span> Register New Program</router-link>-->

      <div class="box" v-show="!error">

        <div class="box-body">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th colspan="3"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.name}}</td>
                <td>{{data.description}}</td>
                <td>{{data.type}}</td>
                <td><router-link v-bind:to="'/formtemplate/' + data.id + '/field'">Manage Field</router-link></td>
                <td><a class="btn btn-info btn-sm" @click="openSection(data.id)">Section</a></td>
                <td><a class="btn btn-default btn-sm" @click="updateTemplate(data.id)"><i class="fa fa-pencil-square-o"></i> update</a></td>
                <td><a class="btn btn-danger btn-sm" @click="deleteTemplate(data.id)"><i class="fa fa-trash-o"></i> delete</a></td>
              </tr>
            </tbody>
          </table>
        </div> 

        <div id="second">   
        <div v-show="showSection">
        <a class="btn btn-default" @click="showAddFormSection()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Section</a>
        <div class="box-body" v-if="dataSection.list.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Position</th>
                <th colspan="2"></th>   
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in dataSection.list">
                <td>{{data.name}}</td>
                <td>{{data.position}}</td>
                <td><a class="btn btn-default" @click="updateSection(data, data.id)">update</a></td>
                <td><a class="btn btn-warning" @click="deleteSection(data.id)">delete</a></td>
              </tr>
            </tbody>
          </table>
        </div> 
          <div class="box-body" v-else>
            No Section 
          </div>  
        </div>  
        </div>      
      </div>      

      <form-template v-bind:edit="edit" v-bind:templateId="templateId" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()">
      </form-template>
      
      <form-section v-bind:edit="edit" v-bind:templateId="templateId" v-bind:SectionData="SectionData" v-bind:sectionId="sectionId" v-if="showFormSection" @close="showFormSection = false" @closeModalRefresh="closeModalRefreshSection()">
      </form-section>

    </section>

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../errorflash'
  import TemplateForm from './newForm'
  import SectionForm from './newSection'
  import Loading from '@/components/loading'
  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        dataSection: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showFormSection: false,
        edit: false,
        templateId: '',
        sectionId: '',
        SectionData : '',
        showSection: false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'form-template': TemplateForm,
      'form-section': SectionForm,
      'loading': Loading
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        auth.getData(this, '/form_template')
      },
      showFormTemplate: function () {
        this.showForm = true
        this.edit = false
        this.showSection = false
      },
      showAddFormSection: function () {
        this.showFormSection = true
        this.edit = false
      },
      updateTemplate: function (id) {
        this.showForm = true
        this.edit = true
        this.templateId = id
        this.showSection = false
      },
      updateSection: function (data, id) {
        this.showFormSection = true
        this.edit = true
        this.sectionId = id
        this.SectionData = data
      },
      deleteTemplate: function (id) {
        auth.deleteData(this, '/form_template/' + id)
      },
      deleteSection: function (id) {
        auth.deleteData(this, '/form_template/' + this.templateId + '/section/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData()
      },
      closeModalRefreshSection: function () {
        this.showFormSection = false 
        this.openSection(this.templateId)
      },
      openSection: function (templateId) {
        this.showSection = true        
        this.templateId = templateId
        this.dataSection = {total:0, list:[]}
        this.$http.get(CONFIG.APIENDPOINT + '/form_template/' + templateId + '/section', {headers: auth.getAuthHeader()})
                .then(response => {
                  return response.json()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataSection = data.data
                })
        this.smoothScroll(document.getElementById('second'))        
      },
      smoothScroll: function (target){
         var scrollContainer = target;
          do { //find scroll container
              scrollContainer = scrollContainer.parentNode;
              if (!scrollContainer) return;
              scrollContainer.scrollTop += 1;
          } while (scrollContainer.scrollTop == 0);

          var targetY = 0;
          do { //find the top of target relatively to the container
              if (target == scrollContainer) break;
              targetY += target.offsetTop;
          } while (target = target.offsetParent);

          scroll = function(c, a, b, i) {
              i++; if (i > 30) return;
              c.scrollTop = a + (b - a) / 30 * i;
              setTimeout(function(){ scroll(c, a, b, i); }, 20);
          }
          // start scrolling
          scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
      }
    }
  } 
</script>  