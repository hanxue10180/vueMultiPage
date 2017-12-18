import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import payrollAdjust from '../../components/payrollAdjust/payrollAdjust.vue'
import basePay from '../../components/basePay/basePay.vue'
import withhold from '../../components/withhold/withhold.vue'
import newCustomer from '../../components/newCustomer/newCustomer.vue'
import wageEdit from '../../components/wageEdit/wageEdit.vue'
import performanceTotal from '../../components/performanceTotal/performanceTotal.vue'
import prestoreBonusTotal from '../../components/prestoreBonusTotal/prestoreBonusTotal.vue'
import loanRepayList from '../../components/loanRepayList/loanRepayList.vue'
import creditloanList from '../../components/creditloanList/creditloanList.vue'
/*定义路由*/
const router = new VueRouter({
    routes:[
        { path:'', component: payrollAdjust },                              /*员工岗位工资设定*/
        { path:'/basePay', component: basePay },                            /*基本工资、岗位津贴履历*/
        { path:'/withhold' , component: withhold },                         /*扣罚/补发履历*/
        { path:'/newCustomer',component:newCustomer },                      /*新增客户履历*/
        { path:'/edit', component: wageEdit },                               /*员工薪资调整*/
        { path:'/performanceTotal',component:performanceTotal },             /*绩效奖励详情*/
        { path:'/prestoreBonusTotal',component:prestoreBonusTotal},         /*结项预留详情*/
        { path:'/loanRepayList', component: loanRepayList }  ,             /*担保管理-放款还款一览*/
        { path:'/creditloanList', component: creditloanList }               /*收支管理-授信放款一览*/
    ]
})

var mVue = new Vue({
    router
}).$mount('#viewdiv')