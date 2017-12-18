<template>	
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 class="modal-title">添加第三方企业</h4>
	            </div>
	            <div class="modal-body" style="overflow:hidden">
		            <form id="addCom" class="form-horizontal">
		            	<div class="form-group">
		            		<label class="fLabel">第三方名称★</label>
		            		<div class="col-sm-8">
		            			<input type="text" class="form-control" name="thirdPartyName" v-model="thirdInfo.thirdPartyName"/>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">营业执照注册号或统一社会信用代码★</label>
		            		<div class="col-sm-5">
		            			<input type="text" class="form-control" name='businessLicenseRegistrationNo' v-model="thirdInfo.businessLicenseRegistrationNo"/>
		            		</div>
		            	</div>
		            	<div class="form-group">
							<div class="fLabel">
								<input type="checkbox" v-on:click="change($event)" name="ifThreeInOne" v-model="thirdInfo.ifThreeInOne"/>
							</div>
							<label class="control-label col-sm-8" style="text-align:left;padding-top:7px;">是三证合一企业，免填组织机构代码，税务登记号</label>
						</div>
						<div class="form-group">
		            		<label class="fLabel">组织结构代码</label>
		            		<div class="col-sm-5">
		            			<input type="text" class="form-control" name='organizationCode' v-model='thirdInfo.organizationCode' />
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">税务登记号</label>
		            		<div class="col-sm-5">
		            			<input type="text" class="form-control" name='taxRegistrationNumber'  v-model='thirdInfo.taxRegistrationNumber'/>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">开户行信息</label>
		            		<div class="col-sm-8">
		            			<input type="text" class="form-control" name="bankInfo" v-model="thirdInfo.bankInfo"/>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">银行账号★</label>
		            		<div class="col-sm-8">
		            			<input type="text" class="form-control" name="bankAccountNumber" v-model="thirdInfo.bankAccountNumber"/>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">开户名★</label>
		            		<div class="col-sm-8">
		            			<input type="text" class="form-control" name="payee" v-model="thirdInfo.payee"/>
		            		</div>
		            	</div>
		            </form>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	                <button type="button" class="btn btn-primary" v-on:click='saveThird'>保存</button>
	            </div>
	        </div>
	    </div>
	</div> 
</template>
<script type="text/javascript">
	var _initInfo = function(){
		return {
			id:-1,
			thirdPartyName:'',
			businessLicenseRegistrationNo:'',
			ifThreeInOne:0,
			organizationCode:'',
			bankInfo:'',
			bankAccountNumber:'',
			payee:'',
			taxRegistrationNumber:'',
			updateUser:$api.getUserInfo().loginname
		}
	}
	export default{
		data(){
			return {
				thirdInfo:_initInfo()
			}
		},
		methods:{
			change(e){
				if($(e.target).prop('checked')){
		    		$("input[name=organizationCode]").prop('readonly','readonly').val('');
		    		$("input[name=taxRegistrationNumber]").prop('readonly','readonly').val('');
		    	}else{
		    		$("input[name=organizationCode]").prop('readonly','');
		    		$("input[name=taxRegistrationNumber]").prop('readonly','');
		    	};
			},
			open(){
				if($("#addCom").data('bootstrapValidator')){
					$("#addCom").data('bootstrapValidator').destroy();
		        	$('#addCom').data('bootstrapValidator', null);
				}
		        $("input[name=organizationCode]").prop('readonly','').val('');
				$("input[name=taxRegistrationNumber]").prop('readonly','').val('');
				this.thirdInfo = _initInfo() ;
				$('#myModal').modal({backdrop: 'static', keyboard: false}); 
			},
			saveThird(){
				var self = this ; 
				this.formValidator() ;			
				//点击保存时触发表单验证
			    $('#addCom').bootstrapValidator('validate');
		        //如果表单验证正确，则请求后台添加用户
		        if($("#addCom").data('bootstrapValidator').isValid()){
		        	var _data = $api.vueToObj(self.thirdInfo);
					$api.ajax('/baoliyun/guarantee/saveThirdPartyInfo',_data,function(data){
						self.$emit('updateThird');
						$('#myModal').modal('hide');  
					})
		        }
			},
			formValidator(){
				//企业添加表单验证
				$('#addCom').bootstrapValidator({
			       	feedbackIcons: {
			            valid: 'glyphicon glyphicon-ok',
			            invalid: 'glyphicon glyphicon-remove',
			            validating: 'glyphicon glyphicon-refresh'
			         },
			         fields: {
			         	thirdPartyName: {
			                validators: {
			                    notEmpty: {
			                        message: '不能为空'
			                    }
			                }
			            },
			            businessLicenseRegistrationNo: {
			                validators: {
			             	   notEmpty:{
			             		   message:'不能为空'
			             	   },
			             	   regexp:$api.rep.str,
			             	   stringLength:{
			             		   max:20,
			             		   message:'不能超过20位'
			             	   }
			                }
			            },
			            organizationCode:{
			            	validators: {
			             	   regexp:$api.rep.str,
			             	   stringLength:{
			             		   max:9,
			             		   message:'不能超过9位'
			             	   }
			                }
			            },
			            taxRegistrationNumber:{
			            	validators: {
			             	   regexp:$api.rep.str,
			             	   stringLength:{
			             		   max:20,
			             		   message:'不能超过20位'
			             	   }
			                }
			            },
			            bankInfo:{
			            	validators: {
			             	   stringLength:{
			             		   max:100,
			             		   message:'不能超过100位'
			             	   }
			                }
			            },
			            bankAccountNumber:{
			            	validators: {
			             	   stringLength:{
			             		   max:60,
			             		   message:'不能超过60位'
			             	   }
			                }
			            },
			            payee:{
			            	validators: {
			             	   stringLength:{
			             		   max:60,
			             		   message:'不能超过60位'
			             	   }
			                }
			            }
			         }
				})
			}
		}
	}	
</script>