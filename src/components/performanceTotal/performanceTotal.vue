<template>
	<bPanel>
		<div slot="title">
			<span class="back" v-on:click="back">返回</span>
			<h4>绩效奖励详情</h4>			
		</div>
		<div slot="body">
			<bPanel>
				<h4 slot="title">检索条件</h4>
				<div class="fline" slot="body">
					<formg>
						<span slot="tl">统计年月</span>
						<select slot="ct" class="form-control" name="payRollYM" v-model="payRollYM">
							<option v-for="item in ymlist" v-bind:value="item.payRollYM">{{item.payRollYMText}}</option>
						</select>
					</formg>
					<formg>
						<span slot="tl">统计人员</span>
						<select slot="ct" name="loginname" v-model="loginname" class="form-control">
							<option value="">全部人员</option>
							<option v-for="item in userList" v-bind:value="item.loginname">{{item.name}}</option>
						</select>
					</formg>
					<button class="btn btn-primary" style="margin-left:20px;width:100px;" v-on:click="search">查询</button>
				</div>
			</bPanel>
			<bPanel>
				<h4 slot="title">检索结果</h4>
				<div slot="body" style="overflow-x:scroll;">
					<table class="table table-hover table-bordered" style="width:1450px;table-layout:fixed;margin-bottom:0">
						<thead>
							<tr>
								<th style="width:207px;" colspan="3" v-text="payRollYM"></th>
								<th colspan="7" style="width:689px;">项目信息</th>
								<th colspan="6" >绩效奖励信息</th>
								<th style="width:75px"></th>
							</tr>
						</thead>
					</table>
					<table class="table table-hover table-bordered" style="width:1450px;table-layout:fixed;">
						<thead>
							<tr>
								<th class="t_1">所属部门</th>
								<th class="t_1">职务</th>
								<th class="t_1">员工</th>
								<th class="t_2">客户名称</th>
								<th style="width:115px">客户类型</th>
								<th class="t_2">项目名称</th>
								<th class="t_2">合同编号</th>
								<th class="t_2">出账批号</th>
								<th style="width:85px;">放款日期</th>
								<th class="t_1">实收利息(元)</th>
								<th style="width:60px;">奖金比例(%)</th>
								<th class="t_1">应发奖励</th>
								<th class="t_1">实发奖励</th>
								<th class="t_1">发放类型</th>
								<th style="width:45px">发放状态</th>
								<th>说明</th>
								<th style="width:75px;">查看</th>
							</tr>
						</thead>
						<tbody v-for="item in info">
							<tr v-for="(list,index) in item.list">
								<td v-text="!index ? item.department:''"></td>
								<td v-text="!index ? item.job : ''"></td>
								<td v-text="!index ? item.name:''"></td>
								<td v-text="list.customer"></td>
								<td v-text="list.customerType"></td>
								<td v-text="list.projectName"></td>
								<td v-text="list.contractCode"></td>
								<td v-text="list.loanNo"></td>
								<td v-text="list.loanDate"></td>
								<td v-text="list.realInterest"></td>
								<td v-text="list.bonusRate"></td>
								<td v-text="list.planBonus"></td>
								<td v-text="list.realBonus"></td>
								<td v-bind:class="list.type==3 ? 'link':''" v-on:click="list.type==3 ? prestore(list.projectId,list.contractId,list.loanNo,list.projectName,item.loginname):''" v-text="list.type==1 ? '放款奖励': list.type==2 ? '月结奖励': list.type==3 ? '结项预留':''"></td>
								<td v-bind:style="list.state=='不发' ? 'color:red':'' " v-text="list.state"></td>
								<td v-bind:style="list.state!='发放' ? 'color:red':''" v-text="list.desc"></td>
								<td class="link" v-on:click="detail(list)">收款详情</td>
							</tr>
						</tbody>
					</table>
				</div>
			</bPanel>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return {
				ymlist:[],
				userList:[],
				payRollYM:'',
				loginname:'',
				info:[]
			}
		},
		components:{
			bPanel,
			formg
		},
		created(){
			var self = this ;
			this.getymlist();
			self.payRollYM = self.$route.query.payRollYM ;
			self.loginname = self.$route.query.loginname ;
			self.getUserList();
			self.getInfo();
		},
		methods:{
			back(){
				if(this.$route.query.year){
					this.$router.push({
						path:'/',
						query:{
							type:this.$route.query.tp ,
							year:this.$route.query.year,
							val:this.$route.query.val,
							ym:this.$route.query.payRollYM
						}
					});
				}else{
					this.$router.push({
						path:'/',
						query:{
							ym:this.$route.query.payRollYM
						}
					})
				}
			},
			getymlist(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getPayrollYmList',{},function(data){
					self.ymlist = data.obj.yearMonth ;
				},null,{async:false})
			},
			getUserList(){
				var self = this ;
				$api.ajax('/baoliyun/user/getUserList',{
					name:'',
					tel:'',
					affiliatedFactoringEnterpriseId:$api.getUserInfo().affiliatedFactoringEnterpriseId,
					pageSize:9999,
					pageIndex:1
				},function(data){
					self.userList = data.obj ;
				},null,{async:false})
			},
			detail(list){
				//保理项目，放款奖励迁移到【付款管理页面】
				if(list.type ==1 && list.projectType == 1 ){
					$api.openNewPage('../../page/payList.html',{
						projectId:list.projectId,
						back:1
					})
				}
				// 保理项目,利息奖励迁移到应收账款管理-收款明细
				else if(list.type != 1 && list.projectType == 1 ){
					$api.openNewPage('../../page/receivableDetail.html',{
						loanInfoId : list.loanId,
						back:1
					})
				}
				// 担保项目放款奖励 - 放款项目一览
				else if(list.type == 1 && list.projectType == 2){
					this.$router.push({
						path:'/loanRepayList',
						query:{
							projectId : list.projectId
						}
					})
				}
				// 担保项目利息奖励 - 授信放款一览
				else if(list.type != 1 && list.projectType == 2 ){
					this.$router.push({
						path:'/creditloanList',
						query:{
							projectId : list.projectId ,
							companyId : list.companyId ,
							mainPartyId : list.creditMainPartyId ,
							loanNo : list.loanNo
						}
					})
				}
			},
			//
			prestore(st1,st2,st3,st4,st5){
				if(!st2){
					st2=-1;
				}
				this.$router.push({
					path:'/prestoreBonusTotal',
					query:{
						projectId:st1,
						contractId:st2,
						loanNo:st3,
						projectName:st4,
						loginname:st5
					}
				})
			},
			search(){
				this.getInfo();
			},
			getInfo(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getPerformanceTotal',{
					payRollYM : self.payRollYM ,
					loginname : self.loginname
				},function(data){
					self.info = data.obj ;
				})
			}
		}
	}
</script>
<style>
	::-webkit-scrollbar{height:7px;}
	.back{
		color:#1AB394;
		cursor:pointer;
		margin-right:30px;
	}
	h4{
		display: inline
	}
	.t_1{
		width:69px;
	}
	.t_2{
		width:105px;
	}
</style>