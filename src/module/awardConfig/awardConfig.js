import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import awardConfig from  '../../components/awardConfig/awardConfig.vue'
import awardConfigEdit from '../../components/awardConfigEdit/awardConfigEdit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: awardConfig },                           	    
		{ path:'/edit', component: awardConfigEdit }                        
	]
})

var mVue = new Vue({
	router
}).$mount('#viewdiv')