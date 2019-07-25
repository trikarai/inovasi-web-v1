<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask" style="width:776px;" id="style-2">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="">
            <slot name="header">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
            </slot>
          </div>
          <div class="modal-body">
            <i class="fa fa-close clsbtnmdl" @click="$emit('close')"></i>
            <div class="ui form">                
                <div class="field">  
                  <h2 v-if="!edit">Tambah Tipe Pengguna</h2>
                  <h2 v-if="edit">Ubah Tipe Pengguna</h2>
                  <div class="garis"></div>
                    <div>
                      <form>
                        <div class="row">
                          <div class="col-md-4">
                              <label style="padding: 6px">Tipe Pengguna</label>
                          </div>
                          <div class="col-md-6" style="display: flex">
                              <input style="width: 100%" class="kotak" type="text" v-model="data.name" maxlength="100">
                                <!-- <button class="btn btn-info" @click="learningCS" style="height: 31px;margin-left: 5px;border-radius: 5px;">
                                  <i class="fa fa-question"></i>
                                </button> -->
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                              <label style="padding: 6px">Deskripsi <a href="#" class="tultip" data-toggle="tooltip" data-placement="right" title="Tipe pengguna adalah jenis-jenis pengguna produk/jasa anda yang nantinya akan dikelompokan menjadi segmen pelanggan yang lebih spesifik"> <i style="margin-left: 20px" class="fa fa-info-circle"></i></a></label>
                          </div>
                          <div class="col-md-6">
                            <textarea style="width: 100%" class="kotak" rows="5" type="text" v-model="data.description"></textarea>
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
<!--
          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
-->
        </div>
      </div>
    
  </transition>
</template>

<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '../../../../errorflash'
  import onSubmit from '@/components/onsubmit'
  import alertControl from '@/alertcontrol'

  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'edit'],
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
          description:''
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
          console.log('edit CS data')
          this.getCS(this.teamId, this.ideaId, this.customersegmentId)
        } else {
          console.log('new CS data')
        }
      },
      getCS: function (teamId, ideaId, customersegmentId) {
        auth.getData(this, '/team/'+ teamId +'/idea/' + ideaId + '/customer_segment/' + customersegmentId)
      },
      submit: function () {
        auth.postData(this, '/team/'+ this.teamId +'/idea/'+ this.ideaId + '/customer_segment', this.data)
      },
      update: function () {
        auth.putData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId, this.data)
      },
      learningCS: function () {
          let routeData = this.$router.resolve({path: '/learning', query: {type: "customerSegment"}});
          window.open(routeData.href, '_blank');
      }
    }
  }
</script>  
<style lang="css">
    .kotak {
        border: 2px solid #eaeaea;
        border-radius: 3px;
    }
    .tooltip-inner {
        width: 200px
    }
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