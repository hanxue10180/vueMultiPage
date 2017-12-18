<template>
	<bPanel>
		<h4 slot="title" >客户一览</h4>			
		<div slot="body" style="margin:0 auto;width:96%">
			<bTable @getList="getList" ></bTable>
			<div id="toolbar" class="btn-group pull-right">
		        <button   type="button" class="btn btn-default" v-on:click="edit" allow="jxedit" >
		            <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>修改
		        </button>
		        <button   type="button" class="btn btn-default" v-on:click="edit" allow="jxlook" >
		            <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>查看
		        </button>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import bTable from '../../components/bootTable/bootTable.vue'
	export default{
		components:{
			bPanel,
			bTable
		},
		mounted(){
			this.$nextTick(function(){
				$api.checkAllow();
			})
		},
		methods:{
			edit(){
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请先选中要修改的数据');
					return false;
				}
				var _data = JSON.stringify(dataArr[0]) ;
				this.$router.push({
					path:'/edit',
					query:{
						data:_data
					}
				})
			},
			getList(){
				var self = this ;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl +'/baoliyun/performance/getCompanyRecommendList',
					queryParams: function(params){
						return{				
							affiliatedFactoringEnterpriseId:$api.getUserInfo().affiliatedFactoringEnterpriseId,
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
							title: '公司ID',
							field: 'id',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title:'客户名称',
							field:'companyName',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '系统类型',
							field: 'systemType',
							align: 'center',
							valign: 'middle',
							formatter:value => value==1 ? '卖方': value == 2 ? '买方' :''
						},
						{
							title: '客户类型',
							field: 'recommendType',
							align: 'center',
							valign: 'middle',
							formatter:value => value==1 ? '存量客户': value == 2 ? '推荐客户' :''
						},
						{
							title: '推荐人',
							field: 'recommendLoginname',
							align: 'center',
							valign: 'middle'
						}
					]
				});

			}
		}

	}
</script>