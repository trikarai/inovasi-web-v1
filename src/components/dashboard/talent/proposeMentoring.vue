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
              <h2>Mengajukan Mentoring</h2>
              <div class="garis"></div>
              <onsub v-show="onPP"></onsub>
              
              
              <div class="form-group" v-if="filteredPP.length > 0">
                <label>Partisipasi Program</label>
                <!--{{filteredPP}}-->
                
                <select class="form-control" id="pp" v-model="programmeparticipation" @change="changePP">
                  <option disabled value="">Pilih Program</option>
                  <option v-for="pp in filteredPP" :value="pp">{{pp.programme.programme_curriculum.name}}</option>
                </select>
              </div> 
              <div v-else>
                <div v-show="!onPP">Kamu belum terdaftar program, daftar program terlebih dahulu  <router-link v-bind:to="'/team/' + teamId + '/programmeparticipation/register'"><b>here</b></router-link></div>
              </div>  
              
              <onsub v-show="onMS"></onsub>
              <template v-if="showMS">
              <div class="form-group" v-if="dataMS.total > 0">
                <label>Sesi Mentoring</label>
                <select class="form-control" id="ms" v-model="datams" @change="changeMS()">
                  <option disabled value="">Pilih Sesi</option>
                  <option v-for="ms in dataMS.list" :value="ms">{{ms.name}}</option>
                </select>
              </div>
              <div v-else>
                Tidak ada sesi mentoring di program ini
              </div>
              </template>
              
    
              
                <div v-show="!onSubmit" style="margin-top: 20px">
                  <template v-if="dateDiffEnd(end_date) != 0">
                        <template v-if="dateDiffStart(start_date) > 0">
                          <span class="statuse">Sesi Belum Dimulai </span>
                        </template> 
                          <template v-else>
                            <template v-if="dateDiffEnd(end_date) > 0">
                            <router-link v-if="showButton" class="btn btn-default" v-bind:to="{name: 'Daftar Mentor', params: {teamId: teamId, programmeparticipationId:programmeparticipationId, programmeId: programmeId, phaseId: phaseId, sessionId: sessionId}}"> <span class="glyphicon glyphicon-play-circle"></span> Propose Mentoring</router-link>
                            </template>  
                            <template v-else>
                              <span class="statuscancelled">Sesi Berakhir</span>
                            </template>  
                        </template> 
                  </template> 
                  <template v-else>
                    Mohon untuk memilih program terlebih dahulu, setelah itu memilih Sesi.<br><br>
                  </template> 
                    
                    <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  </div>
                  <onsub v-show="onSubmit"></onsub>

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
  import ErrorFlash from '@/components/inovasi/errorflash'
  import onSubmit from '@/components/onsubmit'
  import moment from 'moment'

  export default {
    props: ['teamId'],
    components: {
      'error-flash': ErrorFlash,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        dataPP: {total: 0, list:[]},
        dataMS: {total: 0, list:[]},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        onSubmit : false,
        programmeparticipation : '',
        sessionId : '',
        showButton : false,
        showMS : false,
        onPP : false,
        onMS : false,
        datams : ''
      }
    },
    mounted: function () {
      
    },
    computed:{
      filteredPP: function(){
        return this.dataPP.list.filter(function(item){
          return item.status == 'active'
        })
      }
    },
    created: function () {
      this.getProgrammeParticipation()
    },
    methods: {
      dateDiffEnd: function (end_date) {
        var todayDate = new Date();
        var a = moment(todayDate)
        var b = moment(end_date)
        return b.diff(a, 'days')   // =1
      },
      dateDiffStart: function (start_date) {
        var todayDate = new Date();
        var a = moment(todayDate)
        var b = moment(start_date)
        return b.diff(a, 'days')   // =1
      },
      getProgrammeParticipation: function(){
        this.onPP = true
        auth.getData2(this, '/team/'+ this.teamId +'/programme_participation')
                .then(res => {
                  console.log(res)
                  return res.json()
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataPP = data.data
                  this.onPP = false
                })
      },
      changePP: function(){
        this.showButton = false
        this.showMS = false
        this.programmeparticipationId = this.programmeparticipation.id
        this.programmeId = this.programmeparticipation.programme.id
        this.phaseId = this.programmeparticipation.current_phase.id
        this.getMentoringList(this.programmeparticipation.programme.id, this.programmeparticipation.current_phase.id)
      },
      getMentoringList: function(programmeId, phaseId){
        this.onMS = true
        auth.getData2(this, '/programme/'+ programmeId +'/phase/' + phaseId+ '/mentoring')
                .then(res => {
                  console.log(res)
                  return res.json()
                }, error => {
                  console.log(error)
                }).then(data => {
                  this.dataMS = data.data
                  this.onMS = false
                  this.showMS = true
                })
      },
      changeMS: function(){
        this.sessionId = this.datams.id
        this.start_date = this.datams.start_date
        this.end_date = this.datams.end_date
        this.showButton = true
      }
    }
  }
</script>  
<style lang="css" scoped>
  .statuse {
        background: #ff8300 !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .statuscancelled {
        background: #ff5252 !important;;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 10px;
    }
    .garis {
        display: block;
        width: 45px;
        height: 5px;
        background: #8bc751;
        margin-bottom: 20px;
    }
  @import '../../modal.css';
</style>