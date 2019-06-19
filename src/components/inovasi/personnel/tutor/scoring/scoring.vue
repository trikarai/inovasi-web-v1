<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  
  export default {
    template:require('./scoring.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        success : false,
        error : false,
        err_msg: '',
        loading : false,
        onSubmit : false,
        programmeId : this.$route.params.programmeId,
        tutorId : this.$route.params.tutorId,
        phaseId : this.$route.params.phaseId,
        page: {
          page: 1,
          size: 5
        }
      }
    },
    components: {
      'error-flash': ErrorFlash,
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
        auth.getData(this, '/tutor/'+this.$route.params.tutorId+'/programme/' + this.$route.params.programmeId + '/phase/' + this.$route.params.phaseId + '/scoring')
      }
    }
  }
  
</script>
