<template>
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div class="pull-left image">
          <img v-bind:src="'/dashboard/images/' + img" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{data.name}}</p> 
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>

      <!-- search form (Optional) -->
<!--
      <form v-on:submit.prevent class="sidebar-form">
        <div class="input-group">
          <input type="text"
            name="search"
            id="search"
            class="search form-control"
            data-toggle="hideseek" p
            laceholder="Search Menus"
            data-list=".sidebar-menu">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>
-->
      <!-- /.search form -->

      <!-- Sidebar Menu -->
      <sidebar-menu />
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>


<script>
import SidebarMenu from './SidebarMenu'
import auth from '@/httpcontrol'

export default {
  name: 'Sidebar',
  props: ['displayName', 'pictureUrl'],
  components: { SidebarMenu },
  data: function(){
      return{
        img: 'profile.png',
	    data: ''
      }
  },
  created: function () {
	this.getData()
  }, 
  methods: {
      getData: function () {
        this.data = auth.getAuthData()
      }
  }
}
</script>
<style>
  .user-panel .image img {
    border-radius: 50%;
  }
</style>
