<template>
	<bPanel>
		<div slot="title">
			<span class="back" v-on:click="back">返回</span>
			<h4>授信放款一览</h4>			
		</div>
		<div slot="body">
			<creditCompanyInfo :cInfo="cInfo"></creditCompanyInfo>
			<bPanel>
				<h4 slot="title">查询条件</h4>
				<div slot="body">
					<button class="btn btn-primary pull-right" v-on:click="searEvent" style="width:100px;">查询</button>
		            <div class="pull-right form-group" style="margin-right:20px;">
		            	<select class="form-control" v-model="loanNo" style="font-size:14px; height:34px;width:160px;">
		            		<option value=''>放款批号</option>
		            		<option v-for="item in loanNoList" v-bind:value="item" v-text="item"></option>
		            	</select>
		            </div>
				</div>
			</bPanel>
			<div style="margin:0 auto;width:96%">
				<table id="mytab" class="table table-hover" v-on:click="go($event)"></table>	
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import creditCompanyInfo from '../creditCompanyInfo/creditCompanyInfo.vue'
	export default{
		data(){
			return {
				cInfo:{},
				loanNoList:[],
				loanNo:''
			}
		},
		components:{
			bPanel,
			creditCompanyInfo
		},
		created(){
			var self = this ;
			if(self.$route.query.projectId){
				//先获取融资企业信息
				$api.ajax('/baoliyun/guarantee/getCreditCompanyList',{
					creditProjectId : self.$route.query.projectId ,
					creditCompanyId :  self.$route.query.companyId ,
					creditMainPartyId : self.$route.query.mainPartyId,
					pageSize:999,
					pageIndex:1
				},function(data){
					self.cInfo = data.obj[0] ;
				},null,{async:false})
				//赋值放款批号
				self.loanNo = self.$route.query.loanNo ;
			}else{
				//带人融资企业信息
				self.cInfo = JSON.parse(self.$route.query.creditCompanyInfo) ;
			}	
			//获取放款批号列表
			$api.ajax('/baoliyun/guarantee/getloanNoBy',{
				creditProjectId : self.cInfo.creditProjectId ,
				creditCompanyId : self.cInfo.creditcompanyId
			},function(data){
				self.loanNoList = data.obj ;
			})		
		},
		mounted(){
			this.getList();
		},
		methods:{
			//查询按钮事件
			searEvent (){
				$('#mytab').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});		    	
			},
			//跳转事件
			go(e){
				var el = $(e.target);
				var _info1 = JSON.stringify($api.vueToObj(this.cInfo) );
				var _info2 = el.attr('data');
				var _info = {
					info1:_info1,
					info2:_info2
				}
				//担保费计划
				if(el.hasClass('gplan')){
					_info.num = 2 ;
					this.$router.push({
						path : '/guaranteeFeeList',
						query:_info
					});
				}
				//担保费收取状态
				else if(el.hasClass('glist')){
					_info.num = 1
					this.$router.push({
						path : '/guaranteeFeeList',
						query:_info
					});
				}
				//保证金状态
				else if(el.hasClass('dlist')){
					_info.num = 1
					this.$router.push({
						path : '/depositList',
						query:_info
					});
				}
				//保证金计划
				else if(el.hasClass('dplan')){
					_info.num = 2
					this.$router.push({
						path : '/depositList',
						query:_info
					});
				}
				//第三方费用一览
				else if(el.hasClass('planList3')){
					this.$router.push({
						path : '/thirdPartyList',
						query:_info
					});
				}
			},
			back(){
				if(this.$route.query.projectId){
					this.$router.go(-1);
				}else{
					this.$router.push({
						path:'/'
					});
				}
			},
			getList(){
				var self = this ;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl + "/baoliyun/guarantee/getCreditloanList" ,
					queryParams: function(params){
						return{
							creditProjectId:self.cInfo.creditProjectId ,
							creditCompanyId:self.cInfo.creditcompanyId ,
							creditloanNo: self.loanNo ,
							loginname:$api.getUserInfo().loginname ,
							pageSize: params.limit,
							pageIndex:params.pageNumber
						}
					},
					columns:[
						{
							title: '放款批号',
							field: 'creditloanNo',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款金额',
							field: 'amount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款日',
							field: 'loanDate',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '还款日',
							field: 'repaymentExpectDay',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '担保费计划',
							field: 'guaranteePlanStatus',
							align: 'center',
							valign: 'middle',
							formatter: function(value,row){
								return  value == 1 ? "<span class='gplan' data='"+JSON.stringify(row)+"'>业务待办中</span>" : value == 2 ? "<span class='gplan' data='"+JSON.stringify(row)+" '> 财务确认中</span>" : value == 3 ? "<span class='gplan' data='"+JSON.stringify(row)+" '>业务修改中</span>" : value == 4 ? "<span class='gplan' data='"+JSON.stringify(row)+"' >财务已确认</span>" : value == 0 && row.guaranteePlanWays==1 ? "<span class='gplan' data='"+JSON.stringify(row)+"' >未生成</span>" : value == 0 && row.guaranteePlanWays==2 ? "<span class='gplan' data='"+JSON.stringify(row)+"' >已生成</span>" :''
							}
						},
						{
							title: '担保费收取状态',
							field: 'guaranteeStatus',
							align: 'center',
							valign: 'middle',
							formatter: function(value,row){
								return  value == 1 ? "<span class='glist' data='"+JSON.stringify(row)+"'>未收取</span>" : value == 2 ? "<span class='glist' data='"+JSON.stringify(row)+"'>收取中</span>" : value == 3 ? "<span class='glist' data='"+JSON.stringify(row)+"'>已收取</span>" : "——"
							}
						},
						{
							title: '保证金担负方',
							field: 'depositPayer',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '企业' : value == 2 ? '保理公司' : '——'
						},
						{
							title:'保证金计划',
							field:'depositPlanStatus',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
								return  self.cInfo.depositPayWays==2 || self.cInfo.depositPayWays==1 ? '——': value == 1 ? "<span class='dplan' data='"+JSON.stringify(row)+"'>业务待办中</span>" : value == 2 ? "<span class='dplan' data='"+JSON.stringify(row)+" '> 财务确认中</span>" : value == 3 ? "<span class='dplan' data='"+JSON.stringify(row)+" '>业务修改中</span>" : value == 4 ? "<span class='dplan' data='"+JSON.stringify(row)+"' >财务已确认</span>" : value == 0 && row.depositWays==1 ? "<span class='dplan' data='"+JSON.stringify(row)+"' >未生成</span>" : value == 0 && row.depositWays==2 ? "<span class='dplan' data='"+JSON.stringify(row)+"' >已生成</span>" :''
							} 
						},
						{
							title: '保证金一览',
							field: 'depositStatus',
							align: 'center',
							valign: 'middle',
							formatter: function(value,row){
								return self.cInfo.depositPayWays==1 || self.cInfo.depositPayWays==2 ? "——" : "<span class='dlist' data='"+JSON.stringify(row)+"'> 详细</span>"
							}
						},
						{
							title: '第三方费用支付状态',
							field: 'thirdPartyFeeStatus',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '不支付' : value == 2 ? '未支付' : value == 3 ? '支付中' : value == 4 ? '已支付' : '——'
						},
						{
							title:'第三方费用一览',
							field:'creditCompanyManageId',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
								return row.thirdPartyFeeStatus==1 ? '——':"<span class='planList3' data='"+JSON.stringify(row)+"'>详细</span>"
							} 
						},
						{
							title: '业务类型',
							field: 'businessType',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '担保费率%按年化算出',
							field: 'guaranteeRatio',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '担保费收取方式',
							field: 'guaranteereceivableWays',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '担保费预计收取日一次性收取时填写',
							field: 'guaranteereceivableDay',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '预计收取保证金',
							field: 'preDepositAmount',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '保证金预定支付日',
							field: 'depositPrePayDate',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '第三方费率%按年化算出',
							field: 'thirdPartyRatio',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '担保费计划生成方式1手动录入，2系统生成',
							field: 'guaranteePlanWays',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '保证金生成方式1手动录入，2系统生成',
							field: 'depositWays',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '操作日期',
							field: 'operateDate',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '备考',
							field: 'remarks',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '处理状态 1业务待办中，2风控确认中，3业务修改中，4风控已确认',
							field: 'processStatus',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '操作金额',
							field: 'operateAmount',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '放款还款状态',
							field: 'loanStatus',
							align: 'center',
							valign: 'middle',
							visible:false
						}
					]
				})
			}
		}
	}
</script>
<style>
	.panel{
		margin-bottom:0px;	    
	}
	.back{
		color:#1AB394;
		cursor:pointer;
		margin-right:30px;
	}
	h4{
		display: inline
	}
	.gplan,.glist,.dlist,.dplan,.planList3{
		color: #1AB394;
    	cursor: pointer;
	}    
</style>