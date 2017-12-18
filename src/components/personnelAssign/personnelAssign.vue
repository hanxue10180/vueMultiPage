<template>
	<div id="personnelAssign">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>项目基本信息</h4>
			</div>
			<div class="panel-body">
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel" >项目编号</label>
						<div class="formInput">
							<span>{{saveInfo.projectNumber}}</span>
						</div>
					</div>
				</div>
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel">项目名称★</label>
						<div class="formInput">
							<input type="text" class="form-control" name="guaranteeProjectName" v-model="saveInfo.guaranteeProjectName" allow="401"/>
						</div>
					</div>					
				</div>
			</div>
		</div>
		<div class="panel panel-default">	
			<div class="panel-heading">	
				<h4>关联企业指定</h4>
			</div>
			<div class="panel-body">
				<div class="fline">
					<div class="form-group formg">	
						<label class="fLabel">放款主体名称★</label>
						<div class="formInput">
							<select name="creditMainPartyId" v-model="saveInfo.creditMainPartyId" class="form-control" v-on:change="getCreditIdArr" allow="401" >
								<option  v-for="item in creditMainPartyArr" v-bind:value="item.id">{{item.creditMainPartyName}}</option>
							</select>
						</div>
					</div>
					<div class="form-group formg">
						<label class="fLabel">授信ID</label>
						<div class="formInput">
							<select name="creditId" v-model="saveInfo.creditId" class="form-control" v-on:change="getDetail" allow="401">
								<option v-for="item in creditIdArr" v-bind:value="item">{{item}}</option>
							</select>
						</div>
					</div>
				</div>	
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel">授信开始日</label>
						<div class="formInput">
							<span>{{ cmpDetail.creditBeginDay }}</span>
						</div>
					</div>
					<div class="form-group formg">
						<label class="fLabel">授信结束日</label>
						<div class="formInput">
							<span>{{ cmpDetail.creditEndDay }}</span>
						</div>
					</div>
				</div>	
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel">放款主体可用担保额度(元)</label>
						<div class="formInput">
							<span>{{ cmpDetail.mainUsableGuaranteeAmount }} </span>
							<span>{{ cmpDetail.creditCurrent }}</span>
						</div>
					</div>
					<div class="form-group formg">
						<label class="fLabel">授信额度类型</label>
						<div class="formInput">
							<span>{{ cmpDetail.creditLineType }} </span>
						</div>
					</div>
				</div>	
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel">融资企业名称★</label>			
						<div style="float:left;margin-left:10px;">
							<button class="btn btn-default" v-on:click='addCom' allow="401">企业添加</button>
							<button class="btn btn-default" v-on:click='openModel' allow="401">列表不存在，点此添加</button>
						</div>
					</div>
				</div>	
				<div class="fline" v-for="(list,index) in saveInfo.guaranteeCreditCompanyManage" >
					<div class="form-group formg">
						<span class="fLabel" ><span class="fa fa-minus-square " style="cursor:pointer" v-on:click="delCom(index)"  allow='401' showHide='1'  ></span></span>
						<div class="formInput">
							<select name="companyId" class="form-control" v-model="list.companyId" allow="401">
								<option v-for="item in companyArr" v-bind:value="item.id" >{{item.companyName}}</option>
							</select>
						</div>
					</div>
				</div>			
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4>人员指定</h4>
			</div>
			<div class="panel-body">
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel">业务人员指定</label>
						<div class="formInput">
							<select name="businessOperator" v-model="saveInfo.businessOperator" class="form-control"  allow='401'  >
								<option v-for="item in ywoperators" v-bind:value="item.loginname">{{item.name}}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="fline">
					<div class="form-group formg">
						<label class="fLabel">风控人员指定</label>
						<div class="formInput">
							<select name="riskManagementOperator" v-model="saveInfo.riskManagementOperator" class="form-control" allow='402' >
								<option v-for="item in fkoperators" v-bind:value="item.loginname">{{item.name}}</option>
							</select>
						</div>
					</div>					
				</div>
				<div class="form-group">
					<button class="btn btn-default" type="button" v-on:click="back">返回流程一览</button>
					<button class="btn btn-primary pull-right" v-on:click="submit" allow="401,402">提交</button>
					<button class="btn btn-primary pull-right" v-on:click="save" style="margin-right:10px;" allow="401,402">保存</button>
				</div>
			</div>
		</div>
		<resume :id="saveInfo.id" :flowNumber="saveInfo.flowNumber"></resume>
		<addCom @updateCom="updateCom" ref="addCom"></addCom>
	</div>
