<template>
	<div class="panel panel-default" style="margin-bottom:0px">
		<div class="panel-heading">
			查询条件
		</div>
		<div class="panel-body form-group" style="margin-bottom:0px;">
			<button class="btn btn-primary pull-right" v-on:click="searFun">查询</button>
	        <div class="pull-right form-group">
	        	<label class="fLabel">项目名称</label>
	            <select  class="form-control" name="projectId" v-model="projectId" >
	            	<option value=-1 >全部</option>
		 			<option v-for="item in projectList" v-bind:value="item.id">{{item.guaranteeProjectName}}</option>
		 		</select>
	        </div>
	        <div class="pull-right form-group">	
	        	<label class="fLabel">项目状态</label>
	           	<select  class="form-control" name="projectStatus" v-model="projectStatus">
		 			<option v-for="(value,key) in statusList" v-bind:value="key">{{value}}</option>
	 			</select>
	        </div>	        
		</div>
	</div>
</template>
<script type="text/javascript">	
	export default{
		data(){
			return {
				projectId:-1,
				projectStatus: 0 ,
				projectList:'',
				statusList:$api.getEnumList('ProjectStatusEnum')
			}
		},
		created(){
			var self = this ;
			$api.ajax('/baoliyun/guarantee/getCreditProjectList',{
				factoringCompanyId:$api.getUserInfo().affiliatedFactoringEnterpriseId,
				projectStatus:0
			},function(data){
				self.projectList = data.obj ;
			})
		},
		methods:{
			searFun(){
				this.$emit('searEvent') ;
			}
		}
	}
</script>
<style lang="less" scoped>
	.panel{
		margin-bottom:0px;	
        .panel-body{
            .btn {
                width:100px;
            }
            .form-group {
                margin-right:20px; 
                .fLabel{
                	width:100px;
                	margin-right:10px; 
                }
                .form-control{
                    font-size:14px;
                    height:34px;
                    width:200px;
                } 
            }
        }        
	}     
</style>