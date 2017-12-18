<template>
	<bPanel >
		<h4 slot="title">授信放款保证金计划调整添加修改</h4>>
		<div slot="body" id="depositEdit">
			<headers :info1="info1" :info2="info2" type=2></headers>
			<div class="fline">
				<formg>
					<span slot="tl">计划ID</span>
					<span slot="ct" v-text="info3.id"></span>
				</formg>
				<formg>
					<span slot="tl">费用类别</span>
					<span slot="ct">保证金</span>
				</formg>
				<formg>
					<span slot="tl">生成方式分类</span>
					<span slot="ct">手动录入</span>
				</formg>
			</div>
			<div class="hr-line-dashed"></div>	
			<div class="fline" >
				<formg>
					<span slot="tl">收支区分</span>
					<select name="expensesReceiptType" v-model="info3.expensesReceiptType" class="form-control" slot="ct" disabled="true" >
						<option value="1" >收</option>
						<option value="2" >支</option>
					</select>
				</formg>
				<formg>
					<span slot="tl">预定保证金（元）</span>
					<currency class="form-control" type="text" name="expectFee" v-model="info3.expectFee" slot="ct">
				</formg>
				<formg>
					<span slot="tl">预定支付日</span>
					<dates slot="ct" name="currentPeriodSettlementDate" v-model="info3.currentPeriodSettlementDate"/>
				</formg>
			</div>
			<div class="fline" v-if="info3.expensesReceiptType == 1">
				<formg>
					<span slot="tl">收款时对应的支付ID</span>
					<span slot="ct">{{info3.payId}}</span>
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
				payIds:[],
				info3:{
					id:-1,                                                      // id
					loanNo:'',                                                  // 放款批号
					inOutWays:'',                                               // 生成方式分类1手动录入，2系统生成
					feeType:'',                                                 // 费用类型1担保费，2保证金，3第三方费用
					payId:'',                                                   // 对应的支付ID
					expensesReceiptType:2,                                      // 收支区分
					expectReceivablesPeriods:'' ,                               // 预计收款期数
					currentPeriodInterestBearingDate:'',                        // 本期计息日
					currentPeriodSettlementDate:'',                             // 本期结算日
					expectFee:'',                                               // 预计金额
					incomeExpensesId:'',                                        // 对应的收支IDa,b,c
					businessStatements:'',                                      // 业务说明                                  
					financialStatements:''                                      // 财务说明
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
			self.info3.loanNo = self.info2.creditloanNo
			//获取详细
			if(self.$route.query.flag == 2 ){
				self.info3.expensesReceiptType = 1 ;
				self.info3.payId = self.$route.query.payId ;
				self.info3.id = self.$route.query.id ;
			}else{
				self.info3.id = self.$route.query.id ;
			}
			if(self.info3.id != -1){
				self.getInfo();
			}
		},
		methods:{
			back(){
				this.$router.push({
					path:'/depositList',
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
				var _info = $api.vueToObj(self.info3);	
				if(_info.expensesReceiptType == 1){
					$('#depositEdit').bootstrapValidator('addField','payId',{
	        			validators:{     	        		
	     	        		notEmpty:{
	     	        			message:'不能为空'
	     	        		}
	     	        	}
	        		});
				}	
				//点击保存时触发表单验证
			    $('#depositEdit').bootstrapValidator('validate');
		        //如果表单验证正确，则请求后台添加用户
		        if($("#depositEdit").data('bootstrapValidator').isValid()){
					_info.inOutWays = 1 ;
					_info.feeType = 2 ;
					$api.ajax('/baoliyun/guarantee/saveReceivablesPlan',_info,function(data){
						self.back();
					})
		        }
			},
			validator(){
				//企业添加表单验证
				$('#depositEdit').bootstrapValidator({
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