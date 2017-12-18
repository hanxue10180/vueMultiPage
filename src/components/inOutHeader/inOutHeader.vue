<template>
	<div>
		<div class="fline">
			<formg>
				<span slot="tl">放款主体名称</span>
				<span slot="ct" v-text="info1.creditMainPartyName"></span>
			</formg>
			<formg>
				<span slot="tl">担保项目名称</span>
				<span slot="ct" v-text="info1.creditProjectName"></span>
			</formg>
			<formg>
				<span slot="tl">融资企业名称</span>
				<span slot="ct" v-text="info1.creditCompanyManageName"></span>
			</formg>
		</div>
		 <div class="fline">
			<formg>
				<span slot="tl">保证金支付方式</span>
				<span slot="ct" v-text="info1.depositPayWays == 1 ? '不支付' : info1.depositPayWays == 2 ? '一次性支付' : info1.depositPayWays == 3 ? '按放款单位支付' : '-' "></span>
			</formg>
			<formg>
				<span slot="tl">放款批号</span>
				<span slot="ct" v-text="info2.creditloanNo"></span>
			</formg>
			<formg>
				<span slot="tl">放款金额（元）</span>
				<span slot="ct" v-text="info2.amount"></span>
			</formg>
		</div>
		<div class="fline">
			<formg>
				<span slot="tl">放款日</span>
				<span slot="ct" v-text="getDate(info2.loanDate)"></span>
			</formg>
			<formg>
				<span slot="tl">还款日</span>
				<span slot="ct" v-text="getDate(info2.repaymentExpectDay)"></span>
			</formg>
			<formg v-if="type==1">
				<span slot="tl">担保费率</span>
				<span slot="ct">{{ info2.guaranteeRatio }} % (按年化利率计算) </span>
			</formg>
			<formg v-if="type==2" >
				<span slot="tl">预计支付保证金(元)</span>
				<span slot="ct">{{ info2.preDepositAmount }} </span>
			</formg>
		</div>
		<div class="fline">
			<formg v-if="type==2">
				<span slot="tl" v-bind:style="info2.depositPayer ==1 ? 'color:red':''" >保证金担付方</span>
				<span slot="ct" v-bind:style="info2.depositPayer ==1 ? 'color:red':''" v-text=" info2.depositPayer ==1 ? '企业' : info2.depositPayer ==2 ? '保理公司':'-'"> </span>
			</formg>
			<formg v-if="type==2">
				<span slot="tl">保证金预定支付日</span>
				<span slot="ct" v-text="getDate(info2.depositPrePayDate)"></span>
			</formg>
			<formg v-if="type==1" >
				<span slot="tl">费用类别</span>
				<span slot="ct">担保费</span>
			</formg>
			<formg v-if="type==1" >
				<span slot="tl">担保费计划生成方式</span>
				<span slot="ct" v-text="info2.guaranteePlanWays==1 ? '手动录入' : info2.guaranteePlanWays==2 ? '系统生成' :'' "></span>
			</formg>
		</div>
	</div>
</template>
<script type="text/javascript">
	import formg from '../formg/formg.vue'
	export default{
		props:['info1','info2','type'],
		components:{
			formg
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num) ;
			}
		}
	}
</script>

