<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

    
          <div class="modal-body">
            <div class="ui form">                
              <div class="field">  

                <div>                      
                  <form>

                    <div class="row">
                      <div class="col-md-3">
                        <label>Nama Tim</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" style="width:100%" type="text" v-model="team.name" required="required">    
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>Visi</label>
                      </div>
                      <div class="col-md-6">
                        <textarea class="kotak" style="width:100%" type="text" v-model="team.vision" required="required"></textarea> 
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>Misi</label>
                      </div>
                      <div class="col-md-6">
                        <textarea class="kotak" style="width:100%" type="text" v-model="team.mission" required="required"></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <label>Budaya</label>
                      </div>
                      <div class="col-md-6">
                        <textarea class="kotak" style="width:100%" type="text" v-model="team.culture" required="required"></textarea>
                      </div>
                    </div>

                  </form>
                 <!--{{teamid}}-->
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
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '@/components/inovasi/errorflash'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['teamid', 'edit', 'data'],
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
        team : {
          name : '',
          vision : '',
          mission : '',
          culture : '',
          founder_agreement : ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function () {
        this.team = this.data.team
      },
      update: function () {
        this.onSubmit = true
        auth.putData2(this, '/team/' + this.teamid + '/update_profile', this.team)
                .then(response => {
                  console.log(response)
                  this.onSubmit = false
                  this.$emit('closemodal')
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
@import '../member/idea/modal.css';
</style>
