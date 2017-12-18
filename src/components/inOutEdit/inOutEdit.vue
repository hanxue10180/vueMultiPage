<template>
	<bPanel>
		<h4 slot="title"></h4>
		<div slot="body" id="inOutEdit">
			<slot name="others"></slot>
			<div class="fline">
				<formg>
					<span slot="tl">金额（元）</span>
					<currency type="text" class="form-control" slot="ct" name="operateAmount" v-model="sInfo.operateAmount" v-bind:disabled="state==2 || state==4" allow="szywedit,szywgedit" />
				</formg>
				<formg>
					<span slot="tl">日期</span>
					<dates slot="ct" name="operateDate" v-model="sInfo.operateDate" v-bind:disabled="state==2 || state==4" allow="szywedit,szywgedit" />
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">业务说明</span>
					<textarea slot="ct" name="businessStatements" v-model="sInfo.businessStatements" class="form-control" v-bind:disabled="state==2 || state==4" allow="szywedit,szywgedit"></textarea>
				</formg>
			</div>
			<div class="fline" v-if="state!=1">
				<formg>
					<span slot="tl">财务截图上传</span>
					<imgFlow btn-id="financialScreenshot" v-bind:img-array="sInfo.financialScreenshot"  slot="ct" allows="szcwedit"></imgFlow>
				</formg>
			</div>
			<div class="fline" v-if="state!=1">
				<formg>
					<span slot="tl">财务说明</span>
					<textarea slot="ct" name="financialStatements" v-model="sInfo.financialStatements" class="form-control" v-bind:disabled="state!=2" allow="szcwedit"></textarea> 
				</formg>
			</div>
			<div class="fline">
				<button type="button" class="btn btn-default" v-on:click="back" style="margin-left:20px;">返回一览</button>
				<button type="button" class="btn btn-primary pull-right" v-on:click="submit(2)" style="margin-right:50px; margin-left:20px;" v-if="state==1 || state==3 " allow="szywedit,szywgedit">提交</button>
				<button type="button" class="btn btn-default pull-right" v-on:click="submit(1)" v-if="state==1 || state==3 " allow="szywedit,szywgedit">保存</button>
				<button type="button" class="btn btn-default pull-right" v-on:click="submit(4)" style="margin-right:50px;margin-left:20px;" v-if="state==2" allow="szcwedit">驳回</button>
				<button type="button" class="btn btn-default pull-right" v-on:click="submit(3)" v-if="state==2" allow="szcwedit">通过</button>
				<button type="button" class="btn btn-primary pull-right" v-on:click="del" v-if="(state==1 || state==3) && nums!=0 " allow="szywedit" style="margin-right:20px;">删除</button>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import currency from '../currency/currency.vue'
	import dates from '../dates/dates.vue'
	import imgFlow from '../imgFlow/imgFlow.vue'
	export default{
		data(){
			return{
				sInfo:{
					id:-1,
					planId:'',
					creditId:'',
					creditProjectId:'',
					loanNo:'',
					feeType:'',
					depositPayWays:'',
					expensesReceiptType:'',
					toPayId:'',
					operateAmount:'',
					operateDate:'',
					businessStatements:'',
					financialStatements:'',
					financialScreenshot:[],
					commit:''
				},
				nums:''
			}
		},
		props:['info','info1','info2','id','state','type','num'],
		components:{
			bPanel,
			formg,
			currency,
			dates,
			imgFlow
		},
		created(){
			this.sInfo.id = this.id ;
			if(this.sInfo.id!=-1){
				this.getInfo();
			}
			if(this.num){
				this.nums = this.num ;
			}
			this.sInfo.creditId = this.info1.creditId ;
			this.sInfo.creditProjectId =this.info1.creditProjectId ;
			this.sInfo.loanNo = this.info2.creditloanNo ? this.info2.creditloanNo : this.info2.loanNo ? this.info2.loanNo : '';
			this.sInfo.feeType = this.info.feeType ;
			this.sInfo.depositPayWays = this.info1.depositPayWays ;
			this.sInfo.expensesReceiptType = this.info.expensesReceiptType ;
			//授信保证金
			if(this.type == 1){
				this.sInfo.payId = this.info.payIdTo ;
			}else{
				this.sInfo.payId = this.info.payId==-1 ? '':this.info.payId;
			}
			this.sInfo.planId = this.info.id ;
		},
		mounted(){
			var self = this ;
			var financialScreenshot = $api.uploadImgsFun('#financialScreenshot',function(evalEle){
				if(!self.sInfo.financialScreenshot)
					self.sInfo.financialScreenshot = [] ;
				self.sInfo.financialScreenshot.push(evalEle);
			},'/upload/financialScreenshot/');
			$api.checkAllow();
			if(self.state == 3 || self.state == 4){
				$('#financialScreenshot').hide();
				$('#delfinancialScreenshot').hide();
			}
		},
		methods:{
			submit(num){
				var self = this;
				var _sinfo = $api.vueToObj(self.sInfo);
				if(num == 4 && !_sinfo.financialStatements){
					toast.err('驳回财务意见不能为空');
					return false;
				}
				self.validator() ;	
				//点击保存时触发表单验证
			    $('#inOutEdit').bootstrapValidator('validate');
		        //如果表单验证正确，则请求后台添加用户
		        if($("#inOutEdit").data('bootstrapValidator').isValid()){
		        	_sinfo.financialScreenshot = $api.join(_sinfo.financialScreenshot);
					_sinfo.commit = num ;
					var _sfun = function(){
						$api.ajax('/baoliyun/guarantee/saveInOut',_sinfo,function(data){
							if(num != 1)
								self.back();
							else{
								data.obj.financialScreenshot = $api.split(data.obj.financialScreenshot);
								if(self.sInfo.id == -1){
									self.sInfo.id = data.obj.id ;
									self.$emit('getId',data.obj.id);
								}
								if(data.msg){
									self.$emit('getMsg',data.msg);
								}
								toast.suc('保存成功');
								if(self.nums != '0' && this.type!=1){
									self.nums = 1 ;
								}
							}
						}) 
					}
					if(num==3 || num==4){
						var _msg = num==3 ? '确认通过吗' : '确认驳回吗' ;
						$api.confirm(_msg,function(){
							$('.popup_de').remove();
							_sfun();
						})
					}else{
						_sfun();
					}
		        }
			},
			del(){
				var self = this
				$api.confirm('确认删除吗',function(){
					$api.ajax('/baoliyun/guarantee/delInOut',{
						id:self.id
					},function(data){
						$('.popup_de').remove();
						self.back();
					},function(data){
						$('.popup_de').remove();
						$api.alert(data.msg);
					})
				})
			},
			getInfo(){
				var self = this ;
				$api.ajax('/baoliyun/guarantee/getInoutDetail',{
					id:[self.sInfo.id]
				},function(data){
					data.obj[0].financialScreenshot = $api.split(data.obj[0].financialScreenshot);
					self.sInfo = data.obj[0] ;
					if(self.sInfo.payId){
						self.$emit('getPayId',self.sInfo.payId);
					}
					if(data.msg){
						self.$emit('getMsg',data.msg);
					}
				},null,{async:false})
			},
			back(){
				var _info={
					info1:JSON.stringify(this.info1),
					info2:JSON.stringify(this.info2)
				}
				//授信保证金一览
				if(this.type == 1){
					this.$router.push({
						path:'/creditDepositDetailList',
						query:{
							rowInfo:JSON.stringify(this.info1)
						}
					})
					return false ;
				}
				//担保费一览
				if(this.info.feeType == 1){
					_info.num = 1 ;
					this.$router.push({
						path:'/guaranteeFeeList',
						query:_info
					})
				}
				//保证金一览
				else if(this.info.feeType == 2){
					_info.num = 1 ;
					this.$router.push({
						path:'/depositList',
						query:_info
					})
				}
				//第三方一览
				else if(this.info.feeType == 3){
					this.$router.push({
						path:'/thirdPartyList',
						query:_info
					})
				}
			},
			validator(){
				//企业添加表单验证
				$('#inOutEdit').bootstrapValidator({
			       	feedbackIcons: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			         },
			         fields: {
			         	operateAmount:{
							validators: {
			                    notEmpty: {
			                       message: '不能为空'
			                    },
				        	    stringLength:{
				        			max:18,
				        			message:'不能超过18位'
				        	    }
			               	}
			         	},
			            operateDate: {
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