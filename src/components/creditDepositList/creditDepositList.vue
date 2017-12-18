<template>
	<div id="creditCompanyList" class="tableBody">
		<bSearch ref="cSear" type="1" @searEvent ="searEvent" :creditMainPartyArr='creditMainPartyArr'></bSearch>
		<div style="margin:0 auto;width:96%">
			<table id="mytab" class="table table-hover" v-on:click="detailEven($event)"></table>	  	
		</div>
	</div>
</template>
<script type="text/javascript">
	import bSearch from '../bootSearch/bootSearch.vue'
	import bTable from '../bootTable/bootTable.vue'
	export default{
		data(){
			return {
				creditMainPartyArr : $api.cMPArr()
			}
		},
		components:{
			bSearch,
			bTable
		},
		mounted(){
			this.getList();
		},
		methods:{
			//查询按钮事件
			searEvent (){
				$('#mytab').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});		    	
			},
			//表格数据信息
			getList (){
				var self = this ;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl + "/baoliyun/guarantee/getCreditDepositList" ,
					queryParams: function(params){
						return{
							creditMainPartyId:self.$refs.cSear.creditMainParty ,
							loginname:$api.getUserInfo().loginname ,
							pageSize: params.limit,
							pageIndex:params.pageNumber
						}
					},
					columns:[
						{
							title: '授信ID',
							field: 'creditId',
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
							title: '授信开始日',
							field: 'creditBeginDay',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '授信结束日',
							field: 'creditEndDay',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '授信额度(元)',
							field: 'creditGuaranteeLine',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '保证金支付方式',
							field: 'depositPayWays',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '不支付' : value == 2 ? '一次性支付' : value==3 ? '按放款单位支付' : '' 
						},
						{
							title: '保证金担付方',
							field: 'depositPayer',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '企业' : value == 2 ? '保理公司' : '' 
						},
						{
							title:'保证金状态',
							field:'depositStatus',
							align: 'center',
							valign: 'middle',
							formatter: value => value == 1 ? '不支付' : value == 2 ? '未支付' : value==3 ? '已支付' : value==4 ? '未收取': value==5 ? '已收取' :'' 
						},
						{
							title:'操作',
							field:'creditId',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
								var _row = JSON.stringify(row)
								return '<span class="detail" row='+ _row +'>详情</span>'
							}
						}
					]
				});
			},
			detailEven(e){
				var el = $(e.target);
				if(el.hasClass('detail')){
					var _row = el.attr('row');
					this.$router.push({
						path : '/creditDepositDetailList',
						query:{
							rowInfo : _row 
						}
					});
				}
			}
		}

	}
</script>
<style>
	.detail{
		color: #1AB394;
    	cursor: pointer;
	}
</style>