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
                <h2>
                  <template v-if="edit">Edit </template>
                  <template v-else>Add </template>Competitor</h2>
                <div class="garis"></div>
                <div>

                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Name</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="data.name">
                        <!-- <wysiwyg class="kotak" v-model="data.name" /> -->
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Value proposed</label>
                      </div>
                      <div class="col-md-6">
                        <!-- <textarea class="kotak" type="text" v-model="data.value_proposed"></textarea> -->
                        <wysiwyg class="kotak" v-model="data.value_proposed" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Comparative advantage</label>
                      </div>
                      <div class="col-md-6">
                        <!-- <textarea class="kotak" type="text" v-model="data.comparative_advantage"></textarea> -->
                        <wysiwyg class="kotak" v-model="data.comparative_advantage" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Differential advantage</label>
                      </div>
                      <div class="col-md-6">
                        <!-- <textarea class="kotak" type="text" v-model="data.differential_advantage"></textarea> -->
                        <wysiwyg class="kotak" v-model="data.differential_advantage" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Focus</label>
                      </div>
                      <div class="col-md-6">
                        <!-- <textarea class="kotak" type="text" v-model="data.focus"></textarea> -->
                        <wysiwyg class="kotak" v-model="data.focus" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Asset</label>
                      </div>
                      <div class="col-md-6">
                        <!-- <textarea class="kotak" type="text" v-model="data.asset"></textarea> -->
                        <wysiwyg class="kotak" v-model="data.asset" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4"> 
                        <label>Unfair advantage</label>
                      </div>
                      <div class="col-md-6">
                        <!-- <textarea class="kotak" type="text" v-model="data.unfair_advantage"></textarea> -->
                        <wysiwyg class="kotak" v-model="data.unfair_advantage" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div v-show="!onSubmit">
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
  import ErrorFlash from '../../../../../errorflash'
  import onSubmit from '@/components/onsubmit'
  import alertControl from '@/alertcontrol'

  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'personaId', 'valuepropositionId', 'competitorId' ,'edit'],
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
        data: {
          name :'',
          value_proposed :'',
          comparative_advantage :'',
          differential_advantage :'',
          focus :'',
          asset :'',
          unfair_advantage :''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit competitor data')
          this.getVP(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId, this.competitorId)
        } else {
          console.log('new competitor data')
        }
      },
      getVP: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId, competitorId) {
        auth.getData(this, '/team/'+ teamId +'/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/competitor/' + competitorId)
      },
      submit: function () {
        auth.postData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/competitor', this.data)
      },
      update: function () {
        auth.putData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId + '/competitor/' + this.competitorId, this.data)
      }
    }
  }
</script>  
<style lang="css">
@import '../../modal.css';
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>