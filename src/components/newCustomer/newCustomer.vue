<template>
	<bPanel>
		<h4 slot="title">新增客户数</h4>
		<div slot="body" style="width:700px;" >
			<table class="table table-hover" >
				<thead>
					<tr>
						<th>年度</th>
						<th>季度</th>
						<th>年月</th>
						<th>客户名称</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list">
						<td v-text="item.year"></td>
						<td v-text="item.quarter"></td>
						<td v-text="item.payRollYM"></td>
						<td v-text="item.customer"></td>
					</tr>
				</tbody>
			</table>
			<span class="more pull-right" v-on:click="more">更多></span>
			<span class="back pull-right" v-on:click="ym">返回></span>
			<button class="btn btn-default" v-on:click="back">返回一览</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	export default{
		data(){
			return{
				list:[]
			}
		},
		components:{
			bPanel
		},
		created(){
			this.getList(this.$route.query.ym) ;
		},
		methods:{
			getList(ym){
				var self = this ;
				$api.ajax('/baoliyun/performance/getResumeByNewCustomer',{
					payRollYM : ym ? ym :'',
					loginname:this.$route.query.loginname
				},function(data){
					self.list = data.obj ;
				},function(data){
					self.list = [] ;
					toast.err(data.msg);
				})
			},
			more(){
				this.getList() ;
				$('.more').hide();
				$('.back').css('display','inline-block') ;
			},
			ym(){
				this.getList(this.$route.query.ym) ;
				$('.back').hide();
				$('.more').css('display','inline-block') ;
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
<style scoped>
	.more,.back{
		color:#1AB394;
		cursor:pointer;
	}
	.more{
		display: inline-block;
	}
	.back{
		display: none ;
	}
</style>