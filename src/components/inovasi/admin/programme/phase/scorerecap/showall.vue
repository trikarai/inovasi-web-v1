<template>
  <div>

    <section class="content">

      <error-flash v-bind:isError="error" v-bind:isSuccess="success" v-bind:err_msg="err_msg"/>

      <a class="btn btn-default" @click="showFormRecap()"><span class="glyphicon glyphicon-plus-sign"></span> Add New Score Recap</a>
      <div class="box">
        <div class="box-body">
          <table class="table" v-if="data.list.length > 0">
            <thead>
              <tr>
                <th>Scoring Name</th>
                <th>Scoring Template</th>
                <th>start_date</th>   
                <th>end date</th>   
                <th>Weight</th>   
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in data.list">
                <td>{{data.scoring.name}}</td>
                <td>{{data.scoring.scoring_template.name}}</td>
                <td>{{data.scoring.start_date}}</td>
                <td>{{data.scoring.end_date}}</td>
                <td>
                  <span :id="data.id" class="editable">{{data.weight}}</span> 
                  <span :id="'update' + data.id" class="glyphicon glyphicon-pencil" @click="editWeight(data.id)"> update</span>
                  <span :id="'save' + data.id"  class="glyphicon glyphicon-floppy-save" @click="saveWeight(data.id)" style="display: none;"> save</span>
                </td>
                <!--<td><a class="btn btn-default" @click="changeWeight(data)">update</a></td>-->
                <td><a class="btn btn-warning" @click="deleteScorerecap(data.id)">remove</a></td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            No Score Recap...
          </div>
        </div>         
      </div>      
      
      
    </section>
    
 <scorerecap-form v-bind:programmeId="programmeId" v-bind:phaseId="phaseId" v-bind:edit="edit" v-if="showForm" @close="showForm = false" @closeModalRefresh="closeModalRefresh()"></scorerecap-form>
    
    

  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import ScoreRecapForm from './newScoreRecap'

  
  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        edit: false,
        programmeId: this.$route.params.programmeId,
        phaseId: this.$route.params.phaseId,
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'scorerecap-form': ScoreRecapForm
    },
    created: function () {
      this.getData(this.programmeId, this.phaseId)
    },
    methods: {
      getData: function (programmeId, phaseId) {
        auth.getData(this, '/programme/'+ programmeId +'/phase/'+ phaseId +'/score_recap')
      },
      showFormRecap: function () {
        this.showForm = true
        this.edit = false
      },
      deleteScorerecap: function (id) {
        auth.deleteData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/score_recap/' + id)
      },
      closeModalRefresh: function () {
        this.showForm = false 
        this.getData(this.programmeId, this.phaseId)
      },
      editWeight: function (id){
        var span_Text = $("#" + id).text();
//        var input = $("<input id=input"+id+">", { val: $("#" + id).text(), type: "number" });
        var input = $("<input id=input"+id+" value="+span_Text+" type=number>");
        $("#" + id).replaceWith(input);
        $("#update" + id).hide();
        $("#save" + id).show();
        input.select();
      },
      saveWeight: function (id){
          var value = $("#input" + id).val()
          this.$http.put(CONFIG.APIENDPOINT + '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/score_recap/' + id, {weight: value}, {headers: auth.getAuthHeader()})
            .then(response => {
              console.log(response)
              $("#update" + id).show();
              $("#save" + id).hide();
              var textInput = $("<span id="+id+">").text(value);
              $("#input" + id).replaceWith(textInput);
            }, error => {
              console.log(error)
              alertControl.showError(this, error.body.meta)
            })
      }
    }
  } 
</script>  