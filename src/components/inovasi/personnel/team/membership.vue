
<script>
import * as CONFIG from '@/app.config.js'
import auth from '@/httpcontrol'
import alertControl from '@/alertcontrol'
import ErrorFlash from '@/components/inovasi/errorflash'
import Loading from '@/components/loading'

export default {
    template:require('./membership.html'),
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading
    },
    data: function () {
      return {
        data: '',
        dataTeam: '',
        err_msg: '',
        success: false,
        error: false,
        teamId: this.$route.params.teamId,
        errors: [],
        loading : false,
        dataUser : '',
        showForm : false,
        edit : true
      }
    },
    created: function () {
      this.getMembership()
//      this.getTeam(this.$route.params.teamId)
    },
    methods: {
      getTeam: function (teamId) {
        this.loading = true
        this.$http.get(CONFIG.APIENDPOINT + '/talent/team/membership/' + teamId, {headers: auth.getAuthHeader()})
                .then(response =>{
                  return response.json()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                }).then(data => {
                  this.dataTeam = data.data
                  this.getMembership()
                })
      },
      getMembership: function () {
        this.loading = true
        auth.getData2(this, '/team/'+ this.$route.params.teamId + '/member')
                .then(res=>{
                  console.log(res)
                  return res.json()
                }, error=>{
                  console.log(error)
                  this.loading = false
                  alertControl.showError(this, error.body.meta)
                }).then(data=>{
                  this.data = data.data
                  this.dataUser = auth.getAuthData()
                  this.loading = false
                })
      },
      expellTalent: function (id) {
        this.$http.put(CONFIG.APIENDPOINT + '/team/'+ this.$route.params.membershipId +'/member/'+ id + '/expell', {headers: auth.getAuthHeader()})
                .then(response =>{
                   console.log(response)
                   this.closeModalRefresh()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      cancelTalent: function (id) {
        this.$http.put(CONFIG.APIENDPOINT + '/team/'+ this.$route.params.membershipId +'/member/'+ id + '/cancel_invitation', {headers: auth.getAuthHeader()})
                .then(response =>{
                   console.log(response)
                   this.closeModalRefresh()
                }, error => {
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                })
      },
      closeModalRefresh: function () {
        this.showForm = false
        this.getTeam(this.$route.params.teamId)
      },
      editTeam: function() {
        this.showForm = true
      }
    }      
}

</script>

<style>
    .statusp {
        background: #8bc751;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    .statuse {
        background: red !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    .admtimico {
        top: 2px;
        float: right;
        background: #8bc751;
        padding: 0px 5px 0px 5px;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        position: relative;
    }

</style>