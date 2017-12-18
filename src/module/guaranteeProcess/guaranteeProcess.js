import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
Vue.use(VueRouter)
import Vuex from 'vuex'
Vue.use(Vuex)
import projectOverview from '../../components/projectOverview/projectOverview.vue'
import flowList from '../../components/flowList/flowList.vue'
import personnelAssign from '../../components/personnelAssign/personnelAssign.vue'
import detailedDepartment from '../../components/detailedDepartment/detailedDepartment.vue'
import handleOpinions from '../../components/handleOpinions/handleOpinions.vue'
/*定义路由*/
const router = new VueRouter({
	routes:[
		{ path:'', component: projectOverview },                           /*担保管理项目一览组件*/
		{ path:'/flowList', component: flowList },                         /*担保管理流程一览组件*/
		{ path:'/personnelAssign', component: personnelAssign },           /*担保管理-人员分配*/
		{ path:'/detailedDepartment', component: detailedDepartment },     /*担保流程-部门详细*/
		{ path:'/handleOpinions' , component: handleOpinions }             /*担保流程-处理意见*/
	]
})
var cDetail = function(){
	return{
		creditBeginDay : '' ,
		creditBeginDay : '' ,
		mainUsableGuaranteeAmount : '' ,
		creditLineType : '' ,
		creditCurrent : ''
	}
}
const vuex_store = new Vuex.Store({
	state:{
		creditMainPartyDetail: cDetail()                  //放款主体详细信息
	},
	actions:{
		//获取放款主体详细信息
		getCMPDetail ({state},cid){
			if( cid && cid!='' ){
				$api.ajax('/baoliyun/guarantee/getFactoringCompanyCreditDetail',{
					id : cid
				},function(data){
					state.creditMainPartyDetail.creditBeginDay = $api.dateFormat(data.obj.creditBeginDay);
					state.creditMainPartyDetail.creditEndDay = $api.dateFormat(data.obj.creditEndDay);
					state.creditMainPartyDetail.mainUsableGuaranteeAmount = data.obj.mainUsableGuaranteeAmount ;
					state.creditMainPartyDetail.creditLineType = data.obj.creditLineType == 1 ? '循环额度': data.obj.creditLineType == 2 ? '单次':'';
					state.creditMainPartyDetail.creditCurrent = data.obj.creditCurrent == 1 ? '人民币' : data.obj.creditCurrent == 2 ? '美元' : '' ;
					state.creditMainPartyDetail.depositStatus = data.obj.depositStatus == 1 ? '不支付' : data.obj.depositStatus == 2 ? '未支付' : data.obj.depositStatus == 3 ? '已支付' : data.obj.depositStatus ==4 ? '未收取' : data.obj.depositStatus == 5 ? '已收取' : '-' ;
					state.creditMainPartyDetail.depositPayWays = data.obj.depositPayWays ==1 ? '不支付' : data.obj.depositPayWays == 2 ? '一次性支付' : data.obj.depositPayWays == 3 ? '按放款单位支付' : '' ;
				})
			}else{
				state.creditMainPartyDetail = cDetail() ;
			}
		}
	}
})
var mVue = new Vue({
	store:vuex_store,
	router,
	render: h => h(App),
}).$mount('#guaranteeProcess')


