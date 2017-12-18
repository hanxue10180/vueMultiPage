<template>
	<inOutEdit :info ='info' :info1='info1' :info2='info2' :id='id' :state='state' @getId="getId">
		<div slot="others">
			<div class="fline">
				<formg>
					<span slot="tl">收支ID</span>
					<span slot="ct">{{id}}</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">费用类别</span>
					<span slot="ct">保证金</span>
				</formg>
				<formg>
					<span slot="tl">收支区分</span>
					<span slot="ct" >支</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">放款批号</span>
					<span slot="ct" v-text="info2.creditloanNo"></span>
				</formg>
				<formg>
					<span slot="tl">第三方名称</span>
					<span slot="ct" v-text="info.thirdPartyName"></span>
				</formg>
				<formg>
					<span slot="tl">第三方费率</span>
					<span slot="ct">{{info.loanThirdPartyRatio}} %</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">系统算出费用</span>
					<span slot="ct" v-text="info.expectFee"></span>
				</formg>
				<formg>
					<span slot="tl">计息日</span>
					<span slot="ct" v-text="getDate(info.currentPeriodInterestBearingDate)"></span>
				</formg>
				<formg>
					<span slot="tl">结息日</span>
					<span slot="ct" v-text="getDate(info.currentPeriodSettlementDate)"></span>
				</formg>
			</div>
		</div>
	</inOutEdit>
</template>
<script type="text/javascript">
	import inOutEdit from '../inOutEdit/inOutEdit.vue'
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return {
				info:{},
				info1:{},
				info2:{},
				id:'',
				state:''
			}
		},
		components:{
			inOutEdit ,
			formg
		},
		created(){
			this.info = JSON.parse(this.$route.query.info) ;
			this.info1 = JSON.parse(this.$route.query.info1) ;
			this.info2 = JSON.parse(this.$route.query.info2) ;
			this.id = this.$route.query.id ;
			this.state = this.$route.query.state ;
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num) ;
			},
			getId(st){
				this.id =　st ;
			}
		}
	}
</script>