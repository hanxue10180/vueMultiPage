<template>
	<bPanel >
		<h4 slot="title">授信放款担保费计划调整添加修改</h4>>
		<div slot="body" id="gFEdit">
			<headers :info1="info1" :info2="info2" type=1></headers>
			<div class="fline">
				<formg>
					<span slot="tl">计划ID</span>
					<span slot="ct" v-text="info3.id"></span>
				</formg>
				<formg>
					<span slot="tl">费用类别</span>
					<span slot="ct">担保费</span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">担保费收取方式</span>
					<span slot="ct" v-text="info2.guaranteereceivableWays==1 ? '一次性': info2.guaranteereceivableWays==2 ? '分期' : '-'"></span>
				</formg>
				<formg>
					<span slot="tl">生成方式分类</span>
					<span slot="ct">手动录入</span>
				</formg>
				<formg>
					<span slot="tl">期数</span>
					<span slot="ct" v-text="info3.expectReceivablesPeriods"></span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">系统算出（元）</span>
					<currency type="text" class="form-control" name="expectFee" v-model="info3.expectFee" slot="ct">
				</formg>
				<formg>
					<span slot="tl">收支区分</span>
					<select name="expensesReceiptType" v-model="info3.expensesReceiptType" class="form-control" slot="ct">
						<option value="1" >收</option>
						<option value="2" >支</option>
					</select>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">计息日</span>
					<dates slot="ct" name="currentPeriodInterestBearingDate" v-model="info3.currentPeriodInterestBearingDate"/>
				</formg>
				<formg>
					<span slot="tl">结息日</span>
					<dates slot="ct" name="currentPeriodSettlementDate" v-model="info3.currentPeriodSettlementDate"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">业务说明</span>
					<textarea name="businessStatements" v-model="info3.businessStatements" slot="ct" class="form-control"></textarea>
				</formg>
			</div>
			<div class="fline">
				<button class="btn btn-default" v-on:click="back" style="margin-left:20px;">返回</button>
				<button class="btn btn-primary pull-right" v-on:click="save" style="margin-right:100px;">保存</button>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import headers from '../inOutHeader/inOutHeader.vue'
	import formg from '../formg/formg.vue'
	import currency from '../currency/currency.vue'
	import dates from '../dates/dates.vue'
	export default{
		data(){
			return{
				info1:{},
				info2:{},
				info3:{
					id:'',
					loanNo:'',
					inOutWays:'',
					feeType:'',
					payId:-1,
					expensesReceiptType:1,
					expectReceivablesPeriods:'' ,
					currentPeriodInterestBearingDate:'',
					currentPeriodSettlementDate:'',
					expectFee:'',
					businessStatements:'',
					financialStatements:''
				}
			}
		},
		components:{
			bPanel,
			headers,
			formg,
			currency,
			dates
		},
		created(){
			var self = this ;
			self.info1 = JSON.parse(self.$route.query.info1);
			self.info2 = JSON.parse(self.$route.query.info2);
			self.info3.id = self.$route.query.id ;
			self.info3.loanNo = self.info2.creditloanNo
			//获取详细
			if(self.info3.id!=-1){
				self.getInfo();
			}
		},
		methods:{
			back(){
				this.$router.push({
					path:'/guaranteeFeeList',
					query:{
						num:2,
						info1:this.$route.query.info1,
						info2:this.$route.query.info2
					}
				});
			},
			getInfo(){
				var self =this ;
				$api.ajax('/baoliyun/guarantee/getReceivablesPlanDetail',{
					id:self.info3.id
				},function(data){
					self.info3 = data.obj ;
				})
			},
			save(){
				var self = this ;
				self.validator() ;			
				//点击保存时触发表单验证
			    $('#gFEdit').bootstrapValidator('validate');
		        //如果表单验证正确，则请求后台添加用户
		        if($("#gFEdit").data('bootstrapValidator').isValid()){
		        	var _info = $api.vueToObj(self.info3);
					_info.inOutWays = 1 ;
					_info.feeType = 1 ;
					$api.ajax('/baoliyun/guarantee/saveReceivablesPlan',_info,function(data){
						self.back();
					})
		        }
			},
			validator(){
				//企业添加表单验证
				$('#gFEdit').bootstrapValidator({
			       	feedbackIcons: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			         },
			         fields: {
			         	expectFee:{
							validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   },
				        	   stringLength:{
				        			max:18,
				        			message:'字数超过限制'
				        	   }
			               	}
			         	},
			         	currentPeriodInterestBearingDate: {
			                validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			            },
			            currentPeriodSettlementDate: {
			                validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			            }

			         }
				})
			}
		}
	}
</script>