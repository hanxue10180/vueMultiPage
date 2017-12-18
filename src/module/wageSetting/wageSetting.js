import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import wSetting from  '../../components/wSetting/wSetting.vue'
import wageEdit from '../../components/wageEdit/wageEdit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: wSetting },                           	    /*员工岗位工资设定*/
		{ path:'/edit', component: wageEdit }                               /*员工添加*/
	]
})

var mVue = new Vue({
	router
}).$mount('#viewdiv')