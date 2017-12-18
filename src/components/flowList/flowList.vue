<template>
	<div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="back" v-on:click="back">返回</span>
				<h4>项目基本信息</h4>
			</div>			
			<div class="panel-body">
                <div class="form-group">
                    <label class="fLabel">项目名称</label>
                    <div class="col-sm-2">
                        <span >{{ projectName }}</span>
                    </div>
                    <label class="fLabel">批号</label>
                    <div class="col-sm-2">
                        <span >{{ flowNumber }}</span>
                    </div>
                </div>
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">流程一览</h3>
			</div>
			<div class="panel-body">
                <table id="mytab" class="table table-hover" v-on:click="toDetail($event)"></table>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				projectName:'',
				flowNumber:'',
				contractId:''
			}
		},
		mounted(){
			var self = this ;
			//生成用户数据
			$api.table('#mytab',{
				url:$api.baseUrl+'/baoliyun/guarantee/getFlowList',
				dataField: "flows",
		    	pagination:false,//是否分页
				responseHandler:function(res){
		    		//远程数据加载之前,处理程序响应数据格式,对象包含的参数: 我们可以对返回的数据格式进行处理
		    		//在ajax后我们可以在这里进行一些事件的处理
					self.projectName = res.obj.projectName;
		    		self.flowNumber = res.obj.flowNumber;
		    		self.contractId = res.obj.contractId;
		    		res.obj.total=res.total;
		    		return res.obj;
		    	},
		    	queryParams:function(params){
		    		return{
		        		flowNumber:self.$route.query.flowNumber
		        	}
		    	},
		    	columns:[
		        	{
		        		title:'职责名称',
		        		field:'flowNodeName'
		        	},
		        	{
		        		title:'负责人',
		        		field:'operatorName'
		        	},
		        	{
		        		title:'职务',
		        		field:'job'
		        	},
		        	{
		        		title:'状态',
		        		field:'state'
		        	},
		        	{
		        		title:'详情',
		        		field:'flowNodeNumber',
		        		formatter:function(value,row){
		        	    	return "<a data-row='"+JSON.stringify(row)+"'>详细</a>"
		        	    }
		        	}
		    	]
			})
		},
		methods:{
			//跳转到详细
			toDetail(e){
				var self = this ;
				if(e.target.tagName == 'A' ){
					var _row = $(e.target).data('row');
					var _path = '' ;
					var _param = {
						creditProjectId: self.$route.query.creditProjectId ,
						flowNodeNumber:_row.flowNodeNumber,
						flowNumber:self.flowNumber,
						state:_row.state,
						title:_row.flowNodeName
					}
					if(_row.flowNodeNumber == 401 || _row.flowNodeNumber == 402){
						_path = '/personnelAssign' ;
					}else if (_row.flowNodeNumber == 403 || _row.flowNodeNumber == 406 || _row.flowNodeNumber == 409 ){
						_path = '/detailedDepartment' ;
					}else{
						_path = '/handleOpinions' ;
					}
					self.$router.push({
						path : _path,
						query:_param
					});
				}
			},
			//返回按钮事件
			back(){
				this.$router.push('/') ;
			}
		}
	}
</script>
<style lang='less' scoped>
	.panel{
		.panel-heading{
			.back{
				color:#1AB394;
				cursor:pointer;
				margin-right:30px;
			}
			h4{
				display: inline
			}
		}
		.panel-body{
			.form-group{
				overflow:hidden;
				margin-bottom:0px;
			}
			.col-sm-2{
				span{
					display: inline-block;
					margin-top:7px
				}
			}
		}
	}
	
</style>