<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4>还款履历</h4>                                                                
		</div>
		<div class="panel-body">
			<table  class="table table-hover table-bordered" style="width:800px;">
		    	<thead>
		    		<tr>
					    <th>业务批号</th>
					    <th>还款时间</th>
					    <th>还款金额（元）</th>
					    <th style="width:250px;">业务备考</th>
					    <th style="width:250px;">风控说明</th>
					</tr>
		    	</thead>
		    	<tbody>
					<tr v-for="item in list">
					 	<td v-text="item.id"></td>
					 	<td v-text="getDate(item.repaymentDay)"></td>
					 	<td v-text="item.repayAmount"></td>
					 	<td v-text="item.remarks"></td>
					 	<td v-text="item.riskStatements"></td>
					</tr>
		    	</tbody>
		    </table>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['creditloanNo'],
		data(){
			return {
				list:[]
			}
		},
		created(){
			var self = this ;
			//获取履历备注
	        $api.ajax('/baoliyun/guarantee/getRepayList',{
	        	creditloanNo:self.creditloanNo
	        },function(data){	        	
	            self.list=data.obj;   
	        })
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num);
			}
		}
	}
</script>
<style>
	th,td{
		text-align:center;
	}
</style>