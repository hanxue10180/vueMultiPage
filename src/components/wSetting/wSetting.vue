<template>
	<bPanel>
		<h4 slot="title" >员工一览</h4>			
		<div slot="body" style="margin:0 auto;width:96%">
			<bTable @getList="getList" ></bTable>
			<div id="toolbar" class="btn-group pull-right">
		        <button   type="button" class="btn btn-default" v-on:click="edit(2)" allow="jxedit">
		            <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>修改
		        </button>
		        <button   type="button" class="btn btn-default" v-on:click="edit(2)" allow="jxlook">
		            <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>查看
		        </button>
		        <button type="button" class="btn btn-default" v-on:click="del"  allow="jxedit">
		            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
		        </button>
		        <button  type="button" class="btn btn-default"  v-on:click="edit(1)"  allow="jxedit">
		            <span class="glyphicon glyphicon-plus" aria-hidden="true"  ></span>新增
		        </button>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../../components/bootstrapPanel/bootstrapPanel.vue'
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
			edit(num){
				var _id = -1 ;
				var _loginname = '' ;
				if(num == 2){
					var dataArr=$('#mytab').bootstrapTable('getSelections');
					if(!dataArr.length){
						toast.err('请先选中员工');
						return false;
					}
					_id = dataArr[0].id ;
					_loginname = dataArr[0].loginname ;				
				}
				this.$router.push({
					path:'/edit',
					query:{
						id:_id,
						loginname:_loginname
					}
				})
			},
			del(){
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请先选中员工');
					return false;
				}
				$api.confirm('确定要删除吗',function(){
					$api.ajax('/baoliyun/performance/delPayroll',{
						id:dataArr[0].id
					},function(data){
						$('.popup_de').remove();
	        			$api.alert('删除成功');
	    				$('#mytab').bootstrapTable('refresh');
					},function(data){
						$('.popup_de').remove();
						$api.alert(data.msg);
					})
				})
			},
			getList(){
				var self = this ;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl + "/baoliyun/performance/getPayrollList" ,
					queryParams: function(params){
						return{
							affiliatedFactoringEnterpriseId : $api.getUserInfo().affiliatedFactoringEnterpriseId ,
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
							title:'公司职务',
							field:'job',
							align: 'center',
							valign: 'middle'
						},
						{
							title:'员工姓名',
							field:'name',
							align:'center',
							valign:'middle'
						},
						{
							title: '基本工资',
							field: 'rollAdjustedAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '岗位津贴',
							field: 'allowanceAdjustedAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '调整ID',
							field: 'id',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '员工ID',
							field: 'loginname',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '调整日期',
							field: 'adjustDate',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '生效日期',
							field: 'availabilityDate',
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
							title: '作成时间',
							field: 'createTime',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '作成者',
							field: 'createUser',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '更新时间',
							field: 'updateTime',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '更新者',
							field: 'updateUser',
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
