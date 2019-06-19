<template>
  <div>
        <loading v-show="loading"></loading>

    <section class="content">
     
    <!--<error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>-->
        
<!-- Chat box -->
    <div class="row">
        <div class="col-md-8">
          <div class="box">
              
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">Feedback Persona</h3>

            </div>
            
            <div class="box-body chat" id="chat-box">
            <div v-show="!loadPs">
            <div v-if="psComments.total > 0">
              <!-- chat item -->
              <div class="item" v-for="data in psComments.list">
<!--                <img src="dist/img/user4-128x128.jpg" alt="user image" class="online">-->
                    <i class="fa fa-user" style="font-size: 25px;padding: 12px;"></i>
                <p class="message">
                  <a href="#" class="name">
                    <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> {{data.submitTime | moment("DD MMM YY - hh:mm a")}} | <router-link style="font-size: 9px" class="btn btn-info btn-sm" :to="'/team/'+ teamId + '/idea/'+ data.persona.customer_segment.idea.id + '/cs/' + data.persona.customer_segment.id + '/persona/' + data.persona.id + '/vp'"><i class="fa fa-asterisk"></i> Detail</router-link></small>  
                        <template v-if="data.writer.hasOwnProperty('personnel')">
                          {{data.writer.personnel.name}}
                        </template>
                        <template v-else>
                          {{data.writer.talent.name}}
                        </template>
                  </a>
                  <span style="font-size: 11px;color: #929292;"><b>Idea :</b> {{data.persona.customer_segment.idea.name}} <br> <b>Customer segment :</b> {{data.persona.customer_segment.name}} | <b>Persona Name :</b> {{data.persona.name}}</span><br>
                  <span style="top: 0px;position: relative;">
                    <template v-if="data.hasOwnProperty('parent')">
                      <i class="direct-chat-text" style="margin: 3px 0px 0px 0px !important;display: inline-block">{{data.parent.content}}</i>
                    </template>
                    <template style="display: none !important" v-else></template>  
                      <br>
                    <span>{{data.content}}</span>
                  </span>
                </p>
<!--
                <div class="attachment">
                  <h4>Attachments:</h4>

                  <p class="filename">
                    Theme-thumbnail-image.jpg
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
                  </div>
                </div>
-->
                <!-- /.attachment -->
              </div>
            </div>
                <div v-else>
                    No Comments for Persona
                </div>
            </div>
                <onsub v-show="loadPs"></onsub>
            </div>
            <!-- /.chat -->
            <div class="box-footer"></div>
          </div>
        </div>
      </div>
<!-- /.box (chat box) -->
        

<!-- Chat box -->
    <div class="row">
        <div class="col-md-8">
          <div class="box">
              
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">Feedback Business Structure</h3>

            </div>
            
            <div class="box-body chat" id="chat-box2">
            <div v-show="!loadBs">
            <div v-if="bsComments.total > 0">
              <!-- chat item -->
              <div class="item" v-for="data in bsComments.list">
<!--                <img src="dist/img/user4-128x128.jpg" alt="user image" class="online">-->
                    <i class="fa fa-user" style="font-size: 25px;padding: 12px;"></i>
                <p class="message">
                  <a href="#" class="name">
                    <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> {{data.submitTime | moment("DD MMM YY - hh:mm a")}} | <router-link style="font-size: 9px" class="btn btn-info btn-sm" :to="'/team/'+ teamId + '/idea/'+ data.business_structure.value_proposition.persona.customer_segment.idea.id + '/cs/' + data.business_structure.value_proposition.persona.customer_segment.id + '/persona/'+ data.business_structure.value_proposition.persona.id  +'/vp/'+ data.business_structure.value_proposition.id  +'/businessstructure'"><i class="fa fa-asterisk"></i> Detail</router-link></small>  
                        <template v-if="data.writer.hasOwnProperty('personnel')">
                          {{data.writer.personnel.name}}
                        </template>
                        <template v-else>
                          {{data.writer.talent.name}}
                        </template>
                  </a>
                  <span style="font-size: 11px;color: #929292;"><b>Idea :</b> {{data.business_structure.value_proposition.persona.customer_segment.idea.name}} <br> <b>Customer segment :</b> {{data.business_structure.value_proposition.persona.customer_segment.name}} | <b>Persona Name :</b> {{data.business_structure.value_proposition.persona.name}} <br> <b>Business Structure :</b> {{data.business_structure.business_structure_template.name}}</span><br>
                  <span style="top: 0px;position: relative;">
                    <template v-if="data.hasOwnProperty('parent')">
                      <i class="direct-chat-text" style="margin: 3px 0px 0px 0px !important;display: inline-block">{{data.parent.content}}</i>
                    </template>
                    <template style="display: none !important" v-else></template>  
                      <br>
                    <span>{{data.content}}</span>
                  </span>
                </p>
