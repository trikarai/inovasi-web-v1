<template>
  <div>
        <loading v-show="loading"></loading>

    <section class="content">
      
    <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg"/>
            
    <div class="box" v-show="!error">
      <div class="box-body">
        
        <div class="row">
<!--            <div class="col-md-4">
                <router-link class="btn btn-default" :to="'/talent/team/create'"><i class="fa fa-plus-square"></i> Past</router-link>
            </div> -->
            <div class="col-md-4" style="padding: 7px;">
                <div class="form-group">
                <label for="sel1">Status:</label>
                <select class="drpdwn" v-model="status" @change="changeStatus">
                  <option value="">All</option>
                  <option value="reserved">Reserved</option>
                  <option value="waiting_list">Waiting List</option>
                </select>
                </div>
            </div>
        </div> 
        
        <table class="table" v-if="data.total > 0">
          <thead>
            <tr>
              <th>Workshop Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Cancel Hour</th>
              <th>Max Participant Seat</th>
              <th>Talent</th>
              <th>Status</th>
              <th>check in</th>
              <th>check out</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in data.list">
              <td>{{data.workshop.name}}</td>
              <td>{{data.workshop.start_time | moment("dddd, MMMM D YY, hh:mm a")}}</td>
              <td>{{data.workshop.start_time | moment("dddd, MMMM D YY, hh:mm a")}}</td>
              <td>{{data.workshop.cancel_hour}}</td>
              <td>{{data.workshop.max_participant_seat}}</td>
              <td>{{data.member.talent.name}}</td>
              <td>{{data.status}}</td>
              <td>{{data.check_in | moment("dddd, MMMM D YYYY, hh:mm a")}}</td>
              <td>{{data.check_out | moment("dddd, MMMM D YYYY, hh:mm a")}}</td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          No Past Reservation...
        </div>
        
        <!--{{data.total}} / {{page.size}} = {{pageTotal}}-->
        
          <div class="pagination" v-if="data.total > 5">
          <label>Data per page</label>
          <select v-model="page.size" @change="getData">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>  
        
<!--        <div>
          <span v-for="n in pageTotal">{{ n }} </span>
        </div>-->

        <nav aria-label="Pagination">
          <ul class="pagination" v-for="n in pageTotal">
            <li class="page-item disabled">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>

<template v-if="n == page.page">           
            <li class="page-item active"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
</template>  
<template v-else>  
            <li class="page-item"><a class="page-link" @click="changePage(n)">{{n}}</a></li>
</template>  
            <li class="page-item disabled">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
        
      </div>  
    </div>      
    </section>
    

    
  </div>
</template>  


<script>
  import auth from '@/httpcontrol' 
  import * as CONFIG from '@/app.config.js'
  import alertControl from '@/alertcontrol'
  import ErrorFlash from '../../../errorflash'
  import Loading from '@/components/loading'

  export default {
    props: [],  
    data: function () {
      return {
        data: {total:0, list:[]},
        err_msg: '',
        success: false,
        error: false,
        page: {
          page: 1,
          size: 5
        },
        status : '',
        loading : false
      }
    },
    computed: {
      pageTotal: function () {
        return Math.ceil(this.data.total / this.page.size)
      }
    },
    components: {
      'error-flash': ErrorFlash,
      'loading': Loading,
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {   
        var status1
        if(this.status === ''){
          status1 = ''
        }else{
          status1 = 'status[]=' + this.status
        }
        auth.getData2(this, '/talent/workshop_reservation/past?page='+ this.page.page +'&page_size='+ this.page.size + '&' + status1)
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
        this.getData()
      },
      changePage: function (page) {
        this.page.page = page
        this.getData()
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
    
    
    .drpdwn {
        padding: 3px;
        border-color: #e4e4e4;
        font-size: 11px;
        color: #8bc751;
    }
</style>  