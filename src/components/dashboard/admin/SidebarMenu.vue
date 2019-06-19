<template>
  <ul class="sidebar-menu">
    <li class="header">Main Navigation</li>
<!--
    <li class="active pageLink" v-on:click="toggleMenu">
    <router-link to="/admin/dashboard"><i class="fa fa-desktop"></i>
      <span class="page">Dashboard</span>
    </router-link>
    </li>
-->
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/admin/manage">
      <i class="fa fa-user-circle"></i>
      <span class="page">Admin</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/personnel/manage">
      <i class="fa fa-users"></i>
      <span class="page">Personnel</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/persona/manage">
      <i class="fa fa-id-card"></i>
      <span class="page">Persona Aspect</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/programmecurriculum/manage">
      <i class="fa fa-calendar"></i>
      <span class="page">Programme Curriculum</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/programme/manage">
      <i class="fa fa-calendar-o"></i>
      <span class="page">Programme</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/region/manage">
      <i class="fa fa-map"></i>
      <span class="page">Region</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/track/manage">
      <i class="fa fa-share-alt"></i>
      <span class="page">Track</span>
    </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
    <router-link to="/formtemplate/manage">
      <i class="fa fa-file-o"></i>
      <span class="page">Form Template</span>
    </router-link>
    </li>
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
