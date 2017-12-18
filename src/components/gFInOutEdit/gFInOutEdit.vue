<template>
	<inOutEdit :info ='info' :info1='info1' :info2='info2' :id='id' :state='state' :num="num" @getId="getId">
		<div slot="others">
			<div class="fline">
				<formg>
					<span slot="tl">收支ID</span>
					<span slot="ct">{{id}}</span>
				</formg>
				<formg>
					<span slot="tl">放款主体名称</span>
					<span slot="ct">{{info1.creditMainPartyName}}</span>
				</formg>
				<formg>
					<span slot="tl">融资企业名称</span>
					<span slot="ct">{{info1.creditCompanyManageName}}</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">费用类别</span>
					<span slot="ct">担保费</span>
				</formg>
				<formg>
					<span slot="tl">收支区分</span>
					<span slot="ct" >{{ info.expensesReceiptType==1 ? '收': info.expensesReceiptType==2 ? '支':'' }}</span>
				</formg>
				<formg>
					<span slot="tl">生成方式分类</span>
					<span slot="ct">{{ info.inOutWays==1 ? '手动录入' : info.inOutWays==2 ? '系统生成':''}}</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">放款批号</span>
					<span slot="ct" v-text="info2.creditloanNo"></span>
				</formg>
				<formg v-if="info.inOutWays==2">
					<span slot="tl">担保费率</span>
					<span slot="ct">{{ info2.guaranteeRatio }}% （按年化利率计算）</span>
				</formg>
				<formg v-if="info.inOutWays==2">
					<span slot="tl">担保费收取方式</span>
					<span slot="ct">{{ info2.guaranteereceivableWays==1 ? '一次性收取': info2.guaranteereceivableWays==2 ? '分期收取' : ''}}</span>
				</formg>
				<formg v-if="info.inOutWays==1">
					<span slot="tl">系统算出担保费</span>
					<span slot="ct" v-text="info.expectFee"></span>
				</formg>
				<formg v-if="info.inOutWays==1">
					<span slot="tl">担保费预计收取日</span>
					<span slot="ct" v-text="getDate(info.currentPeriodSettlementDate)"></span>
				</formg>
			</div>
			<div class="fline" v-if="info.inOutWays==2">
				<formg >
					<span slot="tl">期数</span>
					<span slot="ct" v-text="info.expectReceivablesPeriods"></span>
				</formg>
				<formg >
					<span slot="tl">系统算出担保费</span>
					<span slot="ct" v-text="info.expectFee"></span>
				</formg>
				<formg >
					<span slot="tl">担保费预计收取日</span>
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
				state:'',
				num:''
			}
		},
		components:{
			inOutEdit,
			formg
		},
		created(){
			this.info = JSON.parse(this.$route.query.info) ;
			this.info1 = JSON.parse(this.$route.query.info1) ;
			this.info2 = JSON.parse(this.$route.query.info2) ;
			this.id = this.$route.query.id ;
			this.state = this.$route.query.state ;
			this.num = this.$route.query.num ;
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