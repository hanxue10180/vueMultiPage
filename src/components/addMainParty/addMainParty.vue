<template>
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	                <h4 class="modal-title">添加放款主体</h4>
	            </div>
	            <div class="modal-body">
	            	<div class="form-group">
	            		<label class="fLabel">放款主体名称★</label>
	            		<input class="form-control" type="text" v-model="creditMainPartyName" name="creditMainPartyName"/>
	            	</div>
	            	<div class="form-group">
	            		<label class="fLabel">备考</label>
	            		<input class="form-control" type="text" v-model="remarks" name="remarks"/>
	            	</div>
	            </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	                <button type="button" class="btn btn-primary" v-on:click="save">保存</button>
	            </div>
	        </div>
	    </div>
	</div> 
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				id:-1,
				creditMainPartyName:'',
				remarks:'',
				updateUser:$api.getUserInfo().loginname
			}
		},
		methods:{
			save(){
				var self = this;
				self.validator();
				//点击保存时触发表单验证
            	$('.modal-body').bootstrapValidator('validate');
           		if($(".modal-body").data('bootstrapValidator').isValid()){
					var _info = $api.vueToObj(this.$data);
					$api.ajax('/baoliyun/guarantee/saveCreditMainPartyInfo',_info,function(data){
						self.$emit('getArr');
						$('#myModal').modal('hide');  
					})
           		}
			},
			validator(){
				$('.modal-body').bootstrapValidator({
			       	feedbackIcons: {
			           valid: 'glyphicon glyphicon-ok',
			           invalid: 'glyphicon glyphicon-remove',
			           validating: 'glyphicon glyphicon-refresh'
			        },
			        fields: {
						creditMainPartyName:{
							validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   },
			                   stringLength:{
				        			max:100,
				        			message:'不能超过100位'
				        	   }			                
			               }
						},
						remarks:{
							validators: {
			                   stringLength:{
				        			max:500,
				        			message:'不能超过500位'
				        	   }			                
			               }
						}
			        }
			    })
			}
		}
	}
</script>	
<style lang="less" scoped>
	.form-group{
		overflow:hidden;
		.form-control{
			width:200px;
			float:left;
			margin-left:20px;
		}
	}
	
</style>