<!--
                <div class="attachment">
                  <h4>Attachments:</h4>

                  <p class="filename">
                    Theme-thumbnail-image.jpg
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
                  </div>
                </div>
-->
                <!-- /.attachment -->
              </div>
            </div>
                <div v-else>
                    No Comments for Business Structure
                </div>
            </div>
                <onsub v-show="loadBs"></onsub>
            </div>
            <!-- /.chat -->
            <div class="box-footer"></div>
          </div>
        </div>
      </div>
<!-- /.box (chat box) -->
        

<!-- Chat box -->
    <div class="row">
        <div class="col-md-8">
          <div class="box">
              
            <div class="box-header">
              <i class="fa fa-comments-o"></i>

              <h3 class="box-title">Feedback Experiment</h3>

            </div>
            
            <div class="box-body chat" id="chat-box3">
            <div v-show="!loadExp">
            <div v-if="expComments.total > 0">
              <!-- chat item -->
              <div class="item" v-for="data in expComments.list">
<!--                <img src="dist/img/user4-128x128.jpg" alt="user image" class="online">-->
                    <i class="fa fa-user" style="font-size: 25px;padding: 12px;"></i>
                <p class="message">
                  <a href="#" class="name">
                    <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> {{data.submitTime | moment("DD MMM YY - hh:mm a")}} | <router-link style="font-size: 9px" class="btn btn-info btn-sm" :to="'/team/'+ teamId + '/idea/'+ data.experiment.value_proposition.persona.customer_segment.idea.id + '/cs/' + data.experiment.value_proposition.persona.customer_segment.id + '/persona/'+ data.experiment.value_proposition.persona.id  +'/vp/'+ data.experiment.value_proposition.id  +'/experiment/' + data.experiment.id"><i class="fa fa-asterisk"></i> Detail</router-link></small>  
                        <template v-if="data.writer.hasOwnProperty('personnel')">
                          {{data.writer.personnel.name}}
                        </template>
                        <template v-else>
                          {{data.writer.talent.name}}
                        </template>
                  </a>
                  <span style="font-size: 11px;color: #929292;"><b>Idea :</b> {{data.experiment.value_proposition.persona.customer_segment.idea.name}} <br> <b>Customer segment :</b> {{data.experiment.value_proposition.persona.customer_segment.name}} | <b>Persona Name :</b> {{data.experiment.value_proposition.persona.name}} <br> <b>Experiment :</b> {{data.experiment.name}}</span><br>
                  <span style="top: 0px;position: relative;">
                    <template v-if="data.hasOwnProperty('parent')">
                      <i class="direct-chat-text" style="margin: 3px 0px 0px 0px !important;display: inline-block">{{data.parent.content}}</i>
                    </template>
                    <template style="display: none !important" v-else></template>  
                      <br>
                    <span>{{data.content}}</span>
                  </span>
                </p>
<!--
                <div class="attachment">
                  <h4>Attachments:</h4>

                  <p class="filename">
                    Theme-thumbnail-image.jpg
                  </p>

                  <div class="pull-right">
                    <button type="button" class="btn btn-primary btn-sm btn-flat">Open</button>
                  </div>
                </div>
-->
                <!-- /.attachment -->
              </div>
            </div>
                <div v-else>
                    No Comments for Experiment
                </div>
            </div>
                <onsub v-show="loadExp"></onsub>
            </div>
            <!-- /.chat -->
            <div class="box-footer"></div>
          </div>
        </div>
      </div>
<!-- /.box (chat box) -->
        
    
        
    
            
<!--
    <div class="box">
      <div class="box-body">

        <div v-show="!loadPs">
                    
          <div v-if="psComments.total > 0">

            <table class="table">
              <thead>
                <tr>
                  <th>Idea</th>
                  <th>Customer Segment</th>
                  <th>Persona's Name</th>
                  <th>Content</th>
                  <th>Writer</th>
                  <th></th>
                </tr>  
              </thead>
              <tbody>
                <tr v-for="data in psComments.list">
                  <td>{{data.persona.customer_segment.idea.name}}</td>
                  <td>{{data.persona.customer_segment.name}}</td>
                  <td>{{data.persona.name}}</td>
                  <td>
                    <template v-if="data.hasOwnProperty('parent')">
                      <i style="background-color: lightgrey">{{data.parent.content}}</i>
                    </template>
                    {{data.content}}
                  </td>
                  <td>
                    <template v-if="data.writer.hasOwnProperty('personnel')">
                      {{data.writer.personnel.name}}
                    </template>
                    <template v-else>
                      {{data.writer.talent.name}}
                    </template>
                  </td>
                  <td><router-link class="btn btn-info btn-sm" :to="'/team/'+ teamId + '/idea/'+ data.persona.customer_segment.idea.id + '/cs/' + data.persona.customer_segment.id + '/persona/' + data.persona.id + '/vp'"><i class="fa fa-asterisk"></i> Detail</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            No Comments for Persona
          </div>
        </div>
        <onsub v-show="loadPs"></onsub>
      </div>  
    </div>      
