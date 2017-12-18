<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4>履历备注</h4>                                                                                             
		</div>
		<div class="panel-body">
			<table  border="1" bordercolor="#ddd" id="mainCustomerSalesInfo">
		    	<tr>
				    <th class="col-sm-2">时间</th>
				    <th class="col-sm-1">操作者</th>
				    <th class="col-sm-2">操作内容</th>
				    <th class="col-sm-3">备考</th>
				</tr>
				<tr v-for="item in resumelist">
				 	<td>{{item.endDate}}</td>
				 	<td>{{item.operatorName}}</td>
				 	<td>{{item.nodeName}}</td>
				 	<td>{{item.remarks}}</td>
				</tr>
		    </table>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['id','flowNumber'],
		data(){
			return {
				resumelist:[]
			}
		},
		created(){
			var self = this ;
			if(self.id!=-1){
				//获取履历备注
		        $api.ajax('/baoliyun/project/getFlowRecord',{
		        	pId:self.id,
		        	flowNumber:self.flowNumber,
		        	flowDefinition:4
		        },function(data){
		        	//流程履历
		        	for(var i=0; i< data.obj.length;i++){
		        		data.obj[i].endDate=(new Date(data.obj[i].endDate)).format("yyyy-MM-dd hh:mm:ss") ;
		        		data.obj[i].startDate=(new Date(data.obj[i].startDate)).format("yyyy-MM-dd hh:mm:ss") ;
		        	}
		            self.resumelist=data.obj;   
		        })
			}
		}
	}
</script>
<style scoped>
	.panel-body{
		overflow:hidden
	}
	table{
		width:900px;
		table-layout:fixed;
	}
</style>