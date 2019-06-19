<template>
  <div>
    {{data}}
  </div>
</template>

<script>
//import adminService from './adminService.js';
import * as CONFIG from '@/app.config.js'
import alertControl from '@/alertcontrol'
import auth from '@/httpcontrol'
import ErrorFlash from '../../errorflash'

export default {
    name: 'SignUp',
    components: {
    },
    data: function () {
      return {
        data: {total:0, list:[]},
        errors: [],
        err_msg: '',
        error: false,
        success: false,
        closes: false,
        loading: false,
        signup: {
          username: '',
          password: '',
          region_id: '',
          name: '',
          email: '',
          phone: '',
          city_of_origin: '',
          birthdate: '',
          gender: ''     
        } 
      }
    },
    created: function () {
      this.getRegion()
    },
    methods: {
      getRegion(){
        this.axios.get('http://bekup.web.id/inovasi/region')
        .then((response) => {
          console.log(response.data)
          this.data = response.data
        })
//        this.loading = true
//        auth.getData2(this, '/region')
//        .then(response => {
//          console.log(response)
//          return response.json()
//        }, error => {
//          console.log(error)
//          this.loading = false
//        }).then(data => {
//          this.data = data.data
//          this.loading = false
//        })
      }
    }
}

</script>
