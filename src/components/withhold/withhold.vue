<template>
	<bPanel>
		<h4 slot="title">扣罚/补发履历</h4>
		<div slot="body">
			<table class="table table-bordered table-hover" style="width:700px;">
				<thead>
					<tr>
						<th></th>
						<th>扣罚/补发日期</th>
						<th>变更人</th>
						<th>扣罚(-)/补发(+)金额</th>
						<th>区分</th>
						<th>原因</th>
					</tr>
				</thead>
				<tbody v-for="item in list">
					<tr v-for="(info,index) in  item.performanceResumeInfo">
						<td v-text="index ? '':item.recType"></td>
						<td v-text="getDate(info.adjustDate)"></td>
						<td v-text="info.changUser"></td>
						<td v-text="info.amount"></td>
						<td v-text="info.adjustType==1 ? '扣罚' : '补发'"></td>
						<td v-html="info.remarks"></td>
					</tr>
				</tbody>
			</table>
			<button class="btn btn-default" v-on:click="back">返回</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default{
		data(){
			return {
				list:[]
			}
		},
		components:{
			bPanel
		},
		created(){
			this.getList() ;
		},
		methods:{
			getList(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getResumeBy',{
					type :3,
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