<template>
	<div>
		<bPanel>
			<h4 slot="title">汇总信息</h4>
			<div slot="body" style="table-layout:fixed; max-height:400px;overflow-y:scroll ">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>项目分类</th>
							<th>授信额度（万）</th>
							<th>授信余额（万）</th>
							<th>放款总额（万）</th>
							<th>还款总额（万）</th>
							<th>预计收益</th>
							<th>实际收益</th>
						</tr>						
					</thead>
					<tbody>
						<tr v-for="item in list">
							<td v-text="item.projectType"></td>
							<td v-text="item.creditLine"></td>
							<td v-text="item.creditLineBalance"></td>
							<td v-text="item.loanAmount"></td>
							<td v-text="item.repayedAmount"></td>
							<td v-text="item.planProfit"></td>
							<td v-text="item.actualProfit"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</bPanel>
		<bPanel>
			<h4 slot="title">担保放款主体信息</h4>
			<div slot="body" style="table-layout:fixed; max-height:400px;overflow-y:scroll ">
				<table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>放款主体名称</th>
							<th>授信额度(万)</th>
							<th>授信余额（万）</th>
							<th>开始时间</th>
							<th>结束时间</th>
							<th>状态</th>
							<th>保证金支付方式</th>
						</tr>						
					</thead>
					<tbody>
						<tr v-for="item in mlist">
							<td v-text="item.creditMainPartyName"></td>
							<td v-text="(item.creditLine/10000).toFixed(2)"></td>
							<td v-text="(item.mainUsableGuaranteeAmount/10000).toFixed(2)"></td>
							<td v-text="getDate(item.creditBeginDay)"></td>
							<td v-text="getDate(item.creditEndDay)"></td>
							<td v-text="item.creditStatus==1 ? '未申请' : item.creditStatus==2 ? '已申请' : item.creditStatus==3 ? '已到期':''"></td>
							<td v-text="item.depositPayWays==1 ? '不支付' : item.depositPayWays==2 ? '未支付':item.depositPayWays==3 ? '已支付':item.depositPayWays==4 ? '未收取':item.depositPayWays==5 ? '已收取':''"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</bPanel>
		<bPanel>
			<h4 slot="title">项目状况</h4>
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
								<h4 slot="title">保理项目授信额度占比</h4>
								<div slot="body">
									<div id="creditLine1" style="width:55%;height:500px;float:left"></div>
									<img id="img1" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>（主体）授信额度（万）</th>
													<th>占比</th>
													<th>授信余额（万）</th>
													<th style="width:70px;">项目状态</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list1" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId) : '' "></td>
													<td v-text="item.creditLine"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
													<td v-text="item.balance"></td>
													<td v-text="item.state"></td> 
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</bPanel>
							<bPanel >
								<h4 slot="title">保理项目预计收益占比</h4>
								<div slot="body">
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>预计收益</th>
													<th>占比</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list3" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId,1) : '' "></td>
													<td v-text="item.planProfit"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div id="profit1" style="width:55%;height:500px;float:left"></div>
									<img id="img2" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
								</div>
							</bPanel>
							<bPanel >
								<h4 slot="title">保理项目实际收益占比</h4>
								<div slot="body">
									<div id="actual1" style="width:55%;height:500px;float:left"></div>
									<img id="img7" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>实际收益</th>
													<th>占比</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list7" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId,2) : '' "></td>
													<td v-text="item.planProfit"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</bPanel>
							<bPanel >
								<h4 slot="title">保理项目放款总额占比</h4>
								<div slot="body">											
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>放款总额（万）</th>
													<th>占比</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list5" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId) : '' "></td>
													<td v-text="item.total"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div id="total1" style="width:55%;height:500px;float:left"></div>
									<img id="img3" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 	
								</div>
							</bPanel>
						</div>
						<div class="tab-pane fade" id="guaranteeProject">
							<bPanel>
								<h4 slot="title">担保项目授信额度占比</h4>
								<div slot="body">
									<div id="creditLine2" style="width:55%;height:500px;float:left"></div> 
									<img id="img4" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll ">
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>授信额度（万）</th>
													<th>占比</th>
													<th>授信余额（万）</th>
													<th style="width:70px;">项目状态</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list2" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId) : '' "></td>
													<td v-text="item.creditLine"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
													<td v-text="item.balance"></td>
													<td v-text="item.state"></td> 
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</bPanel>
							<bPanel >
								<h4 slot="title">担保项目预计收益占比</h4>
								<div slot="body">
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>预计收益</th>
													<th>占比</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list4" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId,1) : '' "></td>
													<td v-text="item.planProfit"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div id="profit2" style="width:55%;height:500px;float:left"></div>
									<img id="img5" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/> 
								</div>
							</bPanel>
							<bPanel >
								<h4 slot="title">担保项目实际收益占比</h4>
								<div slot="body">
									<div id="actual2" style="width:55%;height:500px;float:left"></div>
									<img id="img8" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>实际收益</th>
													<th>占比</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list8" >
													<td v-text="item.projectType"></td>
													<td v-text="item.projectType != '合计' ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId,2) : '' "></td>
													<td v-text="item.planProfit"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</bPanel>
							<bPanel >
								<h4 slot="title">担保项目放款总额占比</h4>
								<div slot="body">
									<div style="width:45%;float:left;table-layout:fixed; max-height:500px;overflow-y:scroll " >
										<table class="table table-bordered table-hover" >
											<thead>
												<tr>
													<th style="width:70px;">项目类型</th>
													<th style="width:90px">立项时间</th>
													<th>项目名称</th>
													<th>放款总额（万）</th>
													<th>占比</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="item in list6" >
													<td v-text="item.projectType"></td>
													<td v-text="item.atime ? getDate(item.atime):'' "></td>
													<td :class="item.projectType != '合计' ? 'link':''" v-text="item.projectName" v-on:click="item.projectType != '合计' ? getDList(item.projectId) : '' "></td>
													<td v-text="item.total"></td>
													<td v-text="item.rate!=null ? item.rate + '%' :''"></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div id="total2" style="width:55%;height:500px;float:left"></div>
									<img id="img6" src="../../assets/img/empty.png" style="width:50%;height:250px;float:left;display:none"/>
								</div>
							</bPanel>
						</div>
					</div>
				</div>
				<modal >
					<h4 slot="titles">项目详细</h4>
					<div slot="bodys" style="max-height:400px;overflow-y:scroll ">
						<table class="table table-bordered table-hover" >
							<thead>
								<tr>
									<th>项目名称</th>
									<th v-text="type==1 ? '融资交易方':'融资企业'"></th>
									<th>授信额度（万）</th>
									<th>放款总额（万）</th>
									<th v-if="show" v-text="show==1 ? '预计收益':'实际收益'"></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in dlist">
									<td v-text="item.projectName"></td>
									<td v-text="item.financing"></td>
									<td v-text="item.creditLine"></td>
									<td v-text="item.total"></td>
									<td v-if="show" v-text="show==1 ? item.planProfit:item.actualProfit"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</modal>
			</div>
		</bPanel>	
	</div>
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
				list:[],
				mlist:[],
				creditLine:[],
				profit:[],
				total:[],
				actual:[],
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				list6:[],
				list7:[],
				list8:[],
				dlist:[],
				start:'',
				end:'',
				show:false
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
		            	//担保项目授信额度占比
		            	self.creditLine[1]= echarts.init(document.getElementById('creditLine2'),'macarons');
		            	//担保项目收益占比
		            	self.profit[1]= echarts.init(document.getElementById('profit2'),'macarons');
		            	self.actual[1]= echarts.init(document.getElementById('actual2'),'macarons');
		            	//担保项目放款总额占比
						self.total[1]= echarts.init(document.getElementById('total2'),'macarons');
		            }
		            self.$refs.search.init();
	            })
	            //保理项目授信额度占比
				self.creditLine[0]= echarts.init(document.getElementById('creditLine1'),'roma');
				//保理项目收益占比
				self.profit[0]= echarts.init(document.getElementById('profit1'),'roma');
				self.actual[0]= echarts.init(document.getElementById('actual1'),'roma');
				//保理项目放款总额占比
				self.total[0]= echarts.init(document.getElementById('total1'),'roma');
			});
			self.getlist();
			self.getMain();
		},
		methods:{
			getDate(num){
				return $api.dateFormat(num);
			},
			getlist(){
				var self = this ;
				$api.ajax('/baoliyun/report/getReportToProjectSummary',{},function(data){
					self.list = data.obj ;
				})
			},
			getMain(){
				var self = this ;
				$api.ajax('/baoliyun/guarantee/getFactoringCompanyCreditList',{
					factoringCompanyId : $api.getUserInfo().affiliatedFactoringEnterpriseId,
					creditMainPartyId:-1,
					pageSize:9999,
					pageIndex:1
				},function(data){
					self.mlist = data.obj ;
				})
			},
			getData(start,end){
				var self = this ;
				self.start = start!=0 ? $api.getLong(start)/1000 : 0  ;
				self.end = end!=0 ? $api.getLong(end)/1000 : 0 ;
				/*
				 * 项目授信额度占比
				 */
				$api.ajax('/baoliyun/report/getReportToCreditLineRate',{
					projectType : self.type ,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						self.list1 = _data ;
						$('#creditLine1').show();
						$('#img1').hide();
					}else{
						self.list2 = _data ;
						$('#creditLine2').show();
						$('#img4').hide();
					}
					var list1=[],list2=[] ;
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].projectName);
						list2.push({
							value:_data[i].rate,
							name:_data[i].projectName 
						})
					}
					var myObj = {
						legend: {
					        type: 'scroll',
					        orient: 'vertical',
					        right: 10,
					        top: 20,
					        bottom: 20,
					        data: list1
					    },
			            tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {d}%"
					    },
					    series : [
					        {
					            name: '',
					            type: 'pie',
					            radius : '50%',
					            center: ['40%', '50%'],
					            data:list2,
					            labelLine:{
					            	normal:{
					            		show:true,
					            		length:10,
					            		length2:10
					            	}
					            }
					        }
					    ]
					}
					self.creditLine[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						$('#creditLine1').hide();
						$('#img1').show();
						self.list1 = [] ;
					}else{
						self.list2 = [] ;
						$('#creditLine2').hide();
						$('#img4').show();
					}
				})


				/*
				 * 项目预计收益占比
				 */
				$api.ajax('/baoliyun/report/getReportToProfitRate',{
					projectType : self.type ,
					profitType:1,
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
						$('#img5').hide();
						self.list4 = _data ;
					}
					var list1=[],list2=[] ;
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].projectName);
						list2.push({
							value:_data[i].rate,
							name:_data[i].projectName 
						})
					}
					var myObj = {
						legend: {
					        type: 'scroll',
					        orient: 'vertical',
					        right: 10,
					        top: 20,
					        bottom: 20,
					        data: list1
					    },
			            tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {d}%"
					    },
					    series : [
					        {
					            name: '',
					            type: 'pie',
					            radius : '50%',
					            center: ['40%', '50%'],
					            data:list2,
					            labelLine:{
					            	normal:{
					            		show:true,
					            		length:10,
					            		length2:10
					            	}
					            }
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
						$('#img5').show();
						self.list4 = [] ;
					}	
				})

				/*
				 * 项目实际收益占比
				 */
				$api.ajax('/baoliyun/report/getReportToProfitRate',{
					projectType : self.type ,
					profitType:2,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						$('#actual1').show();
						$('#img7').hide();
						self.list7 = _data ;
					}else{
						$('#actual2').show();
						$('#img8').hide();
						self.list8 = _data ;
					}
					var list1=[],list2=[] ;
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].projectName);
						list2.push({
							value:_data[i].rate,
							name:_data[i].projectName 
						})
					}
					var myObj = {
						legend: {
					        type: 'scroll',
					        orient: 'vertical',
					        right: 10,
					        top: 20,
					        bottom: 20,
					        data: list1
					    },
			            tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {d}%"
					    },
					    series : [
					        {
					            name: '',
					            type: 'pie',
					            radius : '50%',
					            center: ['40%', '50%'],
					            data:list2,
					            labelLine:{
					            	normal:{
					            		show:true,
					            		length:10,
					            		length2:10
					            	}
					            }
					        }
					    ]
					}
					self.actual[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						$('#actual1').hide();
						$('#img7').show();
						self.list7 = [] ;
					}else{
						$('#actual2').hide();
						$('#img8').show();
						self.list8 = [] ;
					}	
				})

				/*
				 * 放款总额占比
				 */
				$api.ajax('/baoliyun/report/getReportToTotalRate',{
					projectType : self.type ,
					start : self.start ,
					end : self.end
				},function(data){
					var _data = data.obj ;
					if(self.type == 1){
						$('#total1').show();
						$('#img3').hide();
						self.list5 = _data ;
					}else{
						$('#total2').show();
						$('#img6').hide();
						self.list6 = _data ;
					}
					var list1=[],list2=[] ;
					// 基于准备好的dom，初始化echarts实例
					for(var i=0;i<_data.length-1;i++){
						list1.push(_data[i].projectName);
						list2.push({
							value:_data[i].rate,
							name:_data[i].projectName 
						})
					}
					var myObj = {
						legend: {
					        type: 'scroll',
					        orient: 'vertical',
					        right: 10,
					        top: 20,
					        bottom: 20,
					        data: list1
					    },
			            tooltip : {
					        trigger: 'item',
					        formatter: "{b} : {d}%"
					    },
					    series : [
					        {
					            name: '',
					            type: 'pie',
					            radius : '50%',
					            center: ['40%', '50%'],
					            data:list2,
					            labelLine:{
					            	normal:{
					            		show:true,
					            		length:10,
					            		length2:10
					            	}
					            }
					        }
					    ]
					}
					self.total[self.type-1].setOption(myObj) ;	
				},function(data){
					toast.err(data.msg) ;
					if(self.type == 1){
						self.list5 = [] ;
						$('#total1').hide();
						$('#img3').show();
					}else{
						self.list6 = [] ;
						$('#total2').hide();
						$('#img6').show();
					}	
				})
			},
			getDList(id,num){
				var self = this,_link;
				if(num){
					self.show = num ;
					_link = '/baoliyun/report/getReportToProfitRateDetail' ;
				}else{
					self.show = false ;
					_link = '/baoliyun/report/getReportRateDetail' ;
				}
				$api.ajax(_link,{
					projectType:self.type,
					start:self.start,
					end:self.end,
					projectId:id
				},function(data){
					self.dlist = data.obj ;
					$('#myModal').modal({backdrop: 'static', keyboard: false}); 
				},function(data){
					toast.err(data.msg);
				})
			}
		}

	}
</script>
<style>
	.formg .fLabel {
	    width:90px;
	}
	.btn_s{
		margin-left: 10px;
	}
	.link{
		color: #1AB394;
    	cursor: pointer;
	}
	.modal-dialog{
		width:700px;
	}
</style>