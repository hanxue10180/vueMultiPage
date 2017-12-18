import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
Vue.use(VueRouter)
import loanRepayList from '../../components/loanRepayList/loanRepayList.vue'
import loanRepayEdit from '../../components/loanRepayEdit/loanRepayEdit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: loanRepayList },                           /*担保管理-放款还款一览*/
		{ path:'/edit', component: loanRepayEdit }                       /*担保管理-放款还款添加修改*/
	]
})
var mVue = new Vue({
	router,
	render: h => h(App),
}).$mount('#loanRepayManagement')
