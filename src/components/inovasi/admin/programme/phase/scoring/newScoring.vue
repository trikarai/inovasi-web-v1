<template>
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
            </slot>
          </div>
          <div class="modal-body">
            <div class="ui form">                
                <div class="field"> 
                              <!--{{programmeId}}-->      
                    <div>
                      <form>
                        <div class="form-group">
                          <label>Name</label>
                          <input type="text" v-model="obj.name" class="form-control" >
                        </div>
                        <div class="form-group">
                          <label>Start Date</label>
                          <input type="date" v-model="obj.start_date" class="form-control">
                        </div>
                        <div class="form-group">
                          <label>End Date</label>
                          <input type="date" v-model="obj.end_date" class="form-control">
                        </div>
                        <div class="form-group">
                          <label>Scoring Template</label>
                          <select v-model="obj.scoring_template_id" class="form-control">
                            <option disable value="">-Select Scoring Template-</option>
                            <option v-for="option in data.list" :value="option.id">{{option.name}}</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="checkbox1">Team Viewable</label>
                          <input type="checkbox" id="checkbox1" v-model="obj.is_team_profile_viewable">
                          <label for="checkbox1">{{ obj.is_team_profile_viewable }}</label>
                        </div>
                        <div class="form-group">
                          <label for="checkbox2">Member Viewable</label>
                          <input type="checkbox" id="checkbox2" v-model="obj.is_member_profile_viewable">
                          <label for="checkbox2">{{ obj.is_member_profile_viewable }}</label>
                        </div>
                      </form>
                      <hr>
                    </div>
                  </div>
                  
                  <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                  <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                  <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  
                </div> 
            
          </div>
           </div>               
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    
  </transition>
</template>

<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '../../../../errorflash'
  
  export default {
    props: ['programmeId', 'phaseId', 'scoring','edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        data: {total:0, list:[]},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          name: '',
          start_date: '',
          end_date: '',
          scoring_template_id: this.scoretemplateId,
          is_team_profile_viewable: false,
          is_member_profile_viewable: false
        }
      }
    },
    created: function () {
      if(this.edit){
        this.getFormTemplate()
        this.obj.name = this.scoring.name
        this.obj.start_date = this.scoring.start_date
        this.obj.end_date = this.scoring.end_date
        this.obj.scoring_template_id = this.scoring.scoring_template.id
        this.obj.is_team_profile_viewable = this.scoring.is_team_profile_viewable
        this.obj.is_member_profile_viewable = this.scoring.is_member_profile_viewable
      }else{
        this.getFormTemplate()
      }
    },
    methods: {
      getFormTemplate: function () {
        auth.getData(this, '/form_template?type[]=scoring')
      },
      submit: function () {
        auth.postData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring', this.obj)
      },
      update: function () {
        auth.putData(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/scoring/' + this.scoring.id, this.obj)
      }
    }
  }
</script>  
<style lang="css">
@import '../../../modal.css';
</style>