</template>
<script type="text/javascript">
	import resume from '../resume/resume.vue'
	import addCom from '../addNewCompany/addNewCompany.vue'
	export default{
		data(){
			return {
				saveInfo:{
					creditMainPartyId:'',                                       // 放款主体ID
					id:-1,                                                      // 担保项目ID自增
					flowNumber:'',                                              // 流程编号
					projectNumber:'',                                           // 项目编号
					guaranteeProjectName:'',                                    // 担保项目名称
					creditId:'',                                                // 授信ID				
					guaranteeCreditCompanyManage:[],                            // 融资企业数组
					businessOperator:'',                                        // 业务专员
					riskManagementOperator:'',                                  // 风控专员
					guaranteeProjectBeginDay:$api.getLong((new Date()).format("yyyy-MM-dd"))  //立项开始日
				},
				creditMainPartyArr:$api.cMPArr(),                               // 放款主体列表
				creditIdArr:[] ,                                                // 授信ID列表
				companyArr:$api.cArr(),                                         // 融资企业列表
				ywoperators:$api.operators().ywoperators,                       // 业务人员列表
				fkoperators:$api.operators().fkoperators                        // 风控人员指定
			}
		},
		//获取放款主体详细信息
		computed:{
			cmpDetail(){
				return this.$store.state.creditMainPartyDetail
			} 
		},
		components:{
			resume,
			addCom
		},
		created(){
			var self = this ;
			//清空记录
			self.$store.dispatch('getCMPDetail', '');
			//给担保项目ID赋值
			self.saveInfo.id = self.$route.query.creditProjectId ;
			self.saveInfo.flowNumber = self.$route.query.flowNumber ;
			if(self.saveInfo.id != -1){
				self.getInfo();
			}		
		},
		mounted(){
			$api.checkAllow(null,this.$route.query);
		},
		methods:{
			//获取担保流程详细信息
			getInfo(){	
				var self = this ;			
				$api.ajax('/baoliyun/guarantee/getCreditDetail',{
					creditProjectId : self.saveInfo.id
				},function(data){
					self.saveInfo = data.obj ;
				},null,{async:false})
				self.getCreditIdArr();
				self.getDetail();
			},
			//获取授信ID下拉列表
			getCreditIdArr(){
				var self = this ;
				var _arr = self.creditMainPartyArr ;
				for(var i=0;i<_arr.length;i++){
					if( _arr[i].id == self.saveInfo.creditMainPartyId ){
						if(_arr[i].creditIds && _arr[i].creditIds.length>0 )
							self.creditIdArr = _arr[i].creditIds ;
						else {
							self.creditIdArr = [] ;
							self.$store.dispatch('getCMPDetail', '');
						}
					}
				}
			},
			//获取放款主体详细
			getDetail(){
				var self = this ;
				self.$store.dispatch('getCMPDetail',self.saveInfo.creditId);
			},
			//保存担保详细
			save(callback){
				var self = this ;
				//check
				if(!self.saveInfo.guaranteeCreditCompanyManage.length){
					toast.err('融资企业至少添加一个');
					return false;
				}
				if(!$('#personnelAssign').data('bootstrapValidator')){
					self.validator();
				}
				//点击保存时触发表单验证
			    $('#personnelAssign').bootstrapValidator('validate');
		        if($('#personnelAssign').data('bootstrapValidator').isValid()){
					$api.ajax('/baoliyun/guarantee/saveCreditDetail',$api.vueToObj(self.saveInfo),function(data){
						self.saveInfo = data.obj ;
						if(typeof callback == 'function' ){
							callback();
						}else{
							toast.suc('保存成功');								
						}
					})
				}
			},
			submit(){
				var self = this ;
				self.save(function(){
					$api.ajax('/baoliyun/guarantee/saveProFlow',{
						pId : self.saveInfo.id,
						flowNumber: self.saveInfo.flowNumber ,
						status:1,
						flowNodeNumber:-1,
						currentFlowNodeNumber:self.$route.query.flowNodeNumber ? self.$route.query.flowNodeNumber : -1 ,
						remark:''
					},function(data){
						self.back();
					})
				})
			},
			addCom(){
				this.saveInfo.guaranteeCreditCompanyManage.push({
					companyId:-1,
                    companyName: "",
                 	creditGuaranteeLine: '',
                    guaranteeRatio:'',
                    guaranteeItems: "",
                    guaranteeReport: "",
                    guaranteeBeginDay: "",
                    guaranteeEndDay: "",
                    companyUsedGuaranteeAmount:'',
                    companyUsableGuaranteeAmount : ''
				});
			},
			updateCom(){
				this.companyArr = $api.cArr();
			},
			openModel(){
				this.$refs.addCom.open();
			},
			delCom(index){
				this.saveInfo.guaranteeCreditCompanyManage.splice(index,1);	
			},
			back(){
				var self = this ;
				if(self.saveInfo.id == -1){
					self.$router.push('/') ;
				}else {
					self.$router.push({
						path : '/flowList',
						query: {						
							flowNumber:self.saveInfo.flowNumber ,
							creditProjectId:self.saveInfo.id
						}
				    })
				}
			},
			validator(){
				var self = this ;
				//项目添加表单验证
				if(!self.$route.query.flowNodeNumber || self.$route.query.flowNodeNumber == 401 ){
					$('#personnelAssign').bootstrapValidator({
				       	feedbackIcons: {
				            valid: 'glyphicon glyphicon-ok',
				            invalid: 'glyphicon glyphicon-remove',
				            validating: 'glyphicon glyphicon-refresh'
				         },
				         fields: {
				        	 guaranteeProjectName:{
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
				        	 creditMainPartyId:{
				        		 validators: {
				                    notEmpty: {
				                        message: '不能为空'
				                    }
				                 }
				        	 },
				        	 creditId:{
				        		 validators: {
				                    notEmpty: {
				                        message: '不能为空'
				                    }
				                 }
				        	 },
				        	 companyId:{
				        		validators: {
				                    notEmpty: {
				                        message: '不能为空'
				                    }
				                }
				        	},
				        	businessOperator:{
				        		validators: {
				                    notEmpty: {
				                        message: '不能为空'
				                    }
				                }
				        	}
				         }
					})
				}
				else if(self.$route.query.flowNodeNumber == 402 ){
					$('#personnelAssign').bootstrapValidator({
				       	feedbackIcons: {
				            valid: 'glyphicon glyphicon-ok',
				            invalid: 'glyphicon glyphicon-remove',
				            validating: 'glyphicon glyphicon-refresh'
				         },
				         fields: {
				         	riskManagementOperator:{
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
	}
</script>
<style lang='less' scoped>
	.panel{
		margin-bottom: 0px;
		border-top:0;
		.fline{
			overflow: hidden;
			.formg{
		        float:left;
		        display:inline-block;
		        margin-right: 0px;
		        margin-left: 0px;
		        .help-block{
		       		text-align: right;
		        }
		        input[type=radio]{
	           		float:left;
	           		display:inline-block;
	           		margin-top:10px;
	           		margin-right:5px;
	            }
		        .fLabel{
			   		width:160px;
			    }
			    .formInput{
			    	float:left;
			       	width:200px;
			       	display:inline-block;
			       	margin-left:10px;
			       	span,p{
	   					padding-top:7px;
						display:inline-block;
						width:auto;
			       	}
			    }
		    }			
		}
	}
</style>