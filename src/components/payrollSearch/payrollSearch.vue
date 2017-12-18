<template>
	<bPanel>
		<h4 slot="title">检索条件</h4>
		<div class="fline" slot="body">
			<formg>
				<span slot="tl">统计年度</span>
				<select name="year" class="form-control" slot="ct" v-model="year">
					<option v-for="item in ylist" :value="item.payRollYM" v-text="item.payRollYMText"></option>
				</select>
			</formg>
			<formg>
				<span slot="tl">统计单位</span>
				<select name="type" v-model="type" slot="ct" class="form-control" v-on:change="getKVList" v-bind:disabled="!iszjl">
					<option value="2">部门</option>
					<option value="3">人员</option>
				</select>
			</formg>
			<formg >
				<select name="val" v-model="val" slot="ct" class="form-control" v-bind:disabled="!iszjl">
					<option v-for="item in kvList" :value="item.val" v-text="item.name"></option>
				</select>
			</formg>
			<button class="btn btn-primary pull-right" style="width:100px; margin-right:20px;" v-on:click="search">查询</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return{
				year:'',
				type:'2',
				val:'',
				kvList:[],
				ylist:[],
				iszjl:$api.isRole('董事长') || $api.isRole('行政经理')
			}
		},
		components:{
			bPanel,
			formg
		},
		created(){
			this.getKVList();
			this.getylist();
		},
		methods:{
			getylist(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getPayrollYmList',{},function(data){
					self.ylist = data.obj.year ; 
					self.year = data.obj.year[0].payRollYM ;
				},null,{async:false})
			},
			getKVList(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getKVList',{
					type:self.type,
					affiliatedFactoringEnterpriseId: $api.getUserInfo().affiliatedFactoringEnterpriseId
				},function(data){
					self.kvList = data.obj ;
					self.val = data.obj[0].val ;
				},null,{async:false})
			},
			search(){
				this.$emit('search');
			}
		}
	}
</script>