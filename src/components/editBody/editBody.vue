<template>
	<div class="editBody">
      	<div class="col-sm-12">
    		<div class="ibox float-e-margins">
    			<div class="ibox-title">
                    <h5>添加/修改</h5>
                </div>
                <div class="ibox-content">
	                <form id="editForm" method="post" class="form-horizontal">
	                    <div class="fline">
		                    <div class="form-group formg">
		                        <label class="fLabel">授信ID</label>
		                        <div class="formInput">
		                            <span>{{ creditInfo.id }}</span>
		                        </div>
		                    </div>
	                    </div>
	                    <div class="hr-line-dashed"></div>
	                    <div class="fline">
		                    <div class="form-group formg">
		                        <label class="fLabel">保理公司名称★</label>
		                        <div class="formInput">
		                            <input class="form-control" v-model="creditInfo.factoringCompanyName" name="factoringCompanyName" disabled="true" />
		                        </div>
		                    </div>
		                    <div class="form-group formg">
		                        <label class="fLabel">放款主体名称★</label>
		                        <div class="formInput">
		                            <select class="form-control"  :allow='allows' name="creditMainPartyId" v-model="creditInfo.creditMainPartyId">
		                            	<option v-for="item in creditMainPartyArr" v-bind:value="item.id" v-text="item.creditMainPartyName"></option>
		                            </select>
		                        </div>
		                    </div>
		                    <button type="button" class="btn btn-default" style="margin-left:20px;" v-on:click="addMP"  :allow='allows' >维护放款主体信息</button>
		                </div>
		                <div class="hr-line-dashed"></div>
		                <div class="fline">
		                	<div class="form-group formg">
		                		<label class="fLabel">授信额度(元)★</label>
		                		<div class="formInput">
		                			<currency type="text" class="form-control"  :allow='allows' v-model.number="creditInfo.creditLine" name="creditLine" />
		                		</div>
		                		<div class="formInput" style="width:100px;">
		                			<select class="form-control"  :allow='allows' name="creditCurrent" v-model="creditInfo.creditCurrent" >
		                				<option value="1">人民币</option>
		                				<option value="2">美元</option>
		                			</select>
		                		</div>
		                	</div>
		                </div>
		                <div class="hr-line-dashed"></div>
		                <div class="fline">
		                	<div class="form-group formg">
		                		<label class="fLabel">授信期限★</label>
		                		<div class="formInput">
		                			<input type="text" class="form-control"  :allow='allows' name="creditTerm" v-model="creditInfo.creditTerm"/>
		                		</div>
		                		<div class="formInput" style="width:100px;">
		                			<select class="form-control" name="creditCurrent"  :allow='allows' v-model="creditInfo.creditTermUnit" >
		                				<option value="1">年</option>
		                				<option value="2">月</option>
		                				<option value="2">日</option>
		                			</select>
		                		</div>
		                	</div>
		                </div>
		                <div class="hr-line-dashed"></div>
		                <div class="fline">
		                	<div class="form-group formg">
		                		<label class="fLabel">授信额度类型★</label>
		                		<div class="formInput">
		                			<select class="form-control" name="creditLineType"  :allow='allows' v-model="creditInfo.creditLineType">
		                				<option value="1">循环额度</option>
		                				<option value="2">单次</option>
		                			</select>
		                		</div>
		                	</div>
		                </div>
		                <div class="hr-line-dashed"></div>
		                <div class="fline">
		                	<div class="form-group formg">
		                		<label class="fLabel">保证金支付方式★</label>
		                		<div class="formInput">
		                			<select name="depositPayWays"  :allow='allows' v-model="creditInfo.depositPayWays" class="form-control" >
		                				<option value=1 >不支付</option>
		                				<option value=2 >一次性支付</option>
		                				<option value=3 >按放款单位支付</option>
		                			</select>
		                		</div>
		                	</div>
		                	<div class="form-group formg" v-if="creditInfo.depositPayWays!=1" >
		                		<label class="fLabel">保证金担付方</label>
		                		<div class="formInput" style="width:100px">
		                			<input type="radio" name="depositPayer" value="2" v-model="creditInfo.depositPayer"  :allow='allows' />
		                			<label class="fLabel" style="text-align:left;width:70px;">保理公司</label>
	                			</div>
	                			<div class="formInput">
									<input type="radio" name="depositPayer" value="1" v-model="creditInfo.depositPayer"  :allow='allows' />
		                			<label class="fLabel" style="text-align:left;">企业</label>
		                		</div>
		                	</div>
		                </div>
		                <div class="hr-line-dashed"  v-show="creditInfo.depositPayWays==2"></div>	
		                <div class="fline"  v-show="creditInfo.depositPayWays==2">
		                	<div class="form-group formg">
		                		<label class="fLabel">预计支付保证金（入）</label>
		                		<div class="formInput">
		                			<input type="text" class="form-control"  name="preDepositAmount" v-model.number="creditInfo.preDepositAmount"  :allow='allows' />
		                		</div>
		                		<div class="formInput" style="width:100px;">
		                			<select class="form-control" name="creditCurrent" v-model="creditInfo.creditCurrent"  disabled="true">
		                				<option value="1">人民币</option>
		                				<option value="2">美元</option>
		                			</select>
		                		</div>
		                	</div>
		                	<div class="form-group formg" >
		                		<label class="fLabel">保证金预定支付日</label>
		                		<div class="formInput">
			                		<dates name="depositPrePayDate" v-model="creditInfo.depositPrePayDate"  :allow='allows' />
		                		</div>
		                	</div>
		                </div>
		                <div class="hr-line-dashed"></div>
		                <div class="fline">
		                	<div class="form-group formg">
		                		<label class="fLabel">授信开始日★</label>
		                		<div class="formInput">
			                		<dates  name="creditBeginDay"  :allow='allows' v-model="creditInfo.creditBeginDay" />
		                		</div>
		                	</div>
		                	<div class="form-group formg">
		                		<label class="fLabel">授信结束日★</label>
		                		<div class="formInput">
			                		<dates name="creditEndDay"  :allow='allows' v-model="creditInfo.creditEndDay" />
		                		</div>
		                	</div>
		                </div>
		                <div class="hr-line-dashed"></div>
		                <div class="fline">
		                	<div class="form-group formg">
			                	<label class="fLabel">担保状态</label>
			                	<div class="formInput">
			                		<select name="creditStatus" v-model="creditInfo.creditStatus" class="form-control" disabled="true">
			                			<option value="1">未申请</option>
			                			<option value="2">已申请</option>
			                			<option value="3">已过期</option>
			                		</select>
			                	</div>
		                	</div>
		                </div>
	                    <div class="hr-line-dashed"></div>		                   
	                    <div class="form-group">
	                    	<div class="col-sm-2 col-sm-offset-1">
	                            <button type="button" class="btn btn-default btn-block" v-on:click="back">返回</button>
	                        </div>               	
	                        <div class="col-sm-2 col-sm-offset-1" >
	                            <button type="button" :allow="allows" class="btn btn-primary btn-block" v-on:click="save(1)">保存</button>
	                        </div>	                       
	                        <div class="col-sm-2 col-sm-offset-1">
	                            <button type="button"  :allow='allows' class="btn btn-default btn-block" v-on:click="save(2)" v-bind:disabled="!creditInfo.p1Enable || creditInfo.depositPayWays != 2 " >生成保证金支付记录</button>
	                        </div>
	                    </div>
	                </form>
                </div>
    		</div>
        </div>
    </div>
