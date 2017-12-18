<template>
	<bPanel id="detail">
		<h4 slot="title">详细内容</h4>
		<div slot="body"  >
			<div style="overflow-x:scroll;margin-bottom:20px;">
				<table class="table table-hover table-bordered" style="width:1800px;table-layout:fixed;">
					<thead>
						<tr>
							<th  colspan="3" v-text="ym"></th>
							<th  colspan="5">系统计算结果（单位：元）</th>
							<th  colspan="6">实际发放调整</th>
							<th></th>
							<th></th>
						</tr>
						<tr>
							<th>所属部门</th>
							<th>职务</th>
							<th>员工</th>
							<th>基本工资</th>
							<th>岗位津贴</th>
							<th>扣罚(-)/补发(+)金额</th>
							<th>绩效奖励</th>
							<th>合计</th>
							<th>基本工资</th>
							<th>岗位津贴</th>
							<th>扣罚(-)/补发(+)金额</th>
							<th>绩效奖励</th>
							<th>合计</th>
							<th>工资调整</th>
							<th>年度新增累计客户</th>
							<th>是否劝退</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in detailList" :style="item.flag ? 'font-weight:bold':''">
							<td v-text="item.department"></td>
							<td v-text="item.job"></td>
							<td v-text="item.flag ? '总计':item.name"></td>
							<td v-text="item.rollExpectedAmount" v-bind:class="item.flag ? '':'link'" v-on:click="!item.flag ? basePay(item.loginname,1):''"></td>
							<td v-text="item.allowanceExpectedAmount" v-bind:class="item.flag ? '':'link'" v-on:click="!item.flag ? basePay(item.loginname,2) : ''"></td>
							<td v-text="item.withholdExpectedAmount" v-bind:class="item.flag ? '':'link'" v-on:click="!item.flag ? withhold(item.loginname):''"></td>
							<td v-text="item.performanceExpectedAmount" v-bind:class="item.flag ? '':'link'" v-on:click="!item.flag ? performance(item.loginname):'' "></td>
							<td v-text="item.planTotal"></td>
							<td v-text="item.rollActualAmount" ></td>
							<td v-text="item.allowanceActualAmount"></td>
							<td v-if="state==1">
								<div class="form-group">
									<input class="form-control" type="text" name="withholdActualAmount" v-model.number="item.withholdActualAmount" v-on:input="getTotal" :disabled="item.processStatus!=1" allow="gzzjledit" />
								</div>
							</td>
							<td v-else v-text="item.withholdActualAmount" ></td>
							<td  v-if="state==1">
								<div class="form-group">
									<input class="form-control" type="text" name="performanceActualAmount" slot="ct" v-model.number="item.performanceActualAmount" :disabled="item.processStatus!=1" allow="gzzjledit"  v-on:input="getTotal"/>
								</div>
							</td>
							<td v-else v-text="item.performanceActualAmount"></td>
							<td v-text="item.realTotal"></td>
							<td v-if="state==1 && item.processStatus==1 && isjl" v-bind:class="item.flag ? '':'link'" v-on:click="!item.flag ? adjust(item.loginname):''">调整</td>
							<td v-else>-</td>
							<td v-text="item.annualCustomerCnt" v-bind:class="item.flag ? '':'link'" v-on:click="!item.flag ? newCustomer(item.loginname):''"></td>
							<td :style="item.ifDismiss ? 'color:red':''" v-text="item.flag ? '': item.ifDismiss ? '是':'否'"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<button id="gzzjledit" class="btn btn-primary pull-right" v-show="state==1 && processStatus==1" allow="gzzjledit" v-on:click="submit(2)">提交财务</button>
			<button id="gzzjledit" class="btn btn-default pull-right" v-show="state==1 && processStatus==1" allow="gzzjledit" v-on:click="submit(1)" style="margin-right:20px;">保存</button>
			<button id="gzcwedit" class="btn btn-primary pull-right" v-show="state==1 && processStatus==2" allow="gzcwedit" v-on:click="submit(3)">工资已发放</button>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return {
				detailList:[],
				ym:'',
				processStatus:'',
				isjl:$api.isRole('行政经理')
			}
		},
		props:['state','type','year','val'],
		components:{
			bPanel,
			formg
		},
		methods:{
			getDetailList(ym,type,val){
				if($('#detail').css('display')!='none'){
					$('#detail').fadeOut(50);
				}
				var self = this ;
				self.ym = ym ;
				$api.ajax('/baoliyun/performance/getPayrollTotalDetail',{
					payRollYM : ym ,
					type :type ? type:self.type,
					val : val ? val:self.val
				},function(data){
					if(data.obj.length){
						data.obj[data.obj.length-1].flag=1;
					}
					self.detailList = data.obj ;
					if(data.obj.length){
						self.processStatus = data.obj[0].processStatus ;
					}else{
						self.processStatus='';
					}
					$('#detail').fadeIn(500);
				},null,{async:false})
				var interval = setInterval(function(data){
					if($('#gzcwedit').length || $('#gzzjledit').length ){
						$api.checkAllow();
						clearInterval(interval);
					}	
				})
			},
			//基本工资/岗位津贴详细
			basePay(_name,_type){
				var _query = {
					loginname : _name ,
					type : _type ,
					ym:this.ym
				}
				if(this.year){
					_query.tp = this.type ;
					_query.year = this.year ;
					_query.val = this.val ;
				}
				this.$router.push({
					path:'/basePay',
					query:_query
				})
			},
			//扣罚(-)/补发(+)金额
			withhold(_name){
				var _query = {
					loginname:_name ,
					ym:this.ym
				}
				if(this.year){
					_query.tp = this.type ;
					_query.year = this.year ;
					_query.val = this.val ;
				}
				this.$router.push({
					path:'/withhold',
					query:_query
				})
			},
			//绩效奖励详细
			performance(_name){
				var self = this ;
				var _query = {
					loginname:_name ,
					payRollYM:this.ym
				}
				if(this.year){
					_query.tp = this.type ;
					_query.year = this.year ;
					_query.val = this.val ;
				}
				this.$router.push({
					path:'/performanceTotal',
					query:_query
				})
			},
			//新增客户详细
			newCustomer(_name){
				var _query = {
					loginname:_name ,
					ym:this.ym
				}
				if(this.year){
					_query.tp = this.type ;
					_query.year = this.year ;
					_query.val = this.val ;
				}
				this.$router.push({
					path:'/newCustomer',
					query:_query
				})
			},
			//工资调整
			adjust(_loginname){
				this.$router.push({
					path:'/edit',
					query:{
						uid:-1,
						loginname:_loginname,
						ym:this.ym
					}
				})
			},
			submit(num){
				var self = this ;
				self.validator();
				var _list = $api.vueToObj(this.detailList);
				var _newlist = [] ;
				for(var i=0;i<_list.length-1;i++){
					_newlist.push({
						id: _list[i].id ,
						withholdActualAmount : _list[i].withholdActualAmount ,
						performanceActualAmount: _list[i].performanceActualAmount
					})
				}
				//点击保存时触发表单验证
            	$('#detail').bootstrapValidator('validate');
           		if($("#detail").data('bootstrapValidator').isValid()){
					$api.ajax('/baoliyun/performance/savePayrolls',{
						amounts:_newlist,
						commit:1
					},function(data){
						if(num!=1){
							$api.ajax('/baoliyun/performance/savePayrolls',{
								amounts:_newlist,
								commit:num
							},function(data){
								self.getDetailList(self.ym,2,'');
								toast.suc('提交成功')			
							})
						}else{
							toast.suc('保存成功')
						}
					})
           		}			
			},
			getTotal(){
				var self = this ;
				var _list = $api.vueToObj(self.detailList);
				var t1=0,t2=0 ;
				for(var i=0;i<_list.length-1;i++){
					t1 += parseFloat(_list[i].withholdActualAmount) ;
					t2 += parseFloat(_list[i].performanceActualAmount) ;
				}
				self.detailList[_list.length-1].withholdActualAmount = t1.toFixed(2) ;
				self.detailList[_list.length-1].performanceActualAmount = t2.toFixed(2) ;
			},
			validator(){
				$('#detail').bootstrapValidator({
			       	feedbackIcons: {
			           valid: 'glyphicon glyphicon-ok',
			           invalid: 'glyphicon glyphicon-remove',
			           validating: 'glyphicon glyphicon-refresh'
			        },
			        fields: {
			            withholdActualAmount: {
			               	validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   },
				        	   stringLength:{
				        			max:18,
				        			message:'字数超过限制'
				        	   },
				        	   regexp:$api.rep.num_2
			               	}
			            },
			            performanceActualAmount:{
				            validators: {
			                   notEmpty: {
			                       message: '不能为空'
			                   },
				        	   stringLength:{
				        			max:18,
				        			message:'字数超过限制'
				        	   },
				        	   regexp:$api.rep.num_2
			               	}           	
			            }          
			        }
			    });
			}
		}
	}
</script>
<style>
	::-webkit-scrollbar{height:7px;}
	th,td{
		text-align: center;
	}
	.link{
		color:#1AB394;
		cursor:pointer;
	}
	table .form-group{
		margin-bottom: 0;
	}
</style>