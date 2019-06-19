<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import Period from './periodForm'
  
  export default {
    template:require('./phase.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        summaryData : [],
        success : false,
        error : false,
        err_msg: '',
        loading : false,
        onSubmit : false,
        showForm : false,
        page: {
          page: 1,
          size: 5
        },
        programmeId : this.$route.params.programmeId,
        phaseData : '',
        showSummarySection : false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'period' : Period
    },
    created: function (){
      this.getPhase()
    },
    computed: {},
    mounted: function (){},
    update: function (){},
    methods: {
      getPhase: function (){
        auth.getData(this, '/programme/'+this.$route.params.programmeId+'/phase')
      },
      changePeriod: function (phaseData) {
//        alert(phaseId)
        this.phaseData = phaseData
        this.showForm = true
        this.showSummarySection = false
      },
      closeModalRefresh: function (){
        this.showForm = false
        this.showSummarySection = false
        this.getPhase()
      },
      summary: function (id){
        this.loading = true
        this.showSummarySection = false
        this.summaryData = []
        auth.getData2(this, '/programme/'+this.programmeId+'/phase/' + id + '/score_summary')
                .then(res=>{
                  if(res.status === 204){
                    this.summaryData = []
                    this.showSummarySection = true
                    this.loading = false
                  }else{
                    return res.json()
                  }
                },error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                }).then(data=>{
                  this.summaryData = data.data
                  this.showSummarySection = true
                  this.loading = false
                })
      }
    }
  }
  
</script>
