import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
Vue.use(VueRouter)
import tSetting from  '../../components/typeSetting/typeSetting.vue'
import typeEdit from '../../components/typeEdit/typeEdit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: tSetting },                           	    /*客户类型设定*/
		{ path:'/edit', component: typeEdit }                               /*客户类型修改*/
	]
})

var mVue = new Vue({
	router,
	render: h => h(App),
}).$mount('#viewdiv')