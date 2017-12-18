<template>
	<bPanel >
		<h4 slot="title">绩效添加</h4>
		<div slot="body" id="awardConfig">
			<div class="fline">
				<formg>
					<span slot="tl">生效日期（提成）</span>
					<dates slot="ct" name="performanceAvailabilityDate" v-model="info.performanceAvailabilityDate" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">推荐客户的员工,获得利息收入比例（%）</span>
					<input type="text" class="form-control" name="insAwardScale" slot="ct" v-model="info.configValue.insAwardScale" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">月发放比例（%）</span>
					<input type="text" class="form-control" name="monthPutoutScale" slot="ct" v-model="info.configValue.monthPutoutScale" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">逾期多少个月之内补发利息提成</span>
					<input type="text" class="form-control" slot="ct" name="insSupplyagainMaxMom" v-model="info.configValue.insSupplyagainMaxMom" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">业务部门首次放款奖励</span>
					<input type="text" class="form-control" slot="ct" name="loanAwardForFirst" v-model="info.configValue.loanAwardForFirst" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">业务部门之后每月放款奖励</span>
					<input type="text" class="form-control" slot="ct" name="loanAwardForSecond" v-model="info.configValue.loanAwardForSecond" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">风控部门首次放款奖励</span>
					<input type="text" class="form-control" slot="ct" name="loanAwardForRsk" v-model="info.configValue.loanAwardForRsk" allow="jxedit"/>
				</formg>
			</div>
			<br/>
			<br/>

			<div class="fline">
				<formg>
					<span slot="tl">生效日期（考核）</span>
					<dates slot="ct" name="checkAvailabilityDate" v-model="info.checkAvailabilityDate" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">考核周期</span>
					<select name="loginname" v-model="info.configValue.checkCycleMonthUnit" slot="ct" class="form-control" allow="jxedit">
						<option value="3">3</option>
						<option value="6">6</option>
					</select>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">每个周期最少新增客户</span>
					<input type="text" class="form-control" slot="ct" name="minCustomCntInCheckCycle" v-model="info.configValue.minCustomCntInCheckCycle" v-bind:disabled="!isOpen1 ? info.configValue.minCustomCntInCheckCycle='': false" allow="jxedit"/>
				</formg>
				<div class="form-group" style="float:left;margin-left:30px;">
					<input type="checkbox" name="isOpen1" value="true" v-model="isOpen1" allow="jxedit"/>
					<label class="fLable" style="text-align:left">启用</label>
				</div>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">每个考核周期的放款额不得低于（万元）</span>
					<input type="text" class="form-control" slot="ct" name="minLoanAmountInCheckCycle" v-model="info.configValue.minLoanAmountInCheckCycle" v-bind:disabled="!isOpen2 ? info.configValue.minLoanAmountInCheckCycle='': false" allow="jxedit"/>
				</formg>
				<div class="form-group" style="float:left;margin-left:30px;">
					<input type="checkbox" name="isOpen2" value="true" v-model="isOpen2" allow="jxedit" />
					<label class="fLable" style="text-align:left">启用</label>
				</div>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">自下一考核周期的第一个月起,每月扣（元）</span>
					<input type="text" class="form-control" slot="ct" name="chargeBackAmount" v-model="info.configValue.chargeBackAmount" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">连续几个考核周期未增有效客户数,劝退</span>
					<input type="text" class="form-control" slot="ct" name="checkCycleForFire" v-model="info.configValue.checkCycleForFire"
					v-bind:disabled="!isOpen3 ? info.configValue.checkCycleForFire='': false" allow="jxedit"/>
				</formg>
				<div class="form-group" style="float:left;margin-left:30px;">
					<input type="checkbox" name="isOpen3" value="true" v-model="isOpen3" allow="jxedit"/>
					<label class="fLable" style="text-align:left">启用</label>
				</div>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">年累计放款未达标（万元）,劝退</span>
					<input type="text" class="form-control" slot="ct" name="minLoanAmountForFire" v-model="info.configValue.minLoanAmountForFire" v-bind:disabled="!isOpen4 ? info.configValue.minLoanAmountForFire='': false" allow="jxedit"/>
				</formg>
				<div class="form-group" style="float:left;margin-left:30px;">
					<input type="checkbox" name="isOpen4" value="true" v-model="isOpen4" allow="jxedit" />
					<label class="fLable" style="text-align:left">启用</label>
				</div>
			</div>

			<div class="fline" style="margin-top:30px;">
				<button class="btn btn-default col-sm-1 col-sm-offset-1" v-on:click="back">返回</button>
				<button class="btn btn-primary col-sm-1 col-sm-offset-1" v-on:click="save" allow="jxedit">保存</button>
			</div>
		</div>
	</bPanel>
