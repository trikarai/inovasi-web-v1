<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import ScoreDetail from './scoreDetail'
  import ScoreForm from './scoreForm'
  
  export default {
    template:require('./score.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        success : false,
        error : false,
        err_msg: '',
        loading : false,
        onSubmit : false,
        tutorId : this.$route.params.tutorId,
        sessionId : this.$route.params.sessionId,
        programmeId : this.$route.params.programmeId,
        phaseId : this.$route.params.phaseId,
        participantId : '',
        scoringId : '',
        page: {
          page: 1,
          size: 5
        },
        showDetail : false,
        scoreDetail : '',
        showForm : false,
        formId : ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'score': ScoreDetail,
      'scoref': ScoreForm,
      'loading': Loading
    },
    created: function (){
      this.getScoring()
    },
    computed: {},
    mounted: function (){},
    update: function (){},
    methods: {
      getScoring: function (){
        auth.getData(this, '/tutor/' + this.$route.params.tutorId + '/score')
      },
      deleteScore: function (id){
        this.loading = true
        auth.deleteData2(this, '/tutor/' + this.$route.params.tutorId + '/score/'+ id)
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getScoring()
                },error=>{
                  alertControl.showError(error.body.meta)
                  this.loading = false
                })
      },
      viewScore: function (data){
        this.showDetail = true
        this.scoreDetail = data
      },
      addScore: function (id,participantId, scoringId){
        this.showForm = true
        this.formId = id
        this.participantId = participantId
        this.scoringId = scoringId
      },
      closeModalRefresh: function (){
        this.showForm = false
        this.getScoring()
      }
    }
  }
  
</script>
