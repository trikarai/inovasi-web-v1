<template>
  <ul class="sidebar-menu">
    <li class="header">Main Navigation</li>
    <li class="active pageLink" v-on:click="toggleMenu">
    <router-link to="/personnel/dashboard"><i class="fa fa-desktop"></i>
      <span class="page">Dashboard</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/personnel/profile">
      <i class="fa fa-user"></i>
      <span class="page">Profile</span>
    </router-link>
    </li>
    
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/coordinator/programme">
      <i class="fa fa-user-secret"></i>
      <span class="page">Coordinator</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/tutor/programme">
      <i class="fa fa-user-circle"></i>
      <span class="page">Mentor</span>
    </router-link>
    </li>
    
<!--        <li class="active treeview">
          <a href="#">
            <i class="fa fa-user-circle"></i>
            <span>Tutor</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu" style="display: none;">
            <li>
              <router-link to="/tutor/programme">
                <i class="fa fa-circle-o"></i> Programme
              </router-link>
            </li>
            <li>
              <router-link to="/coordinator/programme">
                <i class="fa fa-circle-o"></i> Score
              </router-link>
            </li>
            <li>
              <router-link to="/tutor/programme">
                <i class="fa fa-circle-o"></i> Mentoring Session
              </router-link>
            </li>
          </ul>
        </li>-->
      
<!--    <li class="active treeview">
      <i class="fa fa-user"></i>
      <span class="page">Tutor</span> <i class="fa fa-angle-left pull-right"></i>
        <ul class="treeview-menu">
          <li class="active"><a><i class="fa fa-circle-o"></i> Scoring</a></li>
          <li><a><i class="fa fa-circle-o"></i> Score</a></li>
          <li><a><i class="fa fa-circle-o"></i> Mentoring Session</a></li>
        </ul>
    </li>-->

  </ul>
</template>
<script>
  export default {
    name: 'SidebarName',
    methods: {
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
<style>
  /* override default */
  .sidebar-menu>li>a {
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
</style>
