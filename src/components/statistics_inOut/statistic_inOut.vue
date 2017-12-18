<template>
	<bPanel>
		<h4 slot="title">收支状况</h4>
		<div slot="body">
			<search ref="search" @getData="getData"></search>
			<div style="clear:both">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#factoringProject" data-toggle="tab">保理项目</a></li>
					<li><a href="#guaranteeProject" data-toggle="tab">担保项目</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane fade in active" id="factoringProject" style="padding-top:20px;">
						<bPanel style="margin-top:20px">
							<h4 slot="title">保理项目放款情况</h4>
							<div slot="body">
								<div id="loan1" style="width:50%;height:450px;float:left"></div> 
								<img id="img1" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
								<div style="width:50%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th style="width:70px;">项目类型</th>
												<th style="width:90px;">立项时间</th>
												<th>项目名称</th>
												<th>累计放款金额（万）</th>
												<th>归还本金（万）</th>
												<th>放款余额（万）</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list1" >
												<td v-text="item.projectType"></td>
												<td v-text="item.atime ? getDate(item.atime):''"></td>
												<td v-text="item.projectName" v-bind:class="item.atime ? 'link':''" v-on:click="getDList(item.projectId,1)" ></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.repayment"></td>
												<td v-text="item.balance"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>
						<bPanel>
							<h4 slot="title">保理项目收益情况</h4>
							<div slot="body">
								<div style="width:45%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th style="width:70px">项目类型</th>
												<th style="width:90px">立项时间</th>
												<th>项目名称</th>
												<th>预计收益</th>
												<th>实际收益</th>
												<th>实际收益归还占比（%）</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list3" >
												<td v-text="item.projectType"></td>
												<td v-text="item.atime ? getDate(item.atime):''"></td>
												<td v-text="item.projectName" v-bind:class="item.atime ? 'link':''" v-on:click="getDList(item.projectId,2)" ></td>
												<td v-text="item.planProfit"></td>
												<td v-text="item.actualProfit"></td>
												<td v-text="item.rate"></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="profit1" style="width:55%;height:450px;float:left"></div>
								<img id="img2" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>  
							</div>
						</bPanel>
					</div>
					<div class="tab-pane fade" id="guaranteeProject">
						<bPanel>
							<h4 slot="title">担保项目放款情况</h4>
							<div slot="body">
								<div id="loan2" style="width:55%;height:450px;float:left"></div> 
								<img id="img3" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
								<div style="width:45%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll ">
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th style="width:70px;">项目类型</th>
												<th style="width:90px;">立项时间</th>
												<th>项目名称</th>
												<th>累计放款金额（万）</th>
												<th>归还本金（万）</th>
												<th>放款余额（万）</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list2" >
												<td v-text="item.projectType"></td>
												<td v-text="item.atime ? getDate(item.atime):''"></td>
												<td v-text="item.projectName" v-bind:class="item.atime ? 'link':''" v-on:click="getDList(item.projectId,1)" ></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.repayment"></td>
												<td v-text="item.balance"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>
						<bPanel>
							<h4 slot="title">担保项目收益情况</h4>
							<div slot="body">
								<div style="width:45%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th style="width:70px;">项目类型</th>
												<th style="width:90px">立项时间</th>
												<th>项目名称</th>
												<th>预计收益</th>
												<th>实际收益</th>
												<th>实际收益归还占比（%）</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list4" >
												<td v-text="item.projectType"></td>
												<td v-text="item.atime ? getDate(item.atime):''"></td>
												<td v-text="item.projectName" v-bind:class="item.atime ? 'link':''" v-on:click="getDList(item.projectId,2)" ></td>
												<td v-text="item.planProfit"></td>
												<td v-text="item.actualProfit"></td>
												<td v-text="item.rate"></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="profit2" style="width:55%;height:450px;float:left"></div> 
								<img id="img4" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
							</div>
						</bPanel>
						<bPanel>
							<h4 slot="title">保证金收支情况（一次性支付）</h4>
							<div slot="body">
								<div id="deposit1" style="width:55%;height:450px;float:left"></div>
								<img id="img7" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>  
								<div style="width:45%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>放款主体</th>
												<th>授信额度（万）</th>
												<th>保证金担负方</th>
												<th>预计支付金额</th>
												<th>实际支付金额</th>
												<th>实际收取金额</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list5" >
												<td v-text="item.creditMainPartyName" v-bind:class="item.creditMainPartyName!='合计' ? 'link':''" v-on:click="getDList1(item.creditId,1)"></td>
												<td v-text="item.creditLine"></td>
												<td v-text="item.depositPayer"></td>
												<td v-text="item.planAmount"></td>
												<td v-text="item.actualPayOut"></td>
												<td v-text="item.actualInCome"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</bPanel>
						<bPanel>
							<h4 slot="title">保证金收支情况（按放款单位支付）</h4>
							<div slot="body">
								<div style="width:45%;float:left;table-layout:fixed; max-height:450px;overflow-y:scroll " >
									<table class="table table-bordered table-hover" >
										<thead>
											<tr>
												<th>放款主体</th>
												<th>放款主体授信额度（万）</th>
												<th>保证金担负方</th>
												<th>项目名称</th>
												<th>放款金额</th>
												<th>预计支付金额</th>
												<th>实际支付金额</th>
												<th>实际收取金额</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="item in list6" >
												<td v-text="item.creditMainPartyName" v-bind:class="item.creditMainPartyName!='合计' ? 'link':''" v-on:click="getDList1(item.projectId,2)"></td>
												<td v-text="item.creditLine"></td>
												<td v-text="item.depositPayer"></td>
												<td v-text="item.projectName"></td>
												<td v-text="item.amounts"></td>
												<td v-text="item.planAmount"></td>
												<td v-text="item.actualPayOut"></td>
												<td v-text="item.actualInCome"></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="deposit2" style="width:55%;height:450px;float:left"></div>
								<img id="img8" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>  
							</div>
						</bPanel>
					</div>
				</div>
			</div>
			<modal class="modal1">
				<h4 slot="titles" v-text="show==1 ? '项目放款情况': show==2 ? '项目收益情况' : ''"></h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>项目名称</th>
								<th>融资交易方</th>
								<th>授信额度（万）</th>
								<th>放款总额（万）</th>
								<th v-if="show==2 && type==1">合同编号</th>
								<th v-if="show==2 && type==1">合同状态</th>
								<th>归还本金（万）</th>
								<th v-show="show==2">预计收益</th>
								<th v-show="show==2">实际收益</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist">
								<td v-text="item.projectName"></td>
								<td v-text="item.financing"></td>
								<td v-text="item.creditLine"></td>
								<td v-text="item.total"></td>
								<td v-if="show==2 && type==1" v-text="item.contractNo"></td>
								<td v-if="show==2 && type==1" v-text="item.contractState"></td>
								<td v-text="item.repament"></td>
								<td v-show="show==2" v-text="item.planProfit"></td>
								<td v-show="show==2" v-text="item.actualProfit"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</modal>
			<modal class="modal2">
				<h4 slot="titles">保证金收支详细</h4>
				<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th v-show="type1==2">放款批号</th>
								<th>日期</th>
								<th>收支区分</th>
								<th>金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in dlist1">
								<td v-show="type1==2" v-text="item.loanNo"></td>
								<td v-text="getDate(item.operateDate)"></td>
								<td v-text="item.expensesReceiptType"></td>
								<td v-text="item.amount"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</modal>
		</div>
	</bPanel>	
