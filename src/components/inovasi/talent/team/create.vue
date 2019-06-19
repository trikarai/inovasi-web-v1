<script>
//import adminService from './adminService.js';
import * as CONFIG from '@/app.config.js'
import auth from '@/httpcontrol'
import alertControl from '@/alertcontrol'
import ErrorFlash from '../../errorflash'
import VueRouter from 'vue-router';

export default {
    template:require('./create.html'),
    name: 'CreateTeam',
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        data: '',
        err_msg: '',
        success: false,
        error: false,
        errors: [],
        team: {
          name: '',
          vision: '',
          mission: '',
          culture: '',
          founder_agreement: '',
          position: ''
        } 
      }
    },
    created: function () {
    },
    methods: {
      submit: function () {
//        this.$router.go(-1)
        if(this.checkForm()){
          this.$http.post(CONFIG.APIENDPOINT + '/talent/team' , this.team, {headers: auth.getAuthHeader()})
            .then(response => {
              console.log(response)
              this.$router.go(-1)
//              this.$router.go(this.$router.currentRoute)
//              alertControl.showError(this, error.body.meta)
//              this.$router.go('/talent/team/membership')
//              this.$router.replace('/talent/team/membership')
            }, error => {
              console.log(error)
              alertControl.showError(this, error.body.meta)
              this.data = error.body.meta
            })
        }
      },
      submit2: function (){
        this.$router.go(-1)
      },
      checkForm(e){
        this.errors = []
        if(!this.team.name) this.errors.push("Name required.")
        if(!this.team.position) this.errors.push("Position required.")
        if(!this.errors.length) 
          return true;
      },
      learningVMB: function() {
        let routeData = this.$router.resolve({
          path: "/learning",
          query: { type: "VisiMisiBudaya" }
        });
        window.open(routeData.href, "_blank");
      }
    }      
}

</script>

<style scoped>
.kotak {
    padding: 6px;
    margin-bottom: 10px;
    border-color: #eaeaea;
    border-style: solid;
    border-width: 1px;
    border: 2px solid #eaeaea;
    border-radius: 3px;
}
.cretim {
    background: #ffbe00;
    padding: 15px;
    display: inline-block;
    padding-bottom: 7px;
    border-radius: 3px;
    }
.tooltip-inner {
        width: 200px
    }
</style>