<template>
	<div id="creditCompanyList" class="tableBody">
		<bSearch ref="cSear" type="7" @searEvent ="searEvent" :creditMainPartyArr='creditMainPartyArr' :creditProjectArr='creditProjectArr' :companyArr='companyArr' ></bSearch>
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
				creditMainPartyArr : $api.cMPArr(),
				creditProjectArr : $api.gArr(2),
				companyArr : $api.cArr()
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
					url:$api.baseUrl + "/baoliyun/guarantee/getCreditCompanyList" ,
					queryParams: function(params){
						return{
							creditProjectId:self.$refs.cSear.creditProject ,
							creditCompanyId:self.$refs.cSear.company ,
							creditMainPartyId:self.$refs.cSear.creditMainParty ,
							loginname:$api.getUserInfo().loginname ,
							pageSize: params.limit,
							pageIndex:params.pageNumber
						}
					},
					columns:[
						{
							title: '放款主体名称',
							field: 'creditMainPartyName',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '担保项目名称',
							field: 'creditProjectName',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '担保企业名称',
							field: 'creditCompanyManageName',
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
							title: '授信额度(元)',
							field: 'creditGuaranteeLine',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '担保项目ID',
							field: 'creditProjectId',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '担保企业id',
							field: 'creditcompanyId',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title:'操作',
							field:'creditId',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
								var _row = JSON.stringify(row) ;
								return '<span class="detail" row='+_row +'>详情</span>'
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
						path : '/creditloanList',
						query:{
							creditCompanyInfo : _row 
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