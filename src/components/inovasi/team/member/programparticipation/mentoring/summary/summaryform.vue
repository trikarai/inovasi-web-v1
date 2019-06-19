<template>

  <transition name="modal">

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>

          <div class="modal-body">
            <h2>Participant Summary</h2>
            <div class="garis"></div>

            <div class="ui form">                
              <div class="field">  
                <div>                    

                  <div id="dynamicform">
                    <div>
                      <form id="dynamic-form" :name="1">
                        <div v-for="field, index in data.fields">
                          <fields-comp v-bind:fields="field"></fields-comp>
                          <!--{{field}}-->
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label style="padding: 6px">Rating</label>
                          </div>
                          <div class="col-md-6">
                            <div style="padding: 6px" class="rating">
                              <span><input v-model="obj.rating" type="radio" name="score" id="str5" :value="5"><label for="str5"></label></span>
                              <span><input v-model="obj.rating" type="radio" name="score" id="str4" :value="4"><label for="str4"></label></span>
                              <span><input v-model="obj.rating" type="radio" name="score" id="str3" :value="3"><label for="str3"></label></span>
                              <span><input v-model="obj.rating" type="radio" name="score" id="str2" :value="2"><label for="str2"></label></span>
                              <span><input v-model="obj.rating" type="radio" name="score" id="str1" :value="1"><label for="str1"></label></span>
                            </div>
                          </div>
                        </div>
                        
                      </form>
                    </div>
                  </div>
                  <div v-show="!onSubmit">
                      <button v-if="!edit" class="btn btn-default" @click.prevent="submitData()">Submit</button>
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
  import ErrorFlash from '../../../../../errorflash'
  import fieldscomp from '@/components/field/fields'
  import alertControl from '@/alertcontrol'
  import onSubmit from '@/components/onsubmit'

  export default {
    props: ['formId', 'edit', 'sessionId'],
    components: {
      'error-flash': ErrorFlash,
      'fields-comp': fieldscomp,
      'onsub' : onSubmit
    },
    data: function () {
      return {
        show: false,
        err_msg: '',
        error: false,
        success: false,
        data: '',
        onSubmit: false,
        obj: {
          rating : '',
          data: []
        }
      }
    },
    created: function () {
      this.getForm(this.formId)
    },
    mounted: function () {
      $(".rating input:radio").attr("checked", false);
        $('.rating input').click(function () {
            $(".rating span").removeClass('checked');
            $(this).parent().addClass('checked');
        });
    },
    methods: {
      getForm: function (id) {
        auth.getData(this, '/team/form_template/'+ id)
      },
      submitData: function (){
        var form = document.getElementById("dynamic-form");
        const data = this.formToJSON(form.elements);
        this.obj.data = data
        this.sendPostData(this.$route.params.teamId, this.$route.params.programmeparticipationId, this.sessionId)
      },  
      sendPostData: function (teamId, programmeId, sessionId ) {
        this.onSubmit = true
        auth.postData2(this, '/team/'+ teamId +'/programme_participation/'+programmeId+'/mentoring_session/'+ sessionId, this.obj)
                .then(res=>{
                  console.log(res)
                  this.$emit('closeModalRefresh')
                }, error => {
                  console.log(error)
                  this.onSubmit = false
                  alertControl.showError(this, error.body.meta)
                })
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
      }
    }
  }
</script>  
<style lang="css" scoped>
      .rating {
        float:left;
        width:200px;
    }
    .rating span { float:right; position:relative; }
    .rating span input {
        position:absolute;
        top:0px;
        left:0px;
        opacity:0;
    }
    .rating span label {
        display:inline-block;
        width:30px;
        height:30px;
        text-align:center;
        color:#FFF;
        background-image:url("/img/star_off.png");
        font-size:30px;
        margin-right:2px;
        line-height:30px;
        border-radius:50%;
        -webkit-border-radius:50%;
    }
    .rating span:hover ~ span label,
    .rating span:hover label,
    .rating span.checked label,
    .rating span.checked ~ span label {
        background-image:url("/img/star_on.png");
        color:#FFF;
    }
@import '../modal.css';
</style>