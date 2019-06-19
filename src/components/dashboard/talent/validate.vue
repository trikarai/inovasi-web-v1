<template>

  <transition name="modal">


    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-co">
          <div class="">
            <slot name="header">

              <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

            </slot>
          </div>
          <div class="modal-body">
            <div class="ui form">                
              <div class="field">  
                  <h2>{{templateName}}</h2>
                  <div class="garis"></div>
                <div>                    

                  <div id="dynamicform" v-if="!edit">
                    <div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Exp Name</label>
                        </div>
                        <div class="col-md-6">
                          <input class="kotak" style="width: 226px;"  type="text" v-model="obj.name">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Date</label>
                        </div>
                        <div class="col-md-6">
                          <!--<input type="date" v-model="obj.date">-->
                          <datetime format="YYYY-MM-DD" style="width: 226px;"  v-model="obj.date"></datetime>
                        </div>
                      </div>
                    <div style="margin-top: 10px">
                        <form id="dynamic-form" :name="1">  
                            <input type="hidden" value="hidden">
                                <div v-for="field, index in data.fields">
                                    <fields-comp v-bind:fields="field"></fields-comp>      
                                </div>
                      </form>
                    </div>
                    </div>
                  </div>
                  
                  <div id="dynamicform" v-if="edit">
                    
                    <div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Exp Name</label>
                        </div>
                        <div class="col-md-6">
                          <input class="kotak" style="width: 226px;" type="text" v-model="obj.name">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label>Date</label>
                        </div>
                        <div class="col-md-6">
                          <!--<input type="date" v-model="obj.date">-->
                          <datetime format="YYYY-MM-DD" width="245px" v-model="obj.date"></datetime>
                        </div>
                      </div>

                      <form :name="1">  
                      <div v-for="field, index in template.fields">
                          <fields-compe v-bind:fields="field"></fields-compe>
                       
                      </div>
                      </form>

                    </div>
                  </div>
                  
                  <div style="margin-top: 20px" v-show="!onSubmit">
                    <button v-if="!edit" class="btn btn-default" @click.prevent="submitData()">Submit</button>
                    <button v-if="edit" class="btn btn-default" @click.prevent="updateData()">Update</button>
                    <button class="btn btn-danger" @click="$emit('close')">Cancel</button>
                  </div>
                  <onsub v-show="onSubmit"></onsub>
                  <!--{{obj}}-->
                  <!--{{data2}}-->
                </div> 
              </div> 

            </div>
          </div>               
        </div>

        
<!--
        <div class="modal-footer">
          <slot name="footer">
            
            {{obj}}
          </slot>
        </div>
-->
      </div>
    </div>

  </transition>
</template>

