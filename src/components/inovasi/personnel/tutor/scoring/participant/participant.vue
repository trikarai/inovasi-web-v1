<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import ScoringForm from './scoringForm'
  
  export default {
    template:require('./participant.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        success : false,
        error : false,
        err_msg: '',
        tutorId: this.$route.params.tutorId,
        programmeId : this.$route.params.programmeId,
        scoringId : this.$route.params.scoringId,
        phaseId : this.$route.params.phaseId,
        templateId : this.$route.params.templateId,
        participantId : '',
        loading : false,
        onSubmit : false,
        showScoringForm : false,
        page: {
          page: 1,
          size: 5
        }
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'scoring-form' : ScoringForm
    },
    created: function (){
      this.getParticipant()
    },
    computed: {},
    mounted: function (){},
    update: function (){},
    methods: {
      getParticipant: function (){
        auth.getData(this, '/programme/'+this.$route.params.programmeId+'/participant')
      },
      addScore: function (id){
        this.showScoringForm = true
        this.participantId = id
      },
      closeModalRefresh: function (){
        this.showScoringForm = false
      }
    }
  }
  
</script>
