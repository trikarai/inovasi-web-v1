// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueResource from 'vue-resource'
import header from './components/header.vue'
import footer from './components/footer.vue'
//import BootstrapVue from 'bootstrap-vue'
//import login from './components/login/login.vue'
import Notifications from 'vue-notification'
import {store} from  './components/store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Moment from 'vue-moment'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Pagination from 'vue-pagination-2';

import wysiwyg from "vue-wysiwyg";


//import axios from 'axios'
//import VueAxios from 'vue-axios'
 
//Vue.use(VueAxios, axios)

Vue.use(VueResource)
Vue.use(mavonEditor)
Vue.use(Notifications)
Vue.use(Moment)
Vue.component('app-header',header)
Vue.component('app-footer',footer)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('pagination', Pagination);
Vue.use(wysiwyg, {
    hideModules: {"bold": true, "italic": true, "underline": true, "image": true, "code": true, "table": true, "unorderedList": true, "link": true, "headings": true, "removeFormat": true, "separator": true, "justifyLeft": true, "justifyCenter": true, "justifyRight": true}
}); 


//Vue.component('app-login',login);
//Vue.use(BootstrapVue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app', 
    store,
    router,
    template: '<App/>',
    components: { App }
})