<script>
  import auth from '@/httpcontrol'
  import ErrorFlash from '@/components/inovasi/errorflash'
  import fieldscomp from '@/components/field/fields'
  import fieldscompe from '@/components/fieldedit/fields'
  import onSubmit from '@/components/onsubmit'
  import datetime from 'vuejs-datetimepicker'

  export default {
    props: ['teamId', 'ideaId', 'customersegmentId', 'personaId', 'valuepropositionId', 'experimentId', 'templateName' ,'edit', 'template'],
    components: {
      'error-flash': ErrorFlash,
      'fields-comp': fieldscomp,
      'fields-compe': fieldscompe,
      'datetime' : datetime,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        data: '',
        show: false,
        err_msg: '',
        error: false,
        success: false,
        obj: {
          name: '',
          date: '',
          experiment_template_id : '',
          data: []
        },
        onSubmit : false
      }
    },
    mounted: function () {
    },
    created: function () {
      if(!this.edit){
        this.getForm()
      }
    },
    methods: {
      getForm: function () {
        auth.getData2(this, '/team/form_template/experiment/' + this.templateName)
                .then(res => {
                  return res.json()
                },error => {
                  console.log(error)
                }).then(data=>{
                  this.data = data.data
                  this.obj.experiment_template_id = this.data.id
                })
      },
      submitData: function (){
        var form = document.getElementById("dynamic-form");
        const data = this.formToJSON(form.elements);
        this.obj.data = data   
        this.sendPostData(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId)
      },
      formToJSON: function(elements){
        /**
         * Checks that an element has a non-empty `name` and `value` property.
         * @param  {Element} element  the element to check
         * @return {Bool}             true if the element is an input, false if not
         */
        const isValidElement = element => {
          return element.name && element.value;
        };
        /**
         * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
         * @param  {Element} element  the element to check
         * @return {Boolean}          true if the value should be added, false if not
         */
        const isValidValue = element => {
          return (!['checkbox', 'radio'].includes(element.type) || element.checked);
        };
        /**
         * Checks if an input is a checkbox, because checkboxes allow multiple values.
         * @param  {Element} element  the element to check
         * @return {Boolean}          true if the element is a checkbox, false if not
         */
        const isCheckbox = element => element.type === 'checkbox';
        /**
         * Checks if an input is a `select` with the `multiple` attribute.
         * @param  {Element} element  the element to check
         * @return {Boolean}          true if the element is a multiselect, false if not
         */
        const isMultiSelect = element => element.options && element.multiple;
        /**
         * Retrieves the selected options from a multi-select as an array.
         * @param  {HTMLOptionsCollection} options  the options for the select
         * @return {Array}                          an array of selected option values
         */
        const getSelectValues = options => [].reduce.call(options, (values, option) => {
          return option.selected ? values.concat(option.value) : values;
        }, []);

        var balik = [].reduce.call(elements, function(data, element){
          if (isValidElement(element) && isValidValue(element)) {
            /*
             * Some fields allow for more than one value, so we need to check if this
             * is one of those fields and, if so, store the values as an array.
             */
            if (isCheckbox(element)) {
              data[element.name] = (data[element.name] || []).concat(element.value);
            } else if (isMultiSelect(element)) {
              data[element.name] = getSelectValues(element);
            } else {
              data[element.name] = element.value;		
            }
          }
//            console.log(data)
            return data;
        }, {});
        var data = []
        for(var key in balik){
          if(balik.hasOwnProperty(key)){
            data.push({field_template_id: key, value: balik[key]})
          }
        }
        return data;
      },
        //OLD CODE      
//      submitData: function () {
//        this.obj = this.obj2
//        for (var x = 0; x < this.data.fields.length; x++) {
//          this.getFormValues(x)
//        }
////      this.sendPostData(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId)
//      },      
//      updateData: function () {
//        for (var x = 0; x < this.template.fields.length; x++) {
//          this.getFormValues(x)
//        }
////      this.sendPutData(this.teamId, this.ideaId, this.customersegmentId, this.personaId, this.valuepropositionId, this.template.id)
//      },      
//      getFormValues: function (index) {
//        var values = $('form[name="' + index + '"]').serializeArray()
//        console.log(values)
//        for (var y = 0; y < values.length; y++) {
//          var data = values[y]
//          var element = new Object()
//          element.field_template_id = data.name
//          element.value = data.value
//          this.obj.data.push(element)
//        }
//      },
      sendPostData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId ) {
        auth.postData(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/experiment', this.obj)
      },
      sendPutData: function (teamId, ideaId, customersegmentId, personaId, valuepropositionId, id ) {
        auth.putData(this, '/team/' + teamId + '/idea/' + ideaId + '/customer_segment/' + customersegmentId + '/persona/' + personaId + '/value_proposition/' + valuepropositionId + '/experiment/' + id, this.obj)
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
    .modal-co {
        width: 519px;
        background-color: #ffffff !important;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2) !important;
        /* width: 100% !important; */
        /* margin: 100px auto; */
        padding: 50px 50px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        margin: 0 auto;
        border-radius: 5px;
    }
    .kotak {
        padding: 6px;
        margin-bottom: 10px;
        border-color: #eaeaea;
        border-style: solid;
        border: 2px solid #eaeaea;
    }
    .calender-div {
        z-index: 999;
    }
  @import '../../modal.css';
</style>