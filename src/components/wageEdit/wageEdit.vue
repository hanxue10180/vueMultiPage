<template>
	<bPanel >
		<h4 slot="title">员工添加</h4>
		<div slot="body" id="wageEdit">
			<div class="fline">
				<formg>
					<span slot="tl">员工姓名</span>
					<select name="loginname" v-model="info.loginname" slot="ct" class="form-control" allow="jxedit">
						<option v-for="item in uList" v-bind:value="item.loginname" v-text="item.name"></option>
					</select>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">公司职务</span>
					<span slot="ct" v-text="getJob()"></span>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">基本工资（元）</span>
					<currency class="form-control" type="text" name="rollAdjustedAmount" slot="ct" v-model="info.rollAdjustedAmount" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">岗位津贴（元）</span>
					<currency class="form-control" type="text" slot="ct" name="allowanceAdjustedAmount" v-model="info.allowanceAdjustedAmount" allow="jxedit"/>
				</formg>
			</div>
			<div class="fline">
				<formg>
					<span slot="tl">备考说明</span>
					<textarea slot="ct" name="remarks" class="form-control" v-model="info.remarks" allow="jxedit"></textarea>
				</formg>
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
	import currency from '../currency/currency.vue'
	export default{
		data(){
			return {
				uList:[],       //人员列表
				info:{
					id: '',
					loginname:'',
					rollAdjustedAmount:'',
					allowanceAdjustedAmount:'',
					remarks:'',
					updateUser:''
				}
			}
		},
		components:{
			bPanel,
			formg,
			currency
		},
		created(){
			this.info.id = this.$route.query.id ;
			this.getUserList();
			if(this.info.id!=-1 || this.$route.query.uid==-1){
				this.getInfo();
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
				$api.ajax('/baoliyun/performance/getPayrollDetail',{
					id:self.$route.query.uid ? self.$route.query.uid : self.info.id,
					loginname: self.$route.query.uid ? self.$route.query.loginname : ''
				},function(data){
					self.info = data.obj ;
				},null,{async:false})
			},
			save(){
				var self =this;
				self.validator() ;
				self.info.updateUser = $api.getUserInfo().loginname
				var _info = $api.vueToObj(self.info) ;
				//点击保存时触发表单验证
            	$('#wageEdit').bootstrapValidator('validate');
           		if($("#wageEdit").data('bootstrapValidator').isValid()){
           			$api.ajax('/baoliyun/performance/savePayroll',_info,function(data){
						self.back();
					})
           		}
			},
			back(){
				this.$router.push({
					path:'/',
					query:{
						ym:this.$route.query.ym
					}
				})
			},
			getUserList(){
				var self = this ;
				var _loginname = '' ;
				if(self.info.id != -1){
					_loginname = self.$route.query.loginname
				}
				$api.ajax('/baoliyun/performance/getUserInfoOnPerformance',{
					affiliatedFactoringEnterpriseId:$api.getUserInfo().affiliatedFactoringEnterpriseId ,
					loginname:_loginname
				},function(data){
					self.uList = data.obj ;
				},function(data){
					toast.err(data.msg);
				},{async:false})
			},
			getJob(){
				var self = this ;
				var _job = '' ;
				for(var i=0;i<self.uList.length;i++){
					if(self.uList[i].loginname == self.info.loginname){
						_job = self.uList[i].job ;
					}
				}
				return _job 
			},
			validator(){
				$('#wageEdit').bootstrapValidator({
			       	feedbackIcons: {
			           valid: 'glyphicon glyphicon-ok',
			           invalid: 'glyphicon glyphicon-remove',
			           validating: 'glyphicon glyphicon-refresh'
			        },
			        fields: {
			            loginname: {
			               validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   }			                
			               }
			            },
			            rollAdjustedAmount: {
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
			            allowanceAdjustedAmount:{
				           	validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   },
				        	   stringLength:{
				        			max:18,
				        			message:'不能超过18位'
				        	   }
			               	}	           	
			            } ,
			            remarks:{
			            	validators: {
			                   stringLength:{
				        			max:500,
				        			message:'不能超过500位'
				        	   }			                
			               }
			            }         
			        }
			    });
			}
		}

	}
</script>