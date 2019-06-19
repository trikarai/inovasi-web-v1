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
                  <h2 v-if="edit">Edit Entrepreneurship</h2>
                  <h2 v-if="!edit">Add Entrepreneurship</h2>
                  <div class="garis"></div>
                <div>                      
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">Business Category</label>
                      </div>
                      <div class="col-md-6">
                        <select class="kotak" v-model="obj.business_category">
                          <option disabled value="">Select business category</option>
                          <option value="B2C">B2C</option>
                          <option value="B2B">B2B</option>
                          <option value="C2B">C2B</option>
                          <option value="C2C">C2C</option>
                        </select>  
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">Name</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="obj.name" maxlength="35">
                      </div>
                    </div>
                    <div class="row">  
                      <div class="col-md-4">
                        <label style="padding: 6px">Business field</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="obj.business_field" maxlength="35">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">Start year</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="obj.start_year" maxlength="35">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <label style="padding: 6px">End year</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="obj.end_year" maxlength="35">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4"> 
                        <label style="padding: 6px">Position</label>
                      </div>
                      <div class="col-md-6">
                        <input class="kotak" type="text" v-model="obj.position" maxlength="35">
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
        obj: {
          name : '',
          business_field : '',
          business_category : '',
          start_year : '',
          end_year : '',
          position : ''
        },
        onSubmit : false
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if(edit){
          this.obj = this.data
          this.objId = this.data.id
        }else{
          
        }
      },
      submit: function () {
        this.onSubmit = true
        auth.postData2(this, '/talent/entrepreneurship', this.obj)
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
        auth.putData2(this, '/talent/entrepreneurship/' + this.objId, this.obj)
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
    .garis {
        display: block;
        width: 45px;
        height: 5px;
        background: #8bc751;
        margin-bottom: 20px;
    }
@import './modal.css';
</style>
