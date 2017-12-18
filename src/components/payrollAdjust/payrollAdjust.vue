<template>
	<bPanel>
		<h4 slot="title">工资发放调整</h4>
		<div slot="body">
			<bPanel>
				<h4 slot="title">检索条件</h4>
				<div class="fline" slot="body">
					<formg>
						<span slot="tl">发放年月</span>
						<select name="payRollYM" v-model="payRollYM" slot="ct" class="form-control"> 
							<option v-for="item in ymlist" v-bind:value="item.payRollYM">{{item.payRollYMText}}</option>
						</select>
					</formg>
					<button class="btn btn-primary" style="margin-left:20px;width:100px;" v-on:click="search">查询</button>
				</div>
			</bPanel>
			<detail ref="detail" state="1"></detail>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import detail from '../payrollTotalDetail/payrollTotalDetail.vue'
	export default{
		data(){
			return {
				ymlist:[],
				payRollYM:''
			}
		},
		components:{
			bPanel,
			formg,
			detail
		},
		created(){
			var self = this ;
			self.getymlist() ;
			self.payRollYM = self.$route.query.ym ? self.$route.query.ym : self.ymlist[0].payRollYM ;
		},
		mounted(){
			this.search();
		},
		methods:{
			getymlist(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getPayrollYmList',{},function(data){
					self.ymlist = data.obj.yearMonth ;
				},null,{async:false})
			},
			search(){
				this.$refs.detail.getDetailList(this.payRollYM,2,'');
			}
		}
	}
</script>