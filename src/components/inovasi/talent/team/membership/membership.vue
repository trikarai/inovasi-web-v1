<script>
import * as CONFIG from '@/app.config.js'
import auth from '@/httpcontrol'
import alertControl from '@/alertcontrol'
import ErrorFlash from '@/components/inovasi/errorflash'
import VueRouter from 'vue-router'
import Loading from '@/components/loading'
import OnDelete from '@/components/ondelete'

export default {
    template:require('./membership.html'),
    name: 'TeamMembership',
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
      'ondelete': OnDelete

    },
    data: function () {
      return {
        data: {
          total : 0,
          list : []
        },
        err_msg: '',
        success: false,
        error: false,
        errors: [],
        statusTeam : 'active',
        statusInvitation : 'invited',
        loading : true,
        toconfirm : false,
        confirmId : '',
        act : ''
      }
    },
    created: function () {
//      this.$router.go(this.$router.currentRoute)
      this.getMembership()
    },
    methods: {
      getMembership: function () {
//        this.$router.go(this.$router.currentRoute)
        var status1, status2, join
        if(this.statusTeam === ''){
          status1 = ''
        }else{
          status1 = 'status[]=' + this.statusTeam
        }
        
        if(this.statusTeam != '' && this.statusInvitation != ''){
          join = '&'
        }else{
          join = ''
        }
        
        if(this.statusInvitation === ''){
          status2 = ''
        }else{
          status2 = 'status[]=' + this.statusInvitation
        }
        
//        auth.getData2(this, '/talent/team/membership?status[]='+ this.statusTeam +'&status[]=' + this.statusInvitation)
        auth.getData2(this, '/talent/team/membership?' + encodeURI(status1) + join + encodeURI(status2))
                .then(res => {
                  if(res.status === 204){
                    console.log(res)
                    this.data = {total:0, list: []}
                    this.loading = false
                  }else {
                    return res.json()
                  }
                }, error => {
                  console.log(error)
                  alertControl(this, error.body.meta)
                }).then(data => {
                  this.data = data.data
                  this.loading = false
                })
      },
      changeStatus: function () {
        this.loading = true
        this.getMembership()
      },
      accept: function(id){
        this.loading = true
        auth.putData2(this, '/talent/team/membership/'+id+'/accept_invitation')
                .then(res=>{
                  console.log(res)
                  this.getMembership()
                  this.loading = false
                }, error=>{
                  console.log(error)
                  alertControl(this, error.body.meta)
                  this.loading = false
                })
      },
      reject: function(id){
        this.loading = true
        auth.putData2(this, '/talent/team/membership/'+id+'/refuse_invitation')
                .then(res=>{
                  console.log(res)
                  this.getMembership()
                  this.loading = false
                }, error=>{
                  console.log(error)
                  alertControl(this, error.body.meta)
                  this.loading = false
                })
      },
      resign: function(){
        this.loading = true
        auth.putData2(this, '/talent/team/membership/'+this.confirmId+'/resign')
                .then(res=>{
                  console.log(res)
                  this.getMembership()
                  this.loading = false
                }, error=>{
                  console.log(error)
                  alertControl(this, error.body.meta)
                  this.loading = false
                })
      },
      confirm: function (act, id){
        this.toconfirm = true
        this.act = act
        this.confirmId = id
      },
      confirmed: function (){
        this.toconfirm = false
        this.resign() 
      }
    }      
}

</script>

<style scoped>    
    .dttmnm {
        background: #8bc751;
        color: #fff;
        padding: 12px;
    }
    
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
    .statusi {
        background: #00f !important;
        color: #fff;
        padding: 2px 9px;
        border-radius: 20px;
        font-size: 12px;
    }
    
    .drpdwn {
        padding: 3px;
        border-color: #e4e4e4;
        font-size: 11px;
        color: #8bc751;
    }
@import './hover.css';
</style>