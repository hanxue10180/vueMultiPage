<template>	
	<!-- 添加企业模态窗 -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 class="modal-title">新增企业</h4>
	            </div>
	            <div class="modal-body" style="overflow:hidden">
		            <form id="addCom" class="form-horizontal">
		            	<div class="form-group">
		            		<label class="fLabel">企业名称★</label>
		            		<div class="col-sm-8">
		            			<input type="text" class="form-control" name="companyName" v-model="newcompany.companyName"/>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">企业类型</label>
		            		<div class="col-sm-4">
		            			<select class="form-control" v-model="newcompany.companyType" name='companyType'>
		            				<option v-for="(value,key) in companyTypeEnum" v-bind:value="key">{{value}}</option>
		            			</select>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">营业执照注册号或统一社会信用代码★</label>
		            		<div class="col-sm-5">
		            			<input type="text" class="form-control" name='businessLicenseRegistrationNo' v-model="newcompany.businessLicenseRegistrationNo"/>
		            		</div>
		            	</div>
		            	<div class="form-group">
							<div class="fLabel">
								<input type="checkbox" v-on:click="change($event)" name="ifThreeInOne" v-model="newcompany.ifThreeInOne"/>
							</div>
							<label class="control-label col-sm-8" style="text-align:left;padding-top:7px;">是三证合一企业，免填组织机构代码，税务登记号</label>
						</div>
						<div class="form-group">
		            		<label class="fLabel">组织结构代码</label>
		            		<div class="col-sm-5">
		            			<input type="text" class="form-control" name='organizationCode' v-model='newcompany.organizationCode'/>
		            		</div>
		            	</div>
		            	<div class="form-group">
		            		<label class="fLabel">税务登记号</label>
		            		<div class="col-sm-5">
		            			<input type="text" class="form-control" name='taxRegistrationNumber'  v-model='newcompany.taxRegistrationNumber'/>
		            		</div>
		            	</div>
		            </form>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	                <button type="button" class="btn btn-primary" v-on:click='saveCompany'>保存</button>
	            </div>
	        </div>
	    </div>
	</div> 
</template>
<script type="text/javascript">
	var _initInfo = function(){
		return {
			id:-1,
			companyName:'',
			systemType:1,
			companyType:1,
			businessLicenseRegistrationNo:'',
			ifThreeInOne:0,
			organizationCode:'',
			taxRegistrationNumber:'',
			createUser:$api.getUserInfo().loginname,
			updateUser:$api.getUserInfo().loginname,
			affiliatedFactoringEnterpriseId:$api.getUserInfo().affiliatedFactoringEnterpriseId	
		}
	}
	export default{
		data(){
			return {
				newcompany:_initInfo(),
				companyTypeEnum:$api.getCT()
			}
		},
		methods:{
			open(){
				if($("#addCom").data('bootstrapValidator')){
					$("#addCom").data('bootstrapValidator').destroy();
		        	$('#addCom').data('bootstrapValidator', null);
				}
		        $("input[name=organizationCode]").prop('readonly','').val('');
				$("input[name=taxRegistrationNumber]").prop('readonly','').val('');
				this.newcompany = _initInfo() ;
				$('#myModal').modal({backdrop: 'static', keyboard: false}); 
			},
			saveCompany(){
				var self = this ; 
				this.formValidator() ;			
				//点击保存时触发表单验证
			    $('#addCom').bootstrapValidator('validate');
		        //如果表单验证正确，则请求后台添加用户
		        if($("#addCom").data('bootstrapValidator').isValid()){
		        	var _data = $api.vueToObj(self.newcompany);
					$api.ajax('/baoliyun/companyInfo/save',_data,function(data){
						self.$emit('updateCom');
						$('#myModal').modal('hide');  
					})
		        }
			},
			change(e){
				if($(e.target).prop('checked')){
		    		$("input[name=organizationCode]").prop('readonly','readonly').val('');
		    		$("input[name=taxRegistrationNumber]").prop('readonly','readonly').val('');
		    	}else{
		    		$("input[name=organizationCode]").prop('readonly','');
		    		$("input[name=taxRegistrationNumber]").prop('readonly','');
		    	};
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
			         	companyName: {
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
			             	   regexp: {
			             		   regexp: /^[A-Za-z0-9]+$/,
			             		   message: '格式错误'
			             	   },
			             	   stringLength:{
			             		   max:20,
			             		   message:'不能超过20位'
			             	   }
			                }
			            }
			         }
				})
			}
		}
	}	
</script>