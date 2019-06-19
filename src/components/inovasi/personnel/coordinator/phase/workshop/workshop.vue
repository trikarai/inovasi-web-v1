<script>
  import auth from '@/httpcontrol' 
  import Loading from '@/components/loading'
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../../errorflash'
  import Period from './periodForm'

  export default {
    template:require('./workshop.html'),
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
        phaseId : this.$route.params.phaseId,
        workshopData : '',
        showPublicationSection : false,
        detail : ''
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'period' : Period

    },
    created: function (){
      this.getworkshop()
    },
    computed: {},
    mounted: function (){},
    update: function (){},
    methods: {
      getworkshop: function (){
        auth.getData(this, '/programme/'+this.programmeId+'/phase/' + this.phaseId + '/workshop')
      },
      changePeriod: function (workshopData) {
//        alert(phaseId)
        this.workshopData = workshopData
        this.showForm = true
        this.showPublicationSection = false
      },
      closeModalRefresh: function (){
        this.showForm = false
        this.showPublicationSection = false
        this.getworkshop()
      },
      openDetail: function (data) {
        this.showPublicationSection = true
        this.detail = data
      },
      compiledMarkdown: function (data) {
        return marked(data, { sanitize: true })
      }
    }
  }
  
</script>

<style scoped>
    .hari {
        background: #8bc751;
        color: #fff;
        padding: 3px;
        border-radius: 20px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 11px;
    }
    .tanggal {
        font-style: italic;
        color: #9e9e9e;
        font-size: 11px;
    }
    .waktu {
        color: #8bc751;
        font-weight: 900;   
    }

</style>
