<template>
	<bPanel>
		<div slot="title">
			<span class="back" v-on:click="back">返回</span>
			<h4>授信放款第三方一览</h4>			
		</div>
		<div slot="body">
			<creditCompanyInfo :cInfo="info1"></creditCompanyInfo>
			<div style="margin:0 auto;width:96%">
				<table id="mytab" class="table table-hover" v-on:click="go($event)"></table>
				<div id="toolbar" class="btn-group pull-right">
					<button  type="button" class="btn btn-default" v-on:click="submit" style=" border-radius:0;" allow="szywedit">多笔提交</button>
	        	</div>
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
				info1:{},
				info2:{}
			}
		},
		components:{
			bPanel,
			creditCompanyInfo
		},
		created(){
			var self = this ;
			self.info1 = JSON.parse(self.$route.query.info1);
			self.info2 = JSON.parse(self.$route.query.info2);
		},
		mounted(){
			this.getList();
			$api.checkAllow();
		},
		methods:{
			back(){
				this.$router.push({
					path : '/creditloanList',
					query:{
						creditCompanyInfo : this.$route.query.info1
					}
				});
			},
			go(e){
				var el = $(e.target);
				if(el.hasClass('plan')){
					var _ids = JSON.stringify([el.attr('_id')]);
					this.$router.push({
						path:'/tPMInOutEdit',
						query:{
							ids : _ids,
							info1:this.$route.query.info1,
							info2:this.$route.query.info2
						}
					})
				}
			},
			submit(){
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				var _ids = [] ;
				if(!dataArr.length){
					toast.err('请先选中要提交的数据');
					return false;
				}
				for(var i=0;i<dataArr.length;i++){
					//判断状态
					if(dataArr[0].incomes[0].state != dataArr[i].incomes[0].state){
						toast.err('选中的数据状态不一致，不能进行同时提交');
						return false ;
					}                                               
					_ids[i]=dataArr[i].incomes[0].incomeExpensesId ;
				}
				this.$router.push({
					path:'/tPMInOutEdit',
					query:{
						ids : JSON.stringify(_ids),
						info1:this.$route.query.info1,
						info2:this.$route.query.info2
					}
				})
			},
			getList(){
				var self = this ;
				// 获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl+'/baoliyun/guarantee/getReceivablesPlanList',
					height:'auto',
					dataField: "obj",
					pagination:false,
					queryParams: function(params){
						return{
							feeType:3,
							creditloanNo:self.info2.creditloanNo,
							loginname:$api.getUserInfo().loginname
						}
					},
					columns:[
						{
							title: '',
							field: 'select',
							checkbox: 'true',
							width: 25,
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款批号',
							field: 'loanNo',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款金额（元）',
							field: 'loanAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '计划ID',
							field: 'id',
							align: 'center',
							valign:'middle'
						},
						{
							title:'费用类别',
							field:'feeType',
							align:'center',
							valign:'middle',
							formatter:value => value==1 ? '担保费': value== 2 ? '保证金': value == 3 ? '第三方费用' : '-'
						},
						{
							title: '收支区分',
							field: 'expensesReceiptType',
							align: 'center',
							valign: 'middle',
							formatter:value => value==1 ? '收' : value == 2 ? '支' : ''
						},
						{
							title: '第三方名称',
							field: 'thirdPartyName',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '第三方费率%',
							field: 'loanThirdPartyRatio',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '系统算出费用',
							field: 'expectFee',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '计息日',
							field: 'currentPeriodInterestBearingDate',
							align: 'center',
							valign: 'middle',
							formatter: $api.dateFormat
						},
						{
							title: '结息日',
							field: 'currentPeriodSettlementDate',
							align: 'center',
							valign: 'middle',
							formatter: $api.dateFormat
						},
						{
							title: '金额（元）',
							field: 'operateAmount',
							align: 'center',
							valign: 'middle',
							formatter:value => value ? value : 0
						},
						{
							title: '日期',
							field: 'operateDate',
							align: 'center',
							valign: 'middle',
							formatter: $api.dateFormat
						},
						{
							title: '处理状态',
							field: 'incomes',
							align: 'center',
							valign: 'middle',
							formatter: function(value,row){
								var _data = value ? value[0].state : 1 ;
								var _id = value ? value[0].incomeExpensesId : -1
								return  _data == 1 ? "<span class='plan' data='"+JSON.stringify(row)+"' state='"+_data+"' _id='"+_id+"' >业务待办中</span>" : _data == 2 ? "<span class='plan' data='"+JSON.stringify(row)+"' state='"+_data+"' _id='"+_id+"' > 财务确认中</span>" : _data == 3 ? "<span class='plan' data='"+JSON.stringify(row)+"' state='"+_data+"' _id='"+_id+"' >业务修改中</span>" : _data == 4 ? "<span class='plan' data='"+JSON.stringify(row )+"' state='"+_data+"' _id='"+_id+"' >财务已确认</span>" : ''
							}
						},
						{
							title: '生成方式分类1手动录入，2系统生成',
							field: 'inOutWays',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '费用类型1担保费，2保证金，3第三方费用',
							field: 'feeType',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '对应的支付ID',
							field: 'payId',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '对应的支付ID列表',
							field: 'payIds',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '预计收款期数',
							field: 'expectReceivablesPeriods',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '收支id',
							field: 'incomes',
							align: 'center',
							valign: 'middle',
							visible:false
						}
					]
				});

			}
		}
	}
</script>
<style>
	.plan{
		color: #1AB394;
    	cursor: pointer;
	}
</style>