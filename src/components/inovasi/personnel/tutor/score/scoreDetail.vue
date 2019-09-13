<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">

              <div class="alert alert-danger" v-show="error" v-for="msg in err_msg.error_details">
                <strong>{{err_msg.code}}</strong> {{ msg }}
              </div>

            </slot>
          </div>
          <div class="modal-body">

            <div class="ui form">                
              <div class="field">  
                <div>
                  
                  
                  <!--{{summary}}-->
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>  
                    </thead>
                    <tbody style="border-top-style: none !important;">
                      <tr v-for="data in summary" v-if="!data.is_removed">
                        <td width="150px"><b>{{data.field_template.name}}</b></td>
                        <template v-if="data.value != null">
                          <td>{{data.value}}</td>
                        </template>
                        <template v-else>
                          <td v-for="option in data.selected_options">
                            {{option.option.name}}
                          </td>
                        </template>
                        <template v-if="data.field_template.type === 'attachment'">
                          <td v-for="file in data.attachment">
                            <i class="fa fa-file"></i> <a target="_blank" :href="baseUrl + file.file_meta.file_path">{{file.file_meta.file_path}} </a>
                          </td>
                        </template>
.
                    </tr>  
                    </tbody>
                  </table>   
                  
               
                </div>
              </div>
              <button class="btn btn-danger" @click="$emit('close')"><i class="fa fa-close"></i> Close</button>
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
  import * as CONFIG from '@/app.config.js'
  import auth from '@/httpcontrol'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import datetime from 'vuejs-datetimepicker'
  import onSubmit from '@/components/onsubmit'
  
  export default {
    props: ['summary', 'tutorid', 'sessionid'],
    components: {
      'error-flash': ErrorFlash,
      'datetime' : datetime,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        data: '',
        dataTutor: '',
        show: false,
        err_msg: '',
        error: false,
        success: false,
        onSubmit : false,
        baseUrl : CONFIG.APIENDPOINT + '/public/uploads'
      }
    },
    created: function () {},
    methods: {
    }
  }
</script>  
<style lang="css" scoped>
@import '../../../team/member/idea/modal.css';
</style>