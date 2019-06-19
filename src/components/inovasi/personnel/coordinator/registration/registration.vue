<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import RegistrationForm from './registrationForm'
  
  export default {
    template:require('./registration.html'),
    data: function () {
      return {
        data : {total:0,list:[]},
        success : false,
        error : false,
        err_msg: '',
        showForm : false,
        loading : false,
        onSubmit : false,
        programmeId : this.$route.params.programmeId,
        page: {
          page: 1,
          size: 5
        }
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'registration': RegistrationForm
    },
    created: function (){
      this.getRegistration()
    },
    computed: {},
    mounted: function (){},
    update: function (){},
    methods: {
      getRegistration: function (){
        auth.getData(this, '/programme/'+this.$route.params.programmeId+'/registration')
      },
      deleteReg: function (id){
        this.loading = true
        auth.deleteData2(this,'/programme/'+this.$route.params.programmeId+'/registration/' + id)
                .then(res=>{
                  console.log(res)
                  this.loading = false
                  this.getRegistration()
                }, error=>{
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                })
      },
      newReg: function (){
        this.showForm = true
      },
      closeModalRefresh: function (){
        this.showForm = false
        this.getRegistration()
      }
    }
  }
  
</script>
