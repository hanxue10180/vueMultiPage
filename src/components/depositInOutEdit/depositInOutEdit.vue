<template>
	<inOutEdit :info ='info' :info1='info1' :info2='info2' :id='id' :state='state' @getId="getId" :num='num' :type='type' @getPayId='getPayId' @getMsg='getMsg'>
		<div slot="others" v-if="info.expensesReceiptType == 2">
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
					<span slot="tl">保证金支付方式</span>
					<span slot="ct" v-text="info1.depositPayWays == 1 ? '不支付': info1.depositPayWays == 2 ? '一次性支付':info1.depositPayWays == 3 ? '按放款单位支付':'' "></span>
				</formg>
				<formg >
					<span slot="tl">放款主体名称</span>
					<span slot="ct" v-text="info1.creditMainPartyName"></span>
				</formg>
			</div>
			<div class="fline" v-if="info1.depositPayWays == 3">
				<formg>
					<span slot="tl">担保项目名称</span>
					<span slot="ct" v-text="info1.creditProjectName"></span>
				</formg>
				<formg>
					<span slot="tl">融资企业名称</span>
					<span slot="ct" v-text="info1.creditCompanyManageName"></span>
				</formg>
				<formg>
					<span slot="tl">放款批号</span>
					<span slot="ct" v-text="info2.creditloanNo"></span>
				</formg>
			</div>
			<div class="fline" v-if="info1.depositPayWays == 3">
				<formg>
					<span slot="tl">放款金额（元）</span>
					<span slot="ct" v-text="info2.amount"></span>
				</formg>
				<formg>
					<span slot="tl">放款日</span>
					<span slot="ct" v-text="getDate(info2.loanDate)"></span>
				</formg>
				<formg>
					<span slot="tl">还款日</span>
					<span slot="ct" v-text="getDate(info2.repaymentExpectDay)"></span>
				</formg>
			</div>
			<div class="fline">
				<formg >
					<span slot="tl" v-bind:style="info2.depositPayer ==1 ? 'color:red':''" >保证金担付方</span>
					<span slot="ct" v-bind:style="info2.depositPayer ==1 ? 'color:red':''" v-text=" info2.depositPayer ==1 ? '企业' : info2.depositPayer ==2 ? '保理公司':'-'"> </span>
				</formg>
				<formg >
					<span slot="tl">保证金预定支付日</span>
					<span slot="ct" v-text='info2.depositPrePayDate ? getDate(info2.depositPrePayDate) : getDate(info1.depositPrePayDate)'></span>
				</formg>
				<formg >
					<span slot="tl">预计支付保证金(元)</span>
					<span slot="ct">{{ info2.preDepositAmount ? info2.preDepositAmount : info1.preDepositAmount}} <span style="color:red ;width:300px;position:relative;left:-123px;">{{msg}}</span></span>
				</formg>
			</div>
		</div>
		<div slot="others" v-if="info.expensesReceiptType == 1">
			<div class="fline">
				<formg>
					<span slot="tl">收支ID</span>
					<span slot="ct">{{id}}</span>
				</formg>
				<formg >
					<span slot="tl">放款主体名称</span>
					<span slot="ct" v-text="info1.creditMainPartyName"></span>
				</formg>
				<formg v-if="info1.depositPayWays == 3">
					<span slot="tl">融资企业名称</span>
					<span slot="ct" v-text="info1.creditCompanyManageName"></span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">费用类别</span>
					<span slot="ct">保证金</span>
				</formg>
				<formg>
					<span slot="tl">收支区分</span>
					<span slot="ct" >收</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">对应的支付ID</span>
					<span slot="ct" v-text="payId"></span>
				</formg>
				<formg >
					<span slot="tl" v-bind:style="info2.depositPayer ==1 ? 'color:red':''" >保证金担付方</span>
					<span slot="ct" v-bind:style="info2.depositPayer ==1 ? 'color:red':''" v-text=" info2.depositPayer ==1 ? '企业' : info2.depositPayer ==2 ? '保理公司':'-'"> </span>
				</formg>
			</div>
			<div class="fline">
				<formg >
					<span slot="tl">实际支付日</span>
					<span slot="ct" v-text="getDate(info2.depositPrePayDate)"></span>
				</formg>
				<formg >
					<span slot="tl">实际支付保证金(元)</span>
					<span slot="ct">{{ info2.preDepositAmount }} </span>
				</formg>
			</div>
		</div>
	</inOutEdit>
</template>
<script type="text/javascript">
	import inOutEdit from '../inOutEdit/inOutEdit.vue'
	import formg from '../formg/formg.vue'
	import dates from '../dates/dates.vue'
	import currency from '../currency/currency.vue'
	export default{
		data(){
			return {
				info:{},
				info1:{},
				info2:{
					depositPrePayDate : '',
					preDepositAmount:''
				},
				id:'',
				state:'',
				num:'',
				type:'',
				payId:'',
				msg:''
			}
		},
		components:{
			inOutEdit,
			formg,
			dates,
			currency
		},
		created(){
			this.info1 = JSON.parse(this.$route.query.info1) ;
			if(this.$route.query.type){
				this.type = this.$route.query.type ;
			}
			//保证金新增
			if(!this.$route.query.info){
				this.info.feeType = 2 ;
				this.state = 1 ;
				//一次性保证金新增
				if(this.type == 1){
					this.info2.depositPayer = this.info1.depositPayer ;
					//新增收
					if(this.$route.query.id != -1){
						this.id = -1 ;
						this.info.expensesReceiptType = 1;
						this.info.payIdTo = this.$route.query.id ;
						this.payId = this.$route.query.id ;
						this.info2.depositPrePayDate = this.$route.query.depositPrePayDate ;
						this.info2.preDepositAmount = this.$route.query.preDepositAmount ;
					}
					//新增支
					else{
						this.id = -1;
						this.info.expensesReceiptType = 2;
					}
				}else{
					this.id = -1;
					this.info.expensesReceiptType = 2;
				}
			}else{
				this.info = JSON.parse(this.$route.query.info) ;
				this.info2 = JSON.parse(this.$route.query.info2) ;
				this.id = this.$route.query.id ;
				this.state = this.$route.query.state ;
				this.num = this.$route.query.num ;
				this.payId = this.info.payId ;
			}
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num) ;
			},
			getId(st,msg){
				this.id =　st ;
			},
			getMsg(msg){
				this.msg = msg ;
			},
			getPayId(id){
				this.payId = id ;
			}
		}
	}
</script>