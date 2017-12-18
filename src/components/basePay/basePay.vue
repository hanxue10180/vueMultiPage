<template>
	<bPanel>
		<h4 slot="title">{{type == 1 ? '基本工资':'岗位津贴'}}调整履历</h4>
		<div slot="body">
			<table class="table table-hover" style="width:700px;table-layout:fixed;">
				<thead>
					<tr>
						<th>调整日期</th>
						<th>变更人</th>
						<th>调整后金额</th>
						<th>生效日期</th>
						<th style="width:250px;">调整备注</th>
					</tr>
				</thead>
				<tbody v-for="info in list">
					<tr v-for="item in info.performanceResumeInfo">
						<td v-text="getDate(item.adjustDate)"></td>
						<td v-text="item.changUser"></td>
						<td v-text="item.amount"></td>
						<td v-text="getDate(item.availabilityDate)"></td>
						<td style="width:250px;" v-text="item.remarks"></td>
					</tr>
				</tbody>
			</table>
			<button class="btn btn-default" v-on:click="back">返回一览</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default{
		data(){
			return {
				list:[],
				type:''
			}
		},
		components:{
			bPanel
		},
		created(){
			this.type = this.$route.query.type
			this.getList() ;
		},
		methods:{
			getList(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getResumeBy',{
					type : self.type,
					loginname : self.$route.query.loginname,
					payrollYM:self.$route.query.ym
				},function(data){
					self.list = data.obj ;
				})
			},
			getDate(num){
				return $api.dateFormat(num) ;
			},
			back(){
				if(this.$route.query.year){
					this.$router.push({
						path:'/',
						query:{
							type:this.$route.query.tp ,
							year:this.$route.query.year,
							val:this.$route.query.val,
							ym:this.$route.query.ym
						}
					});
				}else{
					this.$router.push({
						path:'/',
						query:{
							ym:this.$route.query.ym
						}
					})
				}
			}
		}
	}
</script>