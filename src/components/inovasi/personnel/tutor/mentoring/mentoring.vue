<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import Offer from './offer'
  import Reject from './reject'
  import SummaryDetail from './summaryDetail'
  import SummaryForm from './summaryForm'
  
  export default {
    template:require('./mentoring.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        success : false,
        error : false,
        err_msg: '',
        loading : false,
        onSubmit : false,
        page: {
          page: 1,
          size: 5
        },
        showForm : false,
        sessionId : '',
        tutorId : this.$route.params.tutorId,
        summary : '',
        showSummary : false,
        showSummaryForm : false,
        showRejectForm : false,
        formId : '',
        time : '',
        type : '',
        freetext : ''  
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'summaryd': SummaryDetail,
      'summaryf': SummaryForm,
      'offer': Offer,
      'reject': Reject
    },
    created: function (){
      this.getMentoring()
    },
    computed: {
        extractMedia: function () {
            return this.data.list.map(function(item) {
              return item.media.substr(0, item.media.indexOf(" ")).trim();
            });
          },
        extractMedia2: function () {
            return this.data.list.map(function(item) {
              return item.media.substr(item.media.indexOf(" ") + 1);
            });
          } 
    },
    mounted: function (){},
    update: function (){},
    methods: {
      getMentoring: function (){
        auth.getData(this, '/tutor/'+ this.tutorId +'/mentoring_session')
      },
      approve: function (sessionId){
        this.loading = true
        auth.putData2(this, '/tutor/'+ this.tutorId +'/mentoring_session/' + sessionId + '/approve')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getMentoring()
                }, error=>{
                  console.log(error)
                  alertControl.showError(error.body.meta)
                  this.loading = false
                })
      },
      reject : function (sessionId){
        this.sessionId = sessionId
        this.showRejectForm = true
      },
//      reject: function (sessionId){
//        this.loading = true
//        auth.putData2(this, '/tutor/'+ this.tutorId +'/mentoring_session/' + sessionId + '/reject')
//                .then(res=>{
//                  console.log(res)
//                  this.loading = false
//                  this.getMentoring()
//                }, error=>{
//                  console.log(error)
//                  alertControl.showError(error.body.meta)
//                  this.loading = false
//                })
//      },
      offer: function (sessionId, time, type, freetext){
        this.sessionId = sessionId
        this.showForm = true
        this.time = time
        this.type = type
        this.freetext = freetext
      },
      closeModalRefresh: function (){
        this.showForm = false
        this.sessionid = false
        this.showSummaryForm = false
        this.showSummary = false
        this.getMentoring()
      },
      viewSummary: function (data){
        this.summary = data
        this.showSummary = true
      },
      addSummary: function (id, sessionId){
        this.formId = id
        this.showSummaryForm = true
        this.sessionId = sessionId
      }
    }
  }
  
</script>

<style scoped>
    .statustpm {
        background: #8bc751;
        display: inline-block;
        padding: 3px;
        color: #fff;
        font-size: 11px;
        padding-left: 11px;
        padding-right: 11px;
        border-radius: 20px;
    }
    .statuscanceled {
        background: red !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    .statusproposed {
        background: blue !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    .statusgraduated {
        background: #525252 !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    .schedulem {
        white-space: pre-line;
        background: #f9f6f6;
        color: #4c4c4c;
        padding: 10px;
        border: 1px solid #c7c7c7;
        font-family: sans-serif;
    }
    .setar {
        width: 16px;
        position: relative;
        bottom: 1px;
    }
</style>
