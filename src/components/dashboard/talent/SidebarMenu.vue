<template>
  <ul class="sidebar-menu">
    <li class="header">Main Navigation</li>
    
<!--    <div v-if="teamId != ''">
    <li class="pageLink">
      <a><i class=""></i>
        <span class="page">Choose Team</span>
      </a>
    </li>
    <div style="padding: 0px 15px 12px 15px;">
      <select v-model="teamId" class="form-control" >
        <option v-for="(data,index) in data.data.list" :value="data.team.id" v-bind:selected="index === 0">{{data.team.name}}</option>
      </select>
    </div> 
    </div>
    <div v-else>

    </div>-->
     
    
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/talent/dashboard"><i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
   
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/talent/profile">
      <i class="fa fa-user"></i>
      <span class="page">Profil</span>
    </router-link>
    </li>
    
    <!--<li class="pageLink" v-on:click="toggleMenu" v-if="teamId != ''">-->
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/talent/team/membership">
        <i class="fa fa-users"></i>
        <span class="page">Tim</span>
      </router-link>
    </li>
<!--    <li class="pageLink" v-on:click="toggleMenu" v-else>
      <router-link to="/talent/team/membership">
        <i class="fa fa-users"></i>
        <span class="page">Create Team</span>
      </router-link>
    </li>-->
    
<!--    <li class="pageLink" v-on:click="toggleMenu" v-if="teamId != ''">
    <router-link :to="{path:'/team/'+teamId+'/programmeparticipation'}">
      <i class="fa fa-university"></i>
      <span class="page">Program</span>
    </router-link>
    </li>-->
    
<!--    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/talent/team/reservation">
      <i class="fa fa-ticket"></i>
      <span class="page">Reservation</span>
    </router-link>
    </li>-->

<!--    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/talent/team/learning">
        <i class="fa fa-book"></i>
        <span class="page">Learning Material</span>
      </router-link>
    </li>-->
    
<!--    <li class="pageLink" v-on:click="toggleMenu" v-if="teamId != ''">
    <router-link :to="'/team/'+teamId+'/comments'">
      <i class="fa fa-comment"></i>
      <span class="page">Comments</span>
    </router-link>
    </li>-->
    
<!--    <li class="pageLink" v-on:click="toggleMenu" v-if="teamId != ''">
    <router-link :to="'/team/'+teamId+'/idea'">
      <i class="fa fa-lightbulb-o"></i>
      <span class="page">Idea</span>
    </router-link>-->
        
    </li>
    
  </ul>
</template>
<script>
  import auth from '@/httpcontrol'
  
  export default {
    name: 'SidebarName',
    data: function (){
      return {
        data : {
          data : {total:0, list: []}
        },
        teamId : ''
      }
    },
    mounted: function (){
    },
    watch: {
    // call again the method if the route changes
    },
    created: function (){
//      this.getTeam()
    },
    methods: {
      getTeam: function (){
        auth.getData2(this, '/talent/team/membership?status[]=active')
                .then(res => {
                  if(res.status === 204){
                    console.log(res)
                    this.data = {total:0, list: []}
//                    this.loading = false
                  }else {
                    return res.json()
                  }
                }, error => {
                  console.log(error)
//                  alertControl(this, error.body.meta)
                }).then(data => {
                  this.teamId = data.data.list[0].team.id
                  this.data = data
  //                  this.loading = false
                })
      },
      toggleMenu(event) {
        // remove active from li
        var active = document.querySelector('li.pageLink.active')
        if (active) {
          active.classList.remove('active')
        }
        // window.$('li.pageLink.active').removeClass('active')
        // Add it to the item that was clicked
        event.toElement.parentElement.className = 'pageLink active'
      }
    }
  }
</script>
<style scoped>
  /* override default */
  .sidebar-menu>li>a .teammenu{
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .skin-blue .sidebar-menu > li.header {
    color: #ffffff !important;
    background: #374850 !important;
  }

  .sidebar-mini.sidebar-collapse .sidebar-menu > li:not(.treeview) > a > span {
    -webkit-box-shadow: 4px 0px 14px -5px rgba(0,0,0,0.63) !important;
    -moz-box-shadow: 4px 0px 14px -5px rgba(0,0,0,0.63) !important;
    box-shadow: 4px 0px 14px -5px rgba(0,0,0,0.63) !important;
  }
  
  
  .select-box {
  cursor: pointer;
  position : relative;
  max-width:  20em;
  margin: 5em auto;
  width: 100%;
}

.select,
.label {
  color: #414141;
  display: block;
  font: 400 17px/2em 'Source Sans Pro', sans-serif;
}

.select {
  width: 100%;
  position: absolute;
  top: 0;
  padding: 5px 0;
  height: 40px;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  background: none transparent;
  border: 0 none;
}
.select-box1 {
  background: #ececec;
}

.label {
  position: relative;
  padding: 5px 10px;
  cursor: pointer;
}
.open .label::after {
   content: "▲";
}
.label::after {
  content: "▼";
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 15px;
  border-left: 5px solid #fff;
}
</style>
