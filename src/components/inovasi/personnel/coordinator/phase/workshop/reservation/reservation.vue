<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../../errorflash'
  import Detail from './detail'

  export default {
    template:require('./reservation.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        detail : '',
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
        phaseId : this.$route.params.phaseId,
        workshopId : this.$route.params.workshopId
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'detail' : Detail
    },
    created: function (){
      this.getreservation()
    },
    computed: {},
    mounted: function (){},
    update: function (){},
    methods: {
      getreservation: function (){
        auth.getData(this, '/programme/'+this.programmeId+'/phase/' + this.phaseId + '/workshop/' + this.workshopId + '/reservation?status[]=reserved&status[]=cancelled')
      },
      openDetail: function (data){
        this.detail = data
        this.showForm = true
      },
      closeModalRefresh: function (){
        this.showForm = false
        this.getreservation()
      },
      checkIn: function (id){
        this.loading = true
        auth.putData2(this, '/programme/'+this.programmeId+'/phase/' + this.phaseId + '/workshop/' + this.workshopId + '/reservation/' + id + '/check_in')
                .then(res=>{
                  console.log(res)
                  this.closeModalRefresh()
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      },
      checkOut: function (id){
        this.loading = true
        auth.putData2(this, '/programme/'+this.programmeId+'/phase/' + this.phaseId + '/workshop/' + this.workshopId + '/reservation/' + id + '/check_out')
                .then(res=>{
                  console.log(res)
                  this.closeModalRefresh()
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      }
    }
  }
  
</script>
