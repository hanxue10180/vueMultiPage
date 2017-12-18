<template>
	<bPanel>
		<h4 slot="title">结项奖励明细</h4>
		<div slot="body">
			<table class="table table-hover table-bordered" style="width:480px;table-layout:fixed;">
				<thead>
					<tr>
						<th style="width:260px;">项目名称</th>
						<th>合同编号</th>
						<th>出账批号</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td v-text="projectName"></td>
						<td v-text="contractId==-1 ? '-':contractId "></td>
						<td v-text="loanNo"></td>
					</tr>
				</tbody>
			</table>
			<table class="table table-hover table-bordered" style="width:700px">
				<thead>
					<tr>
						<th>预存年月</th>
						<th>发放类型</th>
						<th>金额(元)</th>
						<th>发放状态</th>
						<th>发放年月</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody v-for="item in info">
					<tr v-for="(list,index) in item.prestoreBonusInfo" v-if="item.year!='-'">
						<td v-text="index ? '':item.year "></td>
						<td v-text="list.sendOutType"></td>
						<td v-text="list.realBonus"></td>
						<td :style="list.sendOutStatus=='不发' ? 'color:red':''" v-text="list.sendOutStatus"></td>
						<td v-text="list.actualPayRollYm"></td>
						<td v-text="list.remarks"></td>
					</tr>
					<tr v-if="item.year!='-'" class="success">
						<th>小计</th>
						<th>应发小计</th>
						<td v-text="item.planBonusTotal"></td>
						<th>实发小计</th>
						<td v-text="item.realBonusTotal"></td>
						<td></td>
					</tr>
					<tr v-if="item.year=='-'" class="info">
						<th>合计</th>
						<th>应发合计</th>
						<td v-text="item.planBonusTotal"></td>
						<th>实发合计</th>
						<td v-text="item.realBonusTotal"></td>
						<td></td>
					</tr>
				</tbody>
			</table>
			<button class="btn btn-default" v-on:click="back">返回</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default{
		data(){
			return {
				projectName:'',
				contractId:'',
				loanNo:'',
				info:[]
			}
		},
		components:{
			bPanel
		},
		created(){
			this.projectName = this.$route.query.projectName ;
			this.contractId = this.$route.query.contractId ;
			this.loanNo = this.$route.query.loanNo ;
			this.getInfo();
		},
		methods:{
			getInfo(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getPrestoreBonusTotal',{
					projectId : self.$route.query.projectId ,
					contractId : self.contractId ,
					loanNo : self.loanNo ,
					loginname : self.$route.query.loginname 
				},function(data){
					self.info = data.obj ;
				})
			},
			back(){
				this.$router.go(-1);
			}
		}
	}
</script>