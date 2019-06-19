<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

            </slot>
          </div>
          <div class="modal-body">
            <div class="ui form">                
              <div class="field">  
                  <h2 v-if="edit">Edit Skill</h2>
                  <h2 v-if="!edit">Add Skill</h2>
                  <div class="garis"></div>
                <div>                      
                  <form>
                    <div class="row" v-if="edit">
                      <div class="col-md-4">
                        <label style="padding: 6px">Skill</label>
                      </div>
                     <div class="col-md-6">
                       {{data.skill_reference.name}}
                    </div>
                    </div>  
                    
                    
                    
                    <div class="row" v-if="!edit">
                      <div class="col-md-4">
                        <label style="padding: 6px">Track</label>
                      </div>
                      <div class="col-md-6">
                        <select class="kotak" v-model="obj.track_id" @change="getSkill()">
                          <option disabled value="">Select Track</option>
                          <option v-for="data in dataTrack.list" :value="data.id">{{data.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div v-if="!edit">
                    <div class="row" v-if="dataSkill.list.length > 0">
                      <div class="col-md-4">
                        <label style="padding: 6px">Skill</label>
                      </div>
                      <div class="col-md-6">
                        <select class="kotak" v-model="obj.skill_reference_id">
                          <option disabled value="">Select Skill</option>
                          <option v-for="data in dataSkill.list" :value="data.id">{{data.name}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-md-4">
                        <label style="padding: 6px">Skill</label>
                      </div>
                      <div style="padding: 6px"class="col-md-6">
                      No Skill Reference, please select track first..
                      </div>
                    </div>
                    </div>  
                    
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">Score</label>
                      </div>
                      <div class="col-md-6">
                        <!--<input class="kotak" type="number" min="1" max="5" v-model="obj.score">-->
                        
                        <div style="padding: 6px" class="rating" v-if="!edit">
                          <span><input v-model="obj.score" type="radio" name="score" id="str5" :value="5"><label for="str5"></label></span>
                          <span><input v-model="obj.score" type="radio" name="score" id="str4" :value="4"><label for="str4"></label></span>
                          <span><input v-model="obj.score" type="radio" name="score" id="str3" :value="3"><label for="str3"></label></span>
                          <span><input v-model="obj.score" type="radio" name="score" id="str2" :value="2"><label for="str2"></label></span>
                          <span><input v-model="obj.score" type="radio" name="score" id="str1" :value="1"><label for="str1"></label></span>
                         </div>
                        
                        <select  style="padding: 6px" v-model="obj.score" v-if="edit">
                          <option value="5">5</option>
                          <option value="4">4</option>
                          <option value="3">3</option>
                          <option value="2">2</option>
                          <option value="1">1</option>
                        </select>
                        
                      </div>
                    </div>
                    
                  </form>

                  
                </div>
              </div>
<div v-show="!onSubmit" style="margin-top: 20px">
              <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
              <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
              <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
            </div>
                <onsub v-show="onSubmit"></onsub>
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
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import onSubmit from '@/components/onsubmit'
  
  export default {
    props: ['edit', 'data'],
    components: {
      'error-flash': ErrorFlash,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        objId : '',
        dataTrack : {
          total : 0,
          list : []
        },
        dataSkill : {
          total : 0,
          list : []
        },
        obj: {
          track_id : '',
          skill_reference_id : '',
          score : ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    mounted: function () {
      $(".rating input:radio").attr("checked", false);
        $('.rating input').click(function () {
            $(".rating span").removeClass('checked');
            $(this).parent().addClass('checked');
        });
    },
    methods: {
      getData: function (edit) {
        if(edit){
          this.obj.score = this.data.score  
//          this.getTrack2()
          this.objId = this.data.id
        }else{
          this.getTrack()
        }
      },
      getTrack: function () {
        this.onSubmit =  true
        auth.getData2(this, '/track')
                .then(response => {
                  console.log(response)
                  return response.json()
                }, error => {
                  console.log(error)
                  this.onSubmit =  false
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataTrack = data.data
                  this.onSubmit =  false
                })
      },
      getTrack2: function () {
        this.onSubmit =  true
        auth.getData2(this, '/track')
                .then(response => {
                  console.log(response)
                  return response.json()
                }, error => {
                  console.log(error)
                  this.onSubmit =  false
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataTrack = data.data
                  this.getSkill2()
                  this.onSubmit =  false
                })
      },
      getSkill: function (){
        this.onSubmit =  true
        this.dataSkill = {total : 0, list : []}
        auth.getData2(this, '/track/'+this.obj.track_id+'/skill_reference')
                .then(response => {
                  if(response.status === 204){
                    console.log(response)
                    this.onSubmit = false
                  }else {
                    return response.json()
                  }
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                }).then(data =>{
                  this.dataSkill = data.data
                  this.onSubmit = false
                })
      },
      getSkill2: function (){
        this.onSubmit = true
        this.dataSkill = {total : 0, list : []}
        auth.getData2(this, '/track/'+this.data.track_id+'/skill_reference')
                .then(response => {
                  console.log(response)
                  return response.json()
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                }).then(data =>{
                  this.dataSkill = data.data 
                  this.onSubmit = false
                })
      },
      submit: function () {
        this.onSubmit = true
        auth.postData2(this, '/talent/skill', this.obj)
                .then(response => {
                  console.log(response)
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      update: function () {
        this.onSubmit = true
        auth.putData2(this, '/talent/skill/' + this.objId, this.obj)
                .then(response => {
                  console.log(response)
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
      }
    }
  }
</script>  
<style lang="css">
    .rating {
        float:left;
        width:200px;
    }
    .rating span { float:right; position:relative; }
    .rating span input {
        position:absolute;
        top:0px;
        left:0px;
        opacity:0;
    }
    .rating span label {
        display:inline-block;
        width:30px;
        height:30px;
        text-align:center;
        color:#FFF;
        background-image:url("/img/star_off.png");
        font-size:30px;
        margin-right:2px;
        line-height:30px;
        border-radius:50%;
        -webkit-border-radius:50%;
    }
    .rating span:hover ~ span label,
    .rating span:hover label,
    .rating span.checked label,
    .rating span.checked ~ span label {
        background-image:url("/img/star_on.png");
        color:#FFF;
    }
@import './modal.css';
</style>
