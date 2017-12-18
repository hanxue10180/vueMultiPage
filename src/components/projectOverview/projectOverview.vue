<template>
	<div class="tableBody">
		<bSearch ref="bsear" @searEvent="searEvent"></bSearch>
		<div class="btable">
		  	<table id="mytab" class="table table-hover" v-on:click="flowIconEven($event)"></table>	
		  	<div class="status">
		  		<span>当前流程状态说明：</span>
		  		<span><span class="tbn handling"></span> 处理中</span>
		  		<span><span class="tbn ended"></span> 已结束</span>
		  		<span><span class="tbn cancel"></span> 已撤销</span>
		  	</div>
		  	<div id="toolbar" class="btn-group pull-right">
		  		<button id="projectAdd" type="button" class="btn btn-default" v-on:click="projectAdd" allow="guaranteeFlowAdd">
	                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>发起担保流程
	            </button>
	            <button id="projectDel" type="button" class="btn btn-default" allow="guaranteeFlowDel" v-on:click="projectDel">
	                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>项目撤销
	            </button>
        	</div>
       	</div>
    </div>	
</template>
<script type="text/javascript">
	import bSearch from '../projectBSearch/projectBSearch.vue'
	import bTable from '../bootTable/bootTable.vue'
 	export default {
		components:{
			bSearch,
			bTable
		},
		mounted(){
			var self = this ;
			$api.checkAllow() ;
			//获取表单数据
			$api.table('#mytab',{
				url:$api.baseUrl+"/baoliyun/guarantee/getProjectListBy",
		    	queryParams:function(params){
		    		return{
		    			projectId:self.$refs.bsear.projectId,
		    			projectStatus:self.$refs.bsear.projectStatus,
		    			loginname:$api.getUserInfo().loginname,
		        		pageSize: params.limit,
		        		pageIndex:params.pageNumber
		        	}
		        },
				columns:[
		        	{
		        		title:'全选',
		        		field:'select',
		        		radio:true,
		        		width:25,
		        		align:'center',
		        		valign:'middle'
		        	},
		        	{
		        		title:'ID',
		        		field:'id',
		        		visible:false
		        	},
		        	{
		        		title:'授信ID',
		        		field:'creditId',
		        		visible:false
		        	},
		        	{
		        		title:'项目编号',
		        		field:'projectNumber'
		        	},
		        	{
		        		title:'项目名称',
		        		field:'projectName'
		        	},
		        	{
		        		title:'创建时间',
		        		field:'projectStartDate'
		        	},
		        	{
		        		title:'项目状态',
		        		field:'projectStatus',
		        		formatter: value => value==1 ? '立项中' : value == 2 ? '已立项' : value == 3 ? '项目终止' : value == 4 ? '项目撤销' : '-'
		        	},
		        	{
		        		title:'担保流程',
		        		field:'flow',
		        		formatter: function(value,row){
		        			var _html='';
							for(var i=0;i<value.length;i++){
								var _cls=''
								if(value[i].state==1){
									_cls="tbn handling";
								}else if(value[i].state==2){
									_cls="tbn ended";
								}else if(value[i].state==3){
									_cls="tbn cancel"
								}
								if(value[i].enable == 'true'){
									_html+='<span class="'+_cls+'" flowNumber="'+value[i].flowNumber+'" projectId="'+row.id+'">'+(i+1)+'</span>';
								}
								
							}
							return _html
		        		}
		        	}			        	
		    	]
			})
		},
		methods:{
			//查询按钮事件
			searEvent (){
				$('#mytab').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});		    	
			},
			//发起担保流程按钮事件
			projectAdd(){
				this.$router.push({
					path:'/personnelAssign',
					query:{
						creditProjectId :-1,
						flowNumber : -1
					}
				})
			},
			//项目撤销
			projectDel(){
				var dataArr = $('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请选中要撤销的项目');
					return false
				}
				$api.confirm('确定撤销吗',function(){
					$api.ajax('/baoliyun/guarantee/repealCreditProject',{
						creditProjectId : dataArr[0].id
					},function(data){
						$('.popup_de').remove();
	        			$api.alert('撤销成功');
						$('#mytab').bootstrapTable('refresh');
					},function(data){
		        		$api.alert(data.msg);
		        	})
				})
			},
			//流程图标点击事件
			flowIconEven(e){
				var el = $(e.target);
				if(el.hasClass('tbn')){
					var pId = el.attr('projectId');
					var fNum = el.attr('flowNumber');
					this.$router.push({
						path : '/flowList',
						query:{
							creditProjectId : pId ,
							flowNumber:fNum
						}
					});
				}
			}
		}
	}
</script>

<style lang='less'>
	@white:#fff ;
	.btable{
		margin:0 auto;
		width:96%;
		position:relative;
		.status{
			position:absolute; 
			top:10px; 
			left:10px;
		}
		.tbn{
			display:inline-block;
			width:15px;
			height:15px;
			border-radius:50%;
			text-align:center;
			line-height:13px;
	    	border: 1px solid #555;
	    	margin-left:5px;
	    	cursor:pointer;
		}
		.handling{
    		background-color:#00FF00
    	}
    	.ended{
    		background-color:#999999;
    		color:@white;
    	}
    	.cancel{
    		background-color:#000000;
    		color:@white;
    	}
	}
</style>