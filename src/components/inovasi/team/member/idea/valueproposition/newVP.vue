<template>
  
  <transition name="modal">
    
    
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
              
              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
                            
          <div class="modal-body">
            <div class="ui form">                
                <div class="field">  
                  <h2 v-if="!edit">Tambah Value Proposition</h2>
                  <h2 v-if="edit">Ubah Value Proposition</h2>
                  <div class="garis"></div>
                  <button class="btn btn-info" @click="learningVPC" style="border-radius: 5px; padding: 2px 8px;margin-bottom:20px;">
                    <i class="fa fa-info-circle"></i> Klik disini apabila kamu ingin mempelajari tentang Value Proposition
                  </button>
                    <div>
                      <form>
                        <div class="row">
                              <div class="col-md-4">
                                <label>Deskripsi <a href="#" class="tultip" data-toggle="tooltip" data-placement="right" title="Value Proposition adalah sebuah pernyataan terkait value yang akan diperoleh oleh pelanggan dengan menggunakan produk/jasa anda. Isinya dapat berupa manfaat-manfaat yang akan diperoleh pelanggan. Selain menjelaskan manfaat, Value Proposition yang baik juga menjelaskan mengapa produk/jasa anda lebih baik dibandingkan dengan kompetitor."> <i style="margin-left: 20px" class="fa fa-info-circle"></i></a></label>
                              </div>
                              <div class="col-md-6">
                                  <textarea style="border: 2px solid #eaeaea;height: 130px;width: 100%;" class="kotak" type="text" v-model="data.description" maxlength="750"></textarea>
                              </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  <div style="margin-top: 20px">
                  <button v-if="!edit" class="btn btn-default" @click.prevent="submit()">Submit</button>
                  <button v-if="edit" class="btn btn-default" @click.prevent="update()">Update</button>
                  <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
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
  import ErrorFlash from '../../../../errorflash'
  
  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'personaId', 'valuepropositionId' ,'edit'],
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: {
          description : ''
        }
      }
    },
    created: function () {
      this.getData(this.edit)
    },
    methods: {
      getData: function (edit) {
        if (edit) {
          console.log('edit VP data')
          this.getVP(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId)
        } else {
          console.log('new VP data')
        }
      },
      getVP: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId) {
        auth.getData(this, '/team/'+ teamId +'/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId)
      },
      submit: function () {
        auth.postData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition', this.data)
      },
      update: function () {
        auth.putData(this, '/team/'+ this.teamId +'/idea/' + this.ideaId + '/customer_segment/' + this.customersegmentId + '/persona/' + this.personaId + '/value_proposition/' + this.valuepropositionId, this.data)
      },
      learningVPC: function() {
      let routeData = this.$router.resolve({
        path: "/learning",
        query: { type: "VPcanvas" }
      });
      window.open(routeData.href, "_blank");
    },
    }
  }
</script>  
<style lang="css">
@import '../modal.css';
</style>