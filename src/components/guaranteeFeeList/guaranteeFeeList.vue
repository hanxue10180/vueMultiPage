<template>
	<bPanel>
		<div slot="title">
			<span class="back" v-on:click="back">返回</span>
			<h4>授信放款担保费一览</h4>			
		</div>
		<div slot="body">
			<headers :info1="info1" :info2="info2" type=1 ></headers>
			<div class="btable">
			  	<table id="mytab" class="table table-hover" v-on:click="go($event)"></table>	
			  	<div class="status" v-if="num==1">
			  		<span>收支状态说明：</span>
			  		<span><span class="tbn handling"></span> 业务处理中</span>
			  		<span><span class="tbn confirm"></span> 财务确认中</span>
			  		<span><span class="tbn confirmed"></span> 财务已确认</span>
			  	</div>
			  	<div id="toolbar" class="btn-group pull-right">
					<button v-if="num!=1 && state!=2 " type="button" class="btn btn-default" v-on:click="edit" style=" border-radius:0;" allow="szywedit">修改</button>
		        	<button v-if="num!=1 && state!=2 " type="button" class="btn btn-default" v-on:click="del" allow="szywedit">删除</button>
		        	<button v-if="num!=1 && state!=2 " type="button" class="btn btn-default"  v-on:click="add" allow="szywedit">新增 </button>
		       		<button v-if="num==1" type="button" class="btn btn-default" v-on:click="addRecord" allow="szywedit" >追加收支记录</button>
	        	</div>
	       	</div>
	       	<div class="hr-line-dashed" v-if="num!=1"></div>
	       	<div class="fline" v-if="num!=1" >
	       		<formg>
	       			<span slot="tl">系统算出合计（元）</span>
	       			<span slot="ct" >{{ msg }}</span>
	       		</formg>
	       		<formg>
	       			<span slot="tl">计划合计（元）</span>
	       			<span slot="ct" >{{ total }}</span>
	       		</formg>
	       		<formg>
					<span slot="tl">差额（元）</span>
					<span slot="ct" >{{ chae1 }}</span>
	       		</formg>
	       	</div>
	       	<div class="hr-line-dashed" v-if="num==1"></div>
	       	<div class="fline" v-if="num==1" >
	       		<formg>
	       			<span slot="tl">计划合计（元）</span>
	       			<span slot="ct" >{{ total }}</span>
	       		</formg>
	       		<formg>
	       			<span slot="tl">实际合计（元）</span>
	       			<span slot="ct" >{{ ptotal }}</span>
	       		</formg>
	       		<formg>
					<span slot="tl">差额（元）</span>
					<span slot="ct" >{{ chae2 }}</span>
	       		</formg>
	       	</div>
	       	<div class="hr-line-dashed" v-if="num!=1"></div>
	       	<div class="fline" v-if="num!=1">
	       		<formg>
	       			<span slot="tl">财务说明</span> 
	       			<textarea name="financialStatements" v-model="financialStatements" class="form-control" v-bind:disabled="state!=2" slot="ct" allow="szcwedit"></textarea>
	       		</formg>
	       	</div>
	       	<div class="hr-line-dashed" v-if="num!=1"></div>
	       	<div class="fline" v-if="num!=1" >
	       		<button id="psubmit" class="btn btn-primary pull-right" v-if="state==1 || state==3" style="margin-left:20px;margin-right:20px;" v-on:click="submit(3)" allow="szywedit" >计划提交</button>
	       		<button id="psave" class="btn btn-default pull-right" v-if="state==1 || state==3" v-on:click="submit(0)" allow="szywedit">计划保存</button>
				<button class="btn btn-primary pull-right" v-if="state == 2" style="margin-left:20px;margin-right:20px;" v-on:click="submit(1)" allow="szcwedit">计划驳回</button>
				<button class="btn btn-primary pull-right" v-if="state == 2" v-on:click="submit(2)" allow="szcwedit">计划通过</button>
	       	</div>
		</div>
	</bPanel>
