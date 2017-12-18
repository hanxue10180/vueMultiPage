<template>
	<bPanel>
		<h4 slot="title">未结任务统计</h4>
		<div slot="body">
			<table class="table table-bordered table-hover" style="width:400px;">
				<thead>
					<tr>
						<th>姓名</th>
						<th>角色</th>
						<th>未结任务数</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in unfinishTaskStatistics">
						<td v-text="item.name"></td>
						<td v-text="item.role"></td>
						<td v-text="item.counts" class="link" v-on:click="detail(item.loginname)"></td>
					</tr>
				</tbody>
			</table>
			<table class="table table-bordered table-hover" style="width:100%">
				<thead>
					<tr>
						<th style="width:100px;">姓名</th>
						<th>未结任务题目</th>
						<th>未结任务内容</th>
						<th style="width:150px">任务提示日</th>
						<th style="width:100px">延迟天数</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in unfinishTaskDetail">
						<td v-text="item.name"></td>
						<td v-text="item.taskTitle"></td>
						<td v-text="item.tasktContent"></td>
						<td v-text="getDate(item.taskNotifyTime)"></td>
						<td v-text="item.delayDays"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</bPanel>	
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default {
		data(){
			return {
				unfinishTaskStatistics:[],
				unfinishTaskDetail:[]
			}
		},
		components:{
			bPanel
		},
		created(){
			this.getUnfinishTaskStatistics();
		},
		methods:{
			getUnfinishTaskStatistics(){
				var self = this ;
				$api.ajax('/baoliyun/report/getUnfinishTaskStatistics',{},function(data){
					self.unfinishTaskStatistics = data.obj ;
				})
			},
			detail(name){
				var self = this ;
				$api.ajax('/baoliyun/report/getUnfinishTaskDetail',{
					loginname : name
				},function(data){
					self.unfinishTaskDetail = data.obj ;
				},function(data){
					toast.err(data.msg);
					self.unfinishTaskDetail = [] ;
				})
			},
			getDate(num){
				return (new Date(num).format("yyyy-MM-dd hh:mm:ss")) ;
			}
		}
	}
</script>
<style>
	td,th{
		text-align:center;
	}
	.link{
		color:#1AB394;
		cursor:pointer;
	}
</style>