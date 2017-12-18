<template>
	<bPanel>
		<div slot="title">
			<span class="back" v-on:click="back">返回</span>
			<h4>授信保证金一览详细</h4>			
		</div>
		<div slot="body">
			<div id="creditCompanyList" class="tableBody">
				<div style="margin:0 auto;width:96%">
					<table id="mytab" class="table table-hover" v-on:click="detailEven($event)"></table><div id="toolbar" class="btn-group pull-right">
						<button  type="button" class="btn btn-default" v-on:click="add(1)" style=" border-radius:0;" allow="szywgedit">新增</button>
			        	<button  type="button" class="btn btn-default" v-on:click="add(2)" allow="szywgedit">收款</button>
			        	<button  type="button" class="btn btn-default"  v-on:click="del" allow="szywgedit">删除 </button>
	        		</div>	
				</div>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bSearch from '../bootSearch/bootSearch.vue'
	import bTable from '../bootTable/bootTable.vue'
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default{
		components:{
			bSearch,
			bTable,
			bPanel
		},
		mounted(){
			this.getList();
			$api.checkAllow();
		},
		methods:{
			back(){
				this.$router.push({
					path:'/'
				});
			},
			//查询按钮事件
			searEvent (){
				$('#mytab').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});		    	
			},
			//表格数据信息
			getList (){
				var self = this;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl + "/baoliyun/guarantee/getCreditDepositDetailList" ,
					queryParams: function(params){
						return {
							creditId:JSON.parse(self.$route.query.rowInfo).creditId,
							loginname:$api.getUserInfo().loginname ,
							pageSize: params.limit,
							pageIndex:params.pageNumber
						}
					},
					columns:[
						{
							title: '',
							field: 'select',
							radio: 'true',
							width: 25,
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款主体名称',
							field: 'creditMainPartyName',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '收支ID',
							field: 'payId',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '保证金担负方',
							field: 'depositPayer',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '企业' : value == 2 ? '保理公司' : '' 
						},
						{
							title: '费用类别',
							field: 'feeType',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '担保费' : value == 2 ? '保证金' : value==3 ? '第三方费用' : '' 
						},
						{
							title: '收支区分',
							field: 'expensesReceiptType',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '收' : value == 2 ? '支' : '' 
						},
						{
							title:'放款批号',
							field:'loanNo',
							visible:false
						},
						{
							title: '对应的收支ID',
							field: 'payIdTo',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '预定保证金(元)',
							field: 'preDepositAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '预定支付日',
							field: 'depositPrePayDate',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '金额(元)',
							field: 'operateAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '日期',
							field: 'operateDate',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat

						},
						{
							title: '状态',
							field: 'creditProcessStatus',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
								var _data = value ;
								var _id = row.payId ;
								return  _data == 1 ? "<span class='detail' data='"+JSON.stringify(row)+"' state='"+_data+"' _id='"+_id+"' >业务待办中</span>" : _data == 2 ? "<span class='detail' data='"+JSON.stringify(row)+"' state='"+_data+"' _id='"+_id+"' > 财务确认中</span>" : _data == 3 ? "<span class='detail' data='"+JSON.stringify(row)+"' state='"+_data+"' _id='"+_id+"' >业务修改中</span>" : _data == 4 ? "<span class='detail' data='"+JSON.stringify(row )+"' state='"+_data+"' _id='"+_id+"' >财务已确认</span>" : ''
							}
						}
					]
				});
			},
			detailEven(e){
				var el = $(e.target);
				if(el.hasClass('detail')){
					var _info = el.attr('data');
					var _id = el.attr('_id');
					var _state = el.attr('state') ;
					this.$router.push({
						path : '/depositInOutEdit',
						query:{
							info:_info,
							info1:this.$route.query.rowInfo,
							info2:_info,
							id:_id,
							state:_state,
							type:1
						}
					});
				}
			},
			add(num){
				if(num==2){
					var dataArr=$('#mytab').bootstrapTable('getSelections');
					if(!dataArr.length){
						toast.err('请先选中计划');
						return false;
					}else if(dataArr[0].expensesReceiptType == 1 ){
						toast.err('该计划收支状态为收，不能进行收款操作');
						return false
					}else if(dataArr[0].creditProcessStatus!=4){
						toast.err('财务已确认状态才可进行收款操作');
						return false
					}else{
						this.$router.push({
							path : '/depositInOutEdit',
							query:{
								info1:this.$route.query.rowInfo,
								id:dataArr[0].payId,
								preDepositAmount:dataArr[0].preDepositAmount,
								depositPrePayDate:dataArr[0].depositPrePayDate,
								type:1
							}
						});
					}
				}else{
					this.$router.push({
						path : '/depositInOutEdit',
						query:{
							info1:this.$route.query.rowInfo,
							id:-1,
							type:1
						}
					});
				}
			},
			del(){
				var self = this ;
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请先选中要删除的计划');
					return false;
				}
				$api.confirm('确定要删除该计划吗',function(){
					$api.ajax('/baoliyun/guarantee/delInOut',{
						id:dataArr[0].payId
					},function(data){
						$('.popup_de').remove();
						$api.alert('删除成功');
						self.searEvent();
					},function(data){
						$('.popup_de').remove();
						$api.alert(data.msg);
					})
				})
			}
		}

	}
</script>
<style>
	.detail{
		color: #1AB394;
    	cursor: pointer;
	}
	.back{
		color:#1AB394;
		cursor:pointer;
		margin-right:30px;
	}
	h4{
		display: inline
	}
</style>