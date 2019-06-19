<script>
import * as CONFIG from '@/app.config.js'
import auth from '@/httpcontrol'
import alertControl from '@/alertcontrol'
import ErrorFlash from '@/components/inovasi/errorflash'
import VueRouter from 'vue-router';

export default {
    template:require('./detail.html'),
    name: 'Detail',
    components: {
      'error-flash': ErrorFlash
    },
    data: function () {
      return {
        data: '',
        err_msg: '',
        success: false,
        error: false,
        errors: []
      }
    },
    created: function () {
      this.getMembership()
    },
    methods: {
      getMembership: function () {
        auth.getData(this, '/talent/team/membership/' + this.$route.params.teamId)
      }
    }      
}

</script>