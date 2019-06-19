<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
          <div class="modal-body">
               <h2>Detil Mentor</h2>
                  <div class="garis"></div>
              <onsub v-show="onSubmit"></onsub>    
              <div v-show="!onSubmit"> 

                <b>Nama</b> : {{data.name}} <br><hr>
                <b>Biografi</b> : <div class="schedulem">{{data.short_bio}}</div> <br>
                <b>Media</b> : <div class="schedulem">{{data.communication_channel}}</div> <br>
                <i class="fa fa-linkedin-square"></i> : <a :href="data.linkedin_url" target="_blank">{{data.linkedin_url}}</a>
                
                <!--{{data}}-->


              </div>
            <div style="margin-top: 25px">
              <button class="btn btn-danger" @click="$emit('close')">Close</button>
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
  import ErrorFlash from '../../../../../errorflash'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['tutorId'],
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
        data: '',
        onSubmit : false
      }
    },
    created: function () {
      this.getDetail()
    },
    methods: {  
      getDetail: function () {
        this.onSubmit = true
        auth.getData2(this, '/personnel/' + this.tutorId)
                .then(res => {
                  return res.json()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.data = data.data
                  this.onSubmit = false
                })
      }
    }
  }
</script>  
<style lang="css" scoped>
  .schedulem {
        white-space: pre-line;
        background: #f9f6f6;
        color: #4c4c4c;
        padding: 10px;
        border: 1px solid #c7c7c7;
        font-family: sans-serif;
    }
  
@import '../modal.css';
</style>