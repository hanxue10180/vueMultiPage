<template>
	<bPanel>
		<h4 slot="title">项目净收益统计</h4>
		<div slot="body">
			<p>《关于数据统计显示说明》</p>
			<p>保理、担保项目：项目放款单位全部本息结清的次月统计数据显示。（注：项目放款中未回款在统计显示范围外）</p>
			<p>再转让项目：本金利息全部结清时点再转让部分的统计数据显示。</p>
			<ul class="nav nav-tabs">
				<li class="active"><a href="#factoringProject" data-toggle="tab">保理项目</a></li>
				<li><a href="#guaranteeProject" data-toggle="tab">担保项目</a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane fade in active" id="factoringProject">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>项目类型</th>
								<th>项目名称</th>
								<th>本金回款情况</th>
								<th>收入总额</th>
								<th>支出总额</th>
								<th>统计日</th>
								<th>是否转让</th>
								<th>转让金额情况</th>
								<th>转让支出总额</th>
								<th>净利润</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in list1">
								<td v-text="item.projectType"></td>
								<td v-text="item.projectName"></td>
								<td v-text="item.projectType=='合计' ? '' : item.totalLoanAmount!=null && item.totalRepayAmount!=null  ? item.totalLoanAmount+'万/'+item.totalRepayAmount+'万' :'-'"></td>
								<td v-bind:class="item.totalLoanAmount!=null && item.totalRepayAmount!=null ? 'link':''" v-text="item.projectType=='合计' || (item.totalLoanAmount!=null && item.totalRepayAmount!=null) ? item.totalIncomeAmount :'-'" v-on:click="item.totalLoanAmount!=null && item.totalRepayAmount!=null ? detail(1,item.projectId) :''"></td>
								<td v-bind:class="item.totalLoanAmount!=null && item.totalRepayAmount!=null ? 'link':''" v-text="item.projectType=='合计' || (item.totalLoanAmount!=null && item.totalRepayAmount!=null) ? item.totalExpensesAmount : '-'" v-on:click="item.totalLoanAmount && item.totalRepayAmount ? detail(2,item.projectId):''"></td>
								<td v-text="item.projectType=='合计' ? '' : item.totalLoanAmount!=null && item.totalRepayAmount!=null ?  item.statisticsDay :'-' "></td>
								<td v-text="item.projectType=='合计' ? '' : item.ifTransfer"></td>
								<td v-text="item.projectType=='合计' ? '' : (item.transferOutAmount !=null && item.transferInAmount!=null ) ? item.transferOutAmount+'万/'+item.transferInAmount+'万': '-'"></td>
								<td v-bind:class="item.transferOutProfit && item.projectType!='合计'  ? 'link':''" v-text="item.transferOutProfit ? item.transferOutProfit : '-'" v-on:click="item.transferOutProfit && item.projectType!='合计'  ? detail(3,item.projectId,item.projectName):''"></td>
								<td v-text="item.totalNetProfit"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="tab-pane fade" id="guaranteeProject">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>项目类型</th>
								<th>项目名称</th>
								<th>本金回款情况</th>
								<th>收入总额</th>
								<th>支出总额</th>
								<th>统计日</th>
								<th>净利润</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in list2">
								<td v-text="item.projectType"></td>
								<td v-text="item.projectName"></td>
								<td v-text="item.projectType=='合计' ? '' : item.totalLoanAmount+'万/'+item.totalRepayAmount+'万'"></td>
								<td v-bind:class="item.projectType!='合计'  ? 'link':''" v-text="item.totalIncomeAmount" v-on:click="item.projectType!='合计' ? detail(1,item.projectId) : ''"></td>
								<td v-bind:class="item.projectType!='合计'  ? 'link':''" v-text="item.totalExpensesAmount" v-on:click="item.projectType!='合计' ? detail(2,item.projectId):''"></td>
								<td v-text=" item.statisticsDay"></td>
								<td v-text="item.totalNetProfit"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<modal >
				<h4 slot="titles">项目净收益统计详细</h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover" >
						<thead>
							<tr>
								<th>项目类型</th>
								<th>项目名称</th>
								<th>一级分类</th>
								<th>二级分类</th>
								<th>收支区分</th>
								<th>金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist">
								<td v-text="item.projectType"></td>
								<td v-text="item.projectName"></td>
								<td v-text="item.firstType"></td>
								<td v-text="item.secondaryType"></td>
								<td v-text="item.expensesReceiptTypeTxt"></td>
								<td v-text="item.total"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</modal>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import modal from '../modal/modal.vue'
	export default {
		data(){
			return {
				list1:[],
				list2:[],
				type:1,
				dlist:[]
			}
		},
		components:{
			bPanel,
			modal
		},
		created(){
			this.getList(1);
			this.getList(2);
		},
		mounted(){
			var self = this ;
			self.$nextTick(function(){
				//监听tab页切换事件
				$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		        	// 获取已激活的标签页的名称
		            var activeTab = $(e.target).text();
		            if(activeTab == '保理项目'){
		            	self.type = 1 ;
		            }else{
		            	self.type = 2 ;
		            }
	            })
			});
		},
		methods:{
			getList(type){
				var self = this ;
				$api.ajax('/baoliyun/report/getNetProfitStatistics',{
					projectType:type
				},function(data){
					if(type==1)
						self.list1 = data.obj ;
					else
						self.list2 = data.obj ;
				})
			},
			detail(num,pid,pName){
				var self = this ;
				$api.ajax('/baoliyun/report/getNetProfitStatisticsDetail',{
					projectId : pid,
					selType : num==3 ? 3 : self.type,
					expensesReceiptType:num==3 ? 2 : num ,
					projectName : pName
				},function(data){
					self.dlist = data.obj ;
					$('#myModal').modal({backdrop: 'static', keyboard: false}); 
				},function(data){
					toast.err(data.msg);
				})
			}
		}
	}
</script>
<style>
	td,th{
		text-align:center;
	}
	.link{
		color:#1AB394;
		cursor:pointer;
	}
</style>