</template>
<script type="text/javascript">
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import headers from '../inOutHeader/inOutHeader.vue'
	import formg from '../formg/formg.vue'
	export default{
		data(){
			return{
				info1:{},
				info2:{},
				num:'',
				total:'',
				ptotal:'',
				chae1:'',
				chae2:'',
				financialStatements:'',
				state:'',
				msg:''
			}
		},
		components:{
			bPanel,
			headers,
			formg
		},
		created(){
			var self = this ;
			self.info1 = JSON.parse(self.$route.query.info1);
			self.info2 = JSON.parse(self.$route.query.info2);
			self.getState();
			if(self.state !=4){
				self.num = 2 ;
			}else{
				self.num = self.$route.query.num;
			}
		},
		mounted(){
			this.getList();
			$api.checkAllow() ;
		},
		methods:{
			back(){
				this.$router.push({
					path:'/creditloanList',
					query:{
						creditCompanyInfo:this.$route.query.info1
					}
				})
			},
			getState(){
				var self = this ;
				$api.ajax('/baoliyun/guarantee/getReceivablesPlanState',{
					creditloanNo:self.info2.creditloanNo,
					feeType:1
				},function(data){
					self.state = data.obj.state ? data.obj.state : 4 ;
					self.financialStatements = data.obj.remark ;
				},null,{async:false})
			},
			//新增按钮
			add(){
				var _info = {
					info1:JSON.stringify($api.vueToObj(this.info1)),
					info2:JSON.stringify($api.vueToObj(this.info2)),
					id:-1
				}
				this.$router.push({
					path:'/gFEdit',
					query:_info
				})
			},
			//提交
			submit(num){
				var self = this ;
				if(num == 1 && !self.financialStatements){
					toast.err('财务意见不能为空');
					return false ;
				}
				var sfun = function(){
					$api.ajax('/baoliyun/guarantee/saveReceivablesPlanState',{
						creditloanNo:self.info2.creditloanNo,
						feeType:1,
						remark:self.financialStatements,
						type:num,
						loginName:$api.getUserInfo().loginname
					},function(data){
						if(num == 0 )
							toast.suc('保存成功')
						else 
							self.back();
					})
				}
				if(num == 1 || num ==2){
					var _msg = num==1 ? '确认驳回吗' : '确认通过吗' ;
					$api.confirm(_msg,function(){
						$('.popup_de').remove();
						sfun();
					})
				}else{
					sfun();
				}
			},
			//修改按钮
			edit(){
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请先选中计划');
					return false;
				}else if(dataArr.length>1){
					toast.err('只能选中一条计划');
					return false;
				}else if(dataArr[0].inOutWays == 2){
					toast.err('【生成方式分类】为【系统生成】的记录可以进行删除操作，不可以修改');
					return false
				}else{
					var _info = {
						info1:JSON.stringify($api.vueToObj(this.info1)),
						info2:JSON.stringify($api.vueToObj(this.info2)),
						id:dataArr[0].id
					}
					this.$router.push({
						path:'/gFEdit',
						query:_info
					})
				}
			},
			//删除按钮
			del(){
				var self = this ;
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请先选中计划');
					return false;
				}else{
					$api.confirm('确认要删除吗？',function(){
						$api.ajax('/baoliyun/guarantee/delReceivablesPlan',{
							id:dataArr[0].id,
							feeType:1,
							loanNo:self.info2.creditloanNo
						},function(data){
							$('.popup_de').remove();
							$api.alert('删除成功');
							self.getState();
							$('#mytab').bootstrapTable('refresh');
						},function(data){
							$('.popup_de').remove();
							$api.alert(data.msg);
						})
					})
				}
			},
			//追加收支记录
			addRecord(){
				var dataArr=$('#mytab').bootstrapTable('getSelections');
				if(!dataArr.length){
					toast.err('请先选中要追加数据');
					return false;
				};
				var _rlist = dataArr[0].incomes ;
				if(_rlist[_rlist.length-1].state !=4){
					toast.err('存在未完结的收支，不能继续追加')
					return false
				}
				var _info = JSON.stringify(dataArr[0]);
				this.$router.push({
					path:'/gFInOutEdit',
					query:{
						info:_info,
						info1:this.$route.query.info1,
						info2:this.$route.query.info2,
						id:-1,
						state:1
					}
				})
			},
			go(e){
				var el = $(e.target);
				if(el.hasClass('tbn')){
					var _info = el.attr('data');
					var _id = el.text();
					var _state = el.attr('state') ;
					var _num = el.attr('num') ;
					this.$router.push({
						path : '/gFInOutEdit',
						query:{
							info:_info,
							info1:this.$route.query.info1,
							info2:this.$route.query.info2,
							id:_id,
							state:_state,
							num:_num
						}
					});
				}
			},
			getList(){
				var self = this ;
				// 获取表单数据
				$api.table('#mytab',{
					url:$api.baseUrl+'/baoliyun/guarantee/getReceivablesPlanList',
					height:'auto',
					dataField: "obj",
					pagination:false,
					queryParams: function(params){
						return{
							feeType:1,
							creditloanNo:self.info2.creditloanNo,
							loginname:$api.getUserInfo().loginname
						}
					},
					columns:[
						{
							title: '',
							field: 'select',
							radio: 'true',
							width: 25,
							align: 'center',
							valign: 'middle'
						},
						{
							title:'id',
							field:'id',
							visible:false
						},
						{
							title:'担保费收取方式',
							field:'loanNo',
							align: 'center',
							valign: 'middle',
							formatter:value => self.info2.guaranteereceivableWays == 1 ? '一次性' : self.info2.guaranteereceivableWays == 2 ? '分期' : ''
						},
						{
							title: '生成方式分类',
							field: 'inOutWays',
							align: 'center',
							valign: 'middle',
							formatter:value => value == 1 ? '手动录入' : value==2 ? '系统生成' : ''
						},
						{
							title: '期数',
							field: 'expectReceivablesPeriods',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '计划金额',
							field: 'expectFee',
							align: 'center',
							valign: 'middle'
						},
						{
							title: '收支区分',
							field: 'expensesReceiptType',
							align: 'center',
							valign: 'middle',
							formatter:value => value==1 ? '收' : value == 2 ? '支' : ''
						},
						{
							title: '计息日',
							field: 'currentPeriodInterestBearingDate',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '结息日',
							field: 'currentPeriodSettlementDate',
							align: 'center',
							valign: 'middle',
							formatter:$api.dateFormat
						},
						{
							title: '实际金额',
							field: 'operateAmount',
							align: 'center',
							valign: 'middle',
							formatter:value => value ? value : 0 
						},
						{
							title:'收支ID及处理状态',
							field:'incomes',
							align: 'center',
							valign: 'middle',
							formatter:function(value,row){
			        			var _html='';
			        			if(value && value.length){
									for(var i=0;i<value.length;i++){
										var _cls=''
										if(value[i].state==1 || value[i].state == 3){
											_cls="tbn handling";
										}else if(value[i].state==2){
											_cls="tbn confirm";
										}else if(value[i].state==4){
											_cls="tbn confirmed"
										}
										_html+="<span class='"+_cls+"' num='"+i+"' data='"+JSON.stringify(row)+"' state='"+value[i].state+"'>"+value[i].incomeExpensesId+"</span>";
									}
			        			}
								return _html
			        		},
			        		visible:self.num == 1 ? true : false
						},
						{
							title: '日期',
							field: 'operateDate',
							align: 'center',
							valign: 'middle',
							visible:(self.state == 2 || self.state == 4) ? true : false ,
							formatter:$api.dateFormat
						},
						{
							title:'业务说明',
							field:'businessStatements',
							align: 'center',
							valign: 'middle',
							visible:self.num == 2 ? true : false
						},
						{
							title: '费用类型1担保费，2保证金，3第三方费用',
							field: 'feeType',
							align: 'center',
							valign: 'middle',
							visible:false		
						},
						{
							title: '对应的支付ID',
							field: 'payId',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '对应的支付ID列表',
							field: 'payIds',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '收支区分',
							field: 'expensesReceiptType',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '第三方名称',
							field: 'thirdPartyName',
							align: 'center',
							valign: 'middle',
							visible:false
						},
						{
							title: '第三方费率',
							field: 'thirdPartyRatio',
							align: 'center',
							valign: 'middle',
							visible:false
						}
					],
					onLoadSuccess:function(data){
						var _list = data.obj ;
						var _t1=0,_t2=0,_t3=0;
						for(var i=0;i<_list.length;i++){
							_list[i].operateAmount = _list[i].operateAmount ? _list[i].operateAmount : 0 ;
							//收
							if(_list[i].expensesReceiptType == 1){
								_t1 += _list[i].expectFee ;
								_t2 += _list[i].operateAmount ;
							}
							//支
							else{
								_t1 -= _list[i].expectFee ;
								_t2 -= _list[i].operateAmount ;
							}		
						}
						_t3 = _t2 - _t1 ;
						self.total = _t1.toFixed(2) ;
						self.ptotal = _t2.toFixed(2) ;
						self.chae2 = _t3.toFixed(2) ;
						self.chae1 = (data.msg - _t1).toFixed(2);
						self.msg = data.msg
					}
				})

			}
		}
	}
</script>