</template>
<script>
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import dates from '../dates/dates.vue'
	export default{
		data(){
			return {
				uList:[],       //人员列表
				 info:{
					id: -1,
					affiliatedFactoringEnterpriseId:-1,
					performanceAvailabilityDate:new Date().getTime(),
					checkAvailabilityDate:new Date().setFullYear(2018,0,1),
					configValue:{
						insAwardScale : 1,
						monthPutoutScale : 70,
						insSupplyagainMaxMom:3,
						loanAwardForFirst:500,
						loanAwardForSecond:50,
						loanAwardForRsk:400,
						checkCycleMonthUnit:6,
						minCustomCntInCheckCycle:1,
						minLoanAmountInCheckCycle:500,
						chargeBackAmount:500,
						checkCycleForFire:2,
						minLoanAmountForFire:1000
					},
					applyStatus:2,
					delFlag:0,
					updateUser:'',
				},
				isOpen1:true,
				isOpen2:true,
				isOpen3:true,
				isOpen4:true
			}
		},
		components:{
			bPanel,
			formg,
			dates
		},
		created(){
			this.info.id = this.$route.query.id ;
			if(this.info.id!=-1){
				this.getInfo();
				if(!this.info.configValue.minCustomCntInCheckCycle){
					this.isOpen1=false;
				}
				if(!this.info.configValue.minLoanAmountInCheckCycle){
					this.isOpen2=false;
				}
				if(!this.info.configValue.checkCycleForFire){
					this.isOpen3=false;
				}
				if(!this.info.configValue.minLoanAmountForFire){
					this.isOpen4=false;
				}
			}
		},
		mounted(){
			this.$nextTick(function(){
				$api.checkAllow();
			})
		},
		methods:{
			getInfo(){
				var self = this ;
				$api.ajax('/baoliyun/performance/getAwardConfigDetail',{
					id:self.info.id
				},function(data){
					data.obj.configValue = JSON.parse(data.obj.configValue);
					self.info = data.obj;
				},null,{async:false})
			},
			save(){
				var self =this;
				self.validator() ;
				self.info.updateUser = $api.getUserInfo().loginname
				var _info = $api.vueToObj(self.info) ;
				_info.configValue = JSON.stringify(_info.configValue);
				_info.affiliatedFactoringEnterpriseId = $api.getUserInfo().affiliatedFactoringEnterpriseId;
				//点击保存时触发表单验证
            	$('#awardConfig').bootstrapValidator('validate');
           		if($("#awardConfig").data('bootstrapValidator').isValid()){
           			$api.ajax('/baoliyun/performance/saveAwardConfig',_info,function(data){
						self.back();
					})
           		}
			},
			back(){
				this.$router.go(-1);
			},
			validator(){
				$('#awardConfig').bootstrapValidator({
			       	feedbackIcons: {
			           valid: 'glyphicon glyphicon-ok',
			           invalid: 'glyphicon glyphicon-remove',
			           validating: 'glyphicon glyphicon-refresh'
			        },
			        fields: {
			            performanceAvailabilityDate: {
							validators: {
								notEmpty: {
									message: '不能为空'
								}
							}
						},
						checkAvailabilityDate: {
							validators: {
								notEmpty: {
									message: '不能为空'
								}
							}
						},
						applyStatus: {
							validators: {
								notEmpty: {
									message: '不能为空'
								}
							}
						}  ,
						insAwardScale: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
				        	    callback: $api.rep.num0 
							}
						},
						monthPutoutScale: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
				        	    callback: $api.rep.num0
							}
						},
						insSupplyagainMaxMom: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~12的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 12 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						}    ,
						loanAwardForFirst: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10000的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10000 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						},
						loanAwardForSecond: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10000的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10000 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						},
						loanAwardForRsk:{
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10000的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10000 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						},
						checkCycleMonthUnit: {
							validators: {
								notEmpty: {
									message: '不能为空'
								}
							}
						}  ,
						minCustomCntInCheckCycle: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						},
						minLoanAmountInCheckCycle: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10000的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10000 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						},
						chargeBackAmount: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10000的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10000 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						} ,
						checkCycleForFire: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						},
						minLoanAmountForFire: {
							validators: {
								notEmpty: {
									message: '不能为空'
								},
								regexp: $api.rep.int,
								callback:{
									message:'1~10000的整数',
								    callback:function(value,validator){		
									   if( value< 1 || value > 10000 )
									   	   return false;
									   else
										   return true;
								    }
								}
							}
						}                           
			        }
			    });
			}
		}

	}
</script>