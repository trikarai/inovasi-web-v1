<script>
import * as CONFIG from '@/app.config.js'
import auth from '@/httpcontrol'
import alertControl from '@/alertcontrol'
import ErrorFlash from '@/components/inovasi/errorflash'
import VueRouter from 'vue-router'
import InviteForm from './inviteForm'
import DetailProfile from './detailProfile'
import Loading from '@/components/loading'
import OnSub from '@/components/onsubmit'

export default {
    template:require('./browse.html'),
    name: 'Team',
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'invite-form': InviteForm,
      'profile': DetailProfile,
      'onsub' : OnSub
    },
    data: function () {
      return {
        data: {total:0, list:[]},
        dataTalent: '',
        dataUser : '',
        err_msg: '',
        success: false,
        error: false,
        team_id: '',
        showForm: false,
        showProfile : false,
        errors: [],
        team_involvement_status: '',
        loading : false,
        page: {
          page: 1,
          size: 100
        },
        search: '',
        onsub : false
        
      }
    },
    created: function () {
    },
    computed: {
    },
    updated: function(){   
    },
    methods: {
      submit: function (){
        if(this.search === '') {
              this.$notify({
                  group: 'emsignup',
                  title: 'email kosong',
                  text: 'Mohon untuk mengisi email',
                  type: 'warn'
                });
         }else if(!this.validEmail(this.search)) {
              this.$notify({
                  group: 'emsignup',
                  title: 'email',
                  text: 'Gunakan format email yang benar',
                  type: 'warn'
                });
         }else{
           this.getTalentByEmail()
         }
      },
      getTalentByEmail: function(){
        this.data = {total:0, list:[]}
        this.onsub = true
        auth.getData2(this, '/team/talent/by-email?email=' + this.search)
                .then(res=>{
                  if(res.status === 204){
                    console.log('204 No Content')
                    this.data = {total:0, lits:[]}
                    this.onsub = false
                  }else{
                    console.log(res)
                    return res.json()
                  }
                }, error=>{
                  console.log(error)
                  alertControl.showError(this, error.body.meta)
                  this.onsub = false
                }).then(data=>{
                  this.dataUser = auth.getAuthData()
                  this.data = data.data
                  this.onsub = false
                })
      },
      validEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
      },
      inviteTalent: function (data){
        this.dataTalent = data
        this.showForm = true
        this.team_id = this.$route.params.teamId
      },
      openProfile: function (data){
        this.dataTalent = data
        this.showProfile = true
      },
      closeModalRefresh: function (){
        this.showForm = false
//        this.getTalent()
      },
      changePage: function (page) {
        this.page.page = page
//        this.getTalent()
      },
    }      
}

</script>