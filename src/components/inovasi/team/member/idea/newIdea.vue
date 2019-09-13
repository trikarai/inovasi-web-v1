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
                  <h2 v-if="!edit">Tambah Ide</h2>
                  <h2 v-if="edit">Ubah Ide</h2>
                  <div class="garis"></div>
                  <button class="btn btn-info" @click="learningEP" style="border-radius: 5px; padding: 2px 8px;margin-bottom:20px;">
                    <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang Elevator Pitch
                  </button>
                <div>                      
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">Nama Ide</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" style="width: 100%" type="text" v-model="data.name" maxlength="100">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">Elevator Pitch <a href="#" class="tultip" data-toggle="tooltip" data-placement="right" title="Elevator pitch merupakan deskripsi singkat mengenai ide, produk, ataupun perusaahan kalian dengan pemaparan yang mudah dimengerti dalam waktu singkat."> <i style="margin-left: 20px" class="fa fa-info-circle"></i></a></label>
                      </div>
                      
                      <div class="col-md-6">
                        <textarea class="kotak" style="width: 100%" rows="5" v-model="data.description"></textarea>
                      </div>
                    </div>
<!--                    <div class="row">  
                      <div class="col-md-4">
                        <label>Target Customer</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="hidden" v-model="data.target_customer">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Problem Confront</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="hidden" v-model="data.problem_confront">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label>Value Proposed</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="hidden" v-model="data.value_proposed">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4"> 
                        <label>Revenue Model</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="hidden" v-model="data.revenue_model">
                      </div>
                    </div>-->

                  </form>

                </div>
              </div>
               
<!--              <onsub></onsub>-->
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
  import ErrorFlash from '../../../errorflash'
  import onSubmit from '@/components/onsubmit'
  
  export default {
    props: ['teamId', 'ideaId', 'edit'],
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
          name:'',
          description:'',
          target_customer:'-',
          problem_confront:'-',
          value_proposed:'-',
          revenue_model:'-'
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
          console.log('edit idea data')
          this.getIdea(this.teamId, this.ideaId)
        } else {
          console.log('new Idea data')
        }
      },
      getIdea: function (teamId, ideaId) {
        auth.getData(this, '/team/'+ teamId +'/idea/' + ideaId)
      },
      submit: function () {
        auth.postData(this, '/team/'+ this.teamId +'/idea', this.data)
      },
      update: function () {
        auth.putData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId, this.data)
      },
      learningEP: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "ElevatorPitch" }
      });
      window.open(routeData.href, "_blank");
    },
    }
  }
</script>  
<style lang="css" scoped>
    .kotak {
        border: 2px solid #eaeaea;
    }
    .tooltip-inner {
        width: 200px
    }
@import './modal.css';
</style>