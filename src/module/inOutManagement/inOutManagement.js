import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
Vue.use(VueRouter)
import creditCompanyList from  '../../components/creditCompanyList/creditCompanyList.vue'
import creditloanList from '../../components/creditloanList/creditloanList.vue'
import guaranteeFeeList from '../../components/guaranteeFeeList/guaranteeFeeList.vue'
import thirdPartyList from '../../components/thirdPartyList/thirdPartyList.vue' 
import gFEdit from '../../components/gFEdit/gFEdit.vue'
import depositList from '../../components/depositList/depositList.vue'
import depositEdit from '../../components/depositEdit/depositEdit.vue'
import depositInOutEdit from '../../components/depositInOutEdit/depositInOutEdit.vue'
import gFInOutEdit from '../../components/gFInOutEdit/gFInOutEdit.vue' 
import tPInOutEdit from '../../components/tPInOutEdit/tPInOutEdit.vue'
import tPMInOutEdit from '../../components/tPMInOutEdit/tPMInOutEdit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: creditCompanyList },                           	    /*收支管理-融资企业一览*/
		{ path:'/creditloanList', component: creditloanList }   ,                   /*收支管理-授信放款一览*/
		{ path:'/guaranteeFeeList', component: guaranteeFeeList } ,                 /*收支管理-担保费一览*/
		{ path:'/gFEdit', component: gFEdit },                                      /*收支管理-担保费修改新增*/
		{ path:'/thirdPartyList', component: thirdPartyList },                      /*收支管理-第三方费用一览*/
		{ path:'/depositList', component: depositList },                            /*收支管理-保证金一览*/
		{ path:'/depositEdit', component: depositEdit },                            /*收支管理-保证金添加修改*/
		{ path:'/depositInOutEdit', component: depositInOutEdit },                  /*收支管理-保证金收支添加修改*/
		{ path:'/gFInOutEdit', component: gFInOutEdit },                            /*收支管理-担保费收支添加修改*/
		{ path:'/tPInOutEdit', component: tPInOutEdit },                            /*收支管理-第三方收支添加修改*/
		{ path:'/tPMInOutEdit', component: tPMInOutEdit }                           /*收支管理-第三方费用批量添加修改*/
	]
})
var mVue = new Vue({
	router,
	render: h => h(App),
}).$mount('#inOutManagement')