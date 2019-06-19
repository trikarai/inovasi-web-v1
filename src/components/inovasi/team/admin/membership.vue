
<script>
import * as CONFIG from '@/app.config.js'
import auth from '@/httpcontrol'
import alertControl from '@/alertcontrol'
import ErrorFlash from '@/components/inovasi/errorflash'
import VueRouter from 'vue-router';
import Loading from '@/components/loading'
import EditTeam from './editteam'
import OnDelete from '@/components/ondelete'

export default {
    template:require('./membership.html'),
//    name: 'Team_Manage',
    components: {
      'error-flash': ErrorFlash,
      'edit-team': EditTeam,
      'loading': Loading,
      'ondelete': OnDelete
    },
    data: function () {
      return {
        data: '',
        dataTeam: '',
        err_msg: '',
        success: false,
        error: false,
        teamId: this.$route.params.teamId,
        membershipId : this.$route.params.membershipId,
        errors: [],
        loading : false,
        dataUser : '',
        showForm : false,
        edit : true,
        toconfirm : false,
        toconfirm2 : false,
        confirmId : '',
        act : '',
        status : 'active'
      }
    },
    created: function () {
//      this.getMembership()
      this.getTeam(this.$route.params.teamId)
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
        auth.getData2(this, '/team/'+ this.dataTeam.team.id + '/member')
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
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirm2: function (act, id){
        this.toconfirm2 = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.expellTalent(this.confirmId) 
      },
      confirmed2: function (){
        this.toconfirm2 = false
        this.cancelTalent(this.confirmId) 
      }
    }      
}

</script>

<style scoped>
    .statusp {
        background: #8bc751;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    .statuse {
        background: #ff8300 !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }

</style>