import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import creditDepositList from  '../../components/creditDepositList/creditDepositList.vue'
import creditDepositDetailList from '../../components/creditDepositDetailList/creditDepositDetailList.vue'
import depositInOutEdit  from '../../components/depositInOutEdit/depositInOutEdit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: creditDepositList },                           	    /*收支管理-融资保证金一览*/
		{ path:'/creditDepositDetailList', component: creditDepositDetailList },    /*收支管理-保证金详细一览*/
		{ path:'/depositInOutEdit', component: depositInOutEdit },                  /*收支管理-保证金收支添加修改*/
	]
})

var mVue = new Vue({
	router
}).$mount('#viewdiv')
