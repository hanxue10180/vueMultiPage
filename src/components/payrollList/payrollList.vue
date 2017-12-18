<template>
	<div>
		<search ref="sear" @search="search"></search>
		<total ref="total" @getDetail="getDetail"></total>
		<detail ref="detail" :year="year" :type="type" :val="val" ></detail>
	</div>
</template>
<script type="text/javascript">
	import search from '../payrollSearch/payrollSearch.vue'
	import total from '../payrollTotal/payrollTotal.vue'
	import detail from '../payrollTotalDetail/payrollTotalDetail.vue'
	export default{
		data(){
			return {
				year:'',
				type:'',
				val:''
			}
		},
		components:{
			search,
			total,
			detail
		},
		mounted(){
			var self = this ;
			if(!$api.isRole('董事长') && !$api.isRole('行政经理')){
				this.$refs.sear.type = 3 ;
				this.$refs.sear.getKVList();
				this.$refs.sear.val = $api.getUserInfo().loginname ;
			}
			else if(this.$route.query.year){
				this.$refs.sear.year = this.$route.query.year ;
				this.$refs.sear.type = this.$route.query.type ;
				this.$refs.sear.getKVList();
				this.$refs.sear.val = this.$route.query.val ;
			}	
			this.search();
			if(this.$route.query.ym){
				this.getDetail(this.$route.query.ym,this.$refs.sear.type,this.$refs.sear.val);
			}
		},
		methods:{
			search(){
				this.year = this.$refs.sear.year;
				this.type = this.$refs.sear.type;
				this.val = this.$refs.sear.val;	
				this.$refs.total.getTotalList(this.year,this.type,this.val);
			    this.$refs.detail.ym='';
			    this.$refs.detail.detailList=[];
			},
			getDetail(ym,type,val){
				this.$refs.detail.getDetailList(ym,type,val);
			}
		}
	}
</script>