<template>
	<div id="detailedDepartment">
		<bPanel>
			<h4 slot="title">项目基本信息</h4>
			<div slot="body">
				<div class="fline">
					<formg>
						<span slot="tl">项目编号</span>
						<span slot="ct"> {{ info.projectNumber }} </span>
					</formg>
					<formg>
						<span slot="tl">立项开始日</span>
						<span slot="ct" v-text="getDate(info.guaranteeProjectBeginDay)"></span>
					</formg>
					<formg>
						<span slot="tl">批号</span>
						<span slot="ct"> {{ flowNumber }} </span>
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">项目名称</span>
						<span slot="ct"> {{ info.guaranteeProjectName }} </span>
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">放款主体名称</span>
						<select name="id" v-model="info.creditMainPartyId" class="form-control" slot="ct" id="creditId" disabled="true">
							<option v-for="item in creditMainPartyArr" v-bind:value="item.id"> {{ item.creditMainPartyName }} </option>
						</select>
					</formg>
					<formg>
						<span slot="tl">授信ID</span>
						<span slot="ct"> {{ info.creditId }} </span>
					</formg>
					<formg>
						<span slot='tl' style="width:170px;display:inline-block">放款主体可用担保额度（元）</span>
						<span slot="ct" style="margin-left:20px;"> {{ cmpDetail.mainUsableGuaranteeAmount }}  {{ cmpDetail.creditCurrent }}</span>
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">授信开始日</span>
						<span slot="ct">{{ cmpDetail.creditBeginDay }}</span>
					</formg>
                    <formg>
                    	<span slot="tl">授信结束日</span>
                    	<span slot="ct"> {{ cmpDetail.creditEndDay }} </span>
                    </formg>
                    <formg>
                    	<span slot="tl">授信额度类型</span>
                    	<span slot="ct"> {{ cmpDetail.creditLineType }} </span>
                    </formg>
				</div>
				<div v-for="(cArr,index) in info.guaranteeCreditCompanyManage" class="sc">
					<div class="hr-line-dashed"></div>
					<div class="fline">
						<formg>
							<span slot="tl">企业名称</span>
							<select class="form-control"  name="companyId" v-model="cArr.companyId" slot="ct" disabled="true">
								<option v-for="item in companyArr" v-bind:value="item.id"> {{ item.companyName }} </option>
							</select>
						</formg>
						<formg>
							<span slot="tl">授信担保额度(元)★</span>
							<div slot="ct">
								<span slot="ct" style="width:50px;" >{{ cmpDetail.creditCurrent }}</span>
								<currency type="text" class="form-control" slot="ct" name="creditGuaranteeLine" v-model="cArr.creditGuaranteeLine" style="display:inline-block;width:130px;" allow="403"/>
							</div>
						</formg>
					</div>	
					<div class="fline">
						<formg>
							<span slot="tl">担保开始日★</span>
							<dates slot="ct" name="guaranteeBeginDay" v-model="cArr.guaranteeBeginDay" allow="403"/>
						</formg>
						<formg>
							<span slot="tl">担保结束日</span>
							<dates slot="ct" name="guaranteeEndDay" v-model="cArr.guaranteeEndDay" allow="403" />
						</formg>
						<formg>
							<span slot="tl">担保费率★</span>
							<span slot="ct" style="width:210px;padding-top:0"><input  class="form-control" name="guaranteeRatio" v-model="cArr.guaranteeRatio" style="display:inline-block;width:70px;" allow="403"/> %（按年化利率计算） </span>	
						</formg>
					</div>
					<div class="fline">
						<formg>
							<span slot="tl">担保事项</span>
							<input type="text" name="guaranteeItems" v-model="cArr.guaranteeItems" slot="ct" class="form-control" style="width:500px;" allow="403">
						</formg>
					</div>	
					<div class="fline">
						<formg>
							<span slot="tl">担保资料上传</span>
							<imgFlow v-bind:btn-id="'guaranteeReport'+index" v-bind:img-array="cArr.guaranteeReport"  slot="ct" allows="403"></imgFlow>
						</formg>
					</div>
				</div>
				<div class="hr-line-dashed"></div>
				<div class="fline">
					<formg>
						<span slot="tl">保证金支付方式</span>
						<span slot="ct" > {{ cmpDetail.depositPayWays }} </select>
					</formg>
					<formg>
						<span slot="tl">保证金状态 </span>
						<span slot="ct" > {{ cmpDetail.depositStatus }} </select>
					</formg>	
				</div>		
				<div class="fline">
					<formg>
						<span slot="tl">是否有第三方费用</span>
						<span slot="ct" style="width:70px;">
							<input type="radio" name="ifThirdPartyFee" value='true' v-model="info.ifThirdPartyFee" style="width:30px;margin-top:2px;" allow="403" />
	                	    <label class="fLabel" style="text-align:left;width:30px;margin-top:0">是</label>
						</span>
						<div slot="ct1" class="formInput">
							<input type="radio" name="ifThirdPartyFee" value='false' v-model="info.ifThirdPartyFee" style="width:30px;" allow="403"/>
	                	    <label class="fLabel" style="text-align:left;width:70px;">否</label>
						</div>
					</formg>
					<button type="button" class="btn btn-default" v-if="info.ifThirdPartyFee == 'true' " v-on:click="addNewThird" allow="403" >添加第三方企业</button>
					<button type="button" class="btn btn-default" v-if="info.ifThirdPartyFee == 'true' " v-on:click="addThird" allow="403" >第三方信息维护</button>
				</div>
				<div class="fline" v-if="info.ifThirdPartyFee == 'true' " v-for="(item,index) in info.thirdPartyRatioInfo">
					<formg>
						<span slot="tl">第三方名称</span>
						<select name="thirdPartyId" v-model="item.thirdPartyId" slot="ct" class="form-control"  allow="403">
							<option v-for="list in thirdList" v-bind:value="list.id" >{{ list.thirdPartyName }}</option>
						</select>
					</formg>
					<formg>
						<span slot="tl">第三方费率</span>
						<span slot="ct" style="width:210px;padding-top:0"><input  class="form-control" name="thirdPartyRatio" v-model="item.thirdPartyRatio" style="display:inline-block;width:70px;" allow="403" /> %（按年化利率计算） </span>	
						<span slot="ct1" class="fa fa-minus-square " style="cursor:pointer;padding-top:7px;" v-on:click="delThird(index)"  allow='401' showHide='1'  ></span>
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">业务部门意见</span>
						<textarea slot="ct" name="businessAdvice" class="form-control" v-model="info.businessAdvice" allow="403" ></textarea >
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">业务报告</span>
						<imgFlow btn-id="businessReport" v-bind:img-array="info.businessReport"  slot="ct" allows="403"></imgFlow>
					</formg>
				</div>								
			</div>
		</bPanel>
		<bPanel>
			<h4 slot="title">风控部门意见</h4>
			<div slot="body">
				<div class="fline">
					<formg>
						<span slot="tl">1、放款条件</span>
						<textarea slot="ct" name="loanCondition" class="form-control" v-model="info.loanCondition" allow="406"></textarea>
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">2、贷后管理</span>
						<textarea slot="ct" name="postLoanManagement" class="form-control" v-model="info.postLoanManagement" allow="406"></textarea>
					</formg>
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">3、风控意见</span>
						<textarea slot="ct" name="riskManagementAdvice" class="form-control" v-model="info.riskManagementAdvice" allow="406"></textarea>
					</formg>					
				</div>
				<div class="fline">
					<formg>
						<span slot="tl">风控报告</span>
						<imgFlow btn-id="riskManagementReport" v-bind:img-array="info.riskManagementReport"  slot="ct" allows="406"></imgFlow>
					</formg>
				</div>				
			</div>
		</bPanel>
		<bPanel>
			<h4 slot="title">风审会意见</h4>
			<div slot="body">
				<div class="fline">
					<formg>
						<span slot="tl">风审会意见</span>
						<textarea class="form-control" name="shareholdersMeetingAdvice" v-model="info.shareholdersMeetingAdvice" slot="ct" allow="409"></textarea>
					</formg> 
				</div>
				<div class="fline">
					<button type="button" class="btn btn-default" v-on:click="back" style="margin-left:20px;">返回流程一览</button>
					<button type="button" class="btn btn-primary pull-right" v-on:click="submit" style="margin-right:50px;" allow="403,406,409">提交</button>
					<button type="button" class="btn btn-default pull-right" v-on:click="save" style="margin-right:20px;" allow="403,406,409">保存</button>
					<button type="button" class="btn btn-default pull-right" v-on:click="download" style="margin-right:20px;" allow="409" id="download">授信审批表下载</button>
				</div>
			</div>
		</bPanel>
		<resume :id="info.id" :flowNumber="flowNumber"></resume>
		<addThird ref="addThird" @updateThird ="getThird" ></addThird>
	</div>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import dates from '../dates/dates.vue'
	import imgFlow from '../imgFlow/imgFlow.vue'
	import addThird from '../addThird/addThird.vue'
	import currency from '../currency/currency.vue'
	import resume from '../resume/resume.vue'
	export default{
		data(){
			return {
				info:{
					creditMainPartyId:'',                                       // 放款主体ID
					id:'',                                                      // 担保项目ID自增
					projectNumber:'',                                           // 项目编号
					guaranteeProjectName:'',                                    // 担保项目名称 
					creditId:'',                                                // 授信ID
					ifThirdPartyFee:'',                                         // 是否有第三方费用1是，0否
					businessAdvice:'',                                          // 业务部门意见
					businessReport:'',                                          // 业务报告
					businessOperator:'',                                        // 业务专员
					riskManagementOperator:'' ,                                 // 风控专员
					riskManagementAdvice:'',                                    // 风控部门意见
					loanCondition:'',                                           // 放款条件
					postLoanManagement:'',                                      // 贷后管理
					riskManagementReport:'',                                    // 风控报告
					shareholdersMeetingAdvice:'',                               // 风审会意见
					riskManagementApprovalReport:'',                            // 保理业务审批表
					guaranteeProjectBeginDay:'',                                // 立项开始日
					guaranteeProjectStatus:'',                                  // 担保项目状态项目状态1立项中;2已立项;3项目终止
					guaranteeCreditCompanyManage:[],                            // 融资企业列表
					thirdPartyRatioInfo:[]                                      // 第三方企业列表
				},
				flowNumber :'',                                                 // 批号
				creditMainPartyArr:$api.cMPArr(),                               // 放款主体列表
				companyArr:$api.cArr() ,                                        // 获取融资企业列表
				thirdList:$api.getThird()                                       // 第三方列表
			}
		},
		components:{
			bPanel ,
			formg ,
			dates ,
			imgFlow ,
			addThird ,
			currency ,
			resume
		},
		//获取放款主体详细信息
		computed:{
			cmpDetail(){
				return this.$store.state.creditMainPartyDetail
			} 
		},
		created(){
			var self = this;
			self.flowNumber = self.$route.query.flowNumber ;
			self.info.id = self.$route.query.creditProjectId ;
		},
		mounted(){
			var self = this ;
			//获取详细信息
			this.getInfo();
			var interval ;
			if(self.info.guaranteeCreditCompanyManage.length){
				interval = setInterval(function(){
					if($('.sc').length>0){
						//初始化文件上传插件
						for(let i=0;i<self.info.guaranteeCreditCompanyManage.length;i++){
 							$api.uploadImgsFun('#guaranteeReport'+i,function(evalEle){
								self.info.guaranteeCreditCompanyManage[i].guaranteeReport.push(evalEle);
							},'/upload/guarantee/');
						}
						//权限验证
						$api.checkAllow(null,self.$route.query);
						var iszjl = $api.isRole('董事长') || $api.isRole('业务经理');
						if(self.$route.query.state == '完结' && iszjl){
							$('#download').show();
						}
						clearInterval(interval);
					}
				})
			}
			//业务报告
			var bReport = $api.uploadImgsFun('#businessReport',function(evalEle){
				if(!self.info.businessReport)
					self.info.businessReport = [] ;
				self.info.businessReport.push(evalEle);
			},'/upload/guarantee/');
			//风控报告
			var rReport = $api.uploadImgsFun('#riskManagementReport',function(evalEle){
				if(!self.info.riskManagementReport)
					self.info.riskManagementReport = [] ;
				self.info.riskManagementReport.push(evalEle);
			},'/upload/guarantee/');
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num)
			},
			getInfo(){
				var self = this ;
				$api.ajax('/baoliyun/guarantee/getCreditDetail',{
					creditProjectId : self.info.id
				},function(data){
					data.obj = self.changeInfo(data.obj) ;
					self.info = data.obj ;
					//获取融资主体详细信息
					self.$store.dispatch('getCMPDetail',self.info.creditId);
				},null,{async:false})
			},
			changeInfo(data){
				//担保资料
				for(var i=0;i<data.guaranteeCreditCompanyManage.length;i++){
					data.guaranteeCreditCompanyManage[i].guaranteeReport = $api.split(data.guaranteeCreditCompanyManage[i].guaranteeReport) ;
				}
				// 业务报告
				data.businessReport = $api.split(data.businessReport) ;
				// 风控报告
				data.riskManagementReport = $api.split(data.riskManagementReport) ;
				// 第三方
				data.ifThirdPartyFee = data.ifThirdPartyFee ? 'true':'false'
				return data ;
			},
			addNewThird(){
				var self = this;
				if(!self.info.thirdPartyRatioInfo)
					self.info.thirdPartyRatioInfo=[];
				self.info.thirdPartyRatioInfo.push({
                    thirdPartyId: '',
                    thirdPartyName: '',
                    thirdPartyRatio: ''
				})
			},
			getThird(){
				this.thirdList = $api.getThird() ;
			},
			//第三方信息维护按钮事件
			addThird(){
				this.$refs.addThird.open();
			},
			//删除第三方信息
			delThird(index){
				this.info.thirdPartyRatioInfo.splice(index,1);
			},
			//返回按钮
			back(){
				this.$router.push({
					path : '/flowList',
					query: {						
						flowNumber:this.$route.query.flowNumber ,
						creditProjectId:this.$route.query.creditProjectId
					}
			    })
			},
			//获取第三方名称
			getName(_id){
				var _list = this.thirdList ;
				var _name;
				for(var i=0;i<_list.length;i++){
					if(_list[i].id == _id){
						_name = _list[i].thirdPartyName ;
					}
				}
				return _name
			},
			//保存
			save(callback){
				var self = this ; 
				var _info = $api.vueToObj(self.info) ;
				if(_info.ifThirdPartyFee=='false' || !_info.ifThirdPartyFee){
					_info.thirdPartyRatioInfo = [] ;
				}else{
					for(var i=0;i<_info.thirdPartyRatioInfo.length;i++){
						_info.thirdPartyRatioInfo[i].thirdPartyName = self.getName(_info.thirdPartyRatioInfo[i].thirdPartyId)
					}
				}
				//文件上传数组转为字符串
				//担保资料
				for(var i=0;i<_info.guaranteeCreditCompanyManage.length;i++){
					_info.guaranteeCreditCompanyManage[i].guaranteeReport = $api.join(_info.guaranteeCreditCompanyManage[i].guaranteeReport) ;
				}
				//业务报告
				_info.businessReport = $api.join(_info.businessReport);
				//风控报告
				_info.riskManagementReport = $api.join(_info.riskManagementReport);
				if(!$('#detailedDepartment').data('bootstrapValidator')){
					self.validator();
				}
				//点击保存时触发表单验证
			    $('#detailedDepartment').bootstrapValidator('validate');
		        if($('#detailedDepartment').data('bootstrapValidator').isValid()){
					$api.ajax('/baoliyun/guarantee/saveCreditDetail',_info,function(data){
						data.obj = self.changeInfo(data.obj) ;
						self.info = data.obj ;
						if(typeof callback == 'function' ){
							callback();
						}else{
							toast.suc('保存成功');								
						}
					})
		        }
			},
			//提交
			submit(){
				var self = this ;
				self.save(function(){
					$api.ajax('/baoliyun/guarantee/saveProFlow',{
						pId : self.info.id,
						flowNumber: self.$route.query.flowNumber ,
						status:1,
						flowNodeNumber:-1,
						currentFlowNodeNumber:self.$route.query.flowNodeNumber,
						remark:''
					},function(data){
						self.back();
					})
				})
			},
			//pdf下载
			download(){
				window.open("/baoliyun/guarantee/Pdf?loginname="+$api.getUserInfo().loginname+"&creditProjectId="+this.info.id );
			},
			//项目添加表单验证
			validator(){
				var _fields = {} ;
				if(this.$route.query.flowNodeNumber == 403 ){
					_fields = {
						guaranteeBeginDay:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			            },
			            thirdPartyId:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			            },
			            thirdPartyRatio:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    },
			                    regexp: $api.rep.num2,
			                    callback: $api.rep.num0
			                }
			            },
			            guaranteeEndDay:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			            },
			            creditGuaranteeLine:{
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
			           guaranteeRatio:{
			           		validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   },
			                   regexp: $api.rep.num2,
				        	   callback: $api.rep.num0
			               }
			           },
			           businessAdvice:{
			           		validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			           }
					}
				}
				else if( this.$route.query.flowNodeNumber == 406 ){
					_fields = {
						loanCondition:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
						},
						postLoanManagement:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
						},
						riskManagementAdvice:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
						}
					}

				}
				else if( this.$route.query.flowNodeNumber == 409 ){
					_fields = {
						shareholdersMeetingAdvice:{
							validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
						}
					}
				}
				$('#detailedDepartment').bootstrapValidator({
			       	feedbackIcons: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			         },
			         fields: _fields
			    })
			}
		}
	}
</script>
<style scoped>
	.panel{
		margin-bottom: 0px;
		border-top:0;
	}
	.hr-line-dashed{
		border-top:1px dashed #ddd;
	}
</style>