</template>
<script type="text/javascript">   
	import dates from '../dates/dates.vue'
	import currency from '../currency/currency.vue'
	var cInfo =function(){
		return {
			id:'',                        // 授信ID
			factoringCompanyId:$api.getUserInfo().factoringCompany.id,        // 保理公司Id
			creditMainPartyId:'',         // 放款主体ID
			factoringCompanyName:$api.getUserInfo().factoringCompany.companyName,      // 保理公司名称
			creditMainPartyName:'',       // 放款主体名称
			creditLine:'',                // 授信额度(元)
			creditCurrent:1,              // 授信币种 1人民币，2美元
			creditTerm:'',                // 授信期限
			creditTermUnit:1,             // 授信期限单位 1年，2月，3日
			creditLineType:1 ,            // 授信额度类型 1循环额度，2单次
			mainUsedGuaranteeAmount:'',   // 放款主体在保担保额度
			mainUsableGuaranteeAmount:'', // 放款主体可用担保额度
			creditBeginDay:'',            // 授信开始日
			creditEndDay:'',              // 授信结束日
			creditStatus:'',              // 担保状态 1未申请，2已申请，3已到期
			depositPayWays:1 ,            // 保证金支付方式 1不支付，2一次性支付，3按放款单位支付
			depositPayer:'',              // 保证金担负方 1企业，2保理公司
			preDepositAmount:'',          // 预计收取保证金
			depositPrePayDate:'',         // 保证金预定支付日
			depositStatus:1 ,             // 保证金状态 1不支付，2未支付，3已支付，4未收取，5已收取
			updateUser:'',                // 更新者
			p1Enable:false,               // 生成保证金支付记录按钮状态
		}
	}
    export default{
        data () {
            return {
        		creditInfo:cInfo()
            }
        },
        props:['creditMainPartyArr','allows'],
        components:{
        	dates,
        	currency
        },
        methods:{
        	//初始化
        	getInfo(eid){
        		var self = this;
        		if(eid == -1){
        			self.creditInfo.id = -1;
        		}else{
	        		$api.ajax('/baoliyun/guarantee/getFactoringCompanyCreditDetail',{
	        			id:eid
	        		},function(data){
	        			data.obj.factoringCompanyName = data.obj.factoringCompanyName ? data.obj.factoringCompanyName : $api.getUserInfo().factoringCompany.companyName ;
	        			self.creditInfo = data.obj;
	        		})        			
        		}
        	},
        	//放款主体保存
        	addMP(){
        		$('#myModal').modal({backdrop: 'static', keyboard: false}); 
        	},
        	//返回按钮事件
        	back(){	
        		this.creditInfo = cInfo();	
				$api.formBackFun();
				this.$emit('refresh');
        	},
        	//保存按钮事件
        	save(num){
        		var self = this ;
        		self.validate();
        		//【保证金担付方】选择【保理公司】时，【保证金】【保证金预定支付日】必须录入；选择【企业】时不可录入
        		if(self.creditInfo.depositPayWays == 1 ){
        			self.creditInfo.depositPayer = '' ;
        			self.creditInfo.preDepositAmount = '';
        			self.creditInfo.depositPrePayDate = '';      			
        		}else if(self.creditInfo.depositPayWays == 3 ){
        			self.creditInfo.preDepositAmount = '';
        			self.creditInfo.depositPrePayDate = '';
        		}else{
        			$('#editForm').bootstrapValidator('addField','preDepositAmount',{
	        			validators:{
	     	        		stringLength:{
	     	        			max:18,
	     	        			message:'不能超过18位'
	     	        		},
	     	        		notEmpty:{
	     	        			message:'预计收取保证金不能为空'
	     	        		},
	     	        		regexp:$api.rep.num2
	     	        	}
        			});
        			$('#editForm').bootstrapValidator('addField','depositPrePayDate',{
	        			validators:{
	     	        		notEmpty:{
	     	        			message:' 保证金预定支付日 不能为空'
	     	        		}
	     	        	}
        			});
        		}
        		var _info = $api.vueToObj(self.creditInfo);
        		//点击保存时触发表单验证
            	$('#editForm').bootstrapValidator('validate');
           		if($("#editForm").data('bootstrapValidator').isValid()){
           			_info.updateUser = $api.getUserInfo().loginname ;
	        		_info.commit = num ;
	        		$api.ajax('/baoliyun/guarantee/saveFactoringCompanyCredit',_info,function(data){
	        			 self.getInfo(data.obj);
	        			 if(num == 1){
	        			 	toast.suc('保存成功')
	        			 }else{
	        			 	toast.suc('保证金收支记录生成！')
	        			 }
	        		},function(data){
	        			toast.err(data.msg);
	        			if(_info.id != -1)
	        				self.getInfo(_info.id);
	        		})
           		}       		
        	},
        	//表单验证
        	validate(){
        		$('#editForm').bootstrapValidator({
			       	feedbackIcons: {
			           valid: 'glyphicon glyphicon-ok',
			           invalid: 'glyphicon glyphicon-remove',
			           validating: 'glyphicon glyphicon-refresh'
			        },
			        fields: {
			            creditMainPartyId: {
			               validators: {
			                   notEmpty: {
			                       message: '放款主体不能为空'
			                   }			                
			               }
			            },
			            depositPayer:{
 							validators: {
			                   notEmpty: {
			                       message: '保证金担付方不能为空'
			                   }			                
			                }
			            },
			            creditLine: {
			               validators: {
			                   notEmpty: {
			                       message: '授信额度不能为空'
			                   },
				        	   stringLength:{
				        			max:18,
				        			message:'不能超过18位'
				        	   }
			               }
			            },
			            creditTerm:{
				            validators:{
					           notEmpty:{
					        	   message:'授信期限不能为空'
					           },
					           regexp: $api.rep.int,
					           stringLength:{
				        			max:11,
				        			message:'不能超过11位'
				        	   }
				            }		           	
			            },
			            creditBeginDay:{
			           		validators:{
					           notEmpty:{
					        	   message:'授信开始日不能为空'
					           }
				            }		
			            },
			           	creditEndDay:{
			           		validators:{
					           notEmpty:{
					        	   message:'授信结束日不能为空'
					           }
				            }		
			           },		           
			        }
			    });
        	}
        }
    }

</script>
<style lang="less" scoped>
	.editBody{
		width:100%;
		position: absolute;
		opacity: 0; 
		filter:Alpha(opacity=0);
		z-index:-20;
		top:10px;
		height:100px;
		overflow:hidden;
		.fline{
			overflow: hidden;
			.formg{
		       float:left;
		       display:inline-block;
		       margin-right: 0px;
		       margin-left: 0px;
		       input[type=radio]{
	           		float:left;
	           		display:inline-block;
	           		margin-top:10px;
	           		margin-right:5px;
	           }
		       .fLabel{
			   		width:150px;
			    }
			    .formInput{
			    	float:left;
			       	width:180px;
			       	display:inline-block;
			       	margin-left:10px;
			       	span,p{
	   					padding-top:7px;
   						display:inline-block;
			       	}
			    }
		    }			
		}
		.btn-default[disabled]{
			background-color: #fff;
			&:hover{
			    background-color: rgb(26, 179, 148);
			}
		}
	}
</style>