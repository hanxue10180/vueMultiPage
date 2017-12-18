<template>
	<bPanel id="loanRepayEdit">
		<h4 slot="title">放款还款管理</h4>
		<div slot="body">
			<div class="fline">
				<formg>
					<span slot="tl">业务批号</span>
					<span slot="ct">{{loanInfo.id}}</span>
				</formg>
			</div>
			<div class="hr-line-dashed"></div>
			<div class="fline">
				<formg>
					<span slot="tl">担保项目名称</span>
					<select name="creditProjectId" v-model="loanInfo.creditProjectId" v-on:change="getCInfo" class="form-control" slot="ct" v-bind:disabled = "stateInfo.id!=-1" allow="ywedit">
						<option v-for="item in creditProjectArr" v-if="stateInfo.id!=-1 || item.guaranteeProjectStatus == 2" v-bind:value="item.id" v-text="item.guaranteeProjectName"></option>
					</select>
				</formg>
			</div>
			<div class="hr-line-dashed"></div>
			<div class="fline">
				<formg>
					<span slot="tl">放款主体名称</span>
					<span name="creditMainPartyName" v-text="creditDetail.creditMainPartyName" slot="ct"></span>
				</formg>
				<formg>
					<span slot='tl' style="width:170px;display:inline-block">放款主体可用担保额度（元）</span>
					<span slot="ct" style="margin-left:20px;"> {{ creditDetail.mainUsableGuaranteeAmount }}</span>
				</formg>
			</div>
			<div class="hr-line-dashed"></div>
			<div class="fline">
				<formg>
					<span slot='tl'>保证金支付方式</span>
					<span slot="ct"> {{ creditDetail.depositPayWays == 1 ? '不支付' : creditDetail.depositPayWays == 2 ? '一次性支付' :  creditDetail.depositPayWays == 3 ? '按放款单位支付' : '' }}</span>
				</formg>
			</div>
			<div class="hr-line-dashed"></div>
			<div class="fline">
				<formg>
					<span slot="tl">融资企业名称</span>
					<select name="creditCompanyManageId" v-model="loanInfo.creditCompanyManageId" v-on:change="getGuaranteeDetail(loanInfo.creditCompanyManageId)" slot="ct" class="form-control"  v-bind:disabled = "stateInfo.id!=-1" allow="ywedit">
						<option v-for="item in guaranteeCreditCompanyManage" v-bind:value="item.id" v-text="item.companyName"></option>
					</select>
				</formg>
				<formg>
					<span slot="tl">企业可用担保额度（元）</span>
					<span slot="ct">{{ companyUsableGuaranteeAmount }}</span>
				</formg>
			</div>
			<bPanel>
				<h4 slot="title">放款</h4>
				<div slot="body">
					<div class="fline">
						<formg>
							<span slot="tl">预计还款日</span>
							<dates name="repaymentExpectDay"  v-model="loanInfo.repaymentExpectDay" slot="ct" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
						</formg>
						<formg>
							<span slot="tl">放款批号</span>
							<span slot="ct">{{loanInfo.loanNo}}</span>
						</formg>
					</div>
					<div class="hr-line-dashed"></div>
					<div class="fline">
						<formg>
							<span slot="tl">担保费率★</span>
							<span slot="ct" style="width:210px;padding-top:0"><input  class="form-control" name="guaranteeRatio" v-model="loanInfo.guaranteeRatio" style="display:inline-block;width:70px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/> %（按年化利率计算） </span>	
						</formg>
						<formg>
							<span slot="tl">担保费计划生成方式</span>
							<span slot="ct" style="width:120px;">
								<input type="radio" name="guaranteePlanWays" value='2' v-model="loanInfo.guaranteePlanWays" style="width:30px;margin-top:2px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
		                	    <label class="fLabel" style="text-align:left;width:70px;margin-top:0">系统生成</label>
							</span>
							<div slot="ct1" class="formInput">
								<input type="radio" name="guaranteePlanWays" value='1' v-model="loanInfo.guaranteePlanWays" style="width:30px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
		                	    <label class="fLabel" style="text-align:left;width:70px;">手动录入</label>
							</div>
						</formg>
					</div>
					<div class="hr-line-dashed"></div>
					<div class="fline">
						<formg>
							<span slot="tl">担保费收取方式</span>
							<span slot="ct" style="width:120px;">
								<input type="radio" name="guaranteereceivableWays" value='1' v-model="loanInfo.guaranteereceivableWays" style="width:30px;margin-top:2px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
		                	    <label class="fLabel" style="text-align:left;width:70px;margin-top:0">一次性收取</label>
							</span>
							<div slot="ct1" class="formInput">
								<input type="radio" name="guaranteereceivableWays" value='2' v-model="loanInfo.guaranteereceivableWays" style="width:30px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit" />
		                	    <label class="fLabel" style="text-align:left;width:70px;">分期收取</label>
							</div>
						</formg>
						<formg v-show="loanInfo.guaranteereceivableWays==1">
							<span slot="tl">担保费预计收取日</span>
							<dates slot="ct" name="guaranteereceivableDay" v-model="loanInfo.guaranteereceivableDay" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
						</formg>
					</div>
					<div v-show="creditDetail.depositPayWays == '3' ">
						<div class="hr-line-dashed"></div>
						<div class="fline">
							<formg>
								<span slot="tl">保证金担付方</span>
								<span slot="ct" style="width:120px;">
									<input type="radio" name="depositPayer" value='1' v-model="loanInfo.depositPayer" style="width:30px;margin-top:2px;" v-bind:disabled="stateInfo.bstatus != 1  || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
			                	    <label class="fLabel" style="text-align:left;width:70px;margin-top:0">保理公司</label>
								</span>
								<div slot="ct1" class="formInput">
									<input type="radio" name="depositPayer" value='2' v-model="loanInfo.depositPayer" style="width:30px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4  " allow="ywedit" />
			                	    <label class="fLabel" style="text-align:left;width:70px;">企业</label>
								</div>
							</formg>
							<formg>
								<span slot="tl">预计支付保证金（元）</span>
								<input class="form-control" type="text" slot="ct" name="preDepositAmount" v-model="loanInfo.preDepositAmount" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit" />
							</formg>
						</div>
						<div class="hr-line-dashed"></div>
						<div class="fline">
							<formg>
								<span slot="tl">保证金预定支付日</span>
								<dates slot="ct" name="depositPrePayDate" v-model="loanInfo.depositPrePayDate" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
							</formg>
							<formg>
								<span slot="tl">保证金生成方式</span>
								<span slot="ct" style="width:120px;">
									<input type="radio" name="depositWays" value='2' v-model="loanInfo.depositWays" style="width:30px;margin-top:2px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
			                	    <label class="fLabel" style="text-align:left;width:70px;margin-top:0">系统生成</label>
								</span>
								<div slot="ct1" class="formInput">
									<input type="radio" name="depositWays" value='1' v-model="loanInfo.depositWays" style="width:30px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
			                	    <label class="fLabel" style="text-align:left;width:70px;">手动录入</label>
								</div>
							</formg>
						</div>
					</div>
					<div class="hr-line-dashed"></div>
					<div class="fline">
						<formg>
							<span slot="tl">是否有第三方费用</span>
							<span slot="ct">{{ loanInfo.ifThirdPartyFee ? '是' : '否' }}</span>
						</formg>
					</div>
					<div class="fline" v-for="item in loanInfo.thirdPartys">
						<formg>
							<span slot="tl">第三方企业名称</span>
							<select name="thirdPartyId" v-model="item.thirdPartyId" disabled="true" slot="ct" class="form-control" disabled="true" >
								<option v-for="list in thirdArr" v-bind:value="list.id" v-text="list.thirdPartyName"></option>
							</select>
						</formg>
						<formg>
							<span slot="tl">第三方费率</span>
							<span slot="ct" style="width:210px;padding-top:0"><input  class="form-control" name="thirdPartyRatio" v-model="item.thirdPartyRatio" style="display:inline-block;width:70px;" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/> %（按年化利率计算） </span>
						</formg>
					</div>
					<div  v-if=" stateInfo.bstatus == 1 ">
						<div class="hr-line-dashed"></div>
						<div class="fline" >
							<formg>
								<span slot="tl">金额（元）</span>
								<currency class="form-control" type="text" name="amount" slot="ct" v-model="loanInfo.amount" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
							</formg>
							<formg>
								<span slot="tl">日期 </span>
								<dates name="operateDate" slot="ct" v-model="loanInfo.operateDate" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " allow="ywedit"/>
							</formg>					
						</div>
						<div class="hr-line-dashed"></div>
						<div class="fline" >
							<formg>
								<span slot="tl">备考</span>
								<textarea name="remarks" v-model="loanInfo.remarks" class="form-control" v-bind:disabled="stateInfo.bstatus != 1 || stateInfo.pstatus==2 || stateInfo.pstatus==4 " slot="ct" allow="ywedit"></textarea>
							</formg>
						</div>
						<div v-if="stateInfo.pstatus!=1" >
							<div class="hr-line-dashed"></div>
							<div class="fline" >
								<formg>
									<span slot="tl">风控截图上传</span>
									<imgFlow btn-id="riskScreenshot1" v-bind:img-array="loanInfo.riskScreenshot"  slot="ct" allows="fkedit"></imgFlow>
								</formg>
							</div>
							<div class="hr-line-dashed"></div>
							<div class="fline">
								<formg>
									<span slot="tl">风控说明</span>
									<textarea id="riskStatements" name="riskStatements" v-model="loanInfo.riskStatements" class="form-control" slot="ct" allow="fkedit"></textarea>
								</formg>
							</div>
						</div>
					</div>
				</div>
			</bPanel>
			<bPanel v-if="stateInfo.bstatus != 1">
				<h4 slot="title">还款</h4>
				<div slot="body">
					<div class="fline">
						<formg>
							<span slot="tl">放款金额（元）</span>
							<span slot="ct"> {{ loanInfo.amount }} </span>
						</formg>
						<formg>
							<span slot="tl">已还款金额（元）</span>
							<span slot="ct"> {{ loanInfo.repayedAmount   }} </span>
						</formg>
					</div>
					<div class="hr-line-dashed"></div>
					<div class="fline">
						<formg>
							<span slot="tl">金额（元）</span>
							<input type="text" class="form-control" name="amount" slot="ct" v-model="repayInfo.amount" v-bind:disabled="(stateInfo.bstatus!=2 ||  stateInfo.pstatus!=4) && (stateInfo.bstatus!=3 ||  (stateInfo.pstatus!=1 && stateInfo.pstatus!=3) )"  allow="ywedit"/>
						</formg>
						<formg>
							<span slot="tl">日期 </span>
							<dates name="operateDate" slot="ct" v-model="repayInfo.operateDate" v-bind:disabled="(stateInfo.bstatus!=2 ||  stateInfo.pstatus!=4) && (stateInfo.bstatus!=3 ||  (stateInfo.pstatus!=1 && stateInfo.pstatus!=3) )" allow="ywedit"/>
						</formg>					
					</div>
					<div class="hr-line-dashed"></div>
					<div class="fline">
						<formg>
							<span slot="tl">备考</span>
							<textarea name="remarks" v-model="repayInfo.remarks" class="form-control" slot="ct" v-bind:disabled="(stateInfo.bstatus!=2 ||  stateInfo.pstatus!=4) && (stateInfo.bstatus!=3 ||  (stateInfo.pstatus!=1 && stateInfo.pstatus!=3) )" allow="ywedit"></textarea>
						</formg>
					</div>
					<div v-if="stateInfo.pstatus !=1 && (stateInfo.bstatus!=2 || stateInfo.pstatus!=4) " >
						<div class="hr-line-dashed"></div>
						<div class="fline" >
							<formg>
								<span slot="tl">风控截图上传</span>
								<imgFlow btn-id="riskScreenshot2" v-bind:img-array="repayInfo.riskScreenshot"  slot="ct" allows="fkedit"></imgFlow>
							</formg>
						</div>
						<div class="hr-line-dashed"></div>
						<div class="fline">
							<formg>
								<span slot="tl">风控说明</span>
								<textarea id="riskStatements" name="riskStatements" v-model="repayInfo.riskStatements" class="form-control" slot="ct" allow="fkedit"></textarea>
							</formg>
						</div>
					</div>
				</div>
			</bPanel>
			<resume :creditloanNo="loanInfo.loanNo" style="margin-bottom:20px;"></resume>
			<div class="fline">
				<button class="btn btn-default" v-on:click="back" style="margin-left:50px;">返回</button>
				<button class="btn btn-primary pull-right" v-on:click="submit(3)" v-if="stateInfo.pstatus==1 || stateInfo.pstatus==3 || (stateInfo.pstatus == 4 && stateInfo.bstatus == 2 )" style="margin-right:50px;margin-left:20px;" allow="ywedit">提交</button>
				<button class="btn btn-default pull-right" v-on:click="submit(0)" v-if="stateInfo.pstatus==1 || stateInfo.pstatus==3 || (stateInfo.pstatus == 4 && stateInfo.bstatus == 2 )" allow="ywedit">保存</button>
				<button class="btn btn-primary pull-right" v-on:click="submit(1)" v-if="stateInfo.pstatus==2 " style="margin-right:50px;margin-left:20px;" allow="fkedit">驳回</button>
				<button class="btn btn-primary pull-right" v-on:click="submit(2)" v-if="stateInfo.pstatus==2 " allow="fkedit">通过</button>
			</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import dates from '../dates/dates.vue'
	import currency from '../currency/currency.vue'
	import imgFlow from '../imgFlow/imgFlow.vue'
	import resume from '../repayResume/repayResume.vue'
	export default{
		data(){
			return{
				stateInfo:{
					id: -1 ,
					id2:-1 ,
					bstatus :'',
					pstatus:''
				},
				loanInfo:{
					id:-1,                                                      // 业务ID自增
					creditProjectId:'',                                         // 担保项目ID
					creditCompanyManageId:'',                                   // 担保企业管理Id
					businessType:'1',                                           // 业务类型1放款，2还款
					repaymentExpectDay:'',                                      // 还款预定日
					loanNo:'',                                                  // 放款批号YYYYMMDD+0001
					guaranteeRatio:'',                                          // 担保费率%按年化算出
					guaranteereceivableWays:'',                                 // 担保费收取方式1一次性收取，2分期收取
					guaranteereceivableDay:'',                                  // 担保费预计收取日一次性收取时填写
					depositPayer:'',                                            // 保证金担负方1企业，2保理公司
					preDepositAmount:'',                                        // 预计支付保证金0
					depositPrePayDate:'',                                       // 保证金预定支付日
					guaranteePlanWays:'',                                       // 担保费计划生成方式1手动录入，2系统生成
					depositWays:'',                                             // 保证金生成方式1手动录入，2系统生成
					ifThirdPartyFee:'',                                         // 是否有第三方费用1是，0否
					thirdPartys:[],                                             // 第三方列表
					amount:'',                                                  // 金额
					operateDate:'',                                             // 操作日期
					remarks:'',                                                 // 备考
					riskScreenshot:[],                                          // 风控截图
					riskStatements:'',                                          // 风控说明
					type:'',                                                    // 驳回=1 确认=2 保存=0 提交=3
					updateUser:''                                               // 更新者
				},
				repayInfo:{
					id:-1,
					businessType:2,
					amount:'',
					operateDate:'',
					remarks:'',
					type:'',
					updateUser:'',
					riskScreenshot:[],                                          // 风控截图
					riskStatements:'',                                          // 风控说明
				},
				creditProjectArr: $api.gArr(2) ,                                 // 担保项目列表
				thirdArr: $api.getThird() ,                                     // 第三方企业列表
				creditDetail:{                                              
					creditMainPartyName:'',                                       // 放款主体ID
					mainUsableGuaranteeAmount:'',                               // 放款主体可用担保额度
					depositPayWays:'',                                          // 保证金支付方式 1不支付，2一次性支付，3按放款单位支付
					depositPayer:'',                                            // 保证金担负方 1企业，2保理公司
					preDepositAmount:'',                                        // 预计收取保证金
					depositPrePayDate:'',                                       // 保证金预定支付日
				},
				guaranteeCreditCompanyManage:[],                            	// 融资企业列表
				companyUsableGuaranteeAmount:'' ,                               // 企业可用担保额度
				guaranteeRatio:''                                               // 企业担保费率
			}
		},
		components:{
			bPanel,
			formg ,
			dates ,
			currency ,
			imgFlow ,
			resume
		},
		created(){
			var self = this ;
			self.stateInfo = self.$route.query ;
			if(self.stateInfo.bstatus==3 && self.stateInfo.pstatus==4){
				self.stateInfo.pstatus = 1 ;
				self.stateInfo.id2 = -1
			}
			self.loanInfo.creditProjectId = self.stateInfo.id ;
			if(self.stateInfo.id!=-1){
				self.getInfo() ;
				self.getCInfo() ;
				self.getGuaranteeDetail();
			}
		},
		mounted(){
			var self = this ;
			//风控截图
			var rs1 = $api.uploadImgsFun('#riskScreenshot1',function(evalEle){
				self.loanInfo.riskScreenshot.push(evalEle);
			},'/upload/guarantee/');
			var rs2 = $api.uploadImgsFun('#riskScreenshot2',function(evalEle){
				self.repayInfo.riskScreenshot.push(evalEle);
			},'/upload/guarantee/');
			$api.checkAllow();
			if((self.stateInfo.pstatus==4  || self.stateInfo.pstatus==3 ) && self.stateInfo.bstatus ==2){
				$('#riskScreenshot1').hide();
				$('#delriskScreenshot1').hide();
			}else if((self.stateInfo.pstatus==4  || self.stateInfo.pstatus==3 ) && self.stateInfo.bstatus ==4){
				$('#riskScreenshot2').hide();
				$('#delriskScreenshot2').hide();
			}
		},
		methods:{
			//根据担保项目id获取相关信息
			getCInfo(){
				var self = this ;
				var _cid ;
				for(var i=0;i<self.creditProjectArr.length;i++){
					if(self.creditProjectArr[i].id == self.loanInfo.creditProjectId){
						_cid = self.creditProjectArr[i].creditId ;
					}
				}
				//根据授信id获取授信详细
				$api.ajax('/baoliyun/guarantee/getFactoringCompanyCreditDetail',{id:_cid},function(data){
					if(self.stateInfo.id==-1){
						self.creditDetail.depositPayer = data.obj.depositPayer ;
						self.creditDetail.preDepositAmount = data.obj.preDepositAmount ;
						self.creditDetail.depositPrePayDate = data.obj.depositPrePayDate ;
					}
					self.creditDetail.creditMainPartyName = data.obj.creditMainPartyName ;
					self.creditDetail.mainUsableGuaranteeAmount = data.obj.mainUsableGuaranteeAmount;
					self.creditDetail.depositPayWays = data.obj.depositPayWays ;
				},null,{async:false})
				//根据项目id获取流程详细
				$api.ajax('/baoliyun/guarantee/getCreditDetail',{creditProjectId:self.loanInfo.creditProjectId},function(data){
					if(self.stateInfo.id==-1){
						self.loanInfo.thirdPartys = data.obj.thirdPartyRatioInfo ;
						self.loanInfo.ifThirdPartyFee = data.obj.ifThirdPartyFee ;
					}
					self.guaranteeCreditCompanyManage = data.obj.guaranteeCreditCompanyManage ;
				},null,{async:false})
			},
			//获取项目信息
			getInfo(){
				var self = this ;
				//放款中
				if( self.stateInfo.id != -1 ){
					$api.ajax('/baoliyun/guarantee/getProjectloanrepayDetail',{
						guaranteeManagementId : self.stateInfo.id
					},function(data){
						data.obj.riskScreenshot = $api.split(data.obj.riskScreenshot) ;
						self.loanInfo = data.obj ;
					},null,{async:false})
				}
				//还款信息
				if( self.stateInfo.id2 != -1 ){
					$api.ajax('/baoliyun/guarantee/getProjectloanrepayDetail',{
						guaranteeManagementId : self.stateInfo.id2
					},function(data){
						data.obj.riskScreenshot = $api.split(data.obj.riskScreenshot) ;
						self.repayInfo = data.obj ;
					},null,{async:false})
				}
			},
			//根据融资企业获取详细
			getGuaranteeDetail(){
				var self = this ;
				for(var i=0;i<self.guaranteeCreditCompanyManage.length;i++){
					if(self.guaranteeCreditCompanyManage[i].id == self.loanInfo.creditCompanyManageId ){
						if(self.stateInfo.id==-1){
							self.loanInfo.guaranteeRatio = self.guaranteeCreditCompanyManage[i].guaranteeRatio ;
						}
						self.companyUsableGuaranteeAmount = self.guaranteeCreditCompanyManage[i].companyUsableGuaranteeAmount ;
					}
				}
			},
			back(){
				this.$router.push('/') ;
			},
			submit(num){
				var self = this ;
				var _loanInfo = $api.vueToObj(self.loanInfo) ;
				if(!$('#loanRepayEdit').data('bootstrapValidator')){
					self.validator();
				}				
				$('#loanRepayEdit').bootstrapValidator('addField','thirdPartyRatio',{
 	        		validators: {
	                    notEmpty: {
	                        message: '不能为空'
	                    },
	                    regexp: $api.rep.num2,
		        	    callback: $api.rep.num0 
	                }
    			});
				if(num == 1 && !$('#riskStatements').val()){
					toast.err('风控说明不能为空');
					return false ;
				}
				//点击保存时触发表单验证
			    $('#loanRepayEdit').bootstrapValidator('validate');
		        if($('#loanRepayEdit').data('bootstrapValidator').isValid()){
					if(self.stateInfo.bstatus !=1){
						var _repayInfo = $api.vueToObj(self.repayInfo) ;
						_loanInfo = $.extend(_loanInfo,_repayInfo) ;
					}
					_loanInfo.type = num ;
					_loanInfo.updateUser = $api.getUserInfo().loginname ;
					_loanInfo.riskScreenshot = $api.join( _loanInfo.riskScreenshot ) ;
					$api.ajax('/baoliyun/guarantee/saveProjectloanrepay',_loanInfo,function(data){
						if(num == 0){
							self.stateInfo.id = data.obj.id;
							self.getInfo() ;
							self.getCInfo() ;
							self.getGuaranteeDetail();
						}else{
							self.back();
						}
					})
		        }
			},
			validator(){
				var _fields = {
		         	creditProjectId:{
		         		validators: {
		                    notEmpty: {
		                        message: '不能为空'
		                    }
		                }
		         	},
		         	creditCompanyManageId:{
		         		validators: {
		                    notEmpty: {
		                        message: '不能为空'
		                    }
		                }
		         	},
		         	amount:{
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
		         	operateDate:{
		         		validators: {
		                    notEmpty: {
		                        message: '不能为空'
		                    }
		                }
		         	}
				}
				if(this.stateInfo.bstatus==1 && (this.stateInfo.pstatus==1 || this.stateInfo.pstatus==3 )){
					_fields.guaranteeRatio={
						validators: {
		                    notEmpty: {
		                        message: '不能为空'
		                    },
		                    regexp: $api.rep.num2,
			        	    callback: $api.rep.num0 
		                }
					};
					_fields.repaymentExpectDay={
						validators: {
		                    notEmpty: {
		                        message: '不能为空'
		                    }
		                }
					}
				}
				$('#loanRepayEdit').bootstrapValidator({
			       	feedbackIcons: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			         },
			         fields:_fields
			    })
			}
		}
	}
</script>