-->
    
<!--
    <div class="box">
      <div class="box-body">

        <div v-show="!loadBs">
          <div v-if="bsComments.total > 0">
            <table class="table">
              <thead>
                <tr>
                  <th>Idea</th>
                  <th>Customer Segment</th>
                  <th>Persona's Name</th>
                  <th>Value Proposition</th>
                  <th>Business Structure's Name</th>
                  <th>Content</th>
                  <th>Writer</th>
                  <th></th>
                </tr>  
              </thead>
              <tbody>
                <tr v-for="data in bsComments.list">
                  <td>{{data.business_structure.value_proposition.persona.customer_segment.idea.name}}</td>
                  <td>{{data.business_structure.value_proposition.persona.customer_segment.name}}</td>
                  <td>{{data.business_structure.value_proposition.persona.name}}</td>
                  <td>{{data.business_structure.value_proposition.description}}</td>
                  <td>{{data.business_structure.business_structure_template.name}}</td>
                  <td>
                    <template v-if="data.hasOwnProperty('parent')">
                      <i style="background-color: lightgrey">{{data.parent.content}}</i>
                    </template>
                    {{data.content}}
                  </td>
                  <td>
                    <template v-if="data.writer.hasOwnProperty('personnel')">
                      {{data.writer.personnel.name}}
                    </template>
                    <template v-else>
                      {{data.writer.talent.name}}
                    </template>
                  </td>  
                  <td><router-link class="btn btn-info btn-sm" :to="'/team/'+ teamId + '/idea/'+ data.business_structure.value_proposition.persona.customer_segment.idea.id + '/cs/' + data.business_structure.value_proposition.persona.customer_segment.id + '/persona/'+ data.business_structure.value_proposition.persona.id  +'/vp/'+ data.business_structure.value_proposition.id  +'/businessstructure'"><i class="fa fa-asterisk"></i> Detail</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            No Comments for Business Structure
          </div>
        </div>
        <onsub v-show="loadBs"></onsub>
                
      </div>  
    </div>      
-->
    
<!--
    <div class="box">
      <div class="box-body">

        <div v-show="!loadExp">
          <div v-if="expComments.total > 0">
            <table class="table">
              <thead>
                <tr>
                  <th>Idea</th>
                  <th>Customer Segment</th>
                  <th>Persona's Name</th>
                  <th>Value Proposition</th>
                  <th>Experiment's Name</th>
                  <th>Content</th>
                  <th>Writer</th>
                  <th></th>
                </tr>  
              </thead>
              <tbody>
                <tr v-for="data in expComments.list">
                  <td>{{data.experiment.value_proposition.persona.customer_segment.idea.name}}</td>
                  <td>{{data.experiment.value_proposition.persona.customer_segment.name}}</td>
                  <td>{{data.experiment.value_proposition.persona.name}}</td>
                  <td>{{data.experiment.value_proposition.description}}</td>
                  <td>{{data.experiment.name}}</td>
                  <td>
                    <template v-if="data.hasOwnProperty('parent')">
                      <i style="background-color: lightgrey">{{data.parent.content}}</i>
                    </template>
                    {{data.content}}
                  </td>
                  <td>
                    <template v-if="data.writer.hasOwnProperty('personnel')">
                      {{data.writer.personnel.name}}
                    </template>
                    <template v-else>
                      {{data.writer.talent.name}}
                    </template>
                  </td>
                  <td><router-link class="btn btn-info btn-sm" :to="'/team/'+ teamId + '/idea/'+ data.experiment.value_proposition.persona.customer_segment.idea.id + '/cs/' + data.experiment.value_proposition.persona.customer_segment.id + '/persona/'+ data.experiment.value_proposition.persona.id  +'/vp/'+ data.experiment.value_proposition.id  +'/experiment/' + data.experiment.id"><i class="fa fa-asterisk"></i> Detail</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            No Comments for Experiment
          </div>
        </div>
        <onsub v-show="loadExp"></onsub>      
      </div>  
    </div>      
-->
        
        
    </section>
    

    
  </div>
</template>  



