<script>
import adminService from './adminService.js';
import Sidebar from './Sidebar'
import VueRouter from 'vue-router';

export default {
    template:require('./admin.html'),
    name: 'AdminBarapraja',
    components: {
      'sidebar': Sidebar
    },
    methods: {
        logout:function() {
         var app = this;
         $(".logoutadminmodal").modal("hide");
         localStorage.removeItem("access_token");
         localStorage.removeItem("access_data");
         localStorage.removeItem("role");
         app.$store.state.isLoggedIn = false;
         app.$router.replace({ path: '/personnel'});
         
        }
    },
    computed: {
      checkLogin() {
        return this.$store.state.isLoggedIn;
      }
    }
}

</script>

<style lang='scss'>
    @import './admin.scss';
    @import '/dashboard/css/Admin-m.css';
    @import '/dashboard/css/custommanager.css';
    @import '/dashboard/css/_all-skins-m.css';
    @import '/dashboard/css/dashboard.css';
    @import '/dashboard/css/linkstyles.css';
    @import '/dashboard/css/animate.min.css';
    @import '/dashboard/js/plugins/pace/pace.min.css';
    @import '/dashboard/js/plugins/datatables/dataTables.bootstrap.css';
</style>