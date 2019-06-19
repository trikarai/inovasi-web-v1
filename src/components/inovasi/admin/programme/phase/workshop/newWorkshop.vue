<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import Loading from '@/components/loading'
  import datetime from 'vuejs-datetimepicker'

  
  export default {
    template:require('./workshop.html'),
    data: function () {
      return {
        err_msg: '',
        success: false,
        error: false,
        showForm: false,
        showPublicationSection: false,
        edit: false,
        programmeId : this.$route.params.programmeId,
        phaseId : this.$route.params.phaseId,
        data: {
          name: '',
          description: '',
          publication: '',
          registration_start_time: '',
          registration_end_time: '',
          start_time: '',
          end_time: '',
          cancel_hour_window: '',
          max_seat: '',
          max_seat_for_team: ''
        },
        loading : false
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'datetime' : datetime
    },
    computed: {
    },
    created: function () {
    },
    methods: {
      submit: function () {
        this.loading = true
        auth.postData2(this, '/programme/'+ this.programmeId +'/phase/'+ this.phaseId +'/workshop', this.data)
                .then(res => {
                  console.log(res)
                  if(res.status === 201){
                    this.loading = false
                    this.$route.go(-1)
                  }else{
                    this.loading = false
                    this.$route.go(-1)
                  }
                  this.$route.go(-1)
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.loading = false
                })
      }
    }
  } 
</script>  