<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import Loading from '@/components/loading'
  import onSubmit from '@/components/onsubmit'

  export default {
    data: function () {
      return {
        data: {total:0, list:[]},
        psComments: {total:0, list:[]},
        loadPs : false,
        bsComments: {total:0, list:[]},
        loadBS : false,        
        expComments: {total:0, list:[]},
        loadExp : false,        
        err_msg: '',
        success: false,
        error: false,
        teamId: this.$route.params.teamId,
        page: {
          page: 1,
          size: 5
        },
        status : '',
        loading : false
      }
    },
    computed: {
      pageTotal: function () {
        //return Math.ceil(this.data.total / this.page.size)
      }
    },
    watch: {
      // call again the method if the route changes
      '$route': 'getData'
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'onsub' : onSubmit
    },
    created: function () {
      this.getData()
    },
    updated: function () {
      $('#chat-box').bind('mousewheel DOMMouseScroll', function(e) {
            var scrollTo = null;

            if (e.type == 'mousewheel') {
                scrollTo = (e.originalEvent.wheelDelta * -1);
            }
            else if (e.type == 'DOMMouseScroll') {
                scrollTo = 40 * e.originalEvent.detail;
            }

            if (scrollTo) {
                e.preventDefault();
                $(this).scrollTop(scrollTo + $(this).scrollTop());
            }
        });  

      //SLIMSCROLL FOR CHAT WIDGET
      $('#chat-box').slimScroll({
        height: '250px'
      });
      $('#chat-box2').bind('mousewheel DOMMouseScroll', function(e) {
            var scrollTo = null;

            if (e.type == 'mousewheel') {
                scrollTo = (e.originalEvent.wheelDelta * -1);
            }
            else if (e.type == 'DOMMouseScroll') {
                scrollTo = 40 * e.originalEvent.detail;
            }

            if (scrollTo) {
                e.preventDefault();
                $(this).scrollTop(scrollTo + $(this).scrollTop());
            }
        });  

      //SLIMSCROLL FOR CHAT WIDGET
      $('#chat-box2').slimScroll({
        height: '250px'
      });
        
      $('#chat-box3').bind('mousewheel DOMMouseScroll', function(e) {
            var scrollTo = null;

            if (e.type == 'mousewheel') {
                scrollTo = (e.originalEvent.wheelDelta * -1);
            }
            else if (e.type == 'DOMMouseScroll') {
                scrollTo = 40 * e.originalEvent.detail;
            }

            if (scrollTo) {
                e.preventDefault();
                $(this).scrollTop(scrollTo + $(this).scrollTop());
            }
        });  

      //SLIMSCROLL FOR CHAT WIDGET
      $('#chat-box3').slimScroll({
        height: '250px'
      });

      
    },
    methods: {
      getData: function (){
        this.getPersonaComment();
        this.getBusinessComment();
        this.getExperimentComment();
      },
      getPersonaComment: function (){
        this.loadPs = true;
        auth.getData2(this, '/team_member/team/' + this.$route.params.teamId +'/comment_dashboard/persona')
                .then(res=>{
                  if(res.status === 204){
                  this.psComments = {total: 0, list: []}
                  }else{
                  this.psComments = res.body.data
                  }
                  this.loadPs = false;
                }, error=>{
                  console.log(error);
//                  alertControl.showError(this, error.body.meta)
                })
//                        .then(data=>{
//                  if(data === undefined){
//                    
//                  }else{
//                    this.psComments = data.data;
//                    this.loadPs = false;
//                  }
////                   this.getBusinessComment();
//                })
      },
      getBusinessComment: function (){
        this.loadBs = true;
        auth.getData2(this, '/team_member/team/' + this.$route.params.teamId +'/comment_dashboard/business_structure')
                .then(res=>{
                  if(res.status === 204){
                    this.bsComments = {total: 0, list: []}
                  }else{
                    this.bsComments = res.body.data
                  }
                  this.loadBs = false;
                }, error=>{
                  console.log(error);
//                  alertControl.showError(this, error.body.meta)
                })
//                        .then(data=>{
//                  if(data === undefined){
//                    
//                  }else{
//                    this.bsComments = data.data;
//                    this.loadBs = false;
////                  this.getExperimentComment();
//                  }
//                })
      },
      getExperimentComment: function (){
        this.loadExp = true;
        auth.getData2(this, '/team_member/team/' + this.$route.params.teamId +'/comment_dashboard/experiment')
                .then(res=>{
                  if(res.status === 204){
                    this.expComments = {total: 0, list: []}
                  }else{
                    this.expComments = res.body.data
                  }
                  this.loadExp = false;
                }, error=>{
                  console.log(error);
//                  alertControl.showError(this, error.body.meta)
                  this.loadExp = false;
                })
//                        .then(data=>{
//                  if(data === undefined){
//                    
//                  }else{
//                    this.expComments = data.data;
//                    this.loadExp = false;
//                  }
//                })
      }
    }
  } 
</script>  