</template>
<script type="text/javascript">
	var echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/pie')
	require('echarts/lib/component/legendScroll');
	require('echarts/lib/component/tooltip');
	require('echarts/theme/macarons.js')
	require('echarts/theme/roma.js')
	import bPanel from '../bootstrapPanel/bootstrapPanel.vue'
	import formg from '../formg/formg.vue'
	import search from '../statistics_search/statistics_search.vue'
	import modal from '../modal/modal.vue'
	export default{
		data(){
			return{
				type:1,
				type1:1,
				loan:[],
				profit:[],
				deposit:[],
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				list6:[],
				dlist:[],
				dlist1:[],
				show:1,
				start:'',
				end:''
			}
		},
		components:{
			bPanel,
			formg,
			search,
			modal
		},
		mounted(){
			var self = this ;
			self.$nextTick(function(){
				//监听tab页切换事件
				$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		        	// 获取已激活的标签页的名称
		            var activeTab = $(e.target).text();
		            if(activeTab == '保理项目'){
		            	self.type = 1 ;
		            }else{
		            	self.type = 2 ;
		            	//担保项目放款情况
		            	self.loan[1]= echarts.init(document.getElementById('loan2'),'macarons');
		            	//担保项目收益情况
		            	self.profit[1]= echarts.init(document.getElementById('profit2'),'macarons');
		            	self.deposit[0] = echarts.init(document.getElementById('deposit1'),'macarons');
		            	self.deposit[1] = echarts.init(document.getElementById('deposit2'),'macarons');
		            }
		            self.$refs.search.init();
	            })
	            //保理项目放款情况
				self.loan[0]= echarts.init(document.getElementById('loan1'),'roma');
				//保理项目收益情况
				self.profit[0]= echarts.init(document.getElementById('profit1'),'roma');
			});
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num);
			},
			getData(start,end){
				var self = this ;
				self.start = start!=0 ? $api.getLong(start)/1000 : 0  ;
				self.end = end!=0 ? $api.getLong(end)/1000 : 0 ;
				/*
				 * 项目放款情况
				 */
				$api.ajax('/baoliyun/report/getReportToLoan',{
					projectType : self.type ,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						$('#loan1').show();
						$('#img1').hide();
						self.list1 = _data ;
					}else{
						$('#loan2').show();
						$('#img3').hide();
						self.list2 = _data ;
					}
					var list1=[],list2=[] ,list3=[],list4=[];
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].projectName);
						list2.push(_data[i].repayment);
						list3.push(_data[i].balance) ;
						list4.push(_data[i].amounts);
					}
					var myObj = {
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['归还本金','放款余额']
					    },
					    grid:{
					    	height:'65%',
					    	width:'70%',
					    	left:'15%',
					    	bottom:'23%'
					    },
					    xAxis : [
					        {
					        	show:true,
					            type : 'category',
					            data : list1,					   
					            axisTick: {
					                alignWithLabel: true
					            },
					            axisLabel: {
								    interval:0,//横轴信息全部显示
								    rotate:-30//60度角倾斜显示
								}
					        }
					    ],
					    yAxis : [
					        {
					        	show : true,
					        	axisLabel: {
					                formatter: '{value} 万'
					            },
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'归还本金',
					            type:'bar',
					            data:list2,
					            stack: '累计放款金额'
					        },
					        {
					            name:'放款余额',
					            type:'bar',
					            data:list3,
					            stack: '累计放款金额'
					        },
					        { 
								name: '累计放款金额', 
								type: 'bar', 
								stack: '累计放款金额', 
								label: { 
									normal: { 
										show: true, 
										position: 'insideBottom', 
										formatter:'{c}', 
										textStyle:{ color:'#008ACD' } 
									}
								},
								itemStyle:{ 
									normal:{ 
										color:'rgba(128, 128, 128, 0)' 
									} 
								}, 
								data: list4
							}
					    ]
					}
					self.loan[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						$('#loan1').hide();
						$('#img1').show();
						self.list1 = [] ;
					}else{
						$('#loan2').hide();
						$('#img3').show();
						self.list2 = [] ;
					}
				})

				/*
				 * 项目收益情况
				 */
				$api.ajax('/baoliyun/report/getReportToProfit',{
					projectType : self.type ,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						$('#profit1').show();
						$('#img2').hide();
						self.list3 = _data ;
					}else{
						$('#profit2').show();
						$('#img4').hide();
						self.list4 = _data ;
					}
					var list1=[],list2=[] ,list3=[];
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].projectName);
						list2.push(_data[i].planProfit);
						list3.push(_data[i].actualProfit) ;
					}
					var myObj = {
						tooltip: {
					        trigger: 'axis'
					    },
					    legend:{
					    	show:true,
    						data:['预计收益','实际收益']
					    },
					    grid:{
					    	height:'65%',
					    	width:'70%',
					    	left:'20%',
					    	bottom:'23%'
					    },
					    xAxis : [
					        {
					        	show:true,
					            type : 'category',
					            data : list1,					   
					            axisTick: {
					                alignWithLabel: true
					            },
					            axisLabel: {
								    interval:0,//横轴信息全部显示
								    rotate:-30//60度角倾斜显示
								}
					        }
					    ],
					    yAxis : [
					        {
					        	show : true,
					        	axisLabel: {
					                formatter: '{value}'
					            },
					            type : 'value'
					        }
					    ],
					    series : [
					        {
					            name:'预计收益',
					            type:'bar',
					            data:list2,
					            barWidth:'35%'
					        },
					        {
					            name:'实际收益',
					            type:'bar',
					            data:list3,
					            barGap:0,
					            barWidth:'35%'
					        }
					    ]
					}
					self.profit[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						$('#profit1').hide();
						$('#img2').show();
						self.list3 = [] ;
					}else{
						$('#profit2').hide();
						$('#img4').show();
						self.list4 = [] ;
					}
				})

				
				if(self.type == 2){
					/*
					 * 保证金一次性
					 */
					$api.ajax('/baoliyun/report/getGuaranteeBond',{
						depositPayWays : 1 ,
						start : self.start ,
						end : self.end
					},function(data){
						var _data = data.obj ;
						$('#deposit1').show();
						$('#img5').hide();
						self.list5 = _data ;
						var list1=[],list2=[] ,list3=[],list4=[];
						// 基于准备好的dom，初始化echarts实例
						for(var i=0;i<_data.length-1;i++){
							list1.push(_data[i].creditMainPartyName);
							list2.push(_data[i].planAmount);
							list3.push(_data[i].actualPayOut) ;
							list4.push(_data[i].actualInCome) ;
						}
						var myObj = {
							tooltip: {
						        trigger: 'axis'
						    },
						    legend:{
						    	show:true,
	    						data:['预计支付保证金','实际支付保证金','实际收取保证金']
						    },
						    grid:{
						    	height:'65%',
						    	width:'80%',
						    	left:'10%',
						    	bottom:'25%'
						    },
						    xAxis : [
						        {
						        	show:true,
						            type : 'category',
						            data : list1,					   
						            axisTick: {
						                alignWithLabel: true
						            },
						            axisLabel: {
									    interval:0,//横轴信息全部显示
									    rotate:30//60度角倾斜显示
									}
						        }
						    ],
						    yAxis : [
						        {
						        	show : true,
						        	axisLabel: {
						                formatter: '{value}'
						            },
						            type : 'value'
						        }
						    ],
						    series : [
						        {
						            name:'预计支付保证金',
						            type:'bar',
						            data:list2,
						            barWidth:'25%'
						        },
						        {
						            name:'实际支付保证金',
						            type:'bar',
						            data:list3,
						            barWidth:'25%'
						        },
						        {
						            name:'实际收取保证金',
						            type:'bar',
						            data:list4,
						            barGap:0,
						            barWidth:'25%'
						        }
						    ]
						}
						self.deposit[0].setOption(myObj) ;	
					},function(data){
						toast.err(data.msg) ;
						$('#deposit1').hide();
						$('#img5').show();
						self.list5 = [] ;
					})

					/*
					 * 保证金按放款单位
					 */
					
					$api.ajax('/baoliyun/report/getGuaranteeBond',{
						depositPayWays : 2 ,
						start : self.start ,
						end : self.end
					},function(data){
						var _data = data.obj ;
						$('#deposit2').show();
						$('#img6').hide();
						self.list6 = _data ;
						var list1=[],list2=[] ,list3=[],list4=[];
						// 基于准备好的dom，初始化echarts实例
						for(var i=0;i<_data.length-1;i++){
							list1.push(_data[i].creditMainPartyName);
							list2.push(_data[i].planAmount);
							list3.push(_data[i].actualPayOut) ;
							list4.push(_data[i].actualInCome) ;
						}
						var myObj = {
							tooltip: {
						        trigger: 'axis'
						    },
						    legend:{
						    	show:true,
	    						data:['预计支付保证金','实际支付保证金','实际收取保证金']
						    },
						    grid:{
						    	height:'65%',
						    	width:'80%',
						    	left:'10%',
						    	bottom:'25%'
						    },
						    xAxis : [
						        {
						        	show:true,
						            type : 'category',
						            data : list1,					   
						            axisTick: {
						                alignWithLabel: true
						            },
						            axisLabel: {
									    interval:0,//横轴信息全部显示
									    rotate:30//60度角倾斜显示
									}
						        }
						    ],
						    yAxis : [
						        {
						        	show : true,
						        	axisLabel: {
						                formatter: '{value}'
						            },
						            type : 'value'
						        }
						    ],
						    series : [
						        {
						            name:'预计支付保证金',
						            type:'bar',
						            data:list2,
						            barWidth:'25%'
						        },
						        {
						            name:'实际支付保证金',
						            type:'bar',
						            data:list3,
						            barWidth:'25%'
						        },
						        {
						            name:'实际收取保证金',
						            type:'bar',
						            data:list4,
						            barGap:0,
						            barWidth:'25%'
						        }
						    ]
						}
						self.deposit[1].setOption(myObj) ;	
					},function(data){
						toast.err(data.msg) ;
						$('#deposit2').hide();
						$('#img6').show();
						self.list6 = [] ;
					})
				}
				
			},
			getDList(id,num){
				var self = this,_link;
				if(id){
					self.show = num ;
					//项目放款详细
					if(num==1){
						_link = '/baoliyun/report/getReportToLoanDetail' ;
					}
					//项目收益详细
					else{
						_link = '/baoliyun/report/getReportToProfitDetail' ;
					}
					$api.ajax(_link,{
						projectType:self.type,
						start:self.start,
						end:self.end,
						projectId:id
					},function(data){
						self.dlist = data.obj ;
						$('.modal1').modal({backdrop: 'static', keyboard: false}); 
					},function(data){
						toast.err(data.msg);
					})
				}
			},
			getDList1(id,type){
				var self = this ;
				self.type1 = type;
				if(id){
					$api.ajax('/baoliyun/report/getGuaranteeBondDetail',{
						depositPayWays:type,
						start:self.start,
						end:self.end,
						id:id
					},function(data){
						self.dlist1 = data.obj ;
						$('.modal2').modal({backdrop: 'static', keyboard: false}); 
					},function(data){
						toast.err(data.msg);
					})
				}
			}
		}

	}
</script>
<style >
	.modal-dialog{
		width:70%;
	}
</style>