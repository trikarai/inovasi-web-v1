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
                <h3>Talent : {{data.name}}</h3>

                <div>
                  <form>
                    <div class="form-group">
                      <label>Position:</label>
                      <!--<input type="text" v-model="obj.position" class="form-control" >-->
                      <select class="kotak" style="width:100%" v-model="obj.position">
                        <option value="" disabled="">-Select Position-</option>
                        <option value="Creative">Creative</option>
                        <option value="Business">Business</option>
                        <option value="Technical">Technical</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <input type="checkbox" v-model="obj.is_admin">
                      <label>Make Team Admin</label>
                    </div>

                  </form>
                  <hr>
                </div>
              </div>
              <div v-show="!onSubmit">
                <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Invite</button>
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
  import alertControl from '@/alertcontrol'
  
  export default {
    props: ['data', 'team_id', 'edit'],
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
        obj: {
          talent_id: this.data.id,
          position:'',
          is_admin:''
        },
        onSubmit : false
      }
    },
    created: function () {
    },
    methods: {
      submit: function () {
        this.onSubmit = true
        auth.postData2(this, '/team/' + this.team_id + '/member', this.obj)
                .then(res => {
                  console.log(res)
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
@import '../../member/idea/modal.css';
</style>