<template>
 <transition name="modal">

    <div class="modal-mask" style="width:776px;" id="style-2">
      <div class="modal-wrapper">
        <div class="modal-container">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

          <div class="modal-body">
            <i class="fa fa-close clsbtnmdl" @click="$emit('close')"></i>  
            <div class="ui form">                 
              <div class="field">
                <h2 v-if="!edit">Tambah Segmen Pelanggan</h2>
                  <h2 v-if="edit">Ubah Segmen Pelanggan</h2>
                  <div class="garis"></div>
                  <button class="btn btn-info" @click="learningSP" style="border-radius: 5px; padding: 2px 8px;margin-bottom:20px;">
                    <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang Segmen Pelanggan
                  </button>
                <div>
                  
                  <div class="row">
                          <div class="col-md-4">
                              <label style="padding: 6px;">Nama Persona</label>
                          </div>
                          <div class="col-md-6">
                              <input style="width: 100%" class="kotak" type="text" v-model="obj.name" maxlength="250">
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-4">
                              <label style="padding: 6px;">Catatan <a href="#" class="tultip" data-toggle="tooltip" data-placement="right" title="Persona merupakan seseorang yang mewakili segmen pelanggan ideal kalian berdasarkan data yang diperoleh melalui riset pasar dan juga data pelanggan yang ada saat ini"> <i style="margin-left: 20px" class="fa fa-info-circle"></i></a></label>
                          </div>
                          <div class="col-md-6">
                            <input style="width: 100%"class="kotak" type="text" v-model="obj.description">
                          </div>
                        </div>    
                  
                  
                  <div id="dynamicform" v-if="!edit">
                    <div>
                      <form id="dynamicform" :name="1">  
                        <div v-for="field, index in data.list">
                          <fields-comp v-bind:fields="field"></fields-comp>
                          <!--{{field}}-->
                          
                        </div>
                      </form>
                    
                    </div>
                  </div>
                      
                  <div id="dynamicform" v-if="edit">
                    <div>
                      <form :name="1">  
                        <div v-for="field, index in template.aspect">
                          <fields-compe v-bind:fields="field"></fields-compe>
                          <!--{{field}}-->
                          
                        </div>
                      </form>
                    </div>
                  </div>
                  <div v-show="!onSubmit" style="margin-top: 20px">
                    <button v-if="!edit" class="btn btn-default" @click.prevent="submitData()">Submit</button>
                    <button v-if="edit" class="btn btn-default" @click.prevent="updateData()">Update</button>
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
            <!--{{obj}}-->
            <!--{{template}}-->
          </slot>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '../../../../errorflash'
  import fieldscomp from '@/components/field/fields'
  import fieldscompe from '@/components/fieldedit/fields'
  import onSubmit from '@/components/onsubmit'
  import alertControl from '@/alertcontrol'


  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'edit', 'template'],
    components: {
      'error-flash': ErrorFlash,
      'fields-comp': fieldscomp,
      'fields-compe': fieldscompe,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        data: {total:0, list:[]},
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          name: this.template.name,
          description: this.template.description,
          aspects : []
        },
        onSubmit : false
      }
    },
    created: function () {
      if(!this.edit){
        this.getForm()
      }
    },
    methods: {
      getForm: function () {
        auth.getData(this, '/persona_aspect')
      },
      submitData: function () {
        for (var x = 0; x < this.data.list.length; x++) {
          this.getFormValues(x)
        }
      this.sendPostData(this.teamId, this.ideaId, this.customersegmentId)
      },
      updateData: function () {
        for (var x = 0; x < this.template.aspect.length; x++) {
          this.getFormValues(x)
        }
      this.sendPutData(this.teamId, this.ideaId, this.customersegmentId, this.template.id)
      },
      getFormValues: function (index) {
        var values = $('form[name="' + index + '"]').serializeArray()
        console.log(values)
        for (var y = 0; y < values.length; y++) {
          var data = values[y]
          var element = new Object()
          element.field_template_id = data.name
          element.value = data.value
          this.obj.aspects.push(element)
        }
      },
      sendPostData: function (teamId, ideaId, customersegmentId) {
        this.onSubmit = true
        auth.postData2(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona', this.obj)
                .then(res => {
                  console.log(res)
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  this.obj.aspects = []
                  alertControl.showError(this, error.body.meta)
                })
      },
      sendPutData: function (teamId, ideaId, customersegmentId, id) {
        this.onSubmit = true
        auth.putData2(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + id, this.obj)
                .then(res => {
                  console.log(res)
                  this.onSubmit = false
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  this.obj.aspects = []
                  alertControl.showError(this, error.body.meta)
                })
      },
      learningSP: function() {
        let routeData = this.$router.resolve({
          path: "/learning",
          query: { type: "SegmenPelanggan" }
        });
        window.open(routeData.href, "_blank");
      }
    }
  }
</script>  
<style lang="css" scoped>
@import '../modal.css';

#style-2::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
.clsbtnmdl {
    float: right;
    cursor: pointer;
    background: #bdbdbd;
    padding: 4px;
    border-radius: 50%;
    padding-left: 6px;
    padding-right: 6px;
    color: #fff;
}

</style>