import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 
import project from  '../../components/statistics_project/statistics_project.vue'
import person from '../../components/statistics_person/statistics_person.vue'
import inOut from '../../components/statistics_inOut/statistic_inOut.vue'
import assetTransfer from '../../components/statistics_assetTransfer/statistics_assetTransfer.vue'
import unfinish from '../../components/statistics_unfinish/statistics_unfinish.vue'
import capital from '../../components/statistics_capital/statistics_capital.vue'
import daysCapital from '../../components/statistics_days/statistics_days.vue'
import netProfit from '../../components/statistic_netProfit/statistic_netProfit.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'/project', component: project } ,                         	    /*项目状况统计*/
		{ path:'/person', component: person } ,                                 /*人员状况统计*/
		{ path:'/inOut',component: inOut},                                      /*收支状况统计*/   
		{ path:'/assetTransfer',component:assetTransfer},                       /*资产转让收支情况统计*/ 
		{ path:'/capital' , component:capital },                                /*资金状况统计*/
		{ path:'/daysCapital',component:daysCapital},                           /*资金状况日*/
		{ path:'/unfinish',component: unfinish } ,                              /*未结任务统计*/
		{ path:'/netProfit',component:netProfit }                               /*项目净收益统计*/
	]
})

var mVue = new Vue({
	router
}).$mount('#viewdiv')