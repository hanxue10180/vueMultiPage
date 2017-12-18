<template>
	<div id="loanRepayList" class="tableBody">
		<bSearch ref="lSear" type="2" @searEvent ="searEvent" :creditProjectArr='creditProjectArr' ></bSearch>
		<div style="margin:0 auto;width:96%">
			<table id="mytab" class="table table-hover" ></table>	  	
			<div id="toolbar" class="btn-group pull-right">
				<button  id="btn_info" type="button" class="btn btn-default" v-on:click="editEven(3)" style=" border-radius: 0;display:none;" allow="ywedit,fkedit">
			            <span class="glyphicon glyphicon-usd" aria-hidden="true" ></span> 还款
			        </button>
		        <button  id="btn_look" type="button" class="btn btn-default" v-on:click="editEven(4)" style=" border-radius: 0;display:none;" allow="lrLook">
		            <span class="glyphicon glyphicon-eye-open" aria-hidden="true" ></span> 查看
		        </button>
				 <button  id="btn_edit" type="button" class="btn btn-default" v-on:click="editEven(2)" style=" border-radius: 0;display:none;" allow="ywedit,fkedit">
		            <span class="glyphicon glyphicon-pencil" aria-hidden="true" ></span>修改
		        </button>
		        <button  id="btn_delete" type="button" class="btn btn-default" style="display:none" allow="ywedit">
		            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
		        </button>
		        <button id="btn_add" type="button" class="btn btn-default" allow="ywedit" v-on:click="editEven(1)" >
		            <span class="glyphicon glyphicon-plus" aria-hidden="true"  ></span>新增
		        </button>
			</div>	  	
		</div>
		<button class="btn btn-default" style="margin-top:20px;margin-left:20px;" v-show="back==1" v-on:click="backs">返回</button>
	</div>
</template>
<script type="text/javascript">
	import bSearch from '../../components/bootSearch/bootSearch.vue'
	import bTable  from '../../components/bootTable/bootTable.vue'
	import bToolbar from '../../components/bootToolbar/bootToolbar.vue'
	export default{
		data(){
			return {
				creditProjectArr : $api.gArr(2) ,                                // 担保项目列表
				back:''
			}
		},
		components:{
			bSearch,
			bTable,
			bToolbar
		},
		mounted(){
			if(this.$route.query.projectId){
				this.$refs.lSear.creditProject = this.$route.query.projectId ;
				this.back = 1 ;
			}	
			this.getList();
			$api.checkAllow();	
		},
		methods: {
			//查询按钮事件
			searEvent (){
				$('#mytab').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});		    	
			},
			//表格数据信息
			getList (){
				var self = this ;
				//获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl + "/baoliyun/guarantee/getProjectloanrepayList" ,
					queryParams: function(params){
						return{
							projectId:self.$refs.lSear.creditProject ,
							loginname:$api.getUserInfo().loginname,
							pageSize: params.limit,
							pageIndex:params.pageNumber
						}
					},
					columns:[
						{
			        		title:'',
			        		field:'select',
			        		radio:true,
			        		width:25,
			        		align:'center',
			        		valign:'middle'
			        	},
						{
							title: '业务批号',
							field: 'id',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '业务ID',
							field: 'id2',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '担保项目ID',
							field: 'creditProjectId',
							align: 'center',
							valign: 'middle',
							visible:false
						},
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
							title: '担保企业Id',
							field: 'creditCompanyManageId',
							align: 'center',
							valign: 'middle',
							visible: false
						},
						{
							title: '融资企业名称',
							field: 'creditCompanyManageName',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款主体id',
							field: 'creditMainPartyId',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '放款批号',
							field: 'creditloanNo',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款金额（元）',
							field: 'creditAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '放款日期',
							field: 'loanDate',
							align: 'center',
							valign: 'middle',
							formatter: $api.dateFormat
						},
						{
							title: '处理状态',
							field: 'processStatus',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
								var _status =row.businessStatus == 1 ? '放款中' : row.businessStatus == 2 ? '待还款' :  row.businessStatus == 3 ? '还款中' : row.businessStatus == 4 ? '已还款' : '-';
								var _value = value == 1 ? '业务待办中' : value == 2 ? '风控确认中' : value == 3 ? '业务修改中' : value == 4 ? '风控已确认' : '-'
								return '('+_status+')'+_value 
							}
						},
						{
							title: '',
							field: 'businessStatus',
							align: 'center',
							valign: 'middle',
							visible: false
						},
						{
							title: '还款金额（元）',
							field: 'repamentAmount',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '还款日期',
							field: 'repayDate',
							align: 'center',
							valign: 'middle',
							formatter:value => value? $api.dateFormat(value) : '-'
						}
					],
					onRefreshOptions(){
				    	$('#btn_edit').css('display','none');
						$('#btn_delete').css('display','none');
						$('#btn_info').css('display','none');
			    	},
			    	onRefresh(){
				    	$('#btn_edit').css('display','none');
						$('#btn_delete').css('display','none');
						$('#btn_info').css('display','none');
			    	}
				});

				$('#mytab').change(function(){
			    	var dataArr=$('#mytab').bootstrapTable('getSelections');
			    	if(dataArr.length){
			    		if(dataArr[0].businessStatus ==1 ){
							//修改按钮出现
			    			$('#btn_edit').css('display','block').removeClass('fadeOutRight').addClass('animated fadeInRight');
			    			$('#btn_info').css('display','none');
			    		}else{
			    			$('#btn_edit').css('display','none');
			    			$('#btn_info').css('display','block').removeClass('fadeOutRight').addClass('animated fadeInRight');
			    		}
			    		$('#btn_delete').css('display','block').removeClass('fadeOutRight').addClass('animated fadeInRight');
			    		$('#btn_look').css('display','block').removeClass('fadeOutRight').addClass('animated fadeInRight');
			    	}
			    	$api.checkAllow();   
			    }); 
				$api.delEven('#mytab','/baoliyun/guarantee/delProjectloanrepay');

			},
			//新增/修改按钮
			editEven(num){
				var sInfo = {
					id: -1 ,
					id2:-1 ,
					bstatus :1,
					pstatus:1 
				} ;
				if(num!=1){
					sInfo.id=$('#mytab').bootstrapTable('getSelections')[0].id ;
					sInfo.id2 = $('#mytab').bootstrapTable('getSelections')[0].id2 ;
					sInfo.bstatus = $('#mytab').bootstrapTable('getSelections')[0].businessStatus ;
					sInfo.pstatus = $('#mytab').bootstrapTable('getSelections')[0].processStatus ;
				}
				this.$router.push({
					path : '/edit',
					query: sInfo
				});
			},
			backs(){
				this.$router.go(-1);
			}
		}
	}
</script>