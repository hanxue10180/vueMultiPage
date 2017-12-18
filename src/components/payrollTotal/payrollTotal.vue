<template>
	<bPanel>
		<h4 slot="title">检索结果</h4>
		<div slot="body">
			<table class="table table-hover">
				<thead>
					<tr>
						<th></th>
						<th colspan="5">按{{type==1 ? '公司' : type==2 ? '部门' : type==3 ? '人员':'-'}}统计-计划工资（单位：元）</th>
						<th colspan="5">按{{type==1 ? '公司' : type==2 ? '部门' : type==3 ? '人员':'-'}}统计-实际工资（单位：元）</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					<tr>
						<th>发放月份</th>
						<th>基本工资</th>
						<th>岗位津贴</th>
						<th>扣罚金额</th>
						<th>绩效奖励</th>
						<th>小计</th>
						<th>基本工资</th>
						<th>岗位津贴</th>
						<th>扣罚金额</th>
						<th>绩效奖励</th>
						<th>小计</th>
						<th>劝退人员</th>
						<th>详细</th>
						<th>状态</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in totalList" :style="item.payRollYM=='年度合计' ? 'font-weight:bold':'' ">
						<td v-text="item.payRollYM"></td>
						<td v-text="item.rollExpectedAmount"></td>
						<td v-text="item.allowanceExpectedAmount"></td>
						<td v-text="item.withholdExpectedAmount"></td>
						<td v-text="item.performanceExpectedAmount"></td>
						<td v-text="item.planTotal"></td>
						<td v-text="item.rollActualAmount"></td>
						<td v-text="item.allowanceActualAmount"></td>
						<td v-text="item.withholdActualAmount"></td>
						<td v-text="item.performanceActualAmount"></td>
						<td v-text="item.realTotal"></td>
						<td :style="item.ifDismiss ? 'color:red':''">{{ item.payRollYM=='年度合计' ? '': item.ifDismiss ? '是' :  '否' }}</td>
						<td v-bind:class="item.payRollYM!='年度合计' ? 'detail':''" v-on:click="item.payRollYM!='年度合计' ? getDetail(item.payRollYM):''" v-text="item.payRollYM!='年度合计' ? '详细':'-'"></td>
						<td v-text="item.processStatus==1 ? '待确认': item.processStatus==2 ? '已确认':item.processStatus==3 ? '已发放':'-'"></td>
					</tr>
				</tbody>				
			</table>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default{
		data(){
			return {
				totalList:[],
				type:''
			}
		},
		components:{
			bPanel
		},
		methods:{
			getTotalList(_year,_type,_val){
				var self = this ;
				self.type = _type ;
				$api.ajax('/baoliyun/performance/getPayrollTotal',{
					year:_year,
					type:_type,
					val:_val
				},function(data){
					self.totalList = data.obj ;
				})
			},
			getDetail(ym){
				this.$emit('getDetail',ym) ;
			}
		}
	}
</script>
<style scoped>
	th,td{
		text-align: center;
	}
	.detail{
		color:#1AB394;
		cursor:pointer;
	}
</style>