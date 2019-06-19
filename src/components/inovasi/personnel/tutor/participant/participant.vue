<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  
  export default {
    template:require('./participant.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        success : false,
        error : false,
        err_msg: '',
        tutorId: this.$route.params.tutorId,
        loading : false,
        onSubmit : false,
        page: {
          page: 1,
          size: 5
        }
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
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
      accept: function (id){
        this.loading = true
        auth.putData2(this,'/programme/'+this.$route.params.programmeId+'/participant/' + id + '/accept')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getParticipant()
                }, error=>{
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      pass: function (id){
        this.loading = true
        auth.putData2(this,'/programme/'+this.$route.params.programmeId+'/participant/' + id + '/pass')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getParticipant()
                }, error=>{
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      fail: function (id){
        this.loading = true
        auth.putData2(this,'/programme/'+this.$route.params.programmeId+'/participant/' + id + '/fail')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getParticipant()
                }, error=>{
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      reject: function (id){
        this.loading = true
        auth.putData2(this,'/programme/'+this.$route.params.programmeId+'/participant/' + id + '/reject')
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getParticipant()
                }, error=>{
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      }
    }
